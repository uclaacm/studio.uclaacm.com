import { Box, Button, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useInView } from "framer-motion";
import React from "react";
import { HomeSectionProps } from "../../index.page";
import Image from "next/image";

import FiatLudumArt from "./fiatludum.png";

export default function FiatLudum(props: HomeSectionProps) {
  const [loaded, setLoaded] = React.useState(false);
  const { setActive, id } = props;
  const theme = useTheme();

  const isMd = useMediaQuery(theme.breakpoints.down("md"))

  const root = React.useRef<HTMLDivElement>(undefined);
  const inView = useInView(root, { margin: "-64px" });
  React.useEffect(() => {
    if (inView) {
      setActive();
    }
  }, [inView]);


  const canvasContainerRef = React.useRef<HTMLDivElement>(undefined);
  const [iframe, setIframe] = React.useState<HTMLIFrameElement>(undefined);

  const preloadContent = <Stack
    sx={{
      height: "100%",
      alignItems: "center",
      pt: 16,
      p: 4,
      gap: 2,
      mx: "auto",
      maxWidth: theme.breakpoints.values.lg,
    }}
  >
      <Stack
        sx={{
          marginBottom: 2
        }}
      >
        <Typography variant="h3" textAlign="center" fontWeight="bold" color={ theme.palette.primary.main }>
          Join the Fiat Ludum game jam!
        </Typography>
        <Typography variant="label" textAlign="center">
          April 11th-14th
        </Typography>
      </Stack>
    <Box sx={{
      display: "grid",
      grid: "1fr / 1fr",
      borderRadius: 1,
      overflow: "clip",
    }}>
      <Box component={Image} src={FiatLudumArt} alt="Fiat Ludum"
        sx={{
          height: "auto",
          maxWidth: "120vh",
          gridRow: "1 / 1",
          gridColumn: "1 / 1",
        }}
      />
    </Box>
    <Stack direction="row"
      sx={{
        marginTop: 3,
        gap: 3
      }}
    >
      <Button size={isMd ? "small" : "large"}
        href="https://docs.google.com/forms/d/e/1FAIpQLScp2rCYhtvw3d5jQb3knZU-Hir5gR6a_qRDRarjkQeuSiusBA/viewform"
        variant="contained"
        sx={{
          
        }}
      >
        Register
      </Button>
      <Button size={isMd ? "small" : "large"}
        href="https://uclaclubsports.com/news/2025/3/5/fiat-ludum-2025.aspx"
        variant="outlined"
      >
        Learn more
      </Button>
    </Stack>
  </Stack>


  return (
    <Box
      ref={canvasContainerRef}
      id={id}
      sx={{
        width: "100%",
        height: "100vh",
        scrollSnapAlign: "start",
        position: "relative",
        display: "flex",
        alignItems: "center"
      }}
    >
      {loaded || preloadContent}
      {loaded && <Box
        ref={setIframe}
        component="iframe"
        src={"/game-jam-winners/dbtb/index.html"}
        sx={{
          width: "100%",
          height: "100%",
        }}
      />}
    </Box>
  );
}