import * as React from "react";
import { Tutorial } from "cms/types";
import { client } from "cms/client"

import { GetServerSideProps } from "next";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Link from "~/components/Link";
import { Divider } from "@mui/material";
import path from "path";
import Title from "~/components/Title";
import { ArticleListProps } from "~/components/ArticleListFrontend";
import { Article, CollectionConnectionName, CollectionName } from "~/components/ArticleBackend";

export type GetArticleListParams = {
	take: number,
	cursor?: string,
	dir?: string,
	collection: CollectionName,
	subPage: string,
}

export type GetArticleListResult = {
	props: ArticleListProps
}

export async function getArticleList({ take, cursor, dir, collection, subPage }: GetArticleListParams): Promise<GetArticleListResult> {
	cursor ??= undefined;
	const forward = dir !== "backward";

	const collectionConnection: CollectionConnectionName = `${collection}Connection`;

	const connectionForward = (await client.queries[collectionConnection]({
		sort: "date",
		[forward ? "last" : "first"]: take,
		...cursor ? {
			[forward ? "before" : "after"]: cursor,
		} : {}
	})).data[collectionConnection];

	const connectionBackwards = (await client.queries[collectionConnection]({
		sort: "date",
		[forward ? "first" : "last"]: 1,
		...cursor ? {
			[forward ? "after" : "before"]: connectionForward.pageInfo.endCursor,
		} : {}
	})).data[collectionConnection];

	const articles = connectionForward.edges
		.map(edge => edge.node as Article)
		.map(article => {
			const { dir, name } = path.parse(article._sys.relativePath);
			return {
				...article,
				href: `/${subPage}/${path.join(dir, name)}`
			} as (Article & { href: string })
		})

	// i dont even know man
	// the nextCursor should be the last article of the current page
	// if we paginate forwards, this is the endCursor, otherwise the start cursor
	// (and vise versa for prevCursor)

	// however, we do not want to show an empty page, so we need to check if there are articles after the nextCursor
	// if we are going forwards, tina does this for us
	// otherwise, we just manually do another query and check if the number of articles is greater than 0
	return {
		props: {
			// if forwards -> dates from newest to oldest -> reverse the tutorials, otherwise dont
			articles: forward ? articles : articles.reverse(),
			// if we're going forwards, check next forward page (which is "previous" because we're going from newest to oldest)
			nextCursor: forward && connectionForward.pageInfo.hasPreviousPage
				? connectionForward.pageInfo.endCursor
				// if we're going backwards, we need to check if there is a page before the startCursor (which we did before with connectionBackwards)
				: !forward && connectionBackwards.totalCount !== 0
					? connectionForward.pageInfo.startCursor
					: null,
			// same logic as above but reversed
			prevCursor: cursor
				? forward && connectionBackwards.totalCount !== 0
					? connectionForward.pageInfo.startCursor
					: !forward && connectionForward.pageInfo.hasNextPage
						? connectionForward.pageInfo.endCursor
						: null
				: null
		}
	}
}