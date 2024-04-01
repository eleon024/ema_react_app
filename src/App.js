
import React, { useEffect, useState } from "react";
import verovio from "verovio";
import EmaMei from "./ema-mei.js";
import "./styles.css";

const App = () => {
  const [svgContent, setSvgContent] = useState("");
  const [title, setTitle] = useState("");
  const [composer, setComposer] = useState("");
  const [emaExpression, setEmaExpression] = useState("");
  const [error, setError] = useState("");


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const pieceURL = urlParams.get("pieceURL");
    const emaExpression = urlParams.get("ema_expression");
    const fileName = pieceURL.split('/').pop();
    const newPieceURL = 'https://raw.githubusercontent.com/eleon024/ema_react_app/main/Music_Files/'+fileName;
    const measure_range = JSON.parse(decodeURIComponent(urlParams.get("measure_range")));
    const observation = if (observation) {urlParams.get("observation");}
    verovio.module.onRuntimeInitialized = async () => {
      const tk = new verovio.toolkit();
      tk.setOptions({
        scale: 75,
        adjustPageWidth: true,
      });

      try {
        const response = await fetch(newPieceURL);
        const meiXML = await response.text();
        if (!response.ok) throw new Error("Failed to fetch MEI data.");

        // Extract and set title and composer from the MEI data
        const meiDoc = new DOMParser().parseFromString(meiXML, "text/xml");
        const titleElement = meiDoc.querySelector('meiHead > fileDesc > titleStmt > title');
        const composerElement = meiDoc.querySelector('meiHead > fileDesc > titleStmt > respStmt > persName[role="composer"]');
        if (titleElement) setTitle(titleElement.textContent);
        if (composerElement) setComposer(composerElement.textContent);


        
        const processor = EmaMei.withDocumentString(meiXML, emaExpression);
        const highlightedMei = processor.getSelection();
        const selectedIds = highlightedMei.querySelector("annot[type=ema_highlight]").getAttribute("plist");
          tk.select(measure_range);
          tk.redoLayout();
        const svg = tk.renderData(new XMLSerializer().serializeToString(highlightedMei), {});
        setSvgContent(svg);

        // This part is asynchronous, depending on when SVG is actually rendered and available in the DOM
        setTimeout(() => {
          selectedIds.split(" ").forEach((id) => {
            const element = document.querySelector(`${id}`);
            if (element) {
              element.style.fill = "red";
            }
          });
        }, 0);
      } catch (error) {
        console.error("Error processing MEI data:", error);
        setError("Failed to process MEI data.");
      }
    };
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

return (
  <div className="App" style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
    <div className="metadata-container">
      <h2><strong>Title:</strong> {title}<br /></h2>
      <h2><strong>Composer:</strong> {composer}<br /></h2>
      
    </div>
    <div id="mei" style={{ width: "100%" }} dangerouslySetInnerHTML={{ __html: svgContent }}></div>
  </div>
);

  
};

export default App;
