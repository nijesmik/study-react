import "./styles/global.css";
import { Router } from "@lib/router/Router.js";
import { route } from "./route.jsx";

const router = new Router(document.querySelector("#root"), route);