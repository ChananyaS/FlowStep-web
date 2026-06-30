import { Navigate, Route, Routes } from "react-router-dom";
import Splash from "./pages/Splash";
import Register from "./pages/Register";
import ScanQR from "./pages/ScanQR";
import EnterCode from "./pages/EnterCode";
import Success from "./pages/Success";
import SetupDevice from "./pages/SetupDevice";
import Device from "./pages/Device";
import HapticPattern from "./pages/HapticPattern";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/register" element={<Register />} />
      <Route path="/register/scan" element={<ScanQR />} />
      <Route path="/register/code" element={<EnterCode />} />
      <Route path="/success" element={<Success />} />
      <Route path="/setup" element={<SetupDevice />} />
      <Route path="/device" element={<Device />} />
      <Route path="/device/haptic" element={<HapticPattern />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
