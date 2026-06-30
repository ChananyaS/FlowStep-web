import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneFrame from "../components/PhoneFrame";
import TopBar from "../components/TopBar";
import Button from "../components/ui/Button";
import { QuestionIcon } from "../components/icons";
import { useDevice } from "../context/DeviceContext";

const LEN = 6;

export default function EnterCode() {
  const navigate = useNavigate();
  const { registerDevice } = useDevice();
  const [digits, setDigits] = useState<string[]>(Array(LEN).fill(""));
  const inputs = useRef<Array<HTMLInputElement | null>>([]);

  const code = digits.join("");
  const complete = code.length === LEN && digits.every((d) => d !== "");

  function setAt(i: number, value: string) {
    const clean = value.replace(/\D/g, "").slice(-1);
    setDigits((prev) => {
      const next = [...prev];
      next[i] = clean;
      return next;
    });
    if (clean && i < LEN - 1) inputs.current[i + 1]?.focus();
  }

  function onKeyDown(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      inputs.current[i - 1]?.focus();
    }
  }

  function onPaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, LEN);
    if (!text) return;
    const next = Array(LEN).fill("");
    for (let i = 0; i < text.length; i += 1) next[i] = text[i];
    setDigits(next);
    inputs.current[Math.min(text.length, LEN - 1)]?.focus();
  }

  function handleRegister() {
    if (!complete) return;
    // Format the typed code into the FS-xxx device id used across the app.
    registerDevice(`FS-${code.slice(0, 3)}`);
    navigate("/success");
  }

  return (
    <PhoneFrame>
      <div className="flex h-full flex-col">
        <TopBar
          eyebrow="Register Device"
          title="Enter device code"
          backTo="/register"
        />

        <div className="flex flex-1 flex-col px-6">
          <p className="text-[15px] text-flow-slate">
            Please enter the 6-digit code printed on the packaging.
          </p>

          <div className="mt-6 flex items-center justify-center gap-2">
            {Array.from({ length: LEN }).map((_, i) => (
              <div key={i} className="flex items-center">
                <input
                  ref={(el) => (inputs.current[i] = el)}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={1}
                  value={digits[i]}
                  onChange={(e) => setAt(i, e.target.value)}
                  onKeyDown={(e) => onKeyDown(i, e)}
                  onPaste={onPaste}
                  aria-label={`Digit ${i + 1}`}
                  className="h-14 w-12 rounded-2xl bg-flow-field text-center text-[22px] font-extrabold text-flow-ink shadow-soft outline-none ring-flow-primary/60 focus:ring-2"
                />
                {i === 2 && <span className="mx-1 h-[3px] w-3 rounded bg-flow-muted" />}
              </div>
            ))}
          </div>

          <button
            type="button"
            className="mx-auto mt-4 flex items-center gap-1.5 text-[14px] font-semibold text-flow-slate"
          >
            <QuestionIcon size={18} className="text-flow-primary" />
            Can't find your code?
          </button>

          <div className="mt-5">
            <Button onClick={handleRegister} disabled={!complete}>
              Register
            </Button>
          </div>

          <button
            type="button"
            onClick={() => navigate("/register/scan")}
            className="mx-auto mt-4 text-[14px] font-semibold text-flow-muted hover:text-flow-slate"
          >
            Scan QR code instead
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}
