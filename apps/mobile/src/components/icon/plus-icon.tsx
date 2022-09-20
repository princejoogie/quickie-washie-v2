import Svg, { Path } from "react-native-svg";

export interface PlusIconProps {
  styleName?: string;
}

export const PlusIcon = ({ styleName = "text-blue-600" }: PlusIconProps) => {
  return (
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
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </Svg>
  );
};
