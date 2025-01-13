import { GetStaticPaths, GetStaticProps } from "next";
import ConnectionsRenderer from "./renderer";
import { Game, games, InternalGame, internalGames } from "./games";
import formatDate from "~/util/formatDate";

export const getStaticPaths: GetStaticPaths<{ slug: string }> = (ctx) => {
	return {
		paths: [
			...internalGames
				.map((game) => ({
					params: {
						slug: formatDate(game.date, "url")
					}
				}))
		],
		fallback: false,
	}
}

export const getStaticProps: GetStaticProps<ConnectionsPageProps, { slug: string }> = (ctx) => {
	const game = internalGames.find((game) => (
		formatDate(game.date, "url") === ctx.params!.slug
	))!;
	return {
		props: {
			game,
		}
	}
}

type ConnectionsPageProps = {
	game: InternalGame
}

export default function ConnectionsPage(props: ConnectionsPageProps){
	const {
		game
	} = props;

	return <ConnectionsRenderer game={game} />
}