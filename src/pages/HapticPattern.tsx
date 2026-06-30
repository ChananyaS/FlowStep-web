import { useNavigate } from "react-router-dom";
import { HapticEditor } from "../components/HapticEditor";
import { useDevice } from "../context/DeviceContext";

export default function HapticPattern() {
  const navigate = useNavigate();
  const { state, updateHaptic } = useDevice();

  return (
    <HapticEditor
      eyebrow="Customise Device"
      title="Haptic Pattern"
      backTo="/device"
      saveLabel="Save Changes"
      initialSettings={state.haptic}
      onSave={(settings) => {
        updateHaptic(settings);
        navigate("/device");
      }}
    />
  );
}
