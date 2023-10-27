"use client";
import { useState, useEffect } from "react";
import { Slider, Button } from "@mantine/core";
import data from "./../api/data/world_cities_list.json";
export default function Page() {
  const [selectedTime, setSelectedTime] = useState(0);
  const [randomCity, setRandomCity] = useState(String);
  const [score, setScore] = useState(0);
  const [prevScore, setPrevScore] = useState<number>(0);
  const [showMe, setShowMe] = useState(Boolean);
  const [hideMe, setHideMe] = useState(Boolean);
  const [showResult, setShowResult] = useState(Boolean);
  const [gameCounter, setGameCounter] = useState(0);
  const [scoreChanged, setScoreChanged] = useState(false);
  const cities = Object.keys(data[0]);

  function beginGame() {
    setShowMe(true);
    setHideMe(true);
    setShowResult(false);
    setRandomCity(cities[Math.floor(Math.random() * cities.length)]);
    setGameCounter(0);
    setScore(0);
    setPrevScore(0);
  }
  function endGame() {
    setShowMe(false);
    setShowResult(true);
  }
  function getRandomCity() {
    setPrevScore(score);
    // @ts-ignore
    let randomCityTime = data[0][randomCity] * 240;
    let maxScore = 1000;
    let maxDist = 14400;
    let minDist = 1800;
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
    if (gameCounter >= 4) {
      endGame();
    }
    setSelectedTime(0);
    setGameCounter(gameCounter + 1);
    setRandomCity(cities[Math.floor(Math.random() * cities.length)]);
    setScoreChanged(true);
  }
  useEffect(() => {
    if (scoreChanged) {
      setTimeout(() => {
        setScoreChanged(false);
      }, 500);
    }
  }, [scoreChanged]);
  return (
    <div className="container">
      <div className="background" />
      <div className="biggerBox" style={{ display: hideMe ? "none" : "block" }}>
        <h1> Guess the timezone!</h1>
        <Button onClick={beginGame}>Start Game</Button>
      </div>
      <div className="biggerBox" style={{ display: showMe ? "block" : "none" }}>
        <div
          style={{
            justifyContent: "space-between",
            display: "flex",
          }}
          className={
            scoreChanged ? "score-transition changed" : "score-transition"
          }
        >
          <span>
            Current score: {score.toFixed(0)} (+{(score - prevScore).toFixed(0)}
            )
          </span>
          <div>Game count: {gameCounter}</div>
        </div>
        <h1> Guess the timezone!</h1>
        <h2 style={{ paddingBottom: "20px" }}> City is {randomCity}</h2>{" "}
        <div
          style={{
            width: "70%",
            position: "absolute",
            left: "50%",
            transform: "translate(-50%,-100%)",
            padding: "10px",
          }}
        >
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
        </div>
        <h2 style={{ paddingTop: "20px" }}>
          Selected time is {selectedTime} seconds
        </h2>
        <h2>
          ({(selectedTime / 60).toFixed(3)} minutes or{" "}
          {(selectedTime / 3600).toFixed(3)} hours)
        </h2>
        <Button onClick={getRandomCity}> Next city</Button>
      </div>
      <div
        className="biggerBox"
        style={{ display: showResult ? "block" : "none" }}
      >
        <h1> Guess the timezone!</h1>
        <h2>Your final score is {score.toFixed(0)}</h2>
        <Button onClick={beginGame}> Try again!</Button>
      </div>
    </div>
  );
}
