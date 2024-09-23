"use client";

import * as React from "react";

import Box from "@mui/material/Box";

import arrow from "~/assets/images/arrow.svg";

export type SelectionRect = {
  top: number;
  left: number;
  width: number;
  height: number;
  maxWidth: number;
};

export type SelectionProps = {
  selectionRef?: React.MutableRefObject<HTMLElement>;
  containerSelector?: string;
  boxSizing?: "border-box" | "content-box";
  useClientWidth?: boolean;
  useClientHeight?: boolean;
  offsetBorder?: boolean;
  transitionMaxWidth?: boolean;
  fixed?: boolean;
  parent?: HTMLElement;
};

export function Selection({
  selectionRef,
  containerSelector,
  boxSizing,
  useClientWidth,
  useClientHeight,
  offsetBorder,
  transitionMaxWidth,
  fixed,
  parent,
}: SelectionProps) {
  const [rect, setRect] = React.useState<SelectionRect | null>(null);
  useClientWidth ??= false;
  useClientHeight ??= false;
  offsetBorder ??= false;
  transitionMaxWidth ??= false;
  fixed ??= false;

  const resizeObserver = new ResizeObserver((entries) => {
    if (entries.length > 0) {
      const contentRect = entries[0].contentRect;
      const target = entries[0].target as HTMLLIElement;

      const clientWidth = (
        containerSelector
          ? (target.querySelector(containerSelector) as HTMLElement)
          : target
      ).offsetWidth;
      const clientHeight = (
        containerSelector
          ? (target.querySelector(containerSelector) as HTMLElement)
          : target
      ).offsetHeight;

      setRect({
        top: target.offsetTop,
        left: target.offsetLeft,
        width: useClientWidth
          ? clientWidth
          : Math.min(clientWidth, contentRect.width),
        height: useClientHeight ? clientHeight : contentRect.height,
        maxWidth: target.offsetWidth,
      });
    }
  });

  React.useEffect(() => {
    if (selectionRef?.current) {
      resizeObserver.disconnect();
      resizeObserver.observe(selectionRef.current);
    }
    return () => {
      resizeObserver.disconnect();
    };
  }, [selectionRef]);

  if (selectionRef) {
    return (
      <Box
        sx={(theme) => ({
          borderWidth: theme.spacing(1),
          borderColor: theme.palette.primary.main,
          borderStyle: "solid",
          borderRadius: 1,
          position: fixed ? "fixed" : "absolute",

          top: offsetBorder
            ? `calc(${rect?.top}px - ${theme.spacing(1)})`
            : `${rect?.top}px`,
          left: offsetBorder
            ? `calc(${rect?.left}px - ${theme.spacing(1)})`
            : `${rect?.left}px`,
          width: `${rect?.width}px`,
          height: `${rect?.height}px`,
          maxWidth: `${rect?.maxWidth}px`,

          transition: theme.transitions.create(
            [
              "top",
              "width",
              "left",
              "height",
              ...(transitionMaxWidth ? ["max-width"] : []),
            ],
            {
              duration: theme.transitions.duration.shortest,
              easing: theme.transitions.easing.easeOut,
            },
          ),

          pointerEvents: "none",

          zIndex: theme.zIndex.drawer + 1,

          "&:after": {
            "--size": `${theme.spacing(2)}`,
            display: "block",
            position: "absolute",
            right: `calc(-1.5*var(--size) - ${theme.spacing(0.5)})`,
            top: `calc((100% - var(--size))/2)`,
            width: `var(--size)`,
            height: `var(--size)`,
            color: "red",
            backgroundImage: `url("${arrow.src}")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "center",
            content: `""`,
          },

          boxSizing: boxSizing,
        })}
      />
    );
  }
  return null;
}
