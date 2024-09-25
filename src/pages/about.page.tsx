import * as React from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MUIContainer from "@mui/material/Container";
import BackgroundContainer from "~/components/BackgroundContainer";

import BackgroundImage from "~/assets/images/backgrounds/ps5.svg";

import Logo from "~/assets/images/logo.png";

import { Card, Chip, styled, useMediaQuery, useTheme } from "@mui/material";
import { getIconFromType } from "~/util/getIconFromType";
import Link from "~/components/Link";
import IconButton from "~/components/IconButton";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";

import { objectGroupBy } from "~/util/polyfills";
import {
  getOfficers,
  getOfficerSocialLinks,
  NotionOfficerSchema,
  NotionSocialLinksSchema,
} from "~/api/notion/schema";
import Metadata from "~/components/Metadata";

type OfficerWithSocialLinks = NotionOfficerSchema & {
  links?: NotionSocialLinksSchema[];
};

export async function getServerSideProps(
  ctx: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<AboutProps>> {
  const socialLinks = await getOfficerSocialLinks();
  const officers = (await getOfficers()).map(
    (officer): OfficerWithSocialLinks => ({
      ...officer,
      links: socialLinks.filter((v) => v.officer === officer.id),
    }),
  );

  const { current, alumni } = objectGroupBy(officers, ({ boardStatus }) =>
    boardStatus === "Alumni"
      ? "alumni"
      : boardStatus === "Current"
        ? "current"
        : undefined,
  );

  const { presidents, chairs, other } = objectGroupBy(
    current,
    ({ category }) =>
      category === "President"
        ? "presidents"
        : category === "Chair"
          ? "chairs"
          : "other",
  );

  current.sort((a, b) => (a.category === "President" ? -1 : 1));

  return {
    props: {
      officers: {
        alumni,
        current: {
          presidents,
          chairs,
          other,
        },
      },
    },
  };
}

type OfficerProps = {
  officer: OfficerWithSocialLinks;
};

function Officer({ officer }: OfficerProps) {
  const { name, selfIntro, image, links, title } = officer;
  return (
    <Card
      sx={(theme) => ({
        display: "grid",
        gridTemplateColumns: "1fr 2fr",
        gridTemplateRows: "1fr",
        gap: 2,
        width: "100%",
        [theme.breakpoints.down("md")]: {
          display: "block",
        },
      })}
    >
      <Box
        sx={(theme) => ({
          [theme.breakpoints.down("md")]: {
            display: "none",
          },
        })}
      >
        <Box
          component="img"
          src={image}
          sx={(theme) => ({
            aspectRatio: 1,
            objectFit: "cover",
            maxWidth: "100%",
            display: "block",
            borderRadius: 1,
          })}
        ></Box>
      </Box>
      <Stack
        spacing={2}
        sx={(theme) => ({
          py: 2,
          [theme.breakpoints.down("md")]: {
            pt: 0,
          },
        })}
      >
        <Box
          sx={(theme) => ({
            [theme.breakpoints.up("md")]: {
              display: "none",
            },
          })}
        >
          <Box
            component="img"
            src={image}
            sx={(theme) => ({
              aspectRatio: 1,
              objectFit: "cover",
              maxWidth: "100%",
              borderRadius: 1,
            })}
          />
        </Box>
        <Stack
          flexGrow={0}
          gap={1}
          sx={(theme) => ({
            [theme.breakpoints.down("md")]: {
              px: 2,
            },
          })}
        >
          <Typography variant="h3">{name}</Typography>
          {title && (
            <Box>
              <Chip color="primary" variant="filled" label={title} />
            </Box>
          )}
          <Stack direction="row" gap={1} flexWrap="wrap" mb={1}>
            {officer.roles?.map((role) => (
              <Chip key={role} size="small" variant="outlined" label={role} />
            ))}
          </Stack>
          <Typography variant="body1">{selfIntro}</Typography>
        </Stack>
        <Stack
          direction="row"
          spacing={1}
          sx={(theme) => ({
            [theme.breakpoints.down("md")]: {
              px: 2,
            },
          })}
        >
          {links?.map(({ social, url }, i) => {
            const icon = getIconFromType(social);
            if (icon === null) {
              return (
                <Button
                  variant="outlined"
                  size="small"
                  component={Link}
                  href={url}
                  target="_blank"
                  key={i}
                >
                  {social}
                </Button>
              );
            } else {
              return (
                <IconButton component={Link} href={url} target="_blank" key={i}>
                  {icon}
                </IconButton>
              );
            }
          })}
        </Stack>
      </Stack>
    </Card>
  );
}

type AboutProps = {
  officers: {
    current: {
      presidents: OfficerWithSocialLinks[];
      chairs: OfficerWithSocialLinks[];
      other: OfficerWithSocialLinks[];
    };
    alumni: OfficerWithSocialLinks[];
  };
};

export default function About({ officers }: AboutProps) {
  const theme = useTheme();

  const medium = useMediaQuery(theme.breakpoints.down("md"));
  const buttonSize = medium ? "small" : "medium";

  const OfficersContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1),
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down("md")]: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gridAutoRows: "auto",
    },
    [theme.breakpoints.down("sm")]: {
      display: "grid",
      gridTemplateColumns: "1fr",
      gridAutoRows: "auto",
    },
  }));

  return (
    <BackgroundContainer
      background={
        <MUIContainer
          maxWidth="lg"
          sx={{
            width: "100%",
            height: "100%",
            display: "grid",
            gridTemplate: "1fr / 4fr 8fr",
          }}
        >
          <img
            alt=""
            src={BackgroundImage.src}
            style={{ gridColumnStart: 2, width: "100%" }}
          ></img>
        </MUIContainer>
      }
    >
      <Metadata title="About Us"/>
      <Typography mb={4} variant="display1" sx={{ lineHeight: 1 }}>
        About ACM Studio
      </Typography>
      <Box
        mb={4}
        sx={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: 2,
          [theme.breakpoints.down("md")]: {
            display: "block",
          },
        }}
      >
        <Stack gap={2} alignItems="start">
          <Typography variant="body1">
            Our mission is to teach skills revolving around video game
            development such as computer science, game design and art in order
            to help usher students into the game development industry.
          </Typography>
          <Button variant="contained" size={buttonSize} href="/get-involved">
            Get Involved
          </Button>
        </Stack>
        <Box
          component="img"
          src={Logo.src}
          alt="acm.studio Logo"
          sx={{
            [theme.breakpoints.down("md")]: {
              display: "none",
            },
          }}
        />
      </Box>
      <Box>
        <Typography variant="h1" color="primary.main" mb={2}>
          Meet the board
        </Typography>
        <OfficersContainer>
          {[
            ...officers.current.presidents,
            ...officers.current.chairs,
            ...officers.current.other,
          ].map((officer) => (
            <Officer key={officer.name} officer={officer} />
          ))}
        </OfficersContainer>
        <Typography variant="h2" color="primary.main" mb={2}>
          Meet the alumni
        </Typography>
        <OfficersContainer>
          {officers.alumni.map((officer) => (
            <Officer key={officer.name} officer={officer} />
          ))}
        </OfficersContainer>
      </Box>
    </BackgroundContainer>
  );
}
