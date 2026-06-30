interface ToggleProps {
  checked: boolean;
  onChange: (next: boolean) => void;
  label?: string;
}

/** iOS-style switch used for all on/off settings. */
export default function Toggle({ checked, onChange, label }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-[30px] w-[52px] shrink-0 items-center rounded-full transition-colors duration-200 ${
        checked ? "bg-flow-primary" : "bg-flow-track"
      }`}
    >
      <span
        className={`inline-block h-[26px] w-[26px] transform rounded-full bg-white shadow-soft transition-transform duration-200 ${
          checked ? "translate-x-[24px]" : "translate-x-[2px]"
        }`}
      />
    </button>
  );
}
