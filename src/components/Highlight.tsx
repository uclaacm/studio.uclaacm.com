import { Typography } from "@mui/material";
import hljs from "highlight.js";

import javascript from "highlight.js/lib/languages/javascript";
import csharp from "highlight.js/lib/languages/csharp";

import React from "react";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("csharp", csharp);

export type HighlightProps = {
	block?: boolean,
	children?: React.ReactNode,
	language?: string,
}

export default function Highlight({ children, language, block }: HighlightProps){
	block ??= false;
	const codeRef = React.useRef<HTMLElement>();

	React.useEffect(() => {
		if(codeRef.current){
			hljs.highlightElement(
				codeRef.current
			)
		}
	}, [codeRef])

	const Container = block ?
		({ children }) => <Typography variant="body1" component="pre">{children}</Typography> :
		({ children }) => <>{children}</>


	return <Container>
		<Typography component="code" ref={codeRef}
			className={language ? `language-${language}` : ""}
			sx={{
				whiteSpace: "pre",
			}}
		>
			{children}
		</Typography>
	</Container>
}