import { Box, Container, Typography } from "@mui/material"
import EventHeader, { bodyOffset, headerTopPadding } from "../EventHeader"
import TryGameJams from "./TryGameJams"

export type GameJamsProps = {

}

export default function GameJams(props: GameJamsProps) {
	return <>
		<EventHeader>Game Jams</EventHeader>
		<TryGameJams/>
	</>
}