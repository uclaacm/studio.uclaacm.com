import * as React from "react";

import Box from "@mui/material/Box";

import Title from "~/components/Title";
import HomeGame from "./home/Game";
import Logline from "./home/Logline";
import Mission from "./home/Mission";
import HomeNavigation from "./home/HomeNavigation";
import Workshops from "./home/Events/Workshops";
import GameJams from "./home/Events/GameJams";
import Socials from "./home/Events/Socials";
import SpeakerEvents from "./home/Events/SpeakerEvents";
import E1 from "./home/Events/E1";
import SRS from "./home/Events/SRS";

type HomeProps = {};

type CommonHomeSectionProps = {
  setActive: () => void,
  scrollContainerRef: React.MutableRefObject<HTMLElement>,
};

type UniqueHomeSectionProps = {
  anchor: string,
};

export type HomeSectionProps = CommonHomeSectionProps & UniqueHomeSectionProps;

export type HomeSection = {
  Render: React.ComponentType<HomeSectionProps>,
  title: string,
  longTitle?: string,
  props: UniqueHomeSectionProps,
};

export const homeEventSections: HomeSection[] = [
  { title: "Workshops", Render: Workshops, props: { anchor: "#workshops" }},
  { title: "Game Jams", Render: GameJams, props: { anchor: "#game-jams" }},
  { title: "Socials", Render: Socials, props: { anchor: "#socials" }},
  { title: "Speaker Events", Render: SpeakerEvents, props: { anchor: "#speaker-events" }},
  { title: "ENGR1GD", longTitle: "Game Dev Course (ENGR 1GD)", Render: E1, props: { anchor: "#engr1" }},
  { title: "SRS", longTitle: "Students Run Studios", Render: SRS, props: { anchor: "#srs" }},
];

export const homeSections: HomeSection[] = [
  { title: "Game Showcase", Render: HomeGame, props: { anchor: "#game-showcase" }},
  { title: "Logline", Render: Logline, props: { anchor: "#logline" }},
  { title: "Mission", Render: Mission, props: { anchor: "#mission" }},
  ...homeEventSections
]

export default function Home({}: HomeProps){
  const scrollContainer = React.useRef<HTMLElement>();

  const [activeSection, setActive] = React.useState("#game-showcase");

  return <Box position="relative">
    <Title/>
      <HomeNavigation active={activeSection}/>
      <Box ref={scrollContainer}
      sx={theme => ({
        width: "100%",
        height: "100dvh",
        overflowY: "auto",
        scrollSnapType: "y mandatory",
        scrollBehavior: "smooth",
        scrollSnapStop: "always",
        [theme.breakpoints.down('md')]: {
          width: "100vw",
        }
      })}
    >
        {homeSections.map(({ Render, props }) => (
          <Render
            key={props.anchor}
            {...props}
            setActive={() => {setActive(props.anchor)}}
            scrollContainerRef={scrollContainer}
          />
        ))};
      </Box>
    </Box>
}
