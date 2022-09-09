import React from "react";
import Svg, { Path } from "react-native-svg";

interface ChevronIconProps {
  direction: "left" | "right" | "up" | "down";
  filled?: boolean;
  styleName?: string;
  strokeWidth?: number;
}

export const ChevronIcon = ({
  direction = "left",
  styleName = "",
  strokeWidth = 1.5,
}: ChevronIconProps) => {
  switch (direction) {
    case "left":
      return (
        <Svg
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className={`w-6 h-6 ${styleName}`}
        >
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </Svg>
      );
    case "right":
      return (
        <Svg
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className={`w-6 h-6 ${styleName}`}
        >
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </Svg>
      );
    case "up":
      return (
        <Svg
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className={`w-6 h-6 ${styleName}`}
        >
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 15.75l7.5-7.5 7.5 7.5"
          />
        </Svg>
      );
    case "down":
      return (
        <Svg
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className={`w-6 h-6 ${styleName}`}
        >
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </Svg>
      );
    default:
      return (
        <Svg
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className={`w-6 h-6 ${styleName}`}
        >
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </Svg>
      );
  }
};
