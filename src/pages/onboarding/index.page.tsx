import * as React from "react";

import {
  Box,
  Button,
  Chip,
  Container,
  Stack,
  SxProps,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { GetStaticProps } from "next";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BoltIcon from "@mui/icons-material/Bolt";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import EditIcon from "@mui/icons-material/Edit";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import GroupsIcon from "@mui/icons-material/Groups";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import PlaceIcon from "@mui/icons-material/Place";
import SchoolIcon from "@mui/icons-material/School";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";

import { Card } from "~/components/Card";
import Icon from "~/components/Icon";
import Link from "~/components/Link";
import Metadata from "~/components/Metadata";
import { REVALIDATE_INTERVAL } from "~/Env";
import { links as siteLinks } from "~/Strings";
import {
  CurrentEventsSchema,
  getBannerLinks,
  getCurrentEvents,
  NotionBannerLinksSchema,
} from "~/api/notion/schema";

import BackgroundImage from "~/assets/images/backgrounds/tac-2.svg";

export type OnboardingPageProps = {
  links: NotionBannerLinksSchema[];
  events: CurrentEventsSchema[];
};

export const getStaticProps: GetStaticProps<OnboardingPageProps> = async () => {
  const [links, events] = await Promise.all([
    getBannerLinks(),
    getCurrentEvents({ sortBy: "dateSort", direction: "ascending" }),
  ]);
  return {
    props: { links, events },
    revalidate: REVALIDATE_INTERVAL,
  };
};

/* -------------------------------------------------------------------------- */
/* content                                                                    */
/* -------------------------------------------------------------------------- */

type Basic = {
  icon: React.ReactNode;
  title: string;
};

// the three things new members worry about, answered in as few words as possible
const basics: Basic[] = [
  { icon: <SchoolIcon />, title: "No experience needed" },
  { icon: <Diversity3Icon />, title: "No strict attendance" },
  { icon: <EmojiEventsIcon />, title: "You'll finish a real game" },
];

type Way = {
  icon: React.ReactNode;
  title: string;
  timing: string;
  body: string;
  href: string;
  cta: string;
};

// what we run, loosely by how much of a commitment each one is
const ways: Way[] = [
  {
    icon: <Icon name="discord" color="inherit" />,
    title: "Join the Discord",
    timing: "Takes a minute",
    body: "Announcements, meet fellow game-jammers, and play games with us. If you love a game, chances are there's a board member that loves it too.",
    href: siteLinks.discord,
    cta: "Join the Discord",
  },
  {
    icon: <BoltIcon />,
    title: "Game jams",
    timing: "One weekend",
    body: "For the people who can't afford quarter-long projects. A low-time-investment gamedev experience where you cram a full game in 48 hours. Show up, get assigned to a team, and make something. Any and all skillsets are welcome.",
    href: "/events/game-jams",
    cta: "How game jams work",
  },
  {
    icon: <SchoolIcon />,
    title: "Workshops",
    timing: "An hour a week",
    body: "Weekly guided labs that take you from an empty project to a finished game over the quarter. Earn prizes by going to workshops consistently!",
    href: "/workshops",
    cta: "See the current series",
  },
  {
    icon: <MenuBookIcon />,
    title: "ENGR 1GD",
    timing: "A course, for credit",
    body: "Navigate your way through Boelter hall once a week to attend a class on game development. Covers similar content to workshops. Ends off with a capstone project where you form teams and make your own game!",
    href: siteLinks.e1,
    cta: "View the course listing",
  },
  {
    icon: <GroupsIcon />,
    title: "Students Run Studios",
    timing: "Winter & spring",
    body: "Two quarters in a small student-run studio team. A longer-paced, more in-depth version of game jams/workshops. Make a full game and show it off at Spring Showcase!",
    href: "/srs",
    cta: "Explore SRS",
  },
];

type SocialLink = {
  text: string;
  href: string;
  icon: React.ReactNode;
  category: string;
};

const socialLinks: SocialLink[] = [
  {
    text: "Discord",
    href: siteLinks.discord,
    icon: <Icon name="discord" color="inherit" />,
    category: "Start here",
  },
  {
    text: "Game Jam Discord",
    href: siteLinks.gameJamDiscord,
    icon: <Icon name="discord" color="inherit" />,
    category: "Game jams",
  },
  {
    text: "Instagram",
    href: siteLinks.insta,
    icon: <Icon name="insta" color="inherit" />,
    category: "Announcements",
  },
  {
    text: "Google Calendar",
    href: siteLinks.googleCalendar,
    icon: <Icon name="calendar" color="inherit" />,
    category: "Every event",
  },
  {
    text: "Itch.io",
    href: siteLinks.itch,
    icon: <VideogameAssetIcon />,
    category: "Games we made",
  },
  {
    text: "Email us",
    href: siteLinks.email,
    icon: <Icon name="email" color="inherit" />,
    category: "Anything else",
  },
];

/* -------------------------------------------------------------------------- */
/* building blocks                                                            */
/* -------------------------------------------------------------------------- */

type RevealProps = {
  children?: React.ReactNode;
  delay?: number;
  sx?: SxProps<Theme>;
};

function Reveal({ children, delay = 0, sx }: RevealProps) {
  const theme = useTheme();
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-64px" }}
      transition={{
        duration: theme.transitions.duration.complex / 1000,
        ease: "easeOut",
        delay,
      }}
      sx={sx}
    >
      {children}
    </Box>
  );
}

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  /** slot rendered between the title and the subtitle */
  afterTitle?: React.ReactNode;
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
};

function Section({
  id,
  eyebrow,
  title,
  subtitle,
  afterTitle,
  children,
  sx,
}: SectionProps) {
  return (
    <Container
      component="section"
      id={id}
      maxWidth="lg"
      sx={[{ py: { xs: 5, md: 8 } }, ...(sx instanceof Array ? sx : [sx])]}
    >
      {(eyebrow || title || subtitle || afterTitle) && (
        <Reveal sx={{ mb: children ? { xs: 3, md: 4 } : 0 }}>
          {eyebrow && (
            <Typography
              variant="overline"
              component="p"
              sx={(theme) => ({
                color: theme.palette.primary.main,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                mb: 1,
              })}
            >
              {eyebrow}
            </Typography>
          )}
          {title && (
            <Typography
              variant="h1"
              component="h2"
              fontWeight={700}
              sx={{ mb: subtitle || afterTitle ? 1.5 : 0 }}
            >
              {title}
            </Typography>
          )}
          {afterTitle && <Box sx={{ mb: subtitle ? 3 : 0 }}>{afterTitle}</Box>}
          {subtitle && (
            <Typography
              variant="body1"
              component="p"
              sx={{ color: "text.secondary" }}
            >
              {subtitle}
            </Typography>
          )}
        </Reveal>
      )}
      {children}
    </Container>
  );
}

type IconBadgeProps = {
  children?: React.ReactNode;
  size?: number;
  filled?: boolean;
};

function IconBadge({ children, size = 48, filled = false }: IconBadgeProps) {
  return (
    <Box
      aria-hidden
      sx={(theme) => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        width: size,
        height: size,
        borderRadius: `${theme.shape.borderRadius / 2}px`,
        color: filled
          ? theme.palette.primary.contrastText
          : theme.palette.primary.main,
        backgroundColor: filled
          ? theme.palette.primary.main
          : `color-mix(in srgb, transparent, ${theme.palette.primary.main} 12%)`,
        fontSize: `${size * 0.45}px`,
        fontWeight: 700,
        lineHeight: 1,
        "& > *": { fontSize: "1em" },
      })}
    >
      {children}
    </Box>
  );
}

function cardGrid(min: string) {
  return {
    display: "grid",
    gap: 2,
    gridTemplateColumns: `repeat(auto-fit, minmax(min(${min}, 100%), 1fr))`,
  } as const;
}

/* -------------------------------------------------------------------------- */
/* sections                                                                   */
/* -------------------------------------------------------------------------- */

function Hero() {
  const theme = useTheme();
  const medium = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Container
      component="section"
      maxWidth="lg"
      sx={{ pt: { xs: 6, md: 9 }, pb: { xs: 3, md: 4 } }}
    >
      <Reveal>
        <Typography
          variant="overline"
          component="p"
          sx={(theme) => ({
            color: theme.palette.primary.main,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            mb: 2,
          })}
        >
          New to ACM Studio?
        </Typography>
      </Reveal>

      <Reveal delay={0.08}>
        <Typography variant="display2" component="h1" sx={{ mb: 4 }}>
          Start here.
        </Typography>
      </Reveal>

      <Reveal delay={0.16}>
        <Stack
          direction={medium ? "column" : "row"}
          gap={1.5}
          alignItems={medium ? "stretch" : "center"}
        >
          <Button
            variant="contained"
            size={medium ? "small" : "medium"}
            href="#what-we-run"
            endIcon={<KeyboardArrowDownIcon />}
          >
            See what we run
          </Button>
          <Button
            variant="outlined"
            size={medium ? "small" : "medium"}
            href="#links"
            endIcon={<KeyboardArrowDownIcon />}
          >
            Skip to the links
          </Button>
        </Stack>
      </Reveal>
    </Container>
  );
}

function Basics() {
  return (
    <Section id="basics" sx={{ pt: { xs: 2, md: 2 }, pb: { xs: 3, md: 4 } }}>
      <Box sx={cardGrid("280px")}>
        {basics.map((basic, i) => (
          <Reveal key={basic.title} delay={i * 0.06}>
            <Stack direction="row" gap={2} alignItems="center">
              <IconBadge size={40}>{basic.icon}</IconBadge>
              <Typography variant="title2" component="h2" fontWeight={700}>
                {basic.title}
              </Typography>
            </Stack>
          </Reveal>
        ))}
      </Box>
    </Section>
  );
}

function WhatWeRun() {
  const theme = useTheme();
  const medium = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Section
      id="what-we-run"
      eyebrow="What we run"
      title="Ways to get started"
    >
      <Stack gap={2}>
        {ways.map((way, i) => (
          <Reveal key={way.title} delay={i * 0.05}>
            <Card
              component="article"
              opaque
              elevation={i === 0 ? 1 : 0}
              sx={{
                display: "flex",
                flexDirection: medium ? "column" : "row",
                alignItems: medium ? "stretch" : "flex-start",
                gap: medium ? 2 : 3,
                p: 3,
              }}
            >
              <IconBadge size={44}>{way.icon}</IconBadge>

              <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Stack
                  direction="row"
                  gap={1.5}
                  alignItems="center"
                  flexWrap="wrap"
                  sx={{ mb: 1 }}
                >
                  <Typography variant="title1" component="h3" fontWeight={700}>
                    {way.title}
                  </Typography>
                  <Chip
                    size="small"
                    label={way.timing}
                    variant="outlined"
                    sx={(theme) => ({
                      color: theme.palette.secondary.dark,
                      borderColor: `color-mix(in srgb, transparent, ${theme.palette.primary.main} 35%)`,
                    })}
                  />
                </Stack>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", maxWidth: "70ch" }}
                >
                  {way.body}
                </Typography>
              </Box>

              <Box sx={{ flexShrink: 0 }}>
                <Button
                  variant={i === 0 ? "contained" : "outlined"}
                  size="small"
                  href={way.href}
                  endIcon={<ArrowForwardIcon />}
                  sx={{ whiteSpace: "nowrap" }}
                >
                  {way.cta}
                </Button>
              </Box>
            </Card>
          </Reveal>
        ))}
      </Stack>
    </Section>
  );
}

// Locked in for fall; everything else still comes from the Notion database.
const confirmedFallEvents = [
  {
    title: "Enormous Activities Fair (EAF)",
    date: "September 22",
    time: "11am – 2pm",
    location: "Royce Quad & Wilson Plaza",
    body: "Come find our booth and say hi. Get an introduction to ACM studio.",
  },
  {
    title: "Fall General Meeting",
    date: "September 30",
    time: "6pm – 8pm",
    location: "Ackerman Grand Ballroom",
    body: "Our kickoff for the year. Learn how to get involved with ACM studio & about our initiatives.",
  },
];

type FallEventsProps = {
  events: CurrentEventsSchema[];
};

function FallEvents({ events }: FallEventsProps) {
  return (
    <Section
      id="fall"
      sx={{ pb: { xs: 5, md: 7 } }}
      eyebrow="Fall quarter"
      title="Where to find us first"
      afterTitle={
        <Box sx={cardGrid("280px")}>
          {confirmedFallEvents.map((event, i) => (
            <Reveal key={event.title} delay={i * 0.06} sx={{ display: "flex" }}>
              <Card
                component="article"
                opaque
                elevation={1}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  width: "100%",
                  p: 3,
                }}
              >
                <Typography variant="title2" component="h3" fontWeight={700}>
                  {event.title}
                </Typography>
                <Stack direction="row" gap={1} alignItems="center">
                  <CalendarMonthIcon
                    sx={(theme) => ({
                      fontSize: "1.1rem",
                      color: theme.palette.primary.main,
                    })}
                  />
                  <Typography variant="body2" fontWeight={600}>
                    {event.date} &middot; {event.time}
                  </Typography>
                </Stack>
                <Stack direction="row" gap={1} alignItems="center">
                  <PlaceIcon
                    sx={(theme) => ({
                      fontSize: "1.1rem",
                      color: theme.palette.primary.main,
                    })}
                  />
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary" }}
                  >
                    {event.location}
                  </Typography>
                </Stack>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {event.body}
                </Typography>
              </Card>
            </Reveal>
          ))}
        </Box>
      }
      subtitle={
        events.length > 0
          ? "What's coming up as the quarter kicks off. Unless one says otherwise, there's nothing to sign up for — just show up."
          : "The rest of the fall calendar isn't out yet. Check this website or our Instagram for updates."
      }
    >
      {events.length > 0 && (
        <Box sx={cardGrid("300px")}>
          {events.map((event, i) => (
            <Reveal key={i} delay={(i % 3) * 0.06} sx={{ display: "flex" }}>
              <Card
                component="article"
                opaque
                elevation={0}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  width: "100%",
                  p: 3,
                }}
              >
                <Typography variant="title2" component="h3" fontWeight={700}>
                  {event.title}
                </Typography>
                {event.date && (
                  <Stack direction="row" gap={1} alignItems="center">
                    <CalendarMonthIcon
                      sx={(theme) => ({
                        fontSize: "1.1rem",
                        color: theme.palette.primary.main,
                      })}
                    />
                    <Typography variant="body2" fontWeight={600}>
                      {event.date}
                    </Typography>
                  </Stack>
                )}
                {event.location && (
                  <Stack direction="row" gap={1} alignItems="center">
                    <PlaceIcon
                      sx={(theme) => ({
                        fontSize: "1.1rem",
                        color: theme.palette.primary.main,
                      })}
                    />
                    <Typography variant="body2">{event.location}</Typography>
                  </Stack>
                )}
                {event.description && (
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", flexGrow: 1, mt: 1 }}
                  >
                    {event.description}
                  </Typography>
                )}
                {event.linkURL && event.linkText && (
                  <Box sx={{ mt: 1 }}>
                    <Button
                      variant="contained"
                      size="small"
                      href={event.linkURL}
                      endIcon={<ArrowForwardIcon />}
                    >
                      {event.linkText}
                    </Button>
                  </Box>
                )}
              </Card>
            </Reveal>
          ))}
        </Box>
      )}
    </Section>
  );
}

type LinkRowProps = {
  text: string;
  href: string;
  icon: React.ReactNode;
  category?: string;
};

function LinkRow({ text, href, icon, category }: LinkRowProps) {
  return (
    <Card
      opaque
      elevation={0}
      sx={(theme) => ({
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        px: 3,
        py: 2,
        width: "100%",
        transition: theme.transitions.create(
          ["border-color", "box-shadow", "transform"],
          { duration: theme.transitions.duration.short },
        ),
        "@media (hover: hover)": {
          "&:hover": {
            borderColor: theme.palette.primary.main,
            transform: "translateY(-2px)",
            boxShadow: `0 6px 20px color-mix(in srgb, transparent, ${theme.palette.primary.main} 20%)`,
          },
          "&:hover .link-row__arrow": {
            color: theme.palette.primary.main,
            transform: "translate(2px, -2px)",
          },
        },
      })}
    >
      <Stack direction="row" gap={2} alignItems="center" sx={{ minWidth: 0 }}>
        <IconBadge size={40}>{icon}</IconBadge>
        <Box sx={{ minWidth: 0 }}>
          {/* the label is the real link; its ::after stretches over the whole
              card so the entire row is clickable without nesting interactives */}
          <Typography
            variant="title2"
            component={Link}
            href={href}
            underline="none"
            display="block"
            fontWeight={700}
            sx={{
              color: "inherit",
              "&::after": {
                content: '""',
                position: "absolute",
                inset: 0,
                borderRadius: "inherit",
              },
            }}
          >
            {text}
          </Typography>
          {category && (
            <Typography
              variant="caption"
              component="span"
              display="block"
              sx={(theme) => ({
                color: theme.palette.primary.main,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontWeight: 700,
              })}
            >
              {category}
            </Typography>
          )}
        </Box>
      </Stack>
      <NorthEastIcon
        className="link-row__arrow"
        sx={(theme) => ({
          fontSize: "1.1rem",
          flexShrink: 0,
          color: `color-mix(in srgb, transparent, ${theme.palette.primary.main} 45%)`,
          transition: theme.transitions.create(["color", "transform"], {
            duration: theme.transitions.duration.short,
          }),
        })}
      />
    </Card>
  );
}

type LinksSectionProps = {
  links: NotionBannerLinksSchema[];
};

function LinksSection({ links }: LinksSectionProps) {
  return (
    <Section
      id="links"
      sx={{ pt: { xs: 5, md: 7 } }}
      eyebrow="Everything in one place"
      title="Every link you need"
      subtitle="All the links (including signup forms) will be linked here, so make sure to bookmark this page."
    >
      <Stack gap={{ xs: 4, md: 5 }}>
        {links.length > 0 && (
          <Box>
            <Reveal>
              <Typography
                variant="title1"
                component="h3"
                fontWeight={700}
                sx={{ mb: 2 }}
              >
                Sign ups &amp; forms
              </Typography>
            </Reveal>
            <Box sx={cardGrid("320px")}>
              {links.map((link, i) => (
                <Reveal key={i} delay={(i % 2) * 0.06} sx={{ display: "flex" }}>
                  <LinkRow
                    text={link.text}
                    href={link.url}
                    icon={<EditIcon />}
                    category="Sign up"
                  />
                </Reveal>
              ))}
            </Box>
          </Box>
        )}

        <Box>
          <Reveal>
            <Typography
              variant="title1"
              component="h3"
              fontWeight={700}
              sx={{ mb: 2 }}
            >
              Find us online
            </Typography>
          </Reveal>
          <Box sx={cardGrid("320px")}>
            {socialLinks.map((link, i) => (
              <Reveal
                key={link.text}
                delay={(i % 2) * 0.06}
                sx={{ display: "flex" }}
              >
                <LinkRow
                  text={link.text}
                  href={link.href}
                  icon={link.icon}
                  category={link.category}
                />
              </Reveal>
            ))}
          </Box>
        </Box>

        <Reveal>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", textAlign: "center", pt: 2 }}
          >
            Still not sure where to start? Chat a bit in the Discord and introduce yourself. Most of us don't bite.
          </Typography>
        </Reveal>
      </Stack>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */
/* page                                                                       */
/* -------------------------------------------------------------------------- */

export default function OnboardingPage({ links, events }: OnboardingPageProps) {
  return (
    <>
      <Metadata
        title="Start Here"
        description="New to ACM Studio? Here's what to show up to first, in what order, and every link you need to join in."
      />

      <Box
        sx={{
          position: "relative",
          width: "100%",
          overflowX: "clip",
          scrollBehavior: "smooth",
        }}
      >
        {/*
          One continuous backdrop for the whole page, so the sections bleed into
          each other instead of stacking as separately-framed bands. The links
          at the bottom read as the end of the same page, not as a footer.
        */}
        <Box
          aria-hidden
          sx={(theme) => ({
            position: "absolute",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
            backgroundImage: [
              `radial-gradient(60rem 40rem at 88% -8%, color-mix(in srgb, transparent, ${theme.palette.secondary.light} 30%), transparent 70%)`,
              `radial-gradient(50rem 35rem at -12% 24%, color-mix(in srgb, transparent, ${theme.palette.primary.main} 14%), transparent 70%)`,
              `radial-gradient(55rem 40rem at 108% 62%, color-mix(in srgb, transparent, ${theme.palette.primary.main} 12%), transparent 70%)`,
              `radial-gradient(60rem 45rem at 2% 100%, color-mix(in srgb, transparent, ${theme.palette.secondary.light} 26%), transparent 70%)`,
            ].join(","),
          })}
        />
        <Container
          aria-hidden
          maxWidth="lg"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
            pointerEvents: "none",
            display: { xs: "none", lg: "block" },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "4dvh",
              right: (theme) => theme.spacing(4),
              width: "280px",
              aspectRatio: "1 / 1",
              opacity: 0.12,
              backgroundImage: `url("${BackgroundImage.src}")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              backgroundPosition: "top right",
            }}
          />
        </Container>

        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Hero />
          <Basics />
          <WhatWeRun />
          <FallEvents events={events} />
          <LinksSection links={links} />
        </Box>
      </Box>
    </>
  );
}
