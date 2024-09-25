import {
  Backdrop,
  Box,
  Button,
  Link,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import IsaxIcon from "~/components/IsaxIcon";
import { homeSections } from "../index.page";

type HomeNavigationEntryProps = {
  title: string;
  href: string;
  active?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  canHover?: boolean;
};

function HomeNavigationEntry(props: HomeNavigationEntryProps) {
  const { title, href, active = false, onClick, canHover = true } = props;

  const theme = useTheme();

  const opacity = active ? 1 : 0.4;
  const hoverOpacity = active ? 1 : canHover ? 0.8 : 0.4;
  const color = active ? theme.palette.primary.main : "black";

  return (
    <Link
      href={href}
      underline="none"
      sx={(theme) => ({
        minWidth: "12rem",
        opacity,
        color,
        ":hover": {
          opacity: hoverOpacity,
        },
        transition: theme.transitions.create(["color", "opacity"], {
          duration: theme.transitions.duration.shortest,
          easing: theme.transitions.easing.easeInOut,
        }),
      })}
      onClick={onClick}
    >
      <Stack direction="row" alignItems="center" gap={1}>
        <Box
          sx={{
            minWidth: "6px",
            minHeight: active ? "12px" : "6px",
            borderRadius: 99999,
            backgroundColor: color,
            transition: theme.transitions.create(
              ["background-color", "min-height"],
              {
                duration: theme.transitions.duration.shortest,
                easing: "linear",
              },
            ),
          }}
        />
        <Typography variant="subtitle2" lineHeight={1} mr={0.25}>
          <Typography
            variant="inherit"
            component="span"
            sx={(theme) => ({
              fontSize: active ? "125%" : "100%",
              transition: theme.transitions.create(["font-size"], {
                duration: theme.transitions.duration.shortest,
                easing: "linear",
              }),
            })}
          >
            {title}
          </Typography>
        </Typography>
      </Stack>
    </Link>
  );
}

export type HomeNavigationProps = {
  active: string;
};

export default function HomeNavigation(props: HomeNavigationProps) {
  const { active } = props;

  const [open, setOpen] = React.useState(false);
  const canHover = useMediaQuery("(hover:hover)");

  return (
    <>
      <Stack
        sx={(theme) => ({
          position: "absolute",
          left: theme.spacing(1),
          top: theme.spacing(canHover ? 1 : 6),
          bottom: theme.spacing(1),
          justifyContent: "center",
          alignItems: "center",
        })}
      >
        <Backdrop
          sx={(theme) => ({
            zIndex: theme.zIndex.drawer - 2,
          })}
          open={open}
          onClick={() => setOpen(false)}
        />
        <Stack
          sx={(theme) => ({
            px: 0.5,
            py: 0.25,
            backgroundColor: theme.palette.background.paper,
            borderRadius: "8px",
            maxWidth: open ? "12rem" : `calc(6px + ${theme.spacing(1)})`,
            overflow: "clip",
            ":hover": {
              maxWidth: "12rem",
              outlineColor: theme.palette.primary.main,
            },
            outline: "1px solid transparent",
            transition: theme.transitions.create(
              ["max-width", "outline-color"],
              {
                duration: theme.transitions.duration.short,
                easing: theme.transitions.easing.easeOut,
              },
            ),
            zIndex: theme.zIndex.drawer - 1,
          })}
        >
          {homeSections.map(({ title, props: { id } }) => (
            <HomeNavigationEntry
              key={title}
              active={id === active}
              title={title}
              href={`#${id}`}
              canHover={canHover}
              onClick={
                canHover
                  ? () => setOpen(false)
                  : (ev) => {
                      if (open) {
                        setOpen(false);
                      } else {
                        setOpen(true);
                        ev.preventDefault();
                      }
                    }
              }
            />
          ))}
        </Stack>
      </Stack>
    </>
  );
}
