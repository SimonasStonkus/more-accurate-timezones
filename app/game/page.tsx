"use client";
import { useState } from "react";
import { Slider, Button } from "@mantine/core";
import data from "./../api/data/world_cities_list.json";
export default function Page() {
  const [selectedTime, setSelectedTime] = useState(0);
  const [randomCity, setRandomCity] = useState(String);
  const [cityTime, setCityTime] = useState(0);
  const [score, setScore] = useState(0);

  const cities = Object.keys(data[0]);
  function getRandomCity() {
    if (randomCity == "") {
      setRandomCity(cities[Math.floor(Math.random() * cities.length)]);
    } else {
      // @ts-ignore
      let randomCityTime = data[0][randomCity] * 240;
      let maxScore = 1000;
      let maxDist = 14400;
      let minDist = 3600;
      let timeDelta = Math.abs(randomCityTime - selectedTime);
      if (timeDelta < minDist) {
        setScore(score + 1000);
      } else if (timeDelta > maxDist) {
        setScore(score);
      } else {
        setScore(
          score + (maxScore * (timeDelta - maxDist)) / (minDist - maxDist)
        );
      }
      // @ts-ignore
      setSelectedTime(0);
      setRandomCity(cities[Math.floor(Math.random() * cities.length)]);
    }
  }
  //   console.log(getRandomCity());
  //   // @ts-ignore
  //   console.log(data[0][getRandomCity()]);
  return (
    <div className="container">
      <div className="background" />
      <div className="biggerBox">
        <h1> Guess the timezone!</h1>
        <h2> City is {randomCity}</h2>{" "}
        <Slider
          min={-43200}
          max={43200}
          value={selectedTime}
          onChange={setSelectedTime}
          color="blue"
          marks={[
            { value: -43200, label: "-43200" },
            { value: 0, label: "0" },
            { value: 43200, label: "43200" },
          ]}
        />
        <h2 style={{ minWidth: "65vw" }}>
          Selected time is {selectedTime} seconds
        </h2>
        <h2>
          ({(selectedTime / 60).toFixed(3)} minutes or{" "}
          {(selectedTime / 3600).toFixed(3)} hours)
        </h2>
        <h2>score is {score.toFixed(0)} </h2>
        <Button onClick={getRandomCity}> Next city</Button>
      </div>
    </div>
  );
}
