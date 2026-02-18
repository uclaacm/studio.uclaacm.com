import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";

import React from "react";
import Metadata from "~/components/Metadata";
import { GetStaticProps } from "next";
import { REVALIDATE_INTERVAL } from "~/Env";

import HomeGame from "~/pages/home/Game";

export type GameJamProps = {};

export const getStaticProps: GetStaticProps<GameJamProps> = async () => {
  return {
    props: {},
    revalidate: REVALIDATE_INTERVAL,
  };
};

export default function GameJamInfo(props: GameJamProps) {
  // 1. Create a ref for the scroll container (required by HomeGame)
  const containerRef = React.useRef<HTMLDivElement>(null);

  // 2. Mock the setActive function (required by HomeGame)
  const handleSetActive = () => {
    // This can stay empty for this specific page
  };

  return (
    <Container
      ref={containerRef} // Attach ref here
      maxWidth="md"
      sx={{
        py: 4,
        width: "100%",
      }}
    >
      <Metadata title="Game Jams" />
      
      <Stack gap={4}>
        <Box>
          <Typography component="h1" variant="display1">
            Game Jams
          </Typography>
          <Stack gap={1} mt={2}>
            <Typography>
              Studio hosts game jams!
            </Typography>
            <Typography>
              Check out some of our past game jam winners below, or enter the next game jam yourself!
            </Typography>
          </Stack>
          <Button
            variant="contained"
            href="https://itch.io/c/5885402/student-run-studios-2025"
            sx={{ alignSelf: "start", mt: 2 }}
          >
            Enter Game Jam
          </Button>
        </Box>

        <Stack gap={2}>
          <Typography component="h2" variant="display2">
            Game Jam Winners
          </Typography>
          
          <Box sx={{ mt: 2 }}>
            <Typography component="h3" color="primary" gutterBottom>
              Studio Jam 2025
            </Typography>
            
            {/* 3. Pass the required props to HomeGame */}
            <Box sx={{ 
              height: "80vh", // Adjusted height so it fits nicely on an info page
              position: "relative",
              borderRadius: 2,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.1)"
            }}>
              <HomeGame 
                id="studio-jam-2025"
                scrollContainerRef={containerRef}
                setActive={handleSetActive}
              />
            </Box>
          </Box>
        </Stack>
      </Stack>
    </Container>
  );
}
