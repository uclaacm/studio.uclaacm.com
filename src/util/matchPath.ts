export type MatchPathOptions = {
	end?: boolean,
}

export default function matchPath(path: string, match: string, opts: MatchPathOptions = {}){
	const {
		end = false
	} = opts;
	const anchorIndex = path.indexOf("#");
	return path.startsWith(match) && (!end || path.substring(0, anchorIndex < 0 ? undefined : anchorIndex).endsWith(match))
}
