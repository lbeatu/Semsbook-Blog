import React from "react";
import loadingGIF from "./src/loading.gif";

const Spinner = () => {
  return (
    <div>
      <img
        src={loadingGIF}
        style={{ width: "30%", height: "auto" }}
        alt="spinner"
      ></img>
    </div>
  );
};

export default Spinner;
