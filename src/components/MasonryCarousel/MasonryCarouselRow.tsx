import React, { useImperativeHandle } from "react";
import { MasonryCarouselCellData } from ".";
import {
  animate,
  AnimationPlaybackControls,
  motion,
  useAnimationFrame,
  useMotionValue,
} from "framer-motion";
import { Box, Stack, useTheme } from "@mui/material";
import MasonryCarouselCell from "./MasonryCarouselCell";

const MotionStack = motion.create(Stack);

export type MasonryCarouselRowProps = {
  cells: MasonryCarouselCellData[];
  /**
   * A ref to the parent viewport. Kept for callers; the loop no longer
   * observes it - see the note on `offsetFor` below.
   */
  viewport?: React.RefObject<Element>;

  /**
   * If true, the row will move left instead of right
   */
  left?: boolean;

  /**
   * Gap between cells
   */
  gap: number;
  cellWidth: number;
  speed?: number;

  /**
   * The number of boxes to be used for the infinite scroll.
   * Must be large enough so the entire row is filled with boxes at all times.
   * If it is too small, there will be a gap at the end of the row.
   */
  nVirtualizedCells?: number;

  /**
   * if false, gives a more friendly interface to devices that
   * cannot hover. Ie. all hover states are triggered by onClick
   */
  canHover?: boolean;
};

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
      canHover = false,
    } = props;

    const containerRef = React.useRef<HTMLDivElement>(undefined);
    // used to "copy" our ref to the forwarded ref
    useImperativeHandle(ref, () => containerRef.current);

    const theme = useTheme();
    const nCells = React.useMemo(() => cells.length, [cells]);

    /**
     * The gap in real pixels. This theme sets `cssVariables: true`, so
     * `theme.spacing(2)` hands back `calc(2 * var(--mui-spacing))` rather than
     * `"16px"` - fine to drop straight into CSS, useless to parseFloat - so
     * resolve the unit off the document and fall back to MUI's default.
     */
    const gapPx = React.useMemo(() => {
      const raw = theme.spacing(gap);
      const direct = parseFloat(raw);
      if (raw.trim().endsWith("px") && !Number.isNaN(direct)) return direct;
      const unit =
        typeof window !== "undefined"
          ? parseFloat(
              getComputedStyle(document.documentElement).getPropertyValue(
                "--mui-spacing",
              ),
            )
          : NaN;
      return gap * (Number.isNaN(unit) ? 8 : unit);
    }, [theme, gap]);

    /**
     * Distance from one virtual cell's left edge to the next one's, and the
     * width of a full set of them. A cell shifted by exactly `blockWidth`
     * lands where another cell used to be, which is what makes the loop seam
     * invisible.
     */
    const pitch = cellWidth + gapPx;
    const blockWidth = nVirtualizedCells * pitch;

    /**
     * How many whole blocks virtual cell `i` has to be shifted by so that it
     * sits inside the window the viewport looks at, given the row has been
     * translated by `tx`.
     *
     * This used to be an IntersectionObserver state machine that advanced a
     * "leftmost cell" pointer as cells crossed the viewport edge. It only
     * moved on inView *transitions*, and it recycled each cell when it was a
     * single gap-width (16px) clear of the edge - so one late or coalesced
     * observer callback, which is exactly what a scroll's long frames
     * produce, left the pointer describing a layout that no longer existed.
     * From there it could never resync and the row emptied out for good.
     * Deriving the offset from the translation instead is exact on every
     * frame and has no state to fall out of sync.
     */
    const offsetFor = React.useCallback(
      (i: number, tx: number) => {
        // a zero/NaN block would send the offset to +-Infinity and put NaN
        // through the cell-index modulo, which renders `undefined` data
        if (!Number.isFinite(blockWidth) || blockWidth <= 0) return 0;
        // biasing the window by a pitch plus the gap keeps the leftmost cell
        // at or past the viewport's left edge for every value of tx, so the
        // padding strip never flashes empty mid-travel. The right stays
        // covered too: the worst case leaves (n - 2) * pitch + cellWidth,
        // and nVirtualizedCells is chosen as ceil(1 / proportion) + 2, so
        // that is always at least a full viewport.
        return -Math.floor((i * pitch + tx + pitch + gapPx) / blockWidth);
      },
      [pitch, blockWidth, gapPx],
    );

    /**
     * This is an array of how much each cell should translate left or right
     * in units of one entire block.
     */
    const [virtualCellOffsets, setVirtualCellOffsets] = React.useState(() =>
      Array.from({ length: nVirtualizedCells }, (_, i) => offsetFor(i, 0)),
    );
    // the offsets only change at a seam, so keep the last value around and
    // skip the setState (and the rerender) on every other frame
    const offsetsRef = React.useRef(virtualCellOffsets);

    /**
     * Touch only: which single cell is currently showing its overlay. There is
     * no pointer to follow on a touch screen, so the reveal is a tap and the
     * row has to own it - both so only one cell is ever open, and so the row
     * knows to hold still while it is (otherwise the cell slides out from
     * under the finger before its button can be pressed).
     */
    const [openCell, setOpenCell] = React.useState<number | null>(null);
    const openCellRef = React.useRef<number | null>(null);
    openCellRef.current = openCell;

    // an open overlay with nothing to dismiss it would leave the row parked
    // for good, so let a tap anywhere outside close it
    React.useEffect(() => {
      if (canHover || openCell === null) return;
      const close = (e: PointerEvent) => {
        if (!containerRef.current?.contains(e.target as Node)) setOpenCell(null);
      };
      document.addEventListener("pointerdown", close, true);
      return () => document.removeEventListener("pointerdown", close, true);
    }, [canHover, openCell]);

    const dragging = React.useRef(false);
    const hovering = React.useRef(false);

    // controls for animating a smooth stop transition on hover
    const stopAnimationControls = React.useRef<AnimationPlaybackControls>(null);

    const translateX = useMotionValue(0);

    useAnimationFrame((_, dt) => {
      if (!dragging.current && !hovering.current && openCellRef.current === null) {
        if (stopAnimationControls.current) {
          stopAnimationControls.current.stop();
          stopAnimationControls.current = null;
        }
        translateX.set(translateX.get() + (dt * speed) / 10);
      } else if (!stopAnimationControls.current) {
        // if the row is being hovered or dragged,
        // play an animation to transition to stop
        stopAnimationControls.current = animate(
          translateX,
          translateX.get() + translateX.getVelocity(),
          {
            type: "inertia",
            velocity: translateX.getVelocity(),
            power: 0.4,
          },
        );
      }

      const tx = translateX.get();
      const next = Array.from({ length: nVirtualizedCells }, (_, i) =>
        offsetFor(i, tx),
      );
      if (
        next.length !== offsetsRef.current.length ||
        next.some((o, i) => o !== offsetsRef.current[i])
      ) {
        offsetsRef.current = next;
        setVirtualCellOffsets(next);
      }
    });

    return (
      <MotionStack
        ref={containerRef}
        direction="row"
        flexWrap="nowrap"
        style={{ x: translateX }}
        transition={{ type: "inertia", velocity: 200 }}
        _dragX={translateX}
        drag="x"
        dragTransition={{
          timeConstant: 100,
          power: 0.1,
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
        onDragStart={() => {
          dragging.current = true;
          setOpenCell(null);
        }}
        onDragEnd={() => (dragging.current = false)}
        {...(canHover
          ? {
              // framer's isPrimaryPointer lets touch pointers through, so on a
              // phone a tap raised onHoverStart and nothing lowered it until
              // the next tap elsewhere - the row simply stopped scrolling
              onHoverStart: () => (hovering.current = true),
              onHoverEnd: () => (hovering.current = false),
            }
          : {})}
      >
        {(nCells === 0 ? [] : virtualCellOffsets).map((offset, i) => {
          const cellIndex =
            (((i + nVirtualizedCells * offset) % nCells) + nCells) % nCells;

          return (
            <Box
              key={i}
              sx={{
                minWidth: cellWidth,
                aspectRatio: "16 / 9",
                // offsets are in whole blocks; a block is exactly the width of
                // one full set of virtual cells, gaps included
                translate: `${offset * blockWidth}px 0`,
              }}
            >
              <MasonryCarouselCell
                data={cells[cellIndex]}
                dragging={dragging}
                canHover={canHover}
                open={openCell === i}
                onToggle={() => setOpenCell((cur) => (cur === i ? null : i))}
              />
            </Box>
          );
        })}
      </MotionStack>
    );
  },
);
