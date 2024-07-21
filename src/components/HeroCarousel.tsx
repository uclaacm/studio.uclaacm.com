import { Box } from "@mui/material"
import { AnimatePresence, motion, LayoutGroup } from "framer-motion";
import {useState} from "react"

const rightArrowStyles: React.CSSProperties = {
    top: "calc(50% - 20px)",
    position: "absolute",
    background: "white",
    borderRadius: "30px",
    width: "40px",
    height: "40px",
    display: "flex",
    justifyContent: 'center',
    alignItems: "center",
    userSelect: "none",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "18px",
    zIndex: 2,
    right: "10px"
};

const leftArrowStyles: React.CSSProperties = {
    top: "calc(50% - 20px)",
    position: "absolute",
    background: "white",
    borderRadius: "30px",
    width: "40px",
    height: "40px",
    display: "flex",
    justifyContent: 'center',
    alignItems: "center",
    userSelect: "none",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "18px",
    zIndex: 2,
    left: "10px"
};


const variants = {
    enter: (direction: number) => {
        return {
            x: direction > 0 ? "-20rem" : "20rem",
            opacity: 0,
            width: "200px"
        };
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
        width: "400px"
    },
    exit: (direction: number) => {
        return {
            x: direction < 0 ? "-20rem" : "20rem",
            opacity: 0,
            width: "200px"
        };
    }
};

const variantsL = {
    enter: (direction: number) => {
        return {
            x: direction > 0 ? -1000 : 0,
            opacity: 0,
            width: direction > 0? "0": "400px"
        };
    },
    center: {
        zIndex: 1,
        x: "-20rem",
        opacity: 1,
        width: "200px"
    },

    exit: (direction: number) => {
        return {
            zIndex: 0,
            x: direction < 0 ? -1000 : 0,
            opacity: 0,
            width: direction < 0? "0px" : "400px"
        };
    }
};

const variantsR = {
    enter: (direction: number) => {
        return {
        x: direction < 0 ? 1000 : 0,
        opacity: 0,
        width: direction < 0? "0": "400px"
        };
    },
    center: {
        zIndex: 1,
        x: "20rem",
        opacity: 1,
        width: "200px"
    },

    exit: (direction: number) => {
        return {
        zIndex: 0,
        x: direction > 0 ? 1000 : 0,
        opacity: 0,
        width: direction > 0? "0px" : "400px"
        };
    }
};

const wrap = (min: number, max: number, v: number) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
  };

interface HeroCarouselProps {
    images: string[];
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({images}) => {
    const [[page, direction], setPage] = useState([0, 0]);

    const nextPage = (newDirection: number) => {
        console.log(page);

        setPage([(page + newDirection), newDirection]);
    };

    const imageIndex = wrap(0, images.length-1, page);
    const leftImageIndex = wrap(0, images.length-1, imageIndex-1);
    const rightImageIndex = wrap(0, images.length-1, imageIndex+1);

    return (
        <LayoutGroup >
            <AnimatePresence initial={false} custom={direction}>
                <motion.img
                style={{position: "absolute"}}
                key={page}
                src={images[leftImageIndex]}
                custom={direction}
                variants={variantsL}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.1 }
                }}
                />
            </AnimatePresence>

            <AnimatePresence initial={false} custom={direction}>
                <motion.img
                style={{position: "absolute"}}
                key={page}
                src={images[imageIndex]}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.1 }
                }}
                />
            </AnimatePresence>

            <AnimatePresence initial={false} custom={direction}>
                <motion.img
                style={{position: "absolute"}}
                key={page}
                src={images[rightImageIndex]}
                custom={direction}
                variants={variantsR}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.1 }
                }}
                />
            </AnimatePresence>

            <Box onClick={() => nextPage(-1)} style={leftArrowStyles}>
                ❰
            </Box>
            <Box onClick={() => nextPage(1)} style={rightArrowStyles}>
                ❱
            </Box>    
        </LayoutGroup>  
    );
}

export default HeroCarousel;