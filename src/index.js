import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const urlParams = new URLSearchParams(window.location.search);
const pieceURL = urlParams.get("pieceURL");
const ema_expression = urlParams.get("ema_expression");
const measure_range = JSON.parse(decodeURIComponent(urlParams.get("measure_range")));

const root = createRoot(document.getElementById("root"));
root.render(
  <App
    pieceURL={pieceURL}
    ema_expression={ema_expression}
    measure_range={measure_range}
  />
);
