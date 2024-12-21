import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { Card as CardBase } from "~/components/Card"
import React from "react";
import { links } from "~/Strings";
import BackgroundContainer from "~/components/BackgroundContainer";
import Icon from "~/components/Icon";
import IsaxIcon from "~/components/IsaxIcon";

import BackgroundImage from "~/assets/images/backgrounds/tac-2.svg";
import Metadata from "~/components/Metadata";

const Card = styled(CardBase)(({ theme }) => ({
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  zIndex: 2,
  paddingBottom: theme.spacing(4),
})) as typeof CardBase;

export default function GetInvoled() {
  const theme = useTheme();

  return (
    <BackgroundContainer
      background={
        <Container
          maxWidth="lg"
          sx={{
            width: "100%",
            height: "100%",
            display: "grid",
            gridTemplate: "1fr / 4fr 4fr",
            opacity: 0.2,
          }}
        >
          <img
            alt=""
            src={BackgroundImage.src}
            style={{
              gridColumnStart: 2,
              width: "100%",
              position: "relative",
              top: "-32px",
            }}
          ></img>
        </Container>
      }
      sx={{
        py: 4,
      }}
    >
      <Metadata title="Get Involved" />
      <Typography variant="display1" sx={{ mb: 4 }}>
        Get Involved
      </Typography>

      <Box
        sx={(theme) => ({
          display: "grid",
          gridTemplateRows: "1fr 1fr",
          gridTemplateColumns: "1fr 1fr",
          gap: 1,
          [theme.breakpoints.down("md")]: {
            gridTemplateColumns: "1fr",
            gridTemplateRows: "unset",
            gridAutoRows: "auto",
          },
        })}
      >
        <Card
          component="section"
          sx={(theme) => ({
            gridColumn: "1 / 3",
            [theme.breakpoints.down("md")]: {
              gridColumn: "unset",
            },
          })}
        >
          <Typography variant="h1">Events</Typography>
          <Typography variant="body1" sx={{ mb: 2, flexGrow: 1 }}>
            The best way to get involved with ACM Studio is to attend our
            events!
            <br />
          </Typography>
          <Stack
            direction="row"
            gap={1}
            justifyContent="center"
            sx={(theme) => ({
              [theme.breakpoints.down("sm")]: {
                flexDirection: "column",
                alignItems: "center",
              },
            })}
          >
            <Button
              variant="contained"
              href={links.googleCalendar}
              startIcon={<IsaxIcon color="inherit" name="isax-calendar5" />}
            >
              Google Calendar
            </Button>
            <Button
              variant="contained"
              href={links.insta}
              startIcon={<IsaxIcon color="inherit" name="isax-instagram5" />}
            >
              Instagram
            </Button>
          </Stack>
        </Card>

        <Card component="section">
          <Typography variant="h1">Communication</Typography>
          <Typography variant="body1" sx={{ mb: 2, flexGrow: 1 }}>
            Want to talk with others interested in game dev or catch up with
            announcements?
          </Typography>
          <Stack direction="row" gap={1} justifyContent="center">
            <Button
              variant="contained"
              href={links.discord}
              startIcon={<Icon name="discord" color="white" />}
            >
              Join our Discord
            </Button>
          </Stack>
        </Card>

        <Card component="section">
          <Typography variant="h1">Professional Inquiry</Typography>
          <Typography variant="body1" sx={{ mb: 2, flexGrow: 1 }}>
            Want to work with us to plan an event?
          </Typography>
          <Stack direction="row" gap={1} justifyContent="center">
            <Button
              variant="contained"
              href={links.email}
              startIcon={<Icon color="white" name="email" />}
            >
              Send us an email
            </Button>
          </Stack>
        </Card>
      </Box>
    </BackgroundContainer>
  );
}
