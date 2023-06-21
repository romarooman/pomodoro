import ReactSlider from "react-slider";

import style from "./SettingsPage.module.css";
import { useContext } from "react";
import { SettingsContext } from "../../SettingsContext";
import { BackButton } from "../../Buttons/BackButton";

const SettingsPage = () => {
  const settingsInfo = useContext(SettingsContext);

 
  return (
    <div className={style.contener}>
      <label>Время фокуса: {settingsInfo.workMinutes}:00</label>
      <ReactSlider
        className={style.slider}
        thumbClassName={style.thumb}
        trackClassName={style.track}
        value={settingsInfo.workMinutes}
        onChange={(newValue) => settingsInfo.SetWorkMinutes(newValue)}
        min={1}
        max={120}
      />
      <label>Время отдыха: {settingsInfo.breakMinutes}:00</label>
      <ReactSlider
        className={`${style.slider} ${style.green}`}
        thumbClassName={style.thumb}
        trackClassName={style.track}
        value={settingsInfo.breakMinutes}
        onChange={(newValue) => settingsInfo.SetBreakMinutes(newValue)}
        min={1}
        max={120}
      />
      <div className={style.buttoncontener}>
        <BackButton onClick={() => settingsInfo.setShowSettings(false)} />
      </div>
    </div>
  );
};

export { SettingsPage };
