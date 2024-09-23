// Default layout for pages
// As of now, this is used by every page but the index page

import * as React from "react";

import Box from "@mui/material/Box";
import NavBar from "~/components/NavBar";

export type LayoutProps = {
  children: React.ReactElement;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <NavBar />
      <Box sx={{ flexGrow: 1 }}>{children}</Box>
    </Box>
  );
}
