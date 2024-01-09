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
            Math.floor(window.innerHeight / 190),
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
        {rotations.map((rotation, index) => (
          <div
            key={index}
            className={classes.clock}
            style={{
              transform: `rotate(${index}deg)`,
              filter: "blur(1.5px)",
            }}
          ></div>
        ))}
      </div>
    </>
  );
});

export default ClockBackground;
