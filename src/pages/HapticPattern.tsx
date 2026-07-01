
import { useNavigate } from "react-router-dom";
import { HapticEditor } from "../components/HapticEditor";
import { useDevice } from "../context/DeviceContext";
import { useState } from "react";
import type { HapticSettings } from "../types"; // นำเข้า Type ของจริงมาใช้

export default function HapticPattern() {
  const navigate = useNavigate();
  const { state, updateHaptic } = useDevice();
  
  // กำหนด Type ให้ State แบบเป๊ะๆ ไม่มี any
  const [bleCharacteristic, setBleCharacteristic] = useState<BluetoothRemoteGATTCharacteristic | null>(null);

  const connectBluetooth = async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ name: 'FlowStep_ESP32' }],
        optionalServices: ['19b10000-e8f2-537e-4f6c-d104768a1214']
      });
      const server = await device.gatt?.connect();
      const service = await server?.getPrimaryService('19b10000-e8f2-537e-4f6c-d104768a1214');
      const characteristic = await service?.getCharacteristic('19b10001-e8f2-537e-4f6c-d104768a1214');
      
      if (characteristic) {
        setBleCharacteristic(characteristic);
        alert("เชื่อมต่อกับอุปกรณ์ FlowStep สำเร็จ! ");
      }
    } catch (error) {
      console.error("Bluetooth Connection Error:", error);
    }
  };

  const sendIntensityToBoard = async (intensityValue: number) => {
    if (!bleCharacteristic) {
      console.log("ยังไม่ได้เชื่อมต่อบลูทูธ");
      return;
    }
    try {
      const data = new Uint8Array([intensityValue]);
      await bleCharacteristic.writeValue(data);
    } catch (error) {
      console.error("Send Error:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* ปุ่มกดเชื่อมต่อบลูทูธ */}
      <div className="p-4 bg-white flex justify-center border-b">
        <button 
          onClick={connectBluetooth} 
          className={`px-6 py-2 rounded-full text-white font-bold transition-colors ${bleCharacteristic ? 'bg-green-500' : 'bg-blue-600'}`}
        >
          {bleCharacteristic ? "✅ Connected to FlowStep" : "🔗 Connect Bluetooth Device"}
        </button>
      </div>

      <HapticEditor
        eyebrow="Customise Device"
        title="Haptic Pattern"
        backTo="/device"
        saveLabel="Save Changes"
        initialSettings={state.haptic}
        // กำหนด Type ของ settings ให้ตรงกับที่คุณเขียนไว้
        onSave={(settings: Partial<HapticSettings>) => {
          updateHaptic(settings);
          
          // ดึงค่า motorIntensity ตัวจริงส่งเข้าบอร์ด ESP32
          if (settings.motorIntensity !== undefined) {
             sendIntensityToBoard(settings.motorIntensity);
          }
          
          navigate("/device");
        }}
      />
    </div>
  );
}