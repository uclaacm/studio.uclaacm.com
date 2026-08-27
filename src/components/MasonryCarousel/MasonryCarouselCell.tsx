import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";
import { MasonryCarouselCellData } from ".";

import ItchIcon from "~/assets/images/icons/dev/itchio-textless-white.svg";

const MotionStack = motion.create(Stack);
const MotionButton = motion.create(Button);

export type MasonryCarouselCellProps = {
  data: MasonryCarouselCellData;
  canHover?: boolean;
  dragging: React.RefObject<boolean>;
  /** touch only: whether this is the cell the row currently has revealed */
  open?: boolean;
  /** touch only: ask the row to reveal or hide this cell */
  onToggle?: () => void;
};

export default React.forwardRef<HTMLDivElement, MasonryCarouselCellProps>(
  function MasonryCarouselCell(props: MasonryCarouselCellProps, ref) {
    const theme = useTheme();

    const { data, dragging, canHover, open, onToggle } = props;
    // destructuring `data` directly threw for any cell the carousel asked for
    // but couldn't supply, and one throw here unmounts the whole carousel -
    // which looks exactly like "the carousel just didn't render"
    const { href, title } = data ?? {};

    // TODO: Optimize this to use next/image
    const src = typeof data?.src === "string" ? data.src : data?.src?.src;

    const [pointerHover, setPointerHover] = React.useState(false);
    // where hovering can't happen, the row decides which cell is revealed
    const hovering = canHover ? pointerHover : !!open;

    /**
     * These have to be exclusive. Leaving the mouse handlers attached on a
     * touch screen meant a tap raised the overlay via the synthesised
     * mouseenter and the click toggle immediately dropped it again, so the
     * first tap only ever produced a grey flash.
     */
    const interaction = canHover
      ? {
          onMouseEnter: () => setPointerHover(true),
          onMouseLeave: () => setPointerHover(false),
        }
      : { onClick: () => onToggle?.() };

    return (
      <MotionStack
        justifyContent="center"
        alignItems="center"
        sx={(theme) => ({
          position: "relative",
          width: "100%",
          height: "100%",
          backgroundImage: `url("${src}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: 1,
        })}
        variants={{
          default: {},
          hover: {
            transition: {
              staggerChildren: theme.transitions.duration.shortest / 1000,
            },
          },
        }}
        animate={hovering ? "hover" : "default"}
        {...interaction}
      >
        <Box
          component={motion.div}
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            background: `rgba(0, 0, 0, 0.5)`,
            borderRadius: "inherit",
          }}
          variants={{
            default: { opacity: 0 },
            hover: { opacity: 1 },
          }}
        />
        {title && (
          <Box
            component={motion.div}
            sx={{
              zIndex: 1000,
            }}
            variants={{
              default: { opacity: 0, y: 16 },
              hover: { opacity: 1, y: 0 },
            }}
          >
            <Typography
              display="block"
              variant="caption"
              color="white"
              textAlign="center"
            >
              {title}
            </Typography>
          </Box>
        )}
        <MotionButton
          variant="contained"
          size="small"
          draggable="false"
          variants={{
            default: { opacity: 0, y: 16 },
            hover: { opacity: 1, y: 0 },
          }}
          {...(href !== undefined
            ? {
                href,
                target: "_blank",
              }
            : {})}
          startIcon={<img src={ItchIcon.src} width="24px" height="24px"></img>}
          onClick={(e) => {
            if (dragging.current || !hovering) {
              e.preventDefault();
            }
          }}
        >
          View on itch
        </MotionButton>
      </MotionStack>
    );
  },
);
