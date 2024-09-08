import "./styles/global.css";
import { virtualDOM } from "./lib/dom/VirtualDOM.js";
import { RouterProvider } from "./lib/router/RouterProvider.js";
import { routes } from "./routes.jsx";

virtualDOM
  .createRoot(document.getElementById("root"))
  .render(<RouterProvider routes={routes} />);
