import * as React from "react";

import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

import Box from "@mui/material/Box"
import MuiDrawer from "@mui/material/Drawer"
import Typography from "@mui/material/Typography"

import List from '@mui/material/List';
import Backdrop from '@mui/material/Backdrop';
import ListItem, { ListItemProps } from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import MuiListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled, useTheme } from "@mui/material";

import { Axis, GamepadButtonPressedEvent, GamepadButtonRepeatEvent, GamepadInput, XBoxButton } from "~/util/gamepad";
import NextLink from "next/link";
import NavBarRadial from "~/components/NavBarRadial";
import Image, { StaticImageData } from "next/image";

import HomeIcon from "~/assets/images/icons/home.svg"
import MenuIcon from "~/assets/images/icons/menu.svg"
import InfoIcon from "~/assets/images/icons/info.svg"
import ControllerIcon from "~/assets/images/icons/controller.svg"
import { useInput } from "./Input";

const DRAWER_ICON_WIDTH = 36;
const DRAWER_ICON_WIDTH_PX = `${DRAWER_ICON_WIDTH}px`;
const drawerIconPadding = theme => theme.spacing(1)
const drawerWidthClosed = theme => `calc(2 * ${drawerIconPadding(theme)} + ${DRAWER_ICON_WIDTH_PX})`
const DRAWER_WIDTH_OPEN = "15rem";

// customize open behavior
const Drawer = styled(MuiDrawer, {shouldForwardProp: prop => prop !== "open"})(({theme, open}) => ({
	"&, & .MuiDrawer-paper": {
		width: open ? DRAWER_WIDTH_OPEN : drawerWidthClosed(theme),
		transition: theme.transitions.create("width", {
			duration: theme.transitions.duration.shortest,
			easing: theme.transitions.easing.easeOut
		})
	},
}))


const Selection = dynamic(() => import("~/components/NavBarSelection").then(mod => mod.Selection), { ssr: false });


type DrawerListItemProps = {
	children?: React.ReactNode,
	href?: string,
} & Omit<ListItemProps, "children">

const DrawerListItem = React.forwardRef<HTMLLIElement, DrawerListItemProps>(({children, href, ...rest}: DrawerListItemProps, ref) => (
	<ListItem disableGutters disablePadding ref={ref} {...rest}>
		<ListItemButton disableGutters disableRipple disableTouchRipple {...href ? {href, component: NextLink} : {}}>
			{children}
		</ListItemButton>
	</ListItem>
));

const ListItemIcon = styled(MuiListItemIcon)(({theme}) => ({
	minWidth: "initial",
	marginRight: theme.spacing(1),
}))


export type NavBarContents = {
	icon: typeof MenuIcon,
	text?: string,
	href?: string,
	hideInRadial?: boolean,
}

const navBarContents: NavBarContents[] = [
	{
		icon: MenuIcon,
		hideInRadial: true,
	},
	{
		icon: HomeIcon,
		text: "Home",
		href: "/",
	},
	{
		icon: InfoIcon,
		text: "About",
		href: "/about-us",
	},
]

export default function NavBar(){
	const [open, setOpen] = React.useState(true);
	const toggleOpen = (v: boolean) => () => setOpen(v);

	const refs = new Array(navBarContents.length).fill(0).map((v, i) => React.useRef<HTMLLIElement>(null));
	const [selectedRefIndex, setSelectedRefIndex] = React.useState<number>(0);
	const selectPreviousRef = () => setSelectedRefIndex(selectedRefIndex === 0 ? selectedRefIndex : (selectedRefIndex - 1) % refs.length);
	const selectNextRef = () => setSelectedRefIndex(selectedRefIndex === refs.length - 1 ? selectedRefIndex : (selectedRefIndex + 1) % refs.length);

	const input = useInput();

	React.useEffect(() => {
		if(input){
			hookInput();
			return () => {
				unHookInput();
			}
		}
	});

	function hookInput(){
		input.addEventListener("gamepadbuttonpressed", onButtonPressed);
		input.addEventListener("gamepadbuttonrepeat", onButtonPressed);
	}

	function unHookInput(){
		input.removeEventListener("gamepadbuttonpressed", onButtonPressed);
		input.removeEventListener("gamepadbuttonrepeat", onButtonPressed);
	}

	function onButtonPressed(e: GamepadButtonPressedEvent | GamepadButtonRepeatEvent) {
		if(e.button === XBoxButton.Select){
			setOpen(!open);
		}
		else if(e.button === XBoxButton.Down){
			if(open) selectNextRef();
		}
		else if(e.button === XBoxButton.Up){
			if(open) selectPreviousRef();
		}
		else if(e.button === XBoxButton.A){
			if(open){
				refs[selectedRefIndex].current?.querySelector("a")?.click();
			}
		}
	}

	const onMouseEnterListItem = (i: number) => () => {
		setOpen(true);
		setSelectedRefIndex(i);
	}

	const theme = useTheme();

	return (
		<>
			{/* This drawer is to act like the hitbox for the drawer for flexbox calculations, since the
			actual drawer is absolutely positioned */}
			<Drawer variant="permanent" open={false} sx={{zIndex: 0}}></Drawer>
			<Drawer
				variant="permanent"
				anchor="left"
				open={open}
				onClose={toggleOpen(false)}
				sx={{position: "absolute",}}
				onMouseLeave={toggleOpen(false)}
			>
				<List>
					{navBarContents.map(({icon, text, href}, i) => (
						<DrawerListItem key={i} onMouseEnter={onMouseEnterListItem(i)} ref={refs[i]} href={href}>
							<Box sx={theme => ({display: "flex", alignItems: "center", padding: `0 ${theme.spacing(1)}`})}>
								<ListItemIcon sx={{
									...text ? {} : {mr: 0},

								}}>
									<Image src={icon} alt={text} width={DRAWER_ICON_WIDTH} style={{padding: theme.spacing(0.25)}}/>
								</ListItemIcon>
								{text && (
									<Typography variant="h3" sx={theme => ({mr: theme.spacing(1)})}>
										{text}
									</Typography>
								)}
							</Box>
						</DrawerListItem>
					))}
				</List>
			</Drawer>
			<Selection selectionRef={refs[selectedRefIndex]}/>
			<Backdrop open={open}>
				<NavBarRadial offsetLeft={DRAWER_WIDTH_OPEN} contents={navBarContents} selected={selectedRefIndex} setSelected={setSelectedRefIndex}/>
			</Backdrop>
		</>
	)
}