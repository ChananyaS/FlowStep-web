import { useState } from "react";
import PhoneFrame from "./PhoneFrame";
import TopBar from "./TopBar";
import Slider from "./ui/Slider";
import Toggle from "./ui/Toggle";
import { CheckIcon, PlayIcon, RestartIcon, Waveform } from "./icons";
import { HAPTIC_PATTERNS, getPattern } from "../data/hapticPatterns";
import type { HapticPatternId, HapticSettings } from "../types";

const DEFAULTS: HapticSettings = {
  pattern: "single-pulse",
  motorIntensity: 75,
  vibrationLength: 2.5,
  buzzUntilEaseOff: false,
  touchSensitivity: 50,
};

export function HapticEditor({
  eyebrow,
  title,
  backTo,
  saveLabel,
  initialSettings,
  onSave,
  onDraftChange,
  hideSaveBar = false,
}: {
  eyebrow: string;
  title: string;
  backTo: string;
  saveLabel: string;
  initialSettings: HapticSettings;
  onSave: (settings: HapticSettings) => void;
  onDraftChange?: (settings: HapticSettings) => void;
  hideSaveBar?: boolean;
}) {
  const [draft, setDraft] = useState<HapticSettings>({ ...initialSettings });
  const [testing, setTesting] = useState(false);

  const patch = (p: Partial<HapticSettings>) =>
    setDraft((d) => {
      const next = { ...d, ...p };
      onDraftChange?.(next);
      return next;
    });
  const current = getPattern(draft.pattern);

  function handleTest() {
    setTesting(true);
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate?.(Math.round(draft.vibrationLength * 1000));
    }
    window.setTimeout(() => setTesting(false), 1400);
  }

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col">
        <TopBar eyebrow={eyebrow} title={title} backTo={backTo} />

        <div className="no-scrollbar flex-1 overflow-y-auto px-5 pb-6">
          <p className="text-[14px] leading-snug text-flow-slate">
            Customise your cueing style to find the vibration pattern that works best for you.
            Tailored cueing helps unlock smoother mobility and supports your everyday movement.
          </p>

          {/* Preview card */}
          <div className="mt-4 rounded-3xl bg-white p-4 shadow-card">
            <div className="flex items-center justify-between">
              <span className="text-[19px] font-extrabold text-flow-ink">{current.name}</span>
              <span className="text-[14px] font-bold text-flow-muted">{current.frequencyHz} Hz</span>
            </div>
            <div className={`my-3 ${testing ? "animate-pulse" : ""}`}>
              <Waveform pattern={draft.pattern} className="w-full h-auto" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-semibold text-flow-slate">
                {draft.vibrationLength.toFixed(1)} s · {draft.motorIntensity}% strength
              </span>
              <button
                type="button"
                onClick={handleTest}
                className="flex items-center gap-2 rounded-full bg-flow-primary px-4 py-2 text-[14px] font-bold text-white active:scale-95 transition"
              >
                <PlayIcon size={16} />
                {testing ? "Testing…" : "Test on device"}
              </button>
            </div>
          </div>

          {/* Pattern grid */}
          <SectionLabel>Pattern</SectionLabel>
          <div className="grid grid-cols-2 gap-3">
            {HAPTIC_PATTERNS.map((p) => (
              <PatternCard
                key={p.id}
                id={p.id}
                name={p.name}
                subtitle={p.subtitle}
                selected={draft.pattern === p.id}
                onSelect={() => patch({ pattern: p.id })}
              />
            ))}
          </div>

          {/* Style */}
          <SectionLabel>Style</SectionLabel>
          <div className="rounded-3xl bg-white p-4 shadow-card">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[18px] font-extrabold text-flow-ink">Motor Intensity</div>
                <div className="mt-0.5 max-w-[12rem] text-[13px] leading-snug text-flow-slate">
                  Adjust the vibration level for your walking cues.
                </div>
              </div>
              <div className="text-[28px] font-black text-flow-ink">{draft.motorIntensity}%</div>
            </div>
            <div className="mt-3">
              <Slider
                value={draft.motorIntensity}
                min={0}
                max={100}
                step={25}
                ticks={[0, 25, 50, 75, 100]}
                ariaLabel="Motor intensity"
                onChange={(v) => patch({ motorIntensity: v })}
              />
            </div>
          </div>

          <div className="mt-3 rounded-3xl bg-white p-4 shadow-card">
            <div className="text-[18px] font-extrabold text-flow-ink">Vibration Length</div>
            <div className="mt-0.5 text-[13px] leading-snug text-flow-slate">
              Adjust the vibration duration to fit your walking pace.
            </div>
            <div className="mt-3">
              <Slider
                value={draft.vibrationLength}
                min={1}
                max={3}
                step={0.5}
                ticks={["1.00s", "1.50s", "2.00s", "2.50s", "3.00s"]}
                ariaLabel="Vibration length"
                onChange={(v) => patch({ vibrationLength: v })}
              />
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-flow-track/60 pt-3">
              <div>
                <div className="text-[16px] font-extrabold text-flow-ink">Buzz until I ease off</div>
                <div className="mt-0.5 text-[13px] leading-snug text-flow-slate">
                  Vibrate until you lift your foot.
                </div>
              </div>
              <Toggle
                checked={draft.buzzUntilEaseOff}
                onChange={(v) => patch({ buzzUntilEaseOff: v })}
                label="Buzz until I ease off"
              />
            </div>
          </div>

          {/* Trigger */}
          <SectionLabel>Trigger</SectionLabel>
          <div className="rounded-3xl bg-white p-4 shadow-card">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[18px] font-extrabold text-flow-ink">Touch Sensitivity</div>
                <div className="mt-0.5 max-w-[13rem] text-[13px] leading-snug text-flow-slate">
                  Adjust how much force is needed to trigger a walking cue.
                </div>
              </div>
              <div className="text-[28px] font-black text-flow-ink">{draft.touchSensitivity}%</div>
            </div>
            <div className="mt-3">
              <Slider
                value={draft.touchSensitivity}
                min={0}
                max={100}
                step={25}
                ticks={[0, 25, 50, 75, 100]}
                ariaLabel="Touch sensitivity"
                onChange={(v) => patch({ touchSensitivity: v })}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => setDraft({ ...DEFAULTS })}
            className="mt-4 flex items-center gap-2 text-[14px] font-bold text-flow-danger"
          >
            <RestartIcon size={20} />
            Reset to default
          </button>
        </div>

        {!hideSaveBar && (
          <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-flow-bg via-flow-bg to-transparent px-5 pb-6 pt-3">
            <button
              type="button"
              onClick={() => onSave(draft)}
              className="w-full rounded-full bg-flow-primary py-4 text-[16px] font-bold text-white shadow-card active:bg-flow-primaryDark transition"
            >
              {saveLabel}
            </button>
          </div>
        )}
      </div>
    </PhoneFrame>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-2 mt-5 text-[12px] font-bold uppercase tracking-wide text-flow-muted">
      {children}
    </div>
  );
}

function PatternCard({
  id,
  name,
  subtitle,
  selected,
  onSelect,
}: {
  id: HapticPatternId;
  name: string;
  subtitle: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`relative rounded-2xl border-2 bg-white p-3 text-left shadow-soft transition active:scale-[0.98] ${
        selected ? "border-flow-primary" : "border-transparent"
      }`}
    >
      {selected && (
        <span className="absolute right-2 top-2 grid h-5 w-5 place-items-center rounded-full text-white">
          <CheckIcon size={20} />
        </span>
      )}
      <Waveform pattern={id} className="w-full h-auto" />
      <div className="mt-2 text-[16px] font-extrabold text-flow-ink">{name}</div>
      <div className="text-[12px] font-semibold text-flow-muted">{subtitle}</div>
    </button>
  );
}
