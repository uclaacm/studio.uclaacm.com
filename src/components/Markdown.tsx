import * as React from "react"
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text"
import Link from "~/components/Link"

import Typography from "@mui/material/Typography"

export type MarkdownProps = {
	content: TinaMarkdownContent
}

export default function Markdown({ content }: MarkdownProps) {
	return <TinaMarkdown
		content={content}
		components={{
			a: Link,
			p: (props) => <Typography variant="body1" {...props}/>,
			h1: (props) => <Typography variant="h1" {...props}/>,
			h2: (props) => <Typography variant="h2" {...props}/>,
			h3: (props) => <Typography variant="h3" {...props}/>,
			h4: (props) => <Typography variant="h4" {...props}/>,
			h5: (props) => <Typography variant="h5" {...props}/>,
			h6: (props) => <Typography variant="h6" {...props}/>,
		}}
	/>
}