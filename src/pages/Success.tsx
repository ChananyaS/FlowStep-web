import { useNavigate } from "react-router-dom";
import PhoneFrame from "../components/PhoneFrame";
import Button from "../components/ui/Button";
import { CheckIcon } from "../components/icons";
import productLogoImg from "../assets/images/Product-logo.svg";
import { useDevice } from "../context/DeviceContext";

export default function Success() {
  const navigate = useNavigate();
  const { state } = useDevice();

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col px-6 pt-10">
        <div className="flex flex-col items-center">
          <span className="grid h-24 w-24 animate-flow-pop place-items-center rounded-full text-white">
            <CheckIcon />
          </span>
          <h1 className="mt-6 text-[32px] font-extrabold text-flow-ink">
            You're all set
          </h1>
          <p className="mx-auto mt-2 max-w-[18rem] text-center text-[15px] leading-snug text-flow-slate">
            FlowStep is connected. Put on your band to start walking support.
          </p>
        </div>

        <div className="mt-10 flex items-center gap-4 rounded-3xl bg-white p-4 shadow-card">
          <img src={productLogoImg} alt="FlowStep" width={46} height={46} draggable={false} />
          <div>
            <div className="text-[17px] font-extrabold text-flow-ink">
              Registered FlowStep
            </div>
            <div className="text-[13px] font-semibold text-flow-muted">
              {state.deviceId}
            </div>
          </div>
        </div>

        <div className="mt-10">
          <Button onClick={() => navigate("/setup")}>Set up device</Button>
        </div>
      </div>
    </PhoneFrame>
  );
}
