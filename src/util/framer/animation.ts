import React from "react";

export type AnimationStyleOptions = {
  translateX?: number;
  translateY?: number;
  opacity?: boolean;
};

export function animationStyle(
  options: AnimationStyleOptions = {},
): React.CSSProperties {
  let { translateX = 0, translateY = -16, opacity = true } = options;

  return {
    translate: `calc((1 - var(--animation-percent)) * ${translateX}px) calc((1 - var(--animation-percent)) * ${translateY}px)`,
    ...(opacity ? { opacity: `var(--animation-percent)` } : {}),
  };
}
