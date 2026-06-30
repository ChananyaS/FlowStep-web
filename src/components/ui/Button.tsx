import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "success" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

const STYLES: Record<Variant, string> = {
  primary:
    "bg-flow-primary text-white hover:bg-flow-primaryDark active:bg-flow-primaryDark disabled:opacity-50",
  success:
    "bg-flow-success text-white hover:brightness-95 active:brightness-90 disabled:opacity-50",
  ghost: "bg-transparent text-flow-slate hover:text-flow-ink",
};

export default function Button({
  variant = "primary",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`w-full rounded-full py-4 text-[16px] font-bold transition disabled:cursor-not-allowed ${STYLES[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
