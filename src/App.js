// import React, { useEffect } from "react";
// import ReactDOM from "react-dom";
// import "./styles.css";
// import EmaMei from "./ema-mei.js";

// const verovio = require("verovio");
// console.log({ EmaMei, verovio });

// const urlParams = new URLSearchParams(window.location.search);
// const pieceURL = urlParams.get("pieceURL");
// const ema_expression = urlParams.get("ema_expression");
// const measure_range = JSON.parse(decodeURIComponent(urlParams.get("measure_range")));


// const App = ({ pieceURL, ema_expression, measure_range }) => {
//   useEffect(() => {
//     // Retrieve the arguments from the URL query parameters
    
// const fetchData = async () => {
//       const response = await fetch(pieceURL);
//       const meiXML = await response.text();

//       // Process EMA expression on the MEI data
//       const processor = EmaMei.withDocumentString(meiXML, ema_expression);
//       const highlightedMei = processor.getSelection();
//       const selectedIds = highlightedMei
//         .querySelector("annot[type=ema_highlight]")
//         .getAttribute("plist");

//       // Render MEI data to Verovio
//       const tk = new verovio.toolkit();
//       tk.setOptions({
//         scale: 50,
//         adjustPageWidth: true
//       });
//       tk.select(measure_range);
//       tk.redoLayout();
//       const svg = tk.renderData(
//         new XMLSerializer().serializeToString(highlightedMei),
//         {}
//       );

//       const meiEl = document.getElementById("mei");
//       meiEl.innerHTML = svg;
//       selectedIds.split(" ").map((id) => {
//         const eventEl = meiEl.querySelector(id);
//         eventEl.style.fill = "red";
//       });
//     };

//     fetchData();
//   }, [pieceURL, ema_expression, measure_range]);

//   return (
//     <div className="App" style={{ width: "400px" }}>
//       <h1>EMA Sandbox</h1>
//       <h2>Verovio Score:</h2>
//       <code id="mei" style={{ width: "400px" }}></code>
//       <div className="panel-body">
//         <div id="app" className="panel"></div>
//       </div>
//     </div>
//   );
// };



// ReactDOM.render(
//   <App
//     pieceURL={pieceURL}
//     ema_expression={ema_expression}
//     measure_range={measure_range}
//   />,
//   document.getElementById("root")
// );



// export default App;


import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import EmaMei from "./ema-mei.js";
import verovio from "verovio";
import { createRoot } from "react-dom/client";
import { render } from "react-dom";

const urlParams = new URLSearchParams(window.location.search);
const pieceURL = urlParams.get("pieceURL");
const ema_expression = urlParams.get("ema_expression");
const measure_range = JSON.parse(decodeURIComponent(urlParams.get("measure_range")));

const App = ({ pieceURL, ema_expression, measure_range }) => {
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(pieceURL);
      const meiXML = await response.text();

      // Process EMA expression on the MEI data
      const processor = await EmaMei.withDocumentString(meiXML, ema_expression);
      const highlightedMei = await processor.getSelection();
      const selectedIds = await highlightedMei
        .querySelector("annot[type=ema_highlight]")
        .getAttribute("plist");

      // Render MEI data to Verovio
      const tk = new verovio.toolkit();
      tk.setOptions({
        scale: 50,
        adjustPageWidth: true,
      });
       tk.select(measure_range);
      tk.redoLayout();
      
      const svg =  tk.renderData(
        new XMLSerializer().serializeToString(highlightedMei),
        {}
      );

      const meiEl =  document.getElementById("mei");
      meiEl.innerHTML = svg;
      selectedIds.split(" ").map((id) => {
        const eventEl =  meiEl.querySelector(id);
        eventEl.style.fill = "red";
      });
    };

     fetchData();
  }, [pieceURL, ema_expression, measure_range]);

  return (
    <div className="App" style={{ width: "400px" }}>
      <h1>EMA Sandbox</h1>
      <h2>Verovio Score:</h2>
      <div id="mei" style={{ width: "400px" }}></div>
      <div className="panel-body">
        <div id="app" className="panel"></div>
      </div>
    </div>
  );
};

createRoot(document.getElementById("root")).render(
  <App
    pieceURL={pieceURL}
    ema_expression={ema_expression}
    measure_range={measure_range}
  />
);



export default App;

