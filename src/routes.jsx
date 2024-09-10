import Vite from "./pages/Vite/index.jsx";
import JavaScript from "./pages/JavaScript/index.jsx";

export const routes = [
  {
    path: "/",
    children: [
      {
        index: true,
        element: Vite,
      },
      {
        path: "js",
        element: JavaScript,
      },
    ],
  },
];
