import { useState } from "react";
import router from "./router";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
// import "./App.css";

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId="482313783920-8t9kier8uttcgccbigu5vhnpdtbvqvvt.apps.googleusercontent.com">
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
