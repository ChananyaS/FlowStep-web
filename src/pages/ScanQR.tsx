import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneFrame from "../components/PhoneFrame";
import TopBar from "../components/TopBar";
import Button from "../components/ui/Button";
import { CheckIcon } from "../components/icons";
import { useDevice } from "../context/DeviceContext";

export default function ScanQR() {
  const navigate = useNavigate();
  const { registerDevice } = useDevice();
  const [scanned, setScanned] = useState(false);

  // Simulate the camera recognising the QR code.
  useEffect(() => {
    const t = setTimeout(() => setScanned(true), 2200);
    return () => clearTimeout(t);
  }, []);

  function handleContinue() {
    registerDevice("FS-001");
    navigate("/success");
  }

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col">
        <TopBar eyebrow="Register Device" title="Scan QR code" backTo="/register" />

        <div className="flex flex-1 flex-col px-6">
          {/* Camera viewport */}
          <div className="relative mt-2 aspect-square w-full overflow-hidden rounded-[28px] bg-[#5f6770]">
            {!scanned ? (
              <>
                {/* corner guides */}
                <span className="absolute left-8 top-8 h-10 w-10 rounded-tl-2xl border-l-[3px] border-t-[3px] border-flow-primary/70" />
                <span className="absolute right-8 top-8 h-10 w-10 rounded-tr-2xl border-r-[3px] border-t-[3px] border-flow-primary/70" />
                <span className="absolute bottom-8 left-8 h-10 w-10 rounded-bl-2xl border-b-[3px] border-l-[3px] border-flow-primary/70" />
                <span className="absolute bottom-8 right-8 h-10 w-10 rounded-br-2xl border-b-[3px] border-r-[3px] border-flow-primary/70" />
              </>
            ) : (
              <div className="absolute inset-0 grid place-items-center">
                <span className="grid h-28 w-28 animate-flow-pop place-items-center rounded-full text-white">
                  <CheckIcon />
                </span>
              </div>
            )}
          </div>

          {/* Action */}
          <div className="mt-6">
            {!scanned ? (
              <Button disabled className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 animate-flow-spin rounded-full border-2 border-white/40 border-t-white" />
                Scanning…
              </Button>
            ) : (
              <Button variant="success" onClick={handleContinue}>
                Continue
              </Button>
            )}
          </div>

          <button
            type="button"
            onClick={() => navigate("/register/code")}
            className="mx-auto mt-4 text-[14px] font-semibold text-flow-muted hover:text-flow-slate"
          >
            Enter the code instead
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}
