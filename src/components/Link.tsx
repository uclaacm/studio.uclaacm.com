// same as MUI's link component, but defaults to using Next's link component in the background so that browser side
// routing will still work with MUI links

import * as React from "react";

import NextLink from "next/link";
import MuiLink, { LinkProps as MuiLinkProps } from "@mui/material/Link";

export type LinkProps = {
  external?: boolean;
  dead?: boolean;
} & MuiLinkProps;

export default React.forwardRef(function Link(
  props: LinkProps,
  ref: React.ForwardedRef<HTMLAnchorElement>,
) {
  const {
    dead = false,
    external = props.href.startsWith("http"),
    ...rest
  } = props;
  return (
    <MuiLink
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      component={NextLink}
      ref={ref}
      {...rest}
      sx={[
        dead && {
          "&::after": {
            content: '"dead link"',
            backgroundColor: "magenta",
            color: "black",
            px: 1,
          },
        },
        ...(rest.sx instanceof Array ? rest.sx : [rest.sx]),
      ]}
    />
  );
});
