import * as React from "react";

import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";

import List from "@mui/material/List";
import Backdrop from "@mui/material/Backdrop";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import MuiListItemIcon from "@mui/material/ListItemIcon";
import {
  Collapse,
  SwipeableDrawer,
  Theme,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import NextLink from "next/link";
import Image from "next/image";

import LogoIcon from "~/assets/images/icons/logo.svg";
import MenuIcon from "~/assets/images/icons/menu.svg";
import DiscordIcon from "~/assets/images/icons/dev/DiscordLogo.svg";
import FacebookIcon from "~/assets/images/icons/dev/facebook.svg";
import InstagramIcon from "~/assets/images/icons/dev/instagram.svg";
import { useRouter } from "next/router";
import matchPath from "~/util/matchPath";
import IsaxIcon from "./IsaxIcon";
import IconButton from "./IconButton";
import Link from "./Link";

const navBarContents: NavBarContents[] = [
  {
    icon: "isax-home5",
    text: "Home",
    href: "/",
    hrefIsEnd: true,
  },
  {
    icon: "isax-info-circle5",
    text: "About",
    href: "/about",
  },
  {
    icon: "isax-book5",
    text: "Blog",
    href: "/blog",
  },
  {
    icon: "isax-calendar5",
    text: "Events",
    subitems: [
      {
        text: "SRS",
        href: "/students-run-studios",
      },
      {
        text: "Workshops",
        href: "/workshops",
      },
      {
        text: "Calendar",
        href: "/events",
      }
    ]
  },
  {
    icon: "isax-game5",
    text: "Games",
    subitems: [
      {
        text: "Connections",
        href: "/games/connections",
      },
      {
        text: "Crosswords",
        href: "/games/crosswords",
      },
    ],
  }
];


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

type DrawerListItemProps = {
  content: NavBarContents,
  active?: boolean,
  onMouseEnter?: () => void,
}

function DrawerListItem(props: DrawerListItemProps){
  const {
    content,
    active = false,
  } = props;
  const [open, setOpen] = React.useState(false);

  return <>
    <ListItem disableGutters disablePadding>
      <ListItemButton
        onClick={() => setOpen(!open)}
        onMouseEnter={() => { setOpen(true); props.onMouseEnter?.() }}
        onMouseLeave={() => setOpen(false)}
        sx={{
          pl: 1,
        }}
        {...("href" in content && { component: Link, href: content.href })}
      >
        <ListItemIcon>
          <IsaxIcon
            name={content.icon}
            sx={{
              padding: 0.25,
              fontSize: DRAWER_ICON_WIDTH_PX,
            }}
            color={active ? "primary" : "black"}
          />
        </ListItemIcon>
        <Typography variant="label">
          {content.text}
        </Typography>
      </ListItemButton>
    </ListItem>
    { "subitems" in content && (
      <List disablePadding
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <Collapse in={open}>
          {content.subitems.map((subitem, i) => (
            <ListItem
              key={i}
              disableGutters
              disablePadding
            >
              <ListItemButton
                component={Link}
                href={subitem.href}
              >
                <Typography variant="label"
                  fontSize="75%"
                  sx={theme => ({
                    pl: `calc(${DRAWER_ICON_WIDTH_PX} + ${theme.spacing(1.5)})`
                  })}
                >
                  {subitem.text}
                </Typography>
              </ListItemButton>
            </ListItem>
          ))}
        </Collapse>
      </List>
    )}
  </>
}

const ListItemIcon = styled(MuiListItemIcon)(({ theme }) => ({
  minWidth: "initial",
  marginRight: `calc(${theme.spacing(1)} + ${drawerPadding(theme)})`,
}));

export type FlatNavBarContents = {
  icon: typeof MenuIcon,
  text?: string,
  hrefIsEnd?: boolean,
  href: string,
}

export type NestedNavBarContents = {
  icon: typeof MenuIcon,
  text?: string,
  subitems: Omit<FlatNavBarContents, "icon">[],
}

export type NavBarContents = FlatNavBarContents | NestedNavBarContents;

export type NavBarSocials = {
  icon: string,
  text: string,
  href: string,
};

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

  const getCurrentNavBarIndex = () => (
    navBarContents.findIndex((contents) =>
      "href" in contents
        ? matchPath(router.asPath, contents.href, { end: contents.hrefIsEnd })
        : contents.subitems.some(subitem =>
            matchPath(router.asPath, subitem.href, { end: subitem.hrefIsEnd })
          ),
    ) ?? 0
  )

  // index of current page in the navbar
  const [currentPageButtonIndex, setCurrentPageButtonIndex] = React.useState<number>(
    getCurrentNavBarIndex()
  );

  // update current nav bar page on route change
  React.useEffect(() => {
    const newPageButtonIndex = getCurrentNavBarIndex();
    if (currentPageButtonIndex !== newPageButtonIndex)
      setCurrentPageButtonIndex(newPageButtonIndex);
  }, [router.asPath]);

  const onMouseEnterListItem = (i: number) => () => {
    setOpen(true);
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
        {navBarContents.map((contents, i) => (
          <DrawerListItem
            key={i}
            onMouseEnter={onMouseEnterListItem(i)}
            content={contents}
            active={currentPageButtonIndex === i}
          />
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
                component={Link}
                href={href}
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
    </>
  );
}
