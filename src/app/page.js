import Image from "next/image";
import * as React from "react";
import Home from "./components/Home";
import bg from "./../../public/kids-bg-tile.png";

export default function App() {
  return (
    <main
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundRepeat: "repeat",
      }}
    >
      <Home />
    </main>
  );
}
