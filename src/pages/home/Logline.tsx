import { KeyboardArrowDown } from "@mui/icons-material"
import { Box, Button, Stack, Typography } from "@mui/material"

import Wordmark from "~/assets/images/wordmark_and_logo.svg"

export type LoglineProps = {

}

export default function Logline({}: LoglineProps){
	return (
		<Box
			display="grid"
			gridTemplateColumns="1fr 1fr"
			sx={{
				width: "100%",
				height: "100vh",
				scrollSnapAlign: "start",
			}}
		>
			<Stack
				alignItems="center" justifyContent="center"
			>
				<Stack gap={16} sx={{
					width: "fit-content",
				}}>
					<Stack direction="row" sx={{ width: "100%" }}>
						<img src={Wordmark.src} style={{
							width: 0,
							flexGrow: 1,
						}}></img>
					</Stack>
					<Box>
						<Typography variant="display2">Game development<br/>for everybody</Typography>
						<Typography variant="title1" component="p">UCLA’s top game development club</Typography>
					</Box>
					<Stack direction="row" gap={3}>
						<Button size="large" variant="contained" endIcon={<KeyboardArrowDown/>}>
							Learn more
						</Button>
						<Button size="large" variant="outlined">
							Get involved
						</Button>
					</Stack>
				</Stack>
			</Stack>
			<Box flexGrow={1} sx={{
				backgroundColor: "cyan"
			}}>
			</Box>
		</Box>
	)
}