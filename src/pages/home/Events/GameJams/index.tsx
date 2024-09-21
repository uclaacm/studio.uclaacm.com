import { Box, Container, Typography } from "@mui/material"
import EventHeader, { bodyOffset, headerTopPadding } from "../EventHeader"
import TryGameJams from "./TryGameJams"
import StudioJams from "./StudioJams"
import { HomeSectionProps } from "~/pages/index.page"
import React from "react"
import { useInView } from "framer-motion"

export type GameJamsProps = {

} & HomeSectionProps;

export default function GameJams(props: GameJamsProps) {
	const { setActive } = props;
	const root = React.useRef<HTMLDivElement>();
  const inView = useInView(root, { margin: "-64px" });
	React.useEffect(() => {
		if(inView) {
			setActive("#game-jams");
		}
	}, [inView]);
	return <Box ref={root}>
		<Box>
			<EventHeader>Game Jams</EventHeader>
			<TryGameJams/>
		</Box>
		<StudioJams/>
	</Box>
}
