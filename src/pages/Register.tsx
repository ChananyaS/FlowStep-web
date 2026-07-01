import { useNavigate } from "react-router-dom";
import PhoneFrame from "../components/PhoneFrame";
import {
  ChevronRight,
  KeyboardIcon,
  QuestionIcon,
  ScanIcon,
} from "../components/icons";
import productLogoImg from "../assets/images/Product-logo.svg";

interface OptionProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  onClick: () => void;
}

function OptionCard({ icon, title, desc, onClick }: OptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-4 rounded-3xl bg-white p-4 text-left shadow-card active:scale-[0.99] transition"
    >
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-flow-field text-flow-primary">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[18px] font-extrabold text-flow-ink">
          {title}
        </span>
        <span className="block text-[13px] leading-snug text-flow-slate">
          {desc}
        </span>
      </span>
      <ChevronRight size={20} className="shrink-0 text-flow-muted" />
    </button>
  );
}

export default function Register() {
  const navigate = useNavigate();

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col px-6 pt-2">
        <div className="mt-6 flex justify-center">
          <img src={productLogoImg} alt="FlowStep" width={150} height={150} draggable={false} />
        </div>

        <h1 className="mt-6 text-center text-[34px] font-extrabold leading-tight text-flow-ink">
          Register your band
        </h1>
        <p className="mx-auto mt-2 max-w-[18rem] text-center text-[15px] leading-snug text-flow-slate">
          Pair your FlowStep to start improving your walking confidence. Choose
          how you'd like to connect.
        </p>

        <div className="mt-7 space-y-4">
          <OptionCard
            icon={<ScanIcon size={26} />}
            title="Scan QR Code"
            desc="Quickly pair your device using the camera."
            onClick={() => navigate("/register/scan")}
          />
          <OptionCard
            icon={<KeyboardIcon size={26} />}
            title="Enter Device Code"
            desc="Type in the 6-digit code found on your device."
            onClick={() => navigate("/register/code")}
          />
        </div>

        <button
          type="button"
          className="mx-auto mt-6 flex items-center gap-1.5 text-[14px] font-semibold text-flow-slate"
        >
          <QuestionIcon size={18} className="text-flow-primary" />
          Can't find your code?
        </button>
      </div>
    </PhoneFrame>
  );
}
