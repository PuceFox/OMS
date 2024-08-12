import { useState } from "react";
import RingLoader from "react-spinners/RingLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function Loading() {
  return (
    <div className="sweet-loading">
      <RingLoader color="rgba(150, 0, 255, 1)" loading size={100} speedMultiplier={1} />
    </div>
  );
}

export default Loading;
