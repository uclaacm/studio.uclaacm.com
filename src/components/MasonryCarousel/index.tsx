import { Box, BoxProps, Stack, useMediaQuery, useTheme } from "@mui/material";
import React, { useImperativeHandle } from "react";
import { useSize } from "~/util/useOnResize";
import MasonryCarouselRow from "./MasonryCarouselRow";
import { StaticImageData } from "next/image";

export type MasonryCarouselCellData = {
  src?: string | StaticImageData;
  href?: string;
  title?: React.ReactNode;
};

export type MasonryCarouselProps = {
  /**
   * The data for each cell in each row.
   */
  rows: MasonryCarouselCellData[][];
  /**
   * The gap between the cells and the cell padding
   */
  gap?: number;
  /**
   * How fast the rows move. Defaults to 0.5
   */
  speed?: number;
  /**
   * Width of a cell proportional to its parent.
   * For example, if this is 0.5 (default), the width of each cell will be 50%
   * the width of the parent
   */
  cellWidthProportion?: number;
} & BoxProps;

export default React.forwardRef<HTMLDivElement, MasonryCarouselProps>(
  function MasonryCarousel(props: MasonryCarouselProps, ref) {
    const {
      rows,
      speed,
      cellWidthProportion = 0.5,
      gap = 2,
      sx,
      ...boxProps
    } = props;

    const canHover = useMediaQuery("(hover:hover)");

    const containerRef = React.useRef<HTMLDivElement>(null);
    const containerSize = useSize(containerRef, false);
    const cellWidth = React.useMemo(
      () =>
        containerSize !== null
          ? containerSize.inlineSize * cellWidthProportion
          : null,
      // cellWidthProportion belongs here too: it flips when a `useMediaQuery`
      // breakpoint resolves after hydration, which usually happens without the
      // container ever changing size, and the memo would otherwise keep
      // serving a width computed for the other breakpoint.
      [containerSize, cellWidthProportion],
    );

    useImperativeHandle(ref, () => containerRef.current);

    return (
      <Stack
        ref={containerRef}
        gap={gap}
        p={gap}
        sx={[
          {
            minWidth: 0,
          },
          ...(sx instanceof Array ? sx : [sx]),
        ]}
      >
        {/*
          Must be > 0, not merely non-null: a 0 measurement still passes a null
          check but produces zero-width cells, i.e. a carousel that renders
          nothing. Waiting for a real width makes this deterministic.
        */}
        {cellWidth !== null &&
          cellWidth > 0 &&
          rows.map((cells, i) => (
            // Note: the key here forces a complete rerender
            // whenever the cellWidth changes
            // this is because it breaks when resizing
            <MasonryCarouselRow
              key={`${i}_${cellWidth}`}
              viewport={containerRef}
              cellWidth={cellWidth}
              gap={gap}
              cells={cells}
              left={i % 2 === 1}
              speed={speed}
              canHover={canHover}
              nVirtualizedCells={Math.ceil(1 / cellWidthProportion) + 2}
            />
          ))}
      </Stack>
    );
  },
);
