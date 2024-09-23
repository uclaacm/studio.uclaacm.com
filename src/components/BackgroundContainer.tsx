import * as React from "react";

import MUIContainer from "@mui/material/Container";
import Box from "@mui/material/Box";
import { SxProps, Theme } from "@mui/material/styles";

export type ContainerProps = {
  children?: React.ReactNode;
  background?: React.ReactNode;
  rootSx?: Exclude<SxProps<Theme>, ReadonlyArray<any>>;
  sx?: Exclude<SxProps<Theme>, ReadonlyArray<any>>;
};

export default function BackgroundContainer({
  children,
  background,
  rootSx,
  sx: containerSx,
}: ContainerProps) {
  return background ? (
    <Box
      sx={[
        {
          width: "100%",
          height: "100%",
          display: "grid",
          gridTemplate: "1fr / 1fr",
        },
        rootSx,
      ]}
    >
      <Box sx={{ gridArea: "1 / 1 / 1 / 1" }}>{background}</Box>
      <Box sx={{ gridArea: "1 / 1 / 1 / 1" }}>
        <MUIContainer maxWidth="lg" sx={[{ py: 4 }, containerSx]}>
          {children}
        </MUIContainer>
      </Box>
    </Box>
  ) : (
    <MUIContainer maxWidth="lg" sx={[{ py: 4 }, containerSx]}>
      {children}
    </MUIContainer>
  );
}
