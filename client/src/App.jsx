import { useState } from "react";
import router from "./router";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
// import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
