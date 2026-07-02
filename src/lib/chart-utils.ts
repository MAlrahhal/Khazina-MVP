export const CHART_COLORS = {
  gold: "#B8892D",
  goldDark: "#9A7425",
  goldLight: "#D8B56A",
  black: "#111111",
  gray: "#444444",
  grayLight: "#94A3B8",
  grayPale: "#CBD5E1",
} as const;

export const chartTickStyle = { fontSize: 11, fill: "#94A3B8", fontFamily: "inherit" };

export function formatChartAxis(value: number) {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}م`;
  if (value >= 1000) return `${(value / 1000).toFixed(0)}أ`;
  return String(value);
}
