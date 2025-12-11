import React, { useState } from "react";
import Welcome from "./Welcome";
import SwipeCat from "./SwipeCat";

export default function App() {
  const [started, setStarted] = useState(false);

  return (
    <>
      {started ? (
        <SwipeCat />
      ) : (
        <Welcome onStart={() => setStarted(true)} />
      )}
    </>
  );
}
