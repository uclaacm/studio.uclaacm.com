import { Box, BoxProps, Stack } from "@mui/material"
import React, { useImperativeHandle } from "react";
import { useSize } from "~/util/useOnResize";
import MasonryCarouselRow from "./MasonryCarouselRow";


export type MasonryCarouselCellData = {
	src?: string,
	href?: string,
	title?: React.ReactNode,
}

export type MasonryCarouselProps = {
	/**
	 * The data for each cell in each row.
	 */
	rows: MasonryCarouselCellData[][],
	/**
	 * The gap between the cells and the cell padding
	 */
	gap?: number,
	/**
	 * How fast the rows move. Defaults to 0.5
	 */
	speed?: number,
	/**
	 * Width of a cell proportional to its parent.
	 * For example, if this is 0.5 (default), the width of each cell will be 50%
	 * the width of the parent
	 */
	cellWidthProportion?: number,
} & BoxProps

export default React.forwardRef<HTMLDivElement, MasonryCarouselProps>(function MasonryCarousel(props: MasonryCarouselProps, ref){
	const {
		rows,
		speed,
		cellWidthProportion = 0.5,
		gap = 2,
		sx,
		...boxProps
	} = props;

	const containerRef = React.useRef<HTMLDivElement>(null);
	const containerSize = useSize(containerRef, false);
	const cellWidth = React.useMemo(() => containerSize !== null ? containerSize.inlineSize * cellWidthProportion : null, [containerSize]);

	useImperativeHandle(ref, () => containerRef.current);

	return <Stack
		ref={containerRef}
		gap={gap}
		p={gap}
		sx={[
			{
				minWidth: 0,
			},
			...sx instanceof Array ? sx : [sx]
		]}
	>
		{ cellWidth !== null && rows.map((cells, i) => (
			// Note: the key here forces a complete rerender
			// whenever the cellWidth changes
			// this is because it breaks when resizing
			<MasonryCarouselRow key={`${i}_${cellWidth}`}
				viewport={containerRef}
				cellWidth={cellWidth}
				gap={gap}
				cells={cells}
				left={i % 2 === 1}
				speed={speed}
				nVirtualizedCells={Math.ceil(1 / cellWidthProportion) + 2}
			/>
		))}
	</Stack>
});
