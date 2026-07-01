import type { HapticPatternId } from "../types";

import chevronImg from "../assets/icons/glyphs_chevron-bold.svg";
import checkImg from "../assets/icons/icon-park-solid_check-one.svg";
import sleepImg from "../assets/icons/icon-park-solid_sleep.svg";
import batteryImg from "../assets/icons/mingcute_battery-fill.svg";
import questionImg from "../assets/icons/mingcute_question-fill.svg";
import playImg from "../assets/icons/mynaui_play-solid.png";
import plantImg from "../assets/icons/cil_plant.svg";
import connectedImg from "../assets/icons/connected.svg";
import keyboardImg from "../assets/icons/solar_keyboard-outline.svg";
import restartImg from "../assets/icons/solar_restart-circle-bold.svg";
import scanImg from "../assets/icons/tabler_scan.svg";
import clockImg from "../assets/icons/uis_clock.svg";
import footprintImg from "../assets/icons/material-symbols-light_footprint.svg";
import walkingImg from "../assets/icons/fa7-solid_walking.svg";

import singlePulseImg from "../assets/icons/single-pulse.svg";
import doubleTapImg from "../assets/icons/double-tap.svg";
import escalatingImg from "../assets/icons/escalating.svg";
import heartbeatImg from "../assets/icons/heartbeat.svg";
import sosImg from "../assets/icons/sos.svg";
import continuousImg from "../assets/icons/continuous.svg";

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
export function FootprintIcon(p: IconProps) { return <Img src={footprintImg} {...p} />; }
export function WalkingIcon(p: IconProps) { return <Img src={walkingImg} {...p} />; }

export function CheckIcon({ size = 120, ...p }: IconProps) {
  return <Img src={checkImg} size={size} {...p} />;
}

export function ChevronRight({ size = 24, className }: IconProps) {
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

export function ChevronLeft({ size = 24, className }: IconProps) {
  return (
    <img
      src={chevronImg}
      width={size}
      height={size}
      className={className}
      alt=""
      draggable={false}
      style={{ transform: "scaleX(1)" }}
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
