"use client";
import classes from "./ClockBackground.module.css";
import { useState, useEffect, memo } from "react";

const ClockBackground = memo(function ClockBackground() {
  const [rotations, setRotations] = useState<number[]>([]);

  useEffect(() => {
    function handleResize() {
      setRotations(
        Array.from({
          length:
            Math.floor(window.innerWidth / 190) *
            Math.floor(document.documentElement.clientHeight / 190),
        })
      );
    }
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className={classes.container}>
        {rotations.map((rotate, index) => (
          <div
            key={index}
            className={classes.clock}
            style={{
              transform: `rotate(${index}deg)`,
            }}
          >
            <div style={{ transform: `rotate(${-index}deg)` }}>
              <div className={`${classes.marker} ${classes.top}`} />
            </div>
            <div style={{ transform: `rotate(${-index}deg)` }}>
              <div className={`${classes.marker} ${classes.right}`} />
            </div>
            <div style={{ transform: `rotate(${-index}deg)` }}>
              <div className={`${classes.marker} ${classes.bottom}`} />
            </div>
            <div style={{ transform: `rotate(${-index}deg)` }}>
              <div className={`${classes.marker} ${classes.left}`} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
});

export default ClockBackground;
