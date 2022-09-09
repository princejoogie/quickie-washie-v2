export type IconName = "home";

export interface IconProps {
  name: IconName;
  filled?: boolean;
  className?: string;
}

export type IconComponent = Omit<IconProps, "name">;
