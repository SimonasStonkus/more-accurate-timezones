"use client";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import Link from "next/link";
import ClockBackground from "./components/ClockBackground";

export default function Page() {
  const [longitude, setLongitude] = useState(String);
  const [longitudeMinutes, setLongitudeMinutes] = useState(String);
  const [longitudeHours, setLongitudeHours] = useState(String);
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
        console.log(position.coords.longitude);
        setShowMe(true);
        if (position.coords.longitude < 0) {
          setLongitude((position.coords.longitude * 240).toFixed(3));
          setLongitudeMinutes(
            ((position.coords.longitude * 240) / 60).toFixed(3)
          );
          setLongitudeHours(
            ((position.coords.longitude * 240) / 60 / 60).toFixed(3)
          );
        } else {
          setLongitude("+" + (position.coords.longitude * 240).toFixed(3));
          setLongitudeMinutes(
            "+" + ((position.coords.longitude * 240) / 60).toFixed(3)
          );
          setLongitudeHours(
            "+" + ((position.coords.longitude * 240) / 60 / 60).toFixed(3)
          );
        }
      });
    }
  }
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <div className="container">
      <ClockBackground />
      <div className="About">
        <Button onClick={open} color="orange">
          About
        </Button>
      </div>
      <div className="Game">
        <Link href="/game">
          <Button color="orange">Try the game!</Button>
        </Link>
      </div>
      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        centered
        size="auto"
      >
        <h2> The why</h2>
        <h3>
          Everyone knows that working with timezones is frustrating. From
          scheduling meetings, to figuring out when your flight lands, to
          programming, the arbitrary lines chosen by governments cause headaches
          for everyone.
          <br />
          I mean does it realy make sense that Nepal is a half hour ahead of
          India, despite being at the same-ish longitude? Or that the Spanish
          government decided that they will be in GMT+1, despite most of the
          country lying west of Greenwich?
          <br />
          It is hard to think of a timezone decision made by a government that
          makes sense, and so, I propose a new paradigm for timezones, ones
          calculated entirely based on your longitudinal position.
        </h3>
        <h2> The how </h2>
        <h3>
          Built using Next.js and the inbuilt navigator.geolocation API, buttons
          from Mantine, favicon from icons8, hosted on Vercel
        </h3>
        <h2> The who </h2>
        <h3>
          I am Simonas Stonkus, an Astrophysicist turned software developer,
          currently tackling web development through dumb projects like this
          one.
        </h3>
      </Modal>
      <div className="box">
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
          Your timezone is GMT {longitude} seconds
        </h3>
        <h3
          id="timezone"
          style={{
            display: showMe ? "block" : "none",
          }}
        >
          {" "}
          Or GMT {longitudeMinutes} minutes
        </h3>
        <h3
          id="timezone"
          style={{
            display: showMe ? "block" : "none",
          }}
        >
          {" "}
          Or GMT {longitudeHours} hours
        </h3>
      </div>
    </div>
  );
}
