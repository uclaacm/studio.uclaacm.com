import { Box, Button, useTheme } from "@mui/material";
import { AnimatePresence, motion, LayoutGroup } from "framer-motion";
import IconButton from "./IconButton";
import * as React from "react";

import ChevronLeft from "~/assets/images/icons/ChevronLeft";
import ChevronRight from "~/assets/images/icons/ChevronRight";

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? "-20rem" : "20rem",
      opacity: 0,
      width: "200px",
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    width: "400px",
  },
  exit: (direction: number) => {
    return {
      x: direction < 0 ? "-20rem" : "20rem",
      opacity: 0,
      width: "200px",
    };
  },
};

const variantsL = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? -1000 : 0,
      opacity: 0,
      width: direction > 0 ? "0" : "400px",
    };
  },
  center: {
    zIndex: 1,
    x: "-20rem",
    opacity: 1,
    width: "200px",
  },

  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? -1000 : 0,
      opacity: 0,
      width: direction < 0 ? "0px" : "400px",
    };
  },
};

const variantsR = {
  enter: (direction: number) => {
    return {
      x: direction < 0 ? 1000 : 0,
      opacity: 0,
      width: direction < 0 ? "0" : "400px",
    };
  },
  center: {
    zIndex: 1,
    x: "20rem",
    opacity: 1,
    width: "200px",
  },

  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction > 0 ? 1000 : 0,
      opacity: 0,
      width: direction > 0 ? "0px" : "400px",
    };
  },
};

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

type ArrowButtonProps = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
};

function ArrowButton({ onClick, children }: ArrowButtonProps) {
  return (
    <Button onClick={onClick} sx={{}}>
      {children}
    </Button>
  );
}

type HeroCarouselProps = {
  images: { src: string; href: string }[];
  interval?: number;
};

const HeroCarousel: React.FC<HeroCarouselProps> = ({
  images,
  interval = 3000,
}) => {
  const theme = useTheme();

  const [[page, direction], setPage] = React.useState([0, 0]);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const nextPage = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const imageIndex = wrap(0, images.length, page);
  const leftImageIndex = wrap(0, images.length, imageIndex + 1);
  const rightImageIndex = wrap(0, images.length, imageIndex - 1);

  React.useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    timeoutRef.current = setTimeout(() => {
      nextPage(1);
    }, interval);

    return () => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    };
  }, [page]);

  return (
    <LayoutGroup>
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          style={{ position: "absolute" }}
          key={page}
          src={images[leftImageIndex].src}
          custom={direction}
          variants={variantsL}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.1 },
          }}
        />
      </AnimatePresence>

      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          style={{ position: "absolute" }}
          key={page}
          src={images[imageIndex].src}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.1 },
          }}
        />
      </AnimatePresence>

      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          style={{ position: "absolute" }}
          key={page}
          src={images[rightImageIndex].src}
          custom={direction}
          variants={variantsR}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.1 },
          }}
        />
      </AnimatePresence>

      <IconButton
        onClick={() => nextPage(-1)}
        variant="outlined"
        sx={{
          position: "absolute",
          left: 0,
        }}
      >
        <ChevronLeft
          style={{ width: "1em", height: "1em" }}
          fill={theme.palette.primary.main}
        />
      </IconButton>
      <IconButton
        onClick={() => nextPage(1)}
        variant="outlined"
        sx={{
          position: "absolute",
          right: 0,
        }}
      >
        <ChevronRight
          style={{ width: "1em", height: "1em" }}
          fill={theme.palette.primary.main}
        />
      </IconButton>
    </LayoutGroup>
  );
};

export default HeroCarousel;
