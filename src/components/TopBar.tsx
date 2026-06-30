import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "./icons";

interface TopBarProps {
  eyebrow?: string;
  title: string;
  /** Where the back button goes. Defaults to browser back. */
  backTo?: string;
}

export default function TopBar({ eyebrow, title, backTo }: TopBarProps) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-3 px-5 pt-6 pb-3">
      <button
        type="button"
        aria-label="Back"
        onClick={() => (backTo ? navigate(backTo) : navigate(-1))}
        className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-flow-ink shadow-soft active:scale-95 transition"
      >
        <ChevronLeft size={22} />
      </button>
      <div className="leading-tight">
        {eyebrow && (
          <div className="text-[12px] font-bold uppercase tracking-wide text-flow-muted">
            {eyebrow}
          </div>
        )}
        <div className="text-[22px] font-extrabold text-flow-ink">{title}</div>
      </div>
    </div>
  );
}
