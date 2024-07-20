import { Element, MDXProps } from "mdx/types";

declare module global {
	declare module "*.mdx" {
		export const frontmatter: { [k: string]: any };

		/**
		 * A function component which renders the MDX content using JSX.
		 *
		 * @param props This value is be available as the named variable `props` inside the MDX component.
		 * @returns A JSX element. The meaning of this may depend on the project configuration. I.e. it
		 * could be a React, Preact, or Vuex element.
		 */
		export default function MDXContent(props: MDXProps): Element;
	}
}

declare module '@mui/material/styles' {
	interface TypographyVariants {
		display1: React.CSSProperties;
		display2: React.CSSProperties;

		title1: React.CSSProperties;
		title2: React.CSSProperties;

		label: React.CSSProperties;
	}

	// allow configuration using `createTheme`
	interface TypographyVariantsOptions {
		display1?: React.CSSProperties;
		display2?: React.CSSProperties;

		title1?: React.CSSProperties;
		title2?: React.CSSProperties;

		label?: React.CSSProperties;
	}
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
	interface TypographyPropsVariantOverrides {
		display1: true;
		display2: true;

		h4: false;
		h5: false;
		h6: false;

		title1: true;
		title2: true;

		label: true;
	}
}