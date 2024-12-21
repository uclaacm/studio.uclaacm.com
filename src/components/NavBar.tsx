import * as React from "react";

import dynamic from "next/dynamic";

import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";

import List from "@mui/material/List";
import Backdrop from "@mui/material/Backdrop";
import ListItem, { ListItemProps } from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import MuiListItemIcon from "@mui/material/ListItemIcon";
import {
  SwipeableDrawer,
  Theme,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import NextLink from "next/link";
import Image from "next/image";

import LogoIcon from "~/assets/images/icons/logo.svg";
import HomeIcon from "~/assets/images/icons/home.svg";
import MenuIcon from "~/assets/images/icons/menu.svg";
import InfoIcon from "~/assets/images/icons/info.svg";
import DiscordIcon from "~/assets/images/icons/dev/DiscordLogo.svg";
import FacebookIcon from "~/assets/images/icons/dev/facebook.svg";
import InstagramIcon from "~/assets/images/icons/dev/instagram.svg";
import ControllerIcon from "~/assets/images/icons/controller.svg";
import BookIcon from "~/assets/images/icons/archive-book.svg";
import CalendarIcon from "~/assets/images/icons/calendar.svg";
import { useRouter } from "next/router";
import matchPath from "~/util/matchPath";
import IsaxIcon from "./IsaxIcon";
import IconButton from "./IconButton";

const DRAWER_ICON_WIDTH = 36;
const DRAWER_ICON_WIDTH_PX = `${DRAWER_ICON_WIDTH}px`;
const drawerIconPadding = (theme: Theme) => theme.spacing(1);
const drawerPadding = (theme: Theme) => theme.spacing(1);
const drawerWidthClosed = (theme: Theme) =>
  `calc(2 * ${drawerPadding(theme)} + 2 * ${drawerIconPadding(theme)} + ${DRAWER_ICON_WIDTH_PX})`;
const DRAWER_WIDTH_OPEN = "18rem";

const drawerBorderRadius = (theme: Theme) => `${theme.shape.borderRadius}px`;

// customize open behavior
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "&, & .MuiDrawer-paper": {
    width: open ? DRAWER_WIDTH_OPEN : drawerWidthClosed(theme),
    transition: theme.transitions.create("width", {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeOut,
    }),
    overflowX: "clip",
    borderRadius: `0 ${drawerBorderRadius(theme)} ${drawerBorderRadius(theme)} 0`,
  },
}));

const Selection = dynamic(
  () => import("~/components/Selection").then((mod) => mod.Selection),
  { ssr: false },
);

type DrawerListItemProps = {
  children?: React.ReactNode;
  href?: string;
} & Omit<ListItemProps, "children">;

const DrawerListItem = React.forwardRef<HTMLLIElement, DrawerListItemProps>(
  ({ children, href, ...rest }: DrawerListItemProps, ref) => (
    <ListItem disableGutters disablePadding ref={ref} {...rest}>
      <ListItemButton
        disableGutters
        disableRipple
        disableTouchRipple
        {...(href ? { href, component: NextLink } : {})}
      >
        {children}
      </ListItemButton>
    </ListItem>
  ),
);

const ListItemIcon = styled(MuiListItemIcon)(({ theme }) => ({
  minWidth: "initial",
  marginRight: `calc(${theme.spacing(1)} + ${drawerPadding(theme)})`,
}));

export type NavBarContents = {
  icon: typeof MenuIcon;
  text?: string;
  href?: string;
  hrefIsEnd?: boolean;
  hideInRadial?: boolean;
};

export type NavBarSocials = {
  icon: typeof DiscordIcon;
  text: string;
  href: string;
};

const navBarContents: NavBarContents[] = [
  {
    icon: HomeIcon,
    text: "home",
    href: "/",
    hrefIsEnd: true,
  },
  {
    icon: InfoIcon,
    text: "about",
    href: "/about",
  },
  // {
  // 	icon: ControllerIcon,
  // 	text: "showcase",
  // 	href: "/showcase",
  // },
  {
    icon: BookIcon,
    text: "blog",
    href: "/blog",
  },
  {
    icon: CalendarIcon,
    text: "events",
    href: "/events",
  },
];

const navBarSocials: NavBarSocials[] = [
  {
    icon: InstagramIcon,
    href: "https://www.instagram.com/acmstudio.ucla/",
    text: "Instagram",
  },
  {
    icon: FacebookIcon,
    href: "https://www.facebook.com/groups/uclaacmstudio/",
    text: "Facebook",
  },
  {
    icon: DiscordIcon,
    href: "https://discord.com/invite/bBk2Mcw",
    text: "Discord",
  },
];

export default function NavBar() {
  const router = useRouter();

  const [open, setOpen] = React.useState(false);
  const toggleOpen = (v: boolean) => () => setOpen(v);

  // refs for each navbar entry + logo
  const buttonRefs = Array.from({ length: navBarContents.length }).map((_) =>
    React.useRef<HTMLLIElement>(null),
  );

  // index of current page in the navbar
  const [currentPageButtonIndex, setCurrentPageButtonIndex] =
    React.useState<number>(
      navBarContents.findIndex(({ href, hrefIsEnd }) =>
        matchPath(router.asPath, href, { end: hrefIsEnd }),
      ) ?? 0,
    );
  // update current nav bar page on route change
  React.useEffect(() => {
    const newPageButtonIndex =
      navBarContents.findIndex(({ href, hrefIsEnd }) =>
        matchPath(router.asPath, href, { end: hrefIsEnd }),
      ) ?? 0;
    if (currentPageButtonIndex !== newPageButtonIndex)
      setCurrentPageButtonIndex(newPageButtonIndex);
  }, [router.asPath]);

  // highlighted nav bar page
  const [selectedButtonIndex, setSelectedButtonIndex] = React.useState<number>(
    currentPageButtonIndex,
  );

  // reset selected page to the current page when close menu
  React.useEffect(() => {
    if (open === false && selectedButtonIndex !== currentPageButtonIndex)
      setSelectedButtonIndex(currentPageButtonIndex);
  }, [open]);

  const onMouseEnterListItem = (i: number) => () => {
    setOpen(true);
    setSelectedButtonIndex(i);
  };

  const theme = useTheme();

  const md = useMediaQuery(theme.breakpoints.down("md"));

  const drawerContents = (
    <>
      <List sx={(theme) => ({ p: drawerPadding(theme), flexGrow: 1 })}>
        <ListItem disableGutters disablePadding sx={{ mb: 2, mt: 2 }}>
          <Box sx={{ padding: `0 ${theme.spacing(1)}`, width: "100%" }}>
            <Image
              src={LogoIcon}
              alt="ACM Studio Logo"
              width={DRAWER_ICON_WIDTH * 2}
              style={{
                padding: theme.spacing(0.25),
                maxWidth: "33%",
                minWidth: DRAWER_ICON_WIDTH_PX,
                objectFit: "contain",
                objectPosition: "top 0 left 0",
              }}
            />
          </Box>
        </ListItem>
        {navBarContents.map(({ icon, text, href }, i) => (
          <DrawerListItem
            key={i}
            onMouseEnter={onMouseEnterListItem(i)}
            ref={buttonRefs[i]}
            href={href}
            {...(md
              ? {
                  onClick: () => setOpen(false),
                }
              : {})}
          >
            <Box
              sx={(theme) => ({
                display: "flex",
                alignItems: "center",
                padding: `0 ${theme.spacing(1)}`,
              })}
            >
              <ListItemIcon
                sx={{
                  ...(text ? {} : { mr: 0 }),
                }}
              >
                <Image
                  src={icon}
                  alt={text}
                  width={DRAWER_ICON_WIDTH}
                  style={{ padding: theme.spacing(0.25) }}
                />
              </ListItemIcon>
              {text && (
                <Typography
                  variant="display2"
                  sx={(theme) => ({
                    mr: theme.spacing(1),
                    fontSize: "2rem",
                  })}
                >
                  {text}
                </Typography>
              )}
            </Box>
          </DrawerListItem>
        ))}
      </List>
      <Box display="flex" flexDirection="row" sx={{ width: DRAWER_WIDTH_OPEN }}>
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minWidth: drawerWidthClosed(theme),
            transition: theme.transitions.create(["clip-path"], {
              duration: theme.transitions.duration.shortest,
              easing: theme.transitions.easing.easeOut,
            }),
            clipPath: `inset(${open ? "100%" : 0} 0 0 0)`,
          }}
        >
          {navBarSocials.map(({ icon, href, text }, i) => (
            <ListItem
              disableGutters
              disablePadding
              key={i}
              sx={{ width: DRAWER_ICON_WIDTH }}
            >
              <ListItemButton
                disableGutters
                disableRipple
                disableTouchRipple
                component={NextLink}
                href={href}
                target="_blank"
              >
                <ListItemIcon>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Image src={icon} alt={text} width={DRAWER_ICON_WIDTH} />
                  </Box>
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <List
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "space-around",
            pr: drawerWidthClosed(theme),
            transition: theme.transitions.create(["clip-path"], {
              duration: theme.transitions.duration.shortest,
              easing: theme.transitions.easing.easeOut,
            }),
            clipPath: `inset(0 ${open ? 0 : "100%"} 0 0)`,
          }}
        >
          {navBarSocials.map(({ icon, href, text }, i) => (
            <ListItem
              disableGutters
              disablePadding
              key={i}
              sx={{ width: DRAWER_ICON_WIDTH }}
            >
              <ListItemButton
                disableGutters
                disableRipple
                disableTouchRipple
                component={NextLink}
                href={href}
                target="_blank"
              >
                <ListItemIcon>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Image src={icon} alt={text} width={DRAWER_ICON_WIDTH} />
                  </Box>
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );

  return (
    <>
      {!md && (
        <>
          {/* This drawer is to act like the hitbox for the drawer for flexbox calculations, since the
				actual drawer is absolutely positioned */}
          <Drawer
            variant="permanent"
            open={false}
            sx={{ visibility: "hidden" }}
          />
          <Drawer
            variant="permanent"
            anchor="left"
            open={open}
            onClose={toggleOpen(false)}
            onMouseLeave={toggleOpen(false)}
            sx={{
              position: "absolute",
              display: "flex",
              flexDirection: "column",
            }}
            PaperProps={{
              sx: {
                backgroundColor: "white",
              },
            }}
          >
            {drawerContents}
          </Drawer>
        </>
      )}
      {md && (
        <>
          <SwipeableDrawer
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            open={open}
            PaperProps={{
              sx: {
                borderRadius: `0 ${drawerBorderRadius(theme)} ${drawerBorderRadius(theme)} 0`,
                backgroundColor: "white",
              }
            }}
          >
            {drawerContents}
          </SwipeableDrawer>
          <IconButton
            size="small"
            color="primary"
            variant="contained"
            sx={(theme) => ({
              position: "fixed",
              top: theme.spacing(1),
              left: theme.spacing(1),
              zIndex: theme.zIndex.drawer - 3,
            })}
            onClick={() => setOpen(true)}
          >
            <IsaxIcon name="isax-menu-1" sx={{ color: "inherit" }} />
          </IconButton>
        </>
      )}
      <Backdrop
        open={open}
        sx={(theme) => ({ zIndex: theme.zIndex.drawer - 1 })}
      />
      {!md && (
        <Selection
          selectionRef={buttonRefs[selectedButtonIndex]}
          containerSelector=".MuiBox-root"
          fixed
        />
      )}
    </>
  );
}
