import * as IconPhosphor from "phosphor-react-native";

type IconName = keyof typeof IconPhosphor;

interface IconProps {
  name: IconName;
  size: number;
  color: string;
  weight: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
}

export function Icon({ name, size, color, weight }: IconProps) {
  const IconComponent = IconPhosphor[name] as React.ComponentType<{
    size?: number;
    color?: string;
    weight: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
  }>;

  if (!IconComponent) {
    console.warn(`Ícone "${name}" não encontrado em "phosphor-react".`);
    return null;
  }

  return <IconComponent size={size} color={color} weight={weight} />;
}
