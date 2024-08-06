import { useState } from "react";
import { router } from "./router";
import { RouterProvider } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
