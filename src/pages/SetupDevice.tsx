import { useNavigate } from "react-router-dom";
import { HapticEditor } from "../components/HapticEditor";
import { useDevice } from "../context/DeviceContext";

export default function SetupDevice() {
  const navigate = useNavigate();
  const { state, updateHaptic } = useDevice();

  return (
    <HapticEditor
      eyebrow="Register Device"
      title="Set Up Device"
      backTo="/success"
      saveLabel="Continue"
      initialSettings={state.haptic}
      onSave={(settings) => {
        updateHaptic(settings);
        navigate("/device");
      }}
    />
  );
}
