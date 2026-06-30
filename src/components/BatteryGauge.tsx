type Colors = { fill: string; back: string; text: string; sub: string };

function batteryColors(percent: number): Colors {
  if (percent <= 20)
    return { fill: "#F4AAAA", back: "rgba(180,30,30,0.28)", text: "#7A1F1F", sub: "#9B3E3E" };
  if (percent <= 80)
    return { fill: "#F5C47A", back: "rgba(200,100,0,0.28)", text: "#6B3D00", sub: "#8C5200" };
  return { fill: "#9db8c6", back: "rgba(48,89,143,0.35)", text: "#1A3A52", sub: "#2E5472" };
}

export function BatteryGauge({
  side,
  percent,
  hours,
}: {
  side: string;
  percent: number;
  hours: number;
}) {
  const { fill, back, text, sub } = batteryColors(percent);
  const p = Math.min(percent, 100);

  return (
    <div className="flex-1">
      <div className="relative h-[92px] overflow-hidden rounded-2xl bg-flow-field">
        <div className="absolute inset-x-0 bottom-0" style={{ height: `${p}%` }}>
          <svg
            className="absolute -top-5 left-0 w-full"
            height="20"
            viewBox="0 0 100 20"
            preserveAspectRatio="none"
          >
            <path d="M0 12 q12.5 -8 25 0 t25 0 t25 0 t25 0 V20 H0 Z" fill={back} />
          </svg>
          <svg
            className="absolute -top-3 left-0 w-full"
            height="16"
            viewBox="0 0 100 16"
            preserveAspectRatio="none"
          >
            <path d="M0 8 q12.5 -8 25 0 t25 0 t25 0 t25 0 V16 H0 Z" fill={fill} />
          </svg>
          <div className="h-full w-full" style={{ backgroundColor: fill }} />
        </div>

        <div className="relative px-3 pt-2.5">
          <div className="flex items-baseline justify-between">
            <span className="text-[20px] font-extrabold" style={{ color: text }}>
              {percent}%
            </span>
            <span
              className="flex items-center gap-1 text-[11px] font-semibold"
              style={{ color: sub }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: sub }} />
              Connected
            </span>
          </div>
          <div className="mt-0.5 text-[12px] font-semibold" style={{ color: sub }}>
            ~ {hours} hr left
          </div>
        </div>
      </div>

      <div className="mt-1 text-center text-[12px] font-semibold text-flow-muted">{side}</div>
    </div>
  );
}
