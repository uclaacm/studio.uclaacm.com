import {
  Box,
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Carousel } from '@mantine/carousel'
import { useInView } from "framer-motion";
import React from "react";
import { HomeSectionProps } from "../../index.page";

import {
  getCurrentEvents,
  CurrentEventsSchema
} from "~/api/notion/schema";
import { Card } from "../../../components/Card";
import Image from "next/image";
import FallWelcomeArt from '../FallWelcome/fall-welcome.svg'
import FallWelcomePhoneArt from '../FallWelcome/fall-welcome-phone.svg'
import DiscordIcon from "~/assets/images/icons/dev/DiscordLogo-White.svg";
import ArrowIcon from "~/assets/images/arrow.svg";

type CurrentEventProps = {
  events: CurrentEventsSchema[],
};

function CurrentEventsCarousel({ events }: CurrentEventProps) {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Carousel
      withControls
      previousControlIcon={<Image src={ArrowIcon} alt="previous" width={24} height={24} style={{ opacity: '0.8' }} />}
      nextControlIcon={<Image src={ArrowIcon} alt="previous" width={24} height={24} style={{ opacity: '0.8', transform: 'rotate(180deg)' }} />}
      withIndicators
      emblaOptions={{ loop: true }}
      height={isMd ? '60dvh' : '50dvh'}
      slideGap='md'
      styles={{
        root: {
          margin: '0 auto',
          width: isMd? '80vw' : '60vw',
        },
        container: {
          display: 'flex',
          textAlign: 'center',
        },
        control: {
          border: 'none',
          boxShadow: 'none',
        },
        indicator: {
          backgroundColor: theme.palette.secondary.light,
          width: '3rem',
        },
        slide: {
          margin: 'auto',
          height: '100%',
          width: '75%',
        }
      }}
    >
      {events?.map((ev, i) => (
        <Carousel.Slide
          style={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Card 
            key={i}
            elevation={0}
            style={{
              alignItems: 'center',
              display: 'flex',
              height: '100%',
              justifyContent: 'center',
            }}
          >
            <Box
              style={{
                backgroundColor: 'white',
                borderRadius: '1rem',
                height: '99%',
                opacity: '0.8',
                position: 'absolute',
                width: '59.8vw',
                zIndex: -1,
              }}
            ></Box>
            <Stack gap={1}
              style={{
                margin: '0 2rem',
              }}
            >
              <Typography variant='h3' textAlign='center'>
                {ev.title}
              </Typography>
              <Typography variant='body1' textAlign='center'>
                {ev.date}
              </Typography>
              <Typography variant='body2' textAlign='center'>
                {ev.location}
              </Typography>
              <Typography variant={isMd? 'body2' : 'body1'} textAlign='center'>
                {ev.description}
              </Typography>
            </Stack>
          </Card>
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}

export default function CurrentEvents(props: HomeSectionProps & CurrentEventProps) {
  const { setActive, id, events } = props;
  const theme = useTheme();

  const isMd = useMediaQuery(theme.breakpoints.down("md"));

  const root = React.useRef<HTMLDivElement | null>(null);
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
        height: "100dvh",
        scrollSnapAlign: "start",
        position: "relative",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Stack
        sx={{
          display: 'flex',
          height: "100%",
          alignItems: "center",
          pt: 16,
          p: 4,
          gap: 3,
          mx: "auto",
          maxWidth: '90%',
        }}
      >
        <Box
          sx={{
              my: 'auto',
              height: isMd ? 'auto' : '100%',
          }}
        >
          <Image src={FallWelcomePhoneArt} alt='Welcome to ACM Studio'
            style={{
                display: isMd ? 'block' : 'none',
                height: '20dvh',
                marginBottom: '1rem',
                marginLeft: 'auto',
                marginRight: 'auto',
                width: '75vw',
            }}
          />
          <Box
            sx={[
            {
              alignItems: isMd ? 'none' : 'center',
              backgroundImage: isMd ? 'none' : `url("${FallWelcomeArt.src}")`,
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: isMd? '100%' : 'cover',
              border: isMd ? 'none' : `4px solid ${theme.palette.secondary.light}`,
              borderRadius: 1,
              display: 'flex',
              flexDirection: 'column',
              height: "100%",
              justifyContent: isMd ? 'center' : 'end',
              marginTop: isMd ? '-9dvh' : 0,
              paddingBottom: '2rem',
              width: "90vw",
            }
          ]}>
            <CurrentEventsCarousel events={events} />
            <Box
              style={{
                  alignItems: 'center',
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '1.5rem',
                  justifyContent: 'center',
                  marginTop: '2rem',
              }}
            >
              <Button
                  size={isMd ? "medium" : "large"}
                  href="https://discord.com/invite/bBk2Mcw"
                  variant="contained"
                  sx={{
                      height: isMd ? '4rem' : 'auto',
                      width: isMd ? '18rem' : 'auto',
                  }}
              >
                  <Image src={DiscordIcon} alt='Discord link'
                      style={{
                          marginRight: '0.5rem',
                      }}
                  ></Image> {isMd ? 'Discord' : 'Find us on Discord'}
              </Button>
              <Button
                  size={isMd ? "medium" : "large"}
                  href="https://acmstudio.carrd.co/?fbclid=PAZXh0bgNhZW0CMTEAAafjlegVdROgda4BRfDG9C76KgkzB4kgIZeH9jwAoZGqqow2x4f_S6NUbjWk6Q_aem_5vAwl4F_rOmAb3RDNZQVzA"
                  variant="outlined"
                  sx={{
                      height: isMd ? '4rem' : 'auto',
                      width: isMd ? '18rem' : 'auto',
                  }}
              >
                  Other links
              </Button>
            </Box>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}