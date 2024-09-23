// same as MUI's link component, but defaults to using Next's link component in the background so that browser side
// routing will still work with MUI links

import * as React from "react";

import NextLink, { LinkProps as NextLinkProps } from "next/link";

export type BasicLinkProps = {
  external?: boolean;
} & NextLinkProps;

export default React.forwardRef(function BasicLink(
  props: BasicLinkProps,
  ref: React.ForwardedRef<HTMLAnchorElement>,
) {
  const { external = props.href.toString().startsWith("http"), ...rest } =
    props;
  return (
    <NextLink
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      ref={ref}
      {...rest}
    />
  );
});
