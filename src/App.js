// import "./styles.css";
// //import createVerovioModule from "verovio/dist/verovio-toolkit-wasm.js"
// //import { VerovioToolkit } from "verovio/esm"
// import EmaMei from "./ema-mei.js";
// const verovio = require("verovio");

// console.log({ EmaMei, verovio });

// // const pieceURL =
// //   "https://raw.githubusercontent.com/CRIM-Project/CRIM-online/master/crim/static/mei/MEI_4.0/CRIM_Mass_0002_2.mei";
// // document.addEventListener("DOMContentLoaded", (event) => {
// verovio.module.onRuntimeInitialized = () => {
//   let tk = new verovio.toolkit();
//   tk.setOptions({
//     scale: 50,
//     adjustPageWidth: true
//   });
  
//   // let ema_expression = "/4-5/3+5,3+5/@2-4+@2-all,@1+@1/highlight";
//   // let measure_range = { measureRange: "4-5" };

//   fetch(pieceURL)
//     .then((response) => response.text())
//     .then((meiXML) => {
//       // Process EMA expression on the MEI data
//       console.log({ meiXML });

//       // let ema_expression = "/2-5/all/@all";
//       // let ema_expression = "/1-5/all/@all/highlight/1-5/3/@all";
//       const processor = EmaMei.withDocumentString(meiXML, ema_expression);
//       const highlightedMei = processor.getSelection();
//       // get the highlighted ids
//       const selectedIds = highlightedMei
//         .querySelector("annot[type=ema_highlight]")
//         .getAttribute("plist");

//       // render MEI data to Verovio

//       let svg = tk.renderData(
//         new XMLSerializer().serializeToString(highlightedMei),
//         {}
//       );

//       const meiEl = document.getElementById("mei");
//       meiEl.innerHTML = svg;
//       selectedIds.split(" ").map((id) => {
//         const eventEl = meiEl.querySelector(id);
//         eventEl.style.fill = "red";
//       });
//     });
//   tk.select(measure_range);
//   tk.redoLayout();
// };

// const App = ({pieceURL, ema_expression,measure_range}) => {
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

// export default App;

// import React, { useEffect } from "react";
// import ReactDOM from "react-dom";
// import "./styles.css";
// import EmaMei from "./ema-mei.js";

// const verovio = require("verovio");


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
import "./styles.css";
import EmaMei from "./ema-mei.js";
const verovio = require("verovio");

const urlParams = new URLSearchParams(window.location.search);
const pieceURL = urlParams.get("pieceURL");
const ema_expression = urlParams.get("ema_expression");
const measure_range = JSON.parse(decodeURIComponent(urlParams.get("measure_range")));



const App = ({ pieceURL, ema_expression, measure_range }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(pieceURL);
        const meiXML = await response.text();

        const processor = EmaMei.withDocumentString(meiXML, ema_expression);
        const highlightedMei = processor.getSelection();
        const selectedIds = highlightedMei
          .querySelector("annot[type=ema_highlight]")
          .getAttribute("plist");

        const tk = new verovio.toolkit();
        tk.setOptions({
          scale: 50,
          adjustPageWidth: true
        });
        tk.select(measure_range);
        tk.redoLayout();
        const svg = tk.renderData(
          new XMLSerializer().serializeToString(highlightedMei),
          {}
        );

        const meiEl = document.getElementById("mei");
        meiEl.innerHTML = svg;

        selectedIds.split(" ").map((id) => {
          const eventEl = meiEl.querySelector(id);
          eventEl.style.fill = "red";
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [pieceURL, ema_expression, measure_range]);

  return (
    <div className="App" style={{ width: "400px" }}>
      <h1>EMA Sandbox</h1>
      <h2>Verovio Score:</h2>
      <code id="mei" style={{ width: "400px" }}></code>
      <div className="panel-body">
        <div id="app" className="panel"></div>
      </div>
    </div>
  );
};

ReactDOM.render(
  <App
    pieceURL={pieceURL}
    ema_expression={ema_expression}
    measure_range={measure_range}
  />,
  document.getElementById("root")
);

export default App;


