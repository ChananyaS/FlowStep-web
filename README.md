# FlowStep — Web

Companion web app for **FlowStep**, a walking-support ankle band. The app lets
a user pair their band (via QR scan or a 6-digit device code) and then monitor
and personalise it — battery, alert rules, and the haptic cueing pattern.

Built as a faithful, fully-functional web port of the mobile product designs,
rendered inside an on-screen phone frame so it reads 1:1 with the mockups.

## Tech stack

- **React 18** + **TypeScript**
- **Vite** (dev server / build)
- **Tailwind CSS** for styling (custom `flow` brand palette)
- **React Router** for navigation
- App state in a typed **React Context** (`DeviceContext`), persisted to
  `localStorage` so a refresh keeps you on the right screen
- All UI icons are inline **SVG** components (no icon dependency); the brand
  logo and haptic waveforms are drawn as SVG too

## Getting started

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # typecheck + production build
npm run preview  # preview the production build
```

> Node 18+ recommended.

## Sitemap / navigation

The routes mirror the flow diagram in the designs:

```
/                     Splash            → auto-routes to /register (or /device if already paired)
/register             Register your band
  ├─ /register/scan   Scan QR code      (scanning → success → Continue)
  └─ /register/code   Enter device code (6-digit entry → Register)
/success              You're all set    → Go to my device
/device               Device dashboard  (Today · Connected · Battery · Health · Alerts)
  └─ /device/haptic   Haptic Pattern    (pattern picker · intensity · length · sensitivity)
```

Cross-links match the mockups:

- **Scan QR** ⇄ **Enter device code** ("Enter the code instead" / "Scan QR code instead")
- **Continue / Register** → **You're all set** → **Go to my device** → **Dashboard**
- Dashboard **Haptic Pattern** row → **Haptic Pattern** screen → back to dashboard
- Dashboard **Forget device** → returns to **Register**; **Reconnect** re-syncs

## Functionality

- **QR scan** simulates camera recognition (scanning spinner → success check).
- **Device code** has 6 auto-advancing inputs with paste and backspace handling;
  Register is disabled until all 6 digits are filled.
- **Dashboard** toggles (Pause While Resting, Quiet Hours, Phone Notification,
  Charge Reminder) and the Quiet Hours time steppers are all live and persisted.
- **Haptic Pattern** screen edits a local draft (pattern, motor intensity,
  vibration length, buzz-until-ease-off, touch sensitivity); **Test on device**
  triggers `navigator.vibrate` where supported; **Reset to default** restores
  defaults; **Save Changes** commits the draft and returns to the dashboard.

## Project structure

```
src/
  main.tsx                 app entry + providers
  App.tsx                  routes
  index.css                Tailwind layers + range/animation styles
  types.ts                 domain types
  context/DeviceContext.tsx global state (persisted)
  data/hapticPatterns.ts   pattern catalogue
  components/
    PhoneFrame.tsx StatusBar.tsx TopBar.tsx ProductImage.tsx icons.tsx
    ui/ Button.tsx Toggle.tsx Slider.tsx
  pages/
    Splash.tsx Register.tsx ScanQR.tsx EnterCode.tsx
    Success.tsx Device.tsx HapticPattern.tsx
public/
  favicon.svg
  assets/Product.png       product photo (see public/assets/README.txt)
```
