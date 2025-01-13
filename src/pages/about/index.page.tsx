import * as React from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MUIContainer from "@mui/material/Container";
import BackgroundContainer from "~/components/BackgroundContainer";
import OfficerMask from "./OfficerMask.svg";

import BackgroundImage from "~/assets/images/backgrounds/ps5.svg";

import Logo from "~/assets/images/logo.png";

import { Chip, styled, useMediaQuery, useTheme } from "@mui/material";
import { getIconFromType } from "~/util/getIconFromType";
import Link from "~/components/Link";
import IconButton from "~/components/IconButton";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";

import { objectGroupBy } from "~/util/polyfills";
import {
  getOfficers,
  getOfficerSocialLinks,
  NotionOfficerSchema,
  NotionSocialLinksSchema,
} from "~/api/notion/schema";
import Metadata from "~/components/Metadata";
import { REVALIDATE_INTERVAL } from "~/Env";
import { Card } from "~/components/Card";

type OfficerWithSocialLinks = NotionOfficerSchema & {
  links?: NotionSocialLinksSchema[];
};

export async function getStaticProps(
  ctx: GetStaticPropsContext,
): Promise<GetStaticPropsResult<AboutProps>> {
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

  const { presidents, chairs, interns, other } = objectGroupBy(
    current,
    ({ category }) =>
      category === "President"
      ? "presidents"
      : category === "Chair"
      ? "chairs"
      : category === "Intern"
      ? "interns"
      : "other",
  );

  alumni.sort((a, b) => b.gradYear - a.gradYear);
  current.sort((a, b) => (a.category === "President" ? -1 : 1));

  return {
    props: {
      officers: {
        alumni,
        current: {
          presidents,
          chairs,
          other,
          interns,
        },
      },
    },
    revalidate: REVALIDATE_INTERVAL,
  };
}

type OfficerProps = {
  officer: OfficerWithSocialLinks,
  showImage?: boolean,
  showBody?: boolean,
};

function Officer(props: OfficerProps) {
  const {
    officer,
    showImage = true,
    showBody = false
  } = props;

  const {
    name,
    selfIntro,
    image,
    links,
    title,
    roles,
    majors,
    minors,
    gradYear,
    favoriteGame,
  } = officer;

  const [open, setOpen] = React.useState(false);

  const cardContent = <>
    {showImage &&
      <Box
        component="img"
        src={image}
        sx={{
          aspectRatio: 1,
          objectFit: "cover",
          maxWidth: "100%",
          display: "block",
          borderRadius: 1,
          mb: 2,
          mask: `url(${OfficerMask.src}) no-repeat center / contain`,
        }}
      ></Box>
    }
    <Box
      sx={{
        mb: 1,
      }}
    >
      <Typography
        variant="label"
        lineHeight={1}
        component="h3"
        textAlign="center"
        fontWeight="inherit"
        sx={{
          mb: 1
        }}
      >
          {name}
      </Typography>
      {title && (
        <Typography
          variant="subtitle1"
          lineHeight={1}
          component="p"
          textAlign="center"
        >
            {title}
        </Typography>
      )}
    </Box>
    <Stack direction="row" gap={0.5} flexWrap="wrap" mb={1} justifyContent="center">
      {roles?.map((role) => (
        <Chip
          key={role}
          size="small"
          variant="outlined"
          label={role}
          sx={{ fontSize: "0.6rem"}}
        />
      ))}
    </Stack>
  </>;

  const cardBody = <Stack gap={2}>
    <Stack>
      { majors?.length > 0 && (
        <Typography variant="body2">
          Major: {majors.join(", ")}
        </Typography>
      )}
      { minors?.length > 0 && (
        <Typography variant="body2">
          Minors: {minors.join(", ")}
        </Typography>
      )}
      { gradYear && (
        <Typography variant="body2">
          Year: {gradYear}
        </Typography>
      )}
      { favoriteGame && (
        <Typography variant="body2">
          Favorite Game: {favoriteGame}
        </Typography>
      )}
    </Stack>
    { selfIntro && (
      <Typography variant="body2">
        {selfIntro}
      </Typography>
    )}
    {links?.length > 0 &&
      <Stack
        direction="row"
        spacing={1}
      >
        {links.map(({ social, url }, i) => {
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
              <IconButton
                component={Link}
                href={url}
                target="_blank"
                key={i}
                sx={(theme) => ({ fontSize: theme.typography.body1.fontSize })}
              >
                {icon}
              </IconButton>
            );
          }
        })}
      </Stack>
    }
  </Stack>;

  return <Card elevation={0}
      sx={{
        position: "relative",
        overflow: "visible"
      }}
    >
    { showBody ||
      <Card elevation={2}
        opaque
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={(e) => {
          setOpen(false);
          e.currentTarget.scroll({
            top: 0,
            behavior: "smooth",
          })
        }}
        sx={(theme) => ({
          position: "absolute",
          left: "-2px", right: "-2px",
          top: "-2px",
          bottom: "-2px",
          opacity: 0,
          zIndex: 100,
          transition: theme.transitions.create(["opacity", "bottom"], {
            duration: theme.transitions.duration.shortest,
          }),
          overflow: "scroll",
          ...open && {
            opacity: 1,
            bottom: "-96px",
            zIndex: 101,
          } || {},
          "@media (hover: none)": {
            display: "none",
          }
        })}
      >
        <Box>
          {cardContent}
        </Box>
        <Box>
          {cardBody}
        </Box>
      </Card>
    }
    {cardContent}
    <Box
      sx={{
        ...showBody
          ? {}
          : {
            "@media (hover: hover)": {
              display: "none",
            }
          }
      }}
    >
      {cardBody}
    </Box>
  </Card>
}

type AlumnusProps = {
  alumnus: OfficerWithSocialLinks;
};

function Alumnus(props: AlumnusProps){
  const { alumnus } = props;

  const {
    name,
    selfIntro,
    image,
    links,
    title,
    roles,
    majors,
    minors,
    gradYear,
    favoriteGame,
  } = alumnus;

  return <Box>
    <Typography variant="label" component="h3" fontWeight="inherit">
      {name} {title && ` | ${title}`} | {gradYear}
    </Typography>
  </Box>
}

type AboutProps = {
  officers: {
    current: {
      presidents: OfficerWithSocialLinks[],
      chairs: OfficerWithSocialLinks[],
      interns: OfficerWithSocialLinks[],
      other: OfficerWithSocialLinks[],
    };
    alumni: OfficerWithSocialLinks[],
  };
};

export default function About({ officers }: AboutProps) {
  const theme = useTheme();

  const medium = useMediaQuery(theme.breakpoints.down("md"));
  const buttonSize = medium ? "small" : "medium";

  const OfficersContainer = styled(Box)(({ theme }) => ({
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: theme.spacing(2),
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down("lg")]: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gridAutoRows: "auto",
    },
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
          <Box component="img"
            alt=""
            src={BackgroundImage.src}
            sx={{
              gridColumnStart: 2,
              width: "100%",
            }}
          />
        </MUIContainer>
      }
    >
      <Metadata title="About Us" />
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
        { officers.current.interns.length > 0 && <>
          <Typography variant="h2" color="primary.main" mb={2}>
            Meet the interns
          </Typography>
          <OfficersContainer>
            {[
              ...officers.current.interns,
            ].map((intern) => (
              <Officer key={intern.name} officer={intern} showBody />
            ))}
          </OfficersContainer>
        </>}
        <Typography variant="h2" color="primary.main" mb={2}>
          Alumni
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 0,
          }}
        >
          {officers.alumni.map((alumnus) => (
            <Alumnus
              key={alumnus.name}
              alumnus={alumnus}
            />
          ))}
        </Box>
      </Box>
    </BackgroundContainer>
  );
}
