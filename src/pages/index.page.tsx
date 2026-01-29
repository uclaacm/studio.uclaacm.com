import * as React from "react";

import { GetStaticPropsContext, GetStaticPropsResult } from "next";

import Box from "@mui/material/Box";

import { MantineProvider } from "@mantine/core";

import { REVALIDATE_INTERVAL } from "~/Env";
import {
  getCurrentEvents,
  CurrentEventsSchema
} from "~/api/notion/schema";


//in future, don't delete from here, just comment out or un comment / reorder
import CurrentEvents from "./home/CurrentEvents";
import Logline from "./home/Logline";
import Mission from "./home/Mission";
import HomeNavigation from "./home/HomeNavigation";
import Workshops from "./home/Events/Workshops";
import GameJams from "./home/Events/GameJams";
import Socials from "./home/Events/Socials";
import SpeakerEvents from "./home/Events/SpeakerEvents"; 
import E1 from "./home/Events/E1";
import SRS from "./home/Events/SRS";
import Metadata from "~/components/Metadata";
import HomeGame from "./home/Game";
import Banner from "./home/Banner";

type HomeProps = {
  events: CurrentEventsSchema[];
};

type CommonHomeSectionProps = {
  setActive: () => void;
  scrollContainerRef: React.MutableRefObject<HTMLElement>;
};

type UniqueHomeSectionProps = {
  id: string;
};

export type HomeSectionProps = CommonHomeSectionProps & UniqueHomeSectionProps;

export async function getStaticProps(): Promise<GetStaticPropsResult<HomeProps>> {
  const events = await getCurrentEvents({ sortBy: 'dateSort', direction: 'ascending' });
  return {
    props: { events },
    revalidate: REVALIDATE_INTERVAL,
  };
}

export type HomeSection = {
  Render: React.ComponentType<HomeSectionProps>;
  title: string;
  longTitle?: string;
  props: UniqueHomeSectionProps;
};

export const homeEventSections: HomeSection[] = [
  {
    title: "SRS",
    longTitle: "Students Run Studios",
    Render: SRS,
    props: { id: "srs" },
  },
  { title: "Workshops", Render: Workshops, props: { id: "workshops" } },
  { title: "Game Jams", Render: GameJams, props: { id: "game-jams" } },
  { title: "Socials", Render: Socials, props: { id: "socials" } },
  {
    title: "Speaker Events",
    Render: SpeakerEvents,
    props: { id: "speaker-events" },
  },
  {
    title: "ENGR1GD",
    longTitle: "Game Dev Course (ENGR 1GD)",
    Render: E1,
    props: { id: "engr1" },
  },
];

//in future, don't delete from here, just comment out or un comment / reorder 
export const homeSections: HomeSection[] = [
  { title: "Game Showcase", Render: HomeGame, props: { id: "game-showcase" } },
  { title: "Current Events", Render: CurrentEvents, props: { id: "current-events" } },
  { title: "Logline", Render: Logline, props: { id: "logline" } },
  { title: "Mission", Render: Mission, props: { id: "mission" } },
  ...homeEventSections,
];

export default function Home({ events }: HomeProps) {
  const scrollContainer = React.useRef<HTMLElement | null>(null);

  const [activeSection, setActive] = React.useState("#game-showcase");

  return (
    <MantineProvider>
      <Box position="relative">
        <Metadata />
        <HomeNavigation active={activeSection} />
        <Box
          ref={scrollContainer}
          sx={(theme) => ({
            width: "100%",
            height: "100dvh",
            overflowY: "auto",
            scrollSnapType: "y mandatory",
            scrollBehavior: "smooth",
            scrollSnapStop: "always",
            [theme.breakpoints.down("md")]: {
              width: "100vw",
            },
          })}
        >
          {homeSections.map(({ Render, props }) => {
            const forwarded = props.id === 'current-events' ? ({ events } as any ) : {};
            return (
              <Render
                key={props.id}
                {...props}
                {...forwarded}
                setActive={() => {
                  setActive(props.id);
                }}
                scrollContainerRef={scrollContainer}
              />
            );
          })}
          ;
          <Banner></Banner>
        </Box>
      </Box>
    </MantineProvider>
  );
}
