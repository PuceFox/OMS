// import { useState } from "react";
// import router from "./router";
// import { RouterProvider } from "react-router-dom";
// import { ThemeProvider } from "@material-tailwind/react";
// // import "./App.css";

// function App() {
//   const [count, setCount] = useState(0);

//   return (
//     <>
//       <ThemeProvider>
//         <RouterProvider router={router} />
//       </ThemeProvider>
//     </>
//   );
// }

// export default App;

import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { ApolloProvider } from "@apollo/client";
// import { client } from "./apollo-client"; // Adjust the path as necessary
// client
import router from "./router";
import { client } from "../config/apollo";

function App() {
  const [count, setCount] = useState(0);

  return (
    <ApolloProvider client={client}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
