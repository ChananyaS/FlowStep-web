import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type {
  AlertSettings,
  DeviceState,
  HapticSettings,
} from "../types";

const STORAGE_KEY = "flowstep:device";

const DEFAULT_STATE: DeviceState = {
  registered: false,
  connected: false,
  deviceId: "FS-001",
  mode: "Sleep",
  timeWornMinutes: 20,
  updateIntervalMs: 45,
  lastSync: "just now",
  batteryLeft: 95,
  batteryRight: 95,
  estimatedHoursLeft: 8,
  health: "Good",
  haptic: {
    pattern: "single-pulse",
    motorIntensity: 75,
    vibrationLength: 2.5,
    buzzUntilEaseOff: false,
    touchSensitivity: 50,
  },
  alerts: {
    pauseWhileResting: true,
    quietHours: true,
    quietFrom: "22:00",
    quietTo: "07:00",
    phoneNotification: true,
    chargeReminder: true,
  },
};

interface DeviceContextValue {
  state: DeviceState;
  /** Mark the band as registered + connected (after scan / code entry). */
  registerDevice: (deviceId?: string) => void;
  /** Simulate a reconnect handshake. */
  reconnect: () => void;
  /** Remove the band and return to onboarding. */
  forgetDevice: () => void;
  setMode: (mode: DeviceState["mode"]) => void;
  updateAlerts: (patch: Partial<AlertSettings>) => void;
  updateHaptic: (patch: Partial<HapticSettings>) => void;
  resetHapticToDefault: () => void;
  reset: () => void;
}

const DeviceContext = createContext<DeviceContextValue | null>(null);

function loadInitial(): DeviceState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw) as Partial<DeviceState>;
    return {
      ...DEFAULT_STATE,
      ...parsed,
      haptic: { ...DEFAULT_STATE.haptic, ...parsed.haptic },
      alerts: { ...DEFAULT_STATE.alerts, ...parsed.alerts },
    };
  } catch {
    return DEFAULT_STATE;
  }
}

export function DeviceProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DeviceState>(loadInitial);

  // Persist so a refresh keeps the user on the right screen.
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage may be unavailable (private mode) — ignore */
    }
  }, [state]);

  const registerDevice = useCallback((deviceId?: string) => {
    setState((s) => ({
      ...s,
      registered: true,
      connected: true,
      deviceId: deviceId && deviceId.trim() ? deviceId : s.deviceId,
      lastSync: "just now",
    }));
  }, []);

  const reconnect = useCallback(() => {
    setState((s) => ({ ...s, connected: true, lastSync: "just now" }));
  }, []);

  const forgetDevice = useCallback(() => {
    setState(() => ({ ...DEFAULT_STATE }));
  }, []);

  const setMode = useCallback((mode: DeviceState["mode"]) => {
    setState((s) => ({ ...s, mode }));
  }, []);

  const updateAlerts = useCallback((patch: Partial<AlertSettings>) => {
    setState((s) => ({ ...s, alerts: { ...s.alerts, ...patch } }));
  }, []);

  const updateHaptic = useCallback((patch: Partial<HapticSettings>) => {
    setState((s) => ({ ...s, haptic: { ...s.haptic, ...patch } }));
  }, []);

  const resetHapticToDefault = useCallback(() => {
    setState((s) => ({ ...s, haptic: { ...DEFAULT_STATE.haptic } }));
  }, []);

  const reset = useCallback(() => setState({ ...DEFAULT_STATE }), []);

  const value = useMemo<DeviceContextValue>(
    () => ({
      state,
      registerDevice,
      reconnect,
      forgetDevice,
      setMode,
      updateAlerts,
      updateHaptic,
      resetHapticToDefault,
      reset,
    }),
    [
      state,
      registerDevice,
      reconnect,
      forgetDevice,
      setMode,
      updateAlerts,
      updateHaptic,
      resetHapticToDefault,
      reset,
    ]
  );

  return (
    <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useDevice(): DeviceContextValue {
  const ctx = useContext(DeviceContext);
  if (!ctx) throw new Error("useDevice must be used within a DeviceProvider");
  return ctx;
}
