import { HomeIcon } from "./home-icon";
import { IconProps } from "./types";

const Icon = ({ className = "", filled = false, name }: IconProps) => {
  switch (name) {
    case "home":
      return <HomeIcon className={className} filled={filled} />;
    default:
      return null;
  }
};

export default Icon;
