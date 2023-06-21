import { useState } from "react";
import { Timer } from "./componets/Pages/Timer";
import { SettingsPage } from "./componets/Pages/Settings";

import style from "./App.module.css";
import { SettingsContext } from "./componets/SettingsContext";

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, SetWorkMinutes] = useState(45);
  const [breakMinutes, SetBreakMinutes] = useState(15);
  return (
    <div className={style.main}>
      <SettingsContext.Provider
        value={{
          showSettings,
          setShowSettings,
          workMinutes,
          breakMinutes,
          SetWorkMinutes,
          SetBreakMinutes,
        }}
      >
        {showSettings ? <SettingsPage /> : <Timer />}
      </SettingsContext.Provider>
    </div>
  );
}

export default App;
