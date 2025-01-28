import Svg, { SvgProps, Rect, Path, Stop, Defs, RadialGradient } from "react-native-svg";

export function MainLogo({ width, height, ...rest }: SvgProps) {
  const originalWidth = 100;
  const originalHeight = 100;
  return (
    <Svg xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox={`0 0 ${originalWidth} ${originalHeight}`}
      {...rest}>
      <Rect width="94" height="100" rx="16" fill="url(#paint0_angular_61_124)" />
      <Path d="M59.2118 41.1043C59.2118 35.2114 53.7499 30.4348 47.0133 30.4348C40.2767 30.4348 34.8148 35.2114 34.8148 41.1043C34.8148 44.3318 36.4599 47.2179 39.0485 49.1744L34.9362 67.5776H59.0897L54.9774 49.1744C57.566 47.2179 59.2111 44.3318 59.2111 41.1043H59.2118Z" fill="white" />
      <Defs>
        <RadialGradient id="paint0_angular_61_124" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(37 66.5) rotate(58.5399) scale(89.0969 75.0471)">
          <Stop offset="0.015625" stopColor="#FF0000" />
          <Stop offset="0.729167" stopColor="#FC01D8" />
        </RadialGradient>
      </Defs>
    </Svg>
  )
}
