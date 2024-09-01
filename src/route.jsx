import Vite from "./pages/Vite/index.jsx";
import JavaScript from "./pages/JavaScript/index.jsx";

export const route = [
  {
    path: "/",
    element: <Vite />,
  },
  {
    path: "/js",
    element: <JavaScript />,
  },
];