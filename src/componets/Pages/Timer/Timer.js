import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import style from "./Timer.module.css";
import { PlayButton } from "../../Buttons/PlayButton";
import { PauseButton } from "../../Buttons/PauseButton";
import { SettingsButton } from "../../Buttons/SettingsButton";
import { useContext, useEffect, useRef, useState } from "react";
import { SettingsContext } from "../../SettingsContext";

const red = "#f54e4e";
const green = "#4aec8c";

const Timer = () => {
  const settingsInfo = useContext(SettingsContext);
  
  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState("work"); //null, pause or break
  const [secondsLeft, setSecondsLeft] = useState(0);

  const secondLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  const tick = () => {
    secondLeftRef.current--;
    setSecondsLeft(secondLeftRef.current);
  };

  const initTimer = () => {
    secondLeftRef.current = settingsInfo.workMinutes * 60;
    setSecondsLeft(secondLeftRef.current);
  };

  const switchMode = () => {
    const nextMode = modeRef.current === "work" ? "break" : "work";
    const nextSeconds =
      (nextMode === "work"
        ? settingsInfo.workMinutes
        : settingsInfo.breakMinutes) * 60;
    setMode(nextMode);
    modeRef.current = nextMode;
    setSecondsLeft(nextSeconds);
    secondLeftRef.current = nextSeconds;
  };

  useEffect(() => {
    initTimer();

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (secondLeftRef.current === 0) {
        return switchMode();
      }

      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [settingsInfo]);

  const totalSeconds =
    mode === "work"
      ? settingsInfo.workMinutes * 60
      : settingsInfo.breakMinutes * 60;
  const parcentage = Math.round((secondsLeft / totalSeconds) * 100);

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if (seconds < 10) seconds = "0" + seconds;
  
  return (
    <div>
      <CircularProgressbar
        value={parcentage}
        text={minutes + ":" + seconds}
        styles={buildStyles({
          textColor: "#fff",
          pathColor: mode === "work" ? red : green,
          tailColor: "rgba(255,255,255,0)",
        })}
      />
      <div className={style.contener_button}>
        {isPaused ? (
          <PlayButton
            onClick={() => {
              setIsPaused(false);
              isPausedRef.current = false;
            }}
          />
        ) : (
          <PauseButton
            onClick={() => {
              setIsPaused(true);
              isPausedRef.current = true;
            }}
          />
        )}
      </div>
      <div className={style.contener_button}>
        <SettingsButton onClick={() => settingsInfo.setShowSettings(true)} />
      </div>
    </div>
  );
};

export { Timer };
