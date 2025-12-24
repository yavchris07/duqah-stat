import { LabelProps } from "recharts";

export const VerticalLabel = (props: LabelProps) => {
  const { x, y, width, height, value } = props;
  if (Number(height) < 30) return null;

  const cx = Number(x) + Number(width) / 2;
  const cy = Number(y) + Number(height) / 2;

  return (
    <text
      x={cx}
      y={cy}
      fill="#fff"
      fontSize={11}
      fontWeight="600"
      textAnchor="middle"
      dominantBaseline="middle"
      transform={`rotate(-90, ${cx}, ${cy})`}
    >
      {value}
    </text>
  );
};