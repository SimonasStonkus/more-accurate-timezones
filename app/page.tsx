import { Button } from "@mantine/core";
import Link from "next/link";
import About from "./components/About/About";
import Home from "./components/Home/Home";

export default function Page() {
  return (
    <>
      <Link href="/game" className="Game" style={{ textDecoration: "none" }}>
        <Button color="orange">Try the game!</Button>
      </Link>
      <About />
      <Home />
    </>
  );
}
