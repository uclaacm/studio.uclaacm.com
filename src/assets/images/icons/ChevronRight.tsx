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
      d="M85.69 59.61 55.785 11.76a8 8 0 0 0-13.568 8.48l27.346 43.753-27.34 43.597a8 8 0 0 0 13.556 8.5L85.683 68.4a8 8 0 0 0 .007-8.79Z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgComponent;
