import { useId } from "react";

interface SliderProps {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  ticks?: (number | string)[];
  showDots?: boolean;
  ariaLabel?: string;
}

export default function Slider({
  value,
  min,
  max,
  step,
  onChange,
  ticks,
  showDots = true,
  ariaLabel,
}: SliderProps) {
  const id = useId();
  const pct = ((value - min) / (max - min)) * 100;
  const tickCount = ticks?.length ?? 0;
  const activeIdx = tickCount > 1
    ? Math.round(((value - min) / (max - min)) * (tickCount - 1))
    : -1;

  return (
    <div className="w-full">
      {/* Track area */}
      <div className="relative" style={{ height: 44 }}>
        {/* Native input — invisible, handles all interaction */}
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          aria-label={ariaLabel}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />

        {/* Track background */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 rounded-full bg-[#D9DEE3]" />

        {/* Track fill */}
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 rounded-full bg-[#3D648C]"
          style={{ width: `${pct}%` }}
        />

        {/* Tick dots */}
        {showDots && tickCount > 1 && ticks!.map((_, i) => {
          const tpct = (i / (tickCount - 1)) * 100;
          const passed = tpct <= pct + 0.5;
          return (
            <div
              key={i}
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full z-[1] pointer-events-none"
              style={{ left: `${tpct}%`, backgroundColor: passed ? "#3D648C" : "#D9DEE3" }}
            />
          );
        })}

        {/* Thumb */}
        <div
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-[22px] h-[22px] rounded-full bg-[#3D648C] pointer-events-none z-[1]"
          style={{
            left: `${pct}%`,
            boxShadow: "0 2px 8px rgba(61,100,140,0.35)",
          }}
        />
      </div>

      {/* Tick labels */}
      {tickCount > 0 && (
        <div className="relative mt-1" style={{ height: 18 }}>
          {ticks!.map((t, i) => {
            const tpct = (i / Math.max(tickCount - 1, 1)) * 100;
            const isActive = i === activeIdx;
            return (
              <span
                key={i}
                className="absolute text-[10px] whitespace-nowrap"
                style={{
                  left: `${tpct}%`,
                  transform:
                    i === 0
                      ? "none"
                      : i === tickCount - 1
                      ? "translateX(-100%)"
                      : "translateX(-50%)",
                  color: isActive ? "#3D648C" : "#9A9FA5",
                  fontWeight: isActive ? 700 : 400,
                  letterSpacing: 0.2,
                }}
              >
                {t}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
