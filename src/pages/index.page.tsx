import * as React from "react";

import { GetStaticPropsContext, GetStaticPropsResult } from "next";

import Box from "@mui/material/Box";

import { MantineProvider } from "@mantine/core";

import { REVALIDATE_INTERVAL } from "~/Env";
import {
  getCurrentEvents,
  CurrentEventsSchema,
  getHomepageSections,
  HomepageSectionsSchema
} from "~/api/notion/schema";


// DO NOT delete these; whether sections are displayed should be handled in the Notion database
import FiatLudum from "./home/FiatLudum";
import FallQuarter from "./home/FallQuarter";
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
import { getBannerLinks, NotionBannerLinksSchema } from '~/api/notion/schema';

type HomeProps = {
  events: CurrentEventsSchema[];
  sections: HomepageSectionsSchema[];
  links: NotionBannerLinksSchema[];
};

type CommonHomeSectionProps = {
  setActive: () => void;
  scrollContainerRef: React.RefObject<HTMLElement>;
};

type UniqueHomeSectionProps = {
  id: string;
};

export type HomeSectionProps = CommonHomeSectionProps &
  UniqueHomeSectionProps &
  { sections?: HomeSection[]; };

export async function getStaticProps(): Promise<GetStaticPropsResult<HomeProps>> {
  const events = await getCurrentEvents({ sortBy: 'dateSort', direction: 'ascending' });
  const sections = await getHomepageSections();
  const bannerLinks = await getBannerLinks();
  return {
    props: { events, sections, links: bannerLinks},
    revalidate: REVALIDATE_INTERVAL,
  };
}

export type HomeSection = {
  Render: React.ComponentType<HomeSectionProps>;
  title: string;
  longTitle?: string;
  props: UniqueHomeSectionProps;
};

const renderers = {
  CurrentEvents,
  E1,
  FallQuarter,
  FiatLudum,
  GameJams,
  HomeGame,
  Logline,
  Mission,
  Socials,
  SpeakerEvents,
  SRS,
  Workshops,
}

type RendererName = keyof typeof renderers;

function isRendererName(value: string): value is RendererName {
  return value in renderers;
}

function ParseHomeSections(sections: HomepageSectionsSchema[]) {
  return (  // Filters out invalid render names and intentionally hidden sections
    sections?.filter(sec => isRendererName(sec.renderName) && sec.displayed).map((sec) => ({
      title: sec.title,
      Render: renderers[sec.renderName],
      props: { id: sec.sectionId },
    }))
  );
}

export default function Home({ events, links, sections }: HomeProps) {
  const scrollContainer = React.useRef<HTMLElement | null>(null);

  const homeSections: HomeSection[] = ParseHomeSections(sections);

  // derived from the list so reordering or commenting out a panel can't leave
  // this pointing at something that isn't first (or isn't rendered at all).
  // note: bare id, no "#" - that's what setActive passes and what
  // HomeNavigation compares against.
  const [activeSection, setActive] = React.useState(homeSections[0].props.id);

  return (
    <MantineProvider>
      <Box position="relative">
        <Metadata />
        <HomeNavigation active={activeSection} sections={homeSections} />
        <Box
          ref={scrollContainer}
          sx={{
            width: "100%",
            height: "100dvh",
            overflowY: "auto",
            scrollSnapType: "y mandatory",
            scrollBehavior: "smooth",
            scrollSnapStop: "always",
          }}
        >
          {homeSections.map(({ Render, props }) => {
            const forwarded = props.id === 'current-events' ? ({ events } as any ) : {};
            return (
              <Render
                key={props.id}
                {...props}
                sections={homeSections}
                {...forwarded}
                setActive={() => {
                  setActive(props.id);
                }}
                scrollContainerRef={scrollContainer}
              />
            );
          })}
          <Banner links={links}></Banner>
        </Box>
      </Box>
    </MantineProvider>
  );
}
