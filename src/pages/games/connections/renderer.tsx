import seedrandom from "seedrandom";
import { Category, InternalGame } from "./games";
import React from "react";
import { shuffle } from "~/util/shuffle";
import { Alert, AlertColor, Button, Snackbar, Typography, useMediaQuery } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import formatDate from "~/util/formatDate";
import Metadata from "~/components/Metadata";
import Link from "~/components/Link";

export type ConnectionsRendererProps = {
	game: InternalGame
}

const difficultyColorMap = {
	1: "warning",
	2: "success",
	3: "info",
	4: "primary",
} as const;

const difficultyCharMap = {
	1: "\u{1f7e1}", // yellow circle
	2: "\u{1f7e2}", // green circle
	3: "\u{1f535}", // blue circle
	4: "\u{1f534}", // red circle
}

export default function ConnectionsRenderer(props: ConnectionsRendererProps){
	const {
		game,
	} = props;

	const sm = useMediaQuery((theme) => theme.breakpoints.down("sm"));
	const md = useMediaQuery((theme) => theme.breakpoints.down("md"));

	const localStorageKey = React.useMemo(() =>
		`acm-studio-connections-${game.date}`,
		[game]
	);

	const entryCategoryMap = React.useMemo(() => (
		Object.fromEntries(
			game.categories.flatMap((category) => category.entries.map((member) => [member, category]))
		)
	), [game]);

	const entries = React.useMemo(() =>
		Object.keys(entryCategoryMap),
		[entryCategoryMap]
	);

	const rng = seedrandom(`${game.date} ${game.name}`);
	const shuffledEntries = shuffle(entries, rng);


	const [remainingEntries, setRemainingEntries] = React.useState(
		shuffledEntries
	)

	const [solvedCategories, setSolvedCategories] = React.useState<Category[]>([]);
	const [selectedEntries, setSelectedEntries] = React.useState<string[]>([]);
	const [oneAwaySnackbarOpen, setOneAwaySnackbarOpen] = React.useState(false);
	const [copySnackbar, setCopySnackbar] = React.useState<{
		open: boolean,
		message?: string,
		severity?: AlertColor,
	}>({ open: false });

	const [nTries, setNTries] = React.useState(0);

	React.useEffect(() => {
		const stateString = localStorage.getItem(localStorageKey);
		if (stateString) {
			const state = JSON.parse(stateString);
			// validate the state string
			// this is necessary to prevent null references
			// since we later use find and assume the result exists

			// if the remaining entries dont exist in the game
			if (!state.remainingEntries.every((entry: string) => entries.includes(entry))) {
				localStorage.removeItem(localStorageKey);
				return;
			}
			for(const category of state.solvedCategories){
				const gameCategory = game.categories.find(c => c.name === category.name);
				// if the solved categories dont exist in the game
				if(!gameCategory){
					localStorage.removeItem(localStorageKey);
					return;
				}
				// if the entries in the solved categories dont exist in the game
				if(!category.entries.every(entry => gameCategory.entries.includes(entry))){
					localStorage.removeItem(localStorageKey);
					return;
				}
			}
			// if the history contains invalid entries
			if (!state.history.every((entries: string[]) => entries.every((entry: string) => entries.includes(entry)))) {
				localStorage.removeItem(localStorageKey);
				return;
			}

			// if the state string is valid, load it
			setRemainingEntries(state.remainingEntries);
			setSolvedCategories(state.solvedCategories);
			history.current = state.history;
			setNTries(state.history.length);
		}
	}, []);

	React.useEffect(() => {
		updateLocalStorage();
	}, [remainingEntries, solvedCategories])

	const updateLocalStorage = () => {
		localStorage.setItem(localStorageKey, JSON.stringify({
			remainingEntries,
			solvedCategories,
			history: history.current,
		}))
	}

	const history = React.useRef<string[][]>([])

	const shuffleEntries = () => {
		setRemainingEntries(x => shuffle(x))
	}

	const submitEntries = () => {
		const categories = selectedEntries.map(entry => entryCategoryMap[entry]);
		const uniqueCategories = new Set(categories);
		if (uniqueCategories.size === 1) {
			setSolvedCategories(x => [...x, categories[0]]);
			setRemainingEntries(x => x.filter(entry => !selectedEntries.includes(entry)));
		}
		else {
			if (uniqueCategories.size === 2) {
				if(categories.filter(c => c === categories[0]).length === 3){
					setOneAwaySnackbarOpen(true);
				}
			}
			setSelectedEntries([]);
		}
		history.current.push(selectedEntries.sort());
		setSelectedEntries([]);
		setNTries(x => x + 1);
	}

	const gameOver = React.useMemo(() => {
		return solvedCategories.length === game.categories.length;
	}, [solvedCategories])

	const copyToClipboard = () => {
		const text = history.current
			.map(entries => entries
				.map(entry => difficultyCharMap[entryCategoryMap[entry].difficulty])
				.join("")
			)
			.join("\n");

		navigator.clipboard.writeText(text)
			.then(() => setCopySnackbar({
				open: true,
				message: "Copied to clipboard!",
				severity: "success",
			}))
			.catch(() => setCopySnackbar({
				open: true,
				message: "Failed to copy to clipboard",
				severity: "error",
			}));
	}

	const resetBoard = () => {
		setRemainingEntries(shuffle(entries, rng));
		setSolvedCategories([]);
		setSelectedEntries([]);
		history.current = [];
		setNTries(0);

		localStorage.removeItem(localStorageKey);
	}

	return <Container
		maxWidth="lg"
		sx={{ py: 4 }}
	>
		<Metadata title={`Connections - ${game.name}`}
			description={`Solve the connections game ${game.name} by ${game.author}.`}
			author={game.author}
		/>
		<Snackbar
			open={oneAwaySnackbarOpen}
			onClose={() => setOneAwaySnackbarOpen(false)}
			autoHideDuration={5000}
			anchorOrigin={{ vertical: "top", horizontal: "center" }}
		>
			<Alert
				onClose={() => setOneAwaySnackbarOpen(false)}
				severity="info"
				variant="filled"
				sx={{ width: '100%' }}
			>
				1 Away!
			</Alert>
		</Snackbar>
		<Snackbar
			open={copySnackbar.open}
			onClose={() => setCopySnackbar({ ...copySnackbar, open: false })}
			autoHideDuration={5000}
		>
			<Alert
				onClose={() => setCopySnackbar({ ...copySnackbar, open: false })}
				severity={copySnackbar?.severity}
				variant="filled"
				sx={{ width: '100%' }}
			>
				{copySnackbar.message}
			</Alert>
		</Snackbar>
		<Stack
			sx={{
				flexDirection: "row",
				alignItems: "end",
				gap: 2,
				pb: 1,
			}}
		>
			<Typography variant="display2" component="h2" lineHeight={1}>
				Connections
			</Typography>
			<Link href="/games/connections">
				See all
			</Link>
		</Stack>
		<Typography variant="title1" component="h3">
			<em>{game.name}</em> by {game.author}
		</Typography>
		<Stack sx={{ flexDirection: "row" }}>
			<Typography variant="label" sx={{ flexGrow: 1 }}>
				{formatDate(game.date)}
			</Typography>
			<Typography variant="label">
				{nTries} tries
			</Typography>
		</Stack>
		<Box sx={{
			display: "grid",
			gridTemplate: "repeat(4, 1fr) / repeat(4, 1fr)",
			gap: 1,
			my: 2,
		}}>
			{solvedCategories.map(category =>
				<Stack key={category.name} sx={theme => ({
					gridColumn: "span 4",
					justifyContent: "center",
					textAlign: "center",
					alignItems: "center",
					backgroundColor: theme.palette[difficultyColorMap[category.difficulty]].main,
					color: theme.palette[difficultyColorMap[category.difficulty]].contrastText,
					borderRadius: `var(--mui-shape-borderRadius)`,
					py: 4,
					px: 2,
				})}>
					<Typography variant="h3" fontWeight="bold" component="p">{category.name}</Typography>
					<Typography variant="label">{category.entries.join(", ")}</Typography>
				</Stack>
			)}
			{remainingEntries.map((entry, i) => (
				<Button variant="contained" key={entry}
					color={selectedEntries.includes(entry) ? "primary" : "inherit"}
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						py: 4,
						px: 0,
						wordBreak: "break-word",
					}}
					onClick={() => {
						setSelectedEntries(x =>
							x.includes(entry)
								? x.filter(other => entry !== other)
								: x.length < 4 ? [...x, entry] : x
						)
					}}
				>
					<Typography variant={md ? "body2" : "body1"}
						sx={{
							...sm && { fontSize: "0.75%" }
						}}
					>{entry}</Typography>
				</Button>
			))}
		</Box>
		{ !gameOver &&
			<Stack sx={theme => ({
				gap: 1,
				flexDirection: "column-reverse",
				[theme.breakpoints.up("md")]: {
					flexDirection: "row",
					alignItems: "stretch",
				},
			})}>
				<Stack
					sx={theme => ({
						flexDirection: "row",
						gap: 1,
						flexGrow: 1,
						[theme.breakpoints.down("md")]: {
							"& > *": {
								flexGrow: 1,
							}
						},
					})}
				>
					<Button variant="contained" onClick={shuffleEntries}>Shuffle</Button>
					<Button variant="contained" onClick={() => setSelectedEntries([])}>Clear</Button>
				</Stack>
				<Button variant="contained"
					sx={{ flexGrow: 1, }}
					disabled={selectedEntries.length !== 4}
					onClick={submitEntries}
				>Submit</Button>
			</Stack>
		}
		{ gameOver &&
			<Stack sx={{ gap: 2 }}>
				<Box sx={{ textAlign: "center" }}>
					<Typography variant="h2" component="h3">Results</Typography>
					<Box>
						{history.current.map((entries, i) =>
							<Box key={i}>
								<Typography variant="label">{
									entries.map(entry => difficultyCharMap[
										entryCategoryMap[entry].difficulty
									]).join("")
								}</Typography>
							</Box>
						)}
					</Box>
				</Box>
				<Stack sx={{
					gap: 1,
					flexDirection: "row",
					"& > *": {
						flexGrow: 1,
						flexBasis: 0,
					}
				}}>
					<Button variant="outlined" onClick={resetBoard}>
						Reset
					</Button>
					<Button variant="contained" onClick={copyToClipboard}>
						Copy Results Clipboard
					</Button>
				</Stack>
			</Stack>
		}
	</Container>
}