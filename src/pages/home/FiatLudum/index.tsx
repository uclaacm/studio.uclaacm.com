import {
  Box,
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useInView } from "framer-motion";
import React from "react";
import { HomeSectionProps } from "../../index.page";
import Image from "next/image";

import FiatLudumArt from "./fiatludum.png";

export default function FiatLudum(props: HomeSectionProps) {
  const { setActive, id } = props;
  const theme = useTheme();

  const isMd = useMediaQuery(theme.breakpoints.down("md"));

  const root = React.useRef<HTMLDivElement>(undefined);
  const inView = useInView(root, { margin: "-64px" });
  React.useEffect(() => {
    if (inView) {
      setActive();
    }
  }, [inView]);

  return (
    <Box
      id={id}
      ref={root}
      sx={{
        width: "100%",
        height: "100vh",
        scrollSnapAlign: "start",
        position: "relative",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Stack
        sx={{
          height: "100%",
          alignItems: "center",
          pt: 16,
          p: 4,
          gap: 3,
          mx: "auto",
          maxWidth: theme.breakpoints.values.lg,
        }}
      >
        <Stack
          sx={{
            mb: "auto",
          }}
        >
          <Typography
            variant="h3"
            textAlign="center"
            fontWeight="bold"
            color={theme.palette.primary.main}
          >
            Join the Fiat Ludum game jam!
          </Typography>
          <Typography variant="label" textAlign="center">
            April 11th-14th
          </Typography>
        </Stack>
          <Box
            component={Image}
            src={FiatLudumArt}
            alt="Fiat Ludum"
            sx={[
            {
              borderRadius: 1,
              height: "auto",
              width: "100%",
              maxWidth: "100vh",
              minWidth: 0,
            },
            isMd && {maxWidth: "115vh"}
          ]}
          />
        <Stack
          direction="row"
          sx={{
            mt: "auto",
            gap: 3,
          }}
        >
          <Button
            size={isMd ? "small" : "large"}
            href="https://docs.google.com/forms/d/e/1FAIpQLScp2rCYhtvw3d5jQb3knZU-Hir5gR6a_qRDRarjkQeuSiusBA/viewform"
            variant="contained"
            sx={{}}
          >
            Register
          </Button>
          <Button
            size={isMd ? "small" : "large"}
            href="https://uclaclubsports.com/news/2025/3/5/fiat-ludum-2025.aspx"
            variant="outlined"
          >
            Learn more
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
