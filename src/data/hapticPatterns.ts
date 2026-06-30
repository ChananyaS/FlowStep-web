import type { HapticPattern, HapticPatternId } from "../types";

export const HAPTIC_PATTERNS: HapticPattern[] = [
  {
    id: "single-pulse",
    name: "Single pulse",
    subtitle: "One firm buzz",
    frequencyHz: 180,
  },
  {
    id: "double-tap",
    name: "Double tap",
    subtitle: "Two quick taps",
    frequencyHz: 160,
  },
  {
    id: "escalating",
    name: "Escalating",
    subtitle: "Builds if you hold",
    frequencyHz: 200,
  },
  {
    id: "heartbeat",
    name: "Heartbeat",
    subtitle: "Calm lub-dub",
    frequencyHz: 120,
  },
  {
    id: "sos",
    name: "SOS",
    subtitle: "Hard to ignore",
    frequencyHz: 220,
  },
  {
    id: "continuous",
    name: "Continuous",
    subtitle: "Steady until you ease",
    frequencyHz: 150,
  },
];

export const PATTERN_LABEL: Record<HapticPatternId, string> = {
  "single-pulse": "Single Pulse",
  "double-tap": "Double Tap",
  escalating: "Escalating",
  heartbeat: "Heartbeat",
  sos: "SOS",
  continuous: "Continuous",
};

export function getPattern(id: HapticPatternId): HapticPattern {
  return HAPTIC_PATTERNS.find((p) => p.id === id) ?? HAPTIC_PATTERNS[0];
}
