import Svg, { Path } from "react-native-svg";

export interface PieChartIconProps {
  filled?: boolean;
  styleName?: string;
}

export const PieChartIcon = ({
  filled,
  styleName = "text-blue-600",
}: PieChartIconProps) => {
  return filled ? (
    <Svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`w-6 h-6 ${styleName}`}
    >
      <Path
        fillRule="evenodd"
        d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z"
        clipRule="evenodd"
      />
      <Path
        fillRule="evenodd"
        d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z"
        clipRule="evenodd"
      />
    </Svg>
  ) : (
    <Svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={`w-6 h-6 ${styleName}`}
    >
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
      />
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"
      />
    </Svg>
  );
};
