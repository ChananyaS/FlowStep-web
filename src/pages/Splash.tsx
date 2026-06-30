import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PhoneFrame from "../components/PhoneFrame";
import productLogoImg from "../assets/images/Product-logo.png";
import { useDevice } from "../context/DeviceContext";

/** Launch screen — shows the brand, then routes onward. */
export default function Splash() {
  const navigate = useNavigate();
  const { state } = useDevice();

  useEffect(() => {
    const t = setTimeout(() => {
      navigate(state.registered ? "/device" : "/register", { replace: true });
    }, 1700);
    return () => clearTimeout(t);
  }, [navigate, state.registered]);

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col items-center justify-center">
        <div className="animate-flow-pop rounded-[28px] bg-gradient-to-b from-white to-[#dbe8ef] p-8 shadow-card">
          <img src={productLogoImg} alt="FlowStep" width={200} height={200} draggable={false} />
        </div>
      </div>
    </PhoneFrame>
  );
}
