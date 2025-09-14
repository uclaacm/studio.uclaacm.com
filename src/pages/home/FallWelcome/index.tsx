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
import FallWelcomeArt from './fall-welcome.svg'
import DiscordIcon from "~/assets/images/icons/dev/DiscordLogo-White.svg";

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
          maxWidth: '90%',
        }}
      >
          <Box
            sx={[
            {
              alignItems: 'center',
              backgroundImage: `url("${FallWelcomeArt.src}")`,
              backgroundSize: 'cover',
              border: `4px solid ${theme.palette.secondary.light}`,
              borderRadius: 1,
              display: 'flex',
              height: "100%",
              justifyContent: 'center',
              width: "90vw",
            }
          ]}>
            <Box>
                <Typography variant='h1' fontWeight='bold' textAlign='center' color={theme.palette.primary.main}
                    style={{
                    }}
                >
                    Join us for our Fall General Meeting!
                </Typography>
                <Typography variant='h3' textAlign='center'>
                    on September 30th at 6PM, @ Ackerman Grand Ballroom
                </Typography>
                <Box
                    style={{
                        display: 'flex',
                        gap: '1.5rem',
                        justifyContent: 'center',
                        marginTop: '2rem',
                    }}
                >
                    <Button
                        size={isMd ? "small" : "large"}
                        href="https://discord.com/invite/bBk2Mcw"
                        variant="contained"
                    >
                        <Image src={DiscordIcon} alt='Discord link'
                            style={{
                                marginRight: '0.5rem',
                            }}
                        ></Image> Find us on Discord
                    </Button>
                    <Button
                        size={isMd ? "small" : "large"}
                        href="https://acmstudio.carrd.co/?fbclid=PAZXh0bgNhZW0CMTEAAafjlegVdROgda4BRfDG9C76KgkzB4kgIZeH9jwAoZGqqow2x4f_S6NUbjWk6Q_aem_5vAwl4F_rOmAb3RDNZQVzA"
                        variant="outlined"
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