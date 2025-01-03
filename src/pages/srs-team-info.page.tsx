import {
    Box,
    Button,
    Card as MuiCard,
    Container,
    Stack,
    Typography,
    styled,
    useTheme,
  } from "@mui/material";

  import React from "react";
  import { links } from "~/Strings";
  import BackgroundContainer from "~/components/BackgroundContainer";
  import Icon from "~/components/Icon";
  import IsaxIcon from "~/components/IsaxIcon";
  
  import BackgroundImage from "~/assets/images/backgrounds/tac-2.svg";
  import Metadata from "~/components/Metadata";

  const Card = styled(MuiCard)(({ theme }) => ({
    textAlign: "center",
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    zIndex: 2,
  })) as typeof MuiCard;
  
export default function SRSTeamInfo() {
  const theme = useTheme();
    return (
      <Button
        variant = "contained"
        href = "https://itch.io/c/4447548/students-run-studios-2024"
        >
        See the 2024 entries on itch.io!

      </Button>
      
    );
  }
  