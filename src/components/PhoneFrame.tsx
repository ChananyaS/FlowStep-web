import type { ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
  bg?: string;
}

export default function PhoneFrame({ children, bg = "#e9f1f3" }: PhoneFrameProps) {
  return (
    <div className="h-full flex flex-col" style={{ backgroundColor: bg }}>
      {children}
    </div>
  );
}
