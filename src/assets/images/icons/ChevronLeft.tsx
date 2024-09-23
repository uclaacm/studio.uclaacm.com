import * as React from "react";
const SvgComponent = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={128}
    height={128}
    viewBox="0 0 128 128"
    {...props}
  >
    <path
      fill={props.fill ?? "#000"}
      fillRule="evenodd"
      d="m42.31 59.61 29.906-47.85a8 8 0 0 1 13.568 8.48L58.438 63.993l27.34 43.597a8 8 0 0 1-13.556 8.5L42.316 68.4a8 8 0 0 1-.007-8.79Z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgComponent;
