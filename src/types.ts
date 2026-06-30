// Shared domain types for the FlowStep app

export type HapticPatternId =
  | "single-pulse"
  | "double-tap"
  | "escalating"
  | "heartbeat"
  | "sos"
  | "continuous";

export interface HapticPattern {
  id: HapticPatternId;
  name: string;
  subtitle: string;
  /** Display frequency shown on the preview card, in Hz */
  frequencyHz: number;
}

export type DeviceMode = "Sleep" | "Active";

export interface HapticSettings {
  pattern: HapticPatternId;
  /** Motor intensity 0–100 (%) */
  motorIntensity: number;
  /** Vibration length in seconds (1.0–3.0) */
  vibrationLength: number;
  /** Vibrate until the foot lifts off */
  buzzUntilEaseOff: boolean;
  /** Touch sensitivity 0–100 (%) */
  touchSensitivity: number;
}

export interface AlertSettings {
  pauseWhileResting: boolean;
  quietHours: boolean;
  quietFrom: string; // "HH:MM"
  quietTo: string; // "HH:MM"
  phoneNotification: boolean;
  chargeReminder: boolean;
}

export interface DeviceState {
  registered: boolean;
  connected: boolean;
  deviceId: string; // e.g. "FS-001"
  mode: DeviceMode;
  timeWornMinutes: number;
  updateIntervalMs: number;
  lastSync: string;
  batteryLeft: number;
  batteryRight: number;
  estimatedHoursLeft: number;
  health: "Good" | "Fair" | "Check";
  haptic: HapticSettings;
  alerts: AlertSettings;
}
