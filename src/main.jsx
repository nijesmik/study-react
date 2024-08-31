import { createElement } from "./lib/dom/createElement.js";
import App from "./App.jsx";
import { setupCounter } from "./counter.js";

document.querySelector("#app").appendChild(createElement(<App />));

setupCounter(document.querySelector("#counter"));