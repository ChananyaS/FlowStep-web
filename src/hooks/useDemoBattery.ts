import { useEffect, useState } from "react";

export function useDemoBattery(initial = 85, intervalMs = 80): number {
  const [value, setValue] = useState(initial);

  useEffect(() => {
    let current = initial;
    let dir = -1;
    const t = setInterval(() => {
      current += dir;
      if (current <= 0) dir = 1;
      if (current >= 100) dir = -1;
      setValue(current);
    }, intervalMs);
    return () => clearInterval(t);
  }, [initial, intervalMs]);

  return value;
}
