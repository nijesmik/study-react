import "./styles/global.css";
import { virtualDOM } from "./lib/dom/VirtualDOM.js";
import { RouterProvider } from "./lib/router/RouterProvider.js";
import { router } from "./router.jsx";

virtualDOM
  .createRoot(document.getElementById("root"))
  .render(<RouterProvider router={router} />);
