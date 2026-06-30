import type { HapticPatternId } from "../types";

import chevronImg from "../assets/icons/glyphs_chevron-bold.png";
import checkImg from "../assets/icons/icon-park-solid_check-one.png";
import sleepImg from "../assets/icons/icon-park-solid_sleep.png";
import batteryImg from "../assets/icons/mingcute_battery-fill.png";
import questionImg from "../assets/icons/mingcute_question-fill.png";
import playImg from "../assets/icons/mynaui_play-solid.png";
import plantImg from "../assets/icons/cil_plant.png";
import connectedImg from "../assets/icons/connected.png";
import keyboardImg from "../assets/icons/solar_keyboard-outline.png";
import restartImg from "../assets/icons/solar_restart-circle-bold.png";
import scanImg from "../assets/icons/tabler_scan.png";
import clockImg from "../assets/icons/uis_clock.png";

import singlePulseImg from "../assets/icons/single-pulse.png";
import doubleTapImg from "../assets/icons/double-tap.png";
import escalatingImg from "../assets/icons/escalaing.png";
import heartbeatImg from "../assets/icons/heartbeat.png";
import sosImg from "../assets/icons/sos.png";
import continuousImg from "../assets/icons/continuous.png";

type IconProps = { size?: number; className?: string };

function Img({ src, size = 24, className }: { src: string; size?: number; className?: string }) {
  return <img src={src} width={size} height={size} className={className} alt="" draggable={false} />;
}

export function ScanIcon(p: IconProps) { return <Img src={scanImg} {...p} />; }
export function KeyboardIcon(p: IconProps) { return <Img src={keyboardImg} {...p} />; }
export function QuestionIcon(p: IconProps) { return <Img src={questionImg} {...p} />; }
export function ClockIcon(p: IconProps) { return <Img src={clockImg} {...p} />; }
export function MoonIcon(p: IconProps) { return <Img src={sleepImg} {...p} />; }
export function BatteryIcon(p: IconProps) { return <Img src={batteryImg} {...p} />; }
export function LeafIcon(p: IconProps) { return <Img src={plantImg} {...p} />; }
export function ConnectedIcon(p: IconProps) { return <Img src={connectedImg} {...p} />; }
export function PlayIcon(p: IconProps) { return <Img src={playImg} {...p} />; }
export function RestartIcon(p: IconProps) { return <Img src={restartImg} {...p} />; }

export function CheckIcon({ size = 120, ...p }: IconProps) {
  return <Img src={checkImg} size={size} {...p} />;
}

export function ChevronRight(p: IconProps) { return <Img src={chevronImg} {...p} />; }

export function ChevronLeft({ size = 24, className }: IconProps) {
  return (
    <img
      src={chevronImg}
      width={size}
      height={size}
      className={className}
      alt=""
      draggable={false}
      style={{ transform: "scaleX(-1)" }}
    />
  );
}

export function MinusIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M6 12h12" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" />
    </svg>
  );
}

export function PlusIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 6v12M6 12h12" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" />
    </svg>
  );
}

const WAVE_IMAGES: Record<HapticPatternId, string> = {
  "single-pulse": singlePulseImg,
  "double-tap": doubleTapImg,
  escalating: escalatingImg,
  heartbeat: heartbeatImg,
  sos: sosImg,
  continuous: continuousImg,
};

export function Waveform({
  pattern,
  width = 90,
  height = 32,
  className,
}: {
  pattern: HapticPatternId;
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <img
      src={WAVE_IMAGES[pattern]}
      width={className ? undefined : width}
      height={className ? undefined : height}
      alt={pattern}
      draggable={false}
      className={className}
      style={{ objectFit: "contain" }}
    />
  );
}
