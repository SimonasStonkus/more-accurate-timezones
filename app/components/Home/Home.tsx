"use client";
import classes from "./Home.module.css";
import { Button } from "@mantine/core";
import { useState } from "react";

function Home() {
  type Time = { seconds?: string; minutes?: string; hours?: string };

  const [longitudeTime, setLongitudeTime] = useState<Time>({});
  const [showMe, setShowMe] = useState(Boolean);
  const [showMeError, setShowMeError] = useState(Boolean);

  function getPosition() {
    navigator.permissions.query({ name: "geolocation" }).then((result) => {
      if (result.state === "denied") {
        setShowMeError(true);
      }
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setShowMe(true);

        if (position.coords.longitude < 0) {
          setLongitudeTime({
            seconds: (position.coords.longitude * 240).toFixed(3),
            minutes: ((position.coords.longitude * 240) / 60).toFixed(3),
            hours: ((position.coords.longitude * 240) / 60 / 60).toFixed(3),
          });
        } else {
          setLongitudeTime({
            seconds: "+" + (position.coords.longitude * 240).toFixed(3),
            minutes: "+" + ((position.coords.longitude * 240) / 60).toFixed(3),
            hours:
              "+" + ((position.coords.longitude * 240) / 60 / 60).toFixed(3),
          });
        }
      });
    }
  }
  return (
    <div className={classes.box}>
      <h2>Calculate your seconds from GMT timezone</h2>
      <Button onClick={getPosition}>Retrieve your position</Button>
      <h3 style={{ color: "red", display: showMeError ? "block" : "none" }}>
        You must enable location services
      </h3>
      <h3
        id="timezone"
        style={{
          display: showMe ? "block" : "none",
        }}
      >
        {" "}
        Your timezone is GMT {longitudeTime["seconds"]} seconds
      </h3>
      <h3
        id="timezone"
        style={{
          display: showMe ? "block" : "none",
        }}
      >
        {" "}
        Or GMT {longitudeTime["minutes"]} minutes
      </h3>
      <h3
        id="timezone"
        style={{
          display: showMe ? "block" : "none",
        }}
      >
        {" "}
        Or GMT {longitudeTime["hours"]} hours
      </h3>
    </div>
  );
}

export default Home;
