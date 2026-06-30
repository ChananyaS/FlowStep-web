import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneFrame from "../components/PhoneFrame";
import ProductImage from "../components/ProductImage";
import Toggle from "../components/ui/Toggle";
import { BatteryGauge } from "../components/BatteryGauge";
import {
  BatteryIcon,
  ChevronRight,
  ClockIcon,
  ConnectedIcon,
  LeafIcon,
  MoonIcon,
  Waveform,
} from "../components/icons";
import { useDevice } from "../context/DeviceContext";
import { useDemoBattery } from "../hooks/useDemoBattery";
import { PATTERN_LABEL } from "../data/hapticPatterns";
import type { AlertSettings } from "../types";

/* ---- Local sub-components ---- */

const ROTATING_PHRASES = ["月が綺麗ですね", "七転び八起き", "花より男子"] as const;
const DISPLAY_MS = 15_000;
const FADE_MS = 800;

function RotatingQuote() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fadeIn = setTimeout(() => setVisible(true), 50);
    const fadeOut = setTimeout(() => setVisible(false), DISPLAY_MS - FADE_MS);
    const next = setTimeout(() => setIndex((i) => (i + 1) % ROTATING_PHRASES.length), DISPLAY_MS);
    return () => {
      clearTimeout(fadeIn);
      clearTimeout(fadeOut);
      clearTimeout(next);
    };
  }, [index]);

  return (
    <div className="flex-1 flex items-center justify-center rounded-3xl bg-white p-3.5 shadow-card">
      <span
        className="text-[14px] font-bold text-center leading-snug text-[#234B85]"
        style={{ opacity: visible ? 1 : 0, transition: `opacity ${FADE_MS}ms ease-in-out` }}
      >
        「{ROTATING_PHRASES[index]}」
      </span>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex-1 bg-[#EAF4F7] rounded-xl p-2">
      <span className="text-[10px] font-medium text-[#9A9FA5] leading-4 tracking-[0.5px] block">
        {label}
      </span>
      <span className="text-[14px] font-semibold text-black leading-[22px]">{value}</span>
    </div>
  );
}

function shiftTime(value: string, deltaMinutes: number): string {
  const [h, m] = value.split(":").map(Number);
  const total = (((h * 60 + m + deltaMinutes) % 1440) + 1440) % 1440;
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

function Stepper({ value, onShift }: { value: string; onShift: (delta: number) => void }) {
  return (
    <div className="flex-1 flex items-center bg-[#F4F8F8] rounded-[13px] py-1.5">
      <button
        type="button"
        aria-label="Earlier"
        onClick={() => onShift(-1)}
        className="w-[38px] flex items-center justify-center"
      >
        <span className="text-[20px] text-[#3D648C] font-bold leading-6">−</span>
      </button>
      <span className="flex-1 text-center text-[16px] font-bold text-[#3D648C] leading-6 tracking-[0.15px]">
        {value}
      </span>
      <button
        type="button"
        aria-label="Later"
        onClick={() => onShift(1)}
        className="w-[38px] flex items-center justify-center"
      >
        <span className="text-[20px] text-[#3D648C] font-bold leading-6">+</span>
      </button>
    </div>
  );
}

function ToggleRow({
  title,
  desc,
  checked,
  onChange,
}: {
  title: string;
  desc: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center">
      <div className="flex-1 mr-4 flex flex-col gap-1">
        <span className="text-[16px] font-bold text-black capitalize">{title}</span>
        <span className="text-[12px] font-medium text-[#767D85] leading-4 tracking-[0.5px]">
          {desc}
        </span>
      </div>
      <Toggle checked={checked} onChange={onChange} label={title} />
    </div>
  );
}

/* ---- Page ---- */

export default function Device() {
  const navigate = useNavigate();
  const { state, forgetDevice, updateAlerts } = useDevice();
  const { alerts, haptic } = state;
  const demoBattery = useDemoBattery();

  const hours = Math.floor(state.timeWornMinutes / 60);
  const minutes = state.timeWornMinutes % 60;

  function handleForget() {
    if (window.confirm("Forget this FlowStep band? You'll need to pair again.")) {
      forgetDevice();
      navigate("/register");
    }
  }

  function handleAlertChange(patch: Partial<AlertSettings>) {
    updateAlerts(patch);
  }

  return (
    <PhoneFrame>
      <div className="no-scrollbar h-full overflow-y-auto">

        {/* Header */}
        <div className="relative bg-gradient-to-b from-[#cfe0e8] to-[#e9f1f3] pt-4 pb-0">
          <div className="text-center">
            <span className="text-[48px] font-extrabold text-[#234B85]">Flow</span>
            <span className="text-[48px] font-normal text-[#234B85]">Step</span>
          </div>
          <ProductImage className="w-full h-[230px] object-contain" />
        </div>

        <div className="space-y-5 px-5 pb-10">

          {/* Today */}
          <section>
            <h2 className="mb-2 text-[20px] font-extrabold text-flow-ink">Today</h2>
            <div className="flex gap-3">
              <div className="flex items-center gap-3 rounded-3xl bg-white p-3.5 shadow-card">
                <span className="grid h-11 w-11 place-items-center rounded-full text-white">
                  <ClockIcon size={48} />
                </span>
                <div>
                  <div className="text-[12px] font-semibold text-flow-muted">Time worn</div>
                  <div className="text-[20px] font-extrabold text-flow-ink">
                    {hours} <span className="text-[13px] font-semibold">h</span>{" "}
                    {minutes} <span className="text-[13px] font-semibold">m</span>
                  </div>
                </div>
              </div>
              <RotatingQuote />
            </div>
          </section>

          {/* Connected */}
          <div className="bg-white rounded-[22px] p-2 flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <ConnectedIcon size={20} />
                  <span className="text-[18px] font-bold text-black">Connected</span>
                </div>
                <span className="text-[12px] font-medium text-[#40464D] leading-4 tracking-[0.5px]">
                  {state.deviceId}
                </span>
              </div>
              <MoonIcon size={42} />
            </div>

            <div className="flex gap-2">
              <MiniStat label="Update Interval" value={`${state.updateIntervalMs} ms`} />
              <MiniStat label="Last sync" value={state.lastSync} />
              <MiniStat label="Mode" value={state.mode} />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => navigate("/register/scan")}
                className="flex-1 bg-[#F4F8F8] rounded-full py-2 px-2.5"
              >
                <span className="text-[14px] font-bold text-black leading-5 tracking-[0.1px]">
                  Reconnect
                </span>
              </button>
              <button
                type="button"
                onClick={handleForget}
                className="flex-1 bg-[#F4F8F8] rounded-full py-2 px-2.5"
              >
                <span className="text-[14px] font-bold text-[#FF383C] leading-5 tracking-[0.1px]">
                  Forget device
                </span>
              </button>
            </div>
          </div>

          {/* Battery */}
          <section className="rounded-3xl bg-white p-4 shadow-card">
            <div className="mb-3 flex items-center gap-2">
              <BatteryIcon size={22} className="text-flow-ink" />
              <span className="text-[17px] font-extrabold text-flow-ink">Battery</span>
            </div>
            <div className="flex gap-3">
              <BatteryGauge side="Left" percent={demoBattery} hours={state.estimatedHoursLeft} />
              <BatteryGauge
                side="Right"
                percent={Math.max(0, demoBattery - 10)}
                hours={state.estimatedHoursLeft}
              />
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-flow-track/60 pt-3">
              <div className="flex items-center gap-2">
                <LeafIcon size={20} className="text-flow-success" />
                <span className="text-[15px] font-extrabold text-flow-ink">Health</span>
              </div>
              <span className="text-[15px] font-extrabold text-flow-ink">{state.health}</span>
            </div>
          </section>

          {/* Alert */}
          <section>
            <h2 className="mb-2 text-[20px] font-extrabold text-flow-ink">Alert</h2>
            <button
              type="button"
              onClick={() => navigate("/device/haptic")}
              className="flex w-full items-center gap-3 rounded-3xl bg-white p-3.5 text-left shadow-card active:scale-[0.99] transition"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-flow-field">
                <Waveform pattern={haptic.pattern} width={38} height={28} />
              </span>
              <div className="flex-1">
                <div className="text-[12px] font-semibold text-flow-muted">Haptic Pattern</div>
                <div className="text-[17px] font-extrabold text-flow-ink">
                  {PATTERN_LABEL[haptic.pattern]}
                </div>
                <div className="text-[12px] font-semibold text-flow-slate">
                  {haptic.motorIntensity}% strength · {haptic.vibrationLength.toFixed(1)} s
                </div>
              </div>
              <ChevronRight size={20} className="text-flow-muted" />
            </button>
          </section>

          {/* When to alert */}
          <div className="text-[12px] font-medium text-[#40464D] tracking-[0.5px]">
            WHEN TO ALERT
          </div>
          <div className="bg-white rounded-[22px] p-4 flex flex-col gap-4">
            <ToggleRow
              title="Pause While Resting"
              desc="Don't alert when you've been sitting or lying still."
              checked={alerts.pauseWhileResting}
              onChange={(v) => handleAlertChange({ pauseWhileResting: v })}
            />
            <div className="h-px bg-[#E2E8E4]" />
            <ToggleRow
              title="Quiet Hours"
              desc="Turn on Sleep Mode to pause cueing."
              checked={alerts.quietHours}
              onChange={(v) => handleAlertChange({ quietHours: v })}
            />
            {alerts.quietHours && (
              <div className="flex items-center gap-3">
                <Stepper
                  value={alerts.quietFrom}
                  onShift={(d) => handleAlertChange({ quietFrom: shiftTime(alerts.quietFrom, d * 15) })}
                />
                <span className="text-[12px] font-medium text-[#767D85] leading-4 tracking-[0.5px]">
                  to
                </span>
                <Stepper
                  value={alerts.quietTo}
                  onShift={(d) => handleAlertChange({ quietTo: shiftTime(alerts.quietTo, d * 15) })}
                />
              </div>
            )}
          </div>

          {/* Phone alerts */}
          <div className="text-[12px] font-medium text-[#40464D] tracking-[0.5px]">
            PHONE ALERTS
          </div>
          <div className="bg-white rounded-[22px] p-4 flex flex-col gap-4">
            <ToggleRow
              title="Phone Notification"
              desc="Allow app to send notifications to your phone."
              checked={alerts.phoneNotification}
              onChange={(v) => handleAlertChange({ phoneNotification: v })}
            />
            <div className="h-px bg-[#E2E8E4]" />
            <ToggleRow
              title="Charge Reminder"
              desc="Notify me when the device battery drops below 20%."
              checked={alerts.chargeReminder}
              onChange={(v) => handleAlertChange({ chargeReminder: v })}
            />
          </div>

        </div>
      </div>
    </PhoneFrame>
  );
}
