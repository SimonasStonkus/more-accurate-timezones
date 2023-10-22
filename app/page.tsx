"use client";
import { useState } from "react";
import { Button } from "@mantine/core";

export default function Page() {
  const [longitude, setLongitude] = useState(String);
  const [longitudeMinutes, setLongitudeMinutes] = useState(String);
  const [longitudeHours, setLongitudeHours] = useState(String);

  function getPosition() {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log(position.coords.longitude);
      if (position.coords.longitude < 0) {
        setLongitude((position.coords.longitude * 240).toFixed(6));
        setLongitudeMinutes(
          ((position.coords.longitude * 240) / 60).toFixed(6)
        );
        setLongitudeHours(
          ((position.coords.longitude * 240) / 60 / 60).toFixed(6)
        );
      } else {
        setLongitude("+" + (position.coords.longitude * 240).toFixed(6));
        setLongitudeMinutes(
          "+" + ((position.coords.longitude * 240) / 60).toFixed(6)
        );
        setLongitudeHours(
          "+" + ((position.coords.longitude * 240) / 60 / 60).toFixed(6)
        );
      }
    });
  }
  return (
    <div className="container">
      <div className="background" />
      <div className="box">
        <h2>Calculate your seconds from GMT timezone</h2>
        <Button onClick={getPosition}>Retrieve your position</Button>
        <h3> Your timezone is GMT {longitude} seconds</h3>
        <h3> Or GMT {longitudeMinutes} minutes</h3>
        <h3> Or GMT {longitudeHours} hours</h3>
      </div>
    </div>
  );
}
