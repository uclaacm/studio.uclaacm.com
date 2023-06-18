import * as React from "react";

import Link from "next/link";
import MuiLink, { LinkProps as MuiLinkProps } from "@mui/material/Link";

export default React.forwardRef((props: MuiLinkProps, ref: React.ForwardedRef<HTMLAnchorElement>) => {
	return <MuiLink component={Link} ref={ref} {...props}/>
})