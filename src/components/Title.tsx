// Allows you to specify the title only, instead of head with title

import * as React from "react";

import Head from "next/head";

export type TitleProps = {
  children?: string;
};

export default function Title({ children }: TitleProps) {
  return (
    <Head>
      <title>{
        // note: a template literal is required here because of a nextjs bug
        `${children ? `${children} | ` : ""}acm.studio`
      }</title>
    </Head>
  );
}
