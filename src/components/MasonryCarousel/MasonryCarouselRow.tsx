import React, { useImperativeHandle } from "react";
import { MasonryCarouselCellData } from ".";
import { animate, AnimationPlaybackControls, motion, useAnimationFrame, useInView, useMotionValue } from "framer-motion";
import { Box, Stack } from "@mui/material";
import MasonryCarouselCell from "./MasonryCarouselCell";

const MotionStack = motion(Stack);

export type MasonryCarouselRowProps = {
	cells: MasonryCarouselCellData[],
	/**
	 * A ref to the parent viewport used for framer motion's useInView
	 */
	viewport: React.RefObject<Element>,

	/**
	 * If true, the row will move left instead of right
	 */
	left?: boolean,

	/**
	 * Gap between cells
	 */
	gap: number,
	cellWidth: number,
	speed?: number,

	/**
	 * The number of boxes to be used for the infinite scroll.
	 * Must be large enough so the entire row is filled with boxes at all times.
	 * If it is too small, there will be a gap at the end of the row.
	 */
	nVirtualizedCells?: number,

	/**
	 * if false, gives a more friendly interface to devices that
	 * cannot hover. Ie. all hover states are triggered by onClick
	 */
	canHover?: boolean,
}

/**
 * MasonryCarouselRow
 * This virtualizes a set of cells by creating nVirtualizedCells
 * that automatically move and populate based on which one is in view.
 */
export default React.forwardRef<HTMLDivElement, MasonryCarouselRowProps>(
	function MasonryCarouselRow(props: MasonryCarouselRowProps, ref) {
		const {
			left = false,
			viewport,
			speed = 0.5 * (left === true ? -1 : 1),
			cells,
			gap,
			cellWidth,
			nVirtualizedCells = 5,
			canHover,
		} = props;

		const containerRef = React.useRef<HTMLDivElement>();
		// used to "copy" our ref to the forwarded ref
		useImperativeHandle(ref, () => containerRef.current);

		const nCells = React.useMemo(() => cells.length, [cells]);

		const virtualCellRefs = Array.from({ length: nVirtualizedCells }).map(() => React.useRef<HTMLDivElement>());
		const virtualCellInViews = virtualCellRefs.map(ref => useInView(ref, { root: viewport }));
		const [leftMostVCIndex, setLeftmostVCIndex] = React.useState(0);

		/**
		 * This is an array of how much each cell should translate left or right
		 * in units of 1 entire parent width.
		 */
		const [virtualCellOffsets, setVirtualCellOffsets] = React.useState(Array.from<number>({ length: nVirtualizedCells }).fill(0));

		// recalculate the leftmost virtualized cell
		// based on the inView callbacks
		virtualCellInViews.forEach((inView, i) => {
			React.useEffect(() => {
				// leftmost box goes out of frame
				if(leftMostVCIndex === i && !inView){
					setLeftmostVCIndex(old => (old + 1) % nVirtualizedCells);
				}
				// new box comes in frame from left
				else if ((leftMostVCIndex + nVirtualizedCells - 1) % nVirtualizedCells === i && inView) {
					setLeftmostVCIndex(i);
				}
			}, [inView]);
		});

		// recalculate the virtual cell offsets based on
		// the latest leftmost virtual cell
		React.useEffect(() => {
			// if box i is the leftmost box,
			// we must ensure i - 1 is to the left of it
			// and i + 1 is to the right
			const curOffset = virtualCellOffsets[leftMostVCIndex];

			const leftBox = (leftMostVCIndex + nVirtualizedCells - 1) % nVirtualizedCells;

			// leftBox
			if (leftMostVCIndex === 0){
				setVirtualCellOffsets([
					...Array.from<number>({ length: nVirtualizedCells - 1 }).fill(curOffset),
					curOffset - 1
				]);
			}
			else {
				setVirtualCellOffsets(
					Array.from({ length: nVirtualizedCells })
						.map((_, i) => i >= leftBox ? curOffset : curOffset + 1)
				);
			}
		}, [leftMostVCIndex]);

		const dragging = React.useRef(false);
		const hovering = React.useRef(false);

		// controls for animating a smooth stop transition on hover
		const stopAnimationControls = React.useRef<AnimationPlaybackControls>(null);

		const translateX = useMotionValue(0);

		useAnimationFrame((_, dt) => {
			if(!dragging.current && !hovering.current) {
				if (stopAnimationControls.current){
					stopAnimationControls.current.stop();
					stopAnimationControls.current = null;
				}
				translateX.set(translateX.get() + dt * speed / 10);
			}
			else if(!stopAnimationControls.current){
				// if the row is being hovered or dragged,
				// play an animation to transition to stop
				stopAnimationControls.current = animate(translateX, translateX.get() + translateX.getVelocity(), {
					type: "inertia",
					velocity: translateX.getVelocity(),
					power: 0.4
				});
			}
		})

		// Reset everything when we resize
		// React.useEffect(() => {
		// 	setLeftmostVCIndex(0);
		// 	setVirtualCellOffsets(Array.from<number>({ length: nVirtualizedCells }).fill(0));

		// 	dragging.current = false;
		// 	hovering.current = false;
		// 	stopAnimationControls.current?.cancel();
		// 	translateX.set(0);
		// }, [cellWidth])

		return (
			<MotionStack ref={containerRef}
				direction="row"
				flexWrap="nowrap"
				style={{ x: translateX }}
				transition={{ type: "inertia", velocity: 200 }}
				_dragX={translateX}
				drag="x"
				dragTransition={{
					timeConstant: 100, power: 0.1,
				}}
				gap={gap}
				sx={{
					"&:hover": {
						cursor: "grab",
					},
					"&:active": {
						cursor: "grabbing",
					},
				}}
				onDragStart={() => dragging.current = true}
				onDragEnd={() => dragging.current = false}
				onHoverStart={() => hovering.current = true}
				onHoverEnd={() => hovering.current = false}
			>
				{virtualCellRefs.map((ref, i) => {
					const cellIndex = (((i + nVirtualizedCells * virtualCellOffsets[i]) % nCells) + nCells) % nCells;

					return (
						<Box key={i} ref={ref} sx={theme => ({
							minWidth: cellWidth,
							aspectRatio: "16 / 9",
							/**
							 * This converts the virtual cell offsets (in parent width units)
							 * to px values
							 * This expression is equivalent to:
							 * 		offset * (parentWidth + gap)
							 * But needs to be done in calc since theme.spacing outputs a string value
							 */
							translate: `calc(${virtualCellOffsets[i]} * (${nVirtualizedCells} * (${cellWidth}px + ${theme.spacing(gap)}))) 0`,

						})}>
							<MasonryCarouselCell data={cells[cellIndex]} dragging={dragging} canHover={canHover} />
						</Box>
					)
				})}
			</MotionStack>
		)
	}
);
