import { createElement } from "../dom/createElement.js";

export class Router {
  constructor(root, routes) {
    this.root = root;
    this.routes = routes;
    this.initialize();
  }

  initialize() {
    this.loadRouteComponent(window.location.pathname);
    this.customizeAnchorBehavior();

    window.addEventListener("popstate", () => {
      this.loadRouteComponent(window.location.pathname);
    });
  }

  loadRouteComponent(path) {
    const { element } = this.routes.find((route) => route.path === path);
    this.root.innerHTML = "";
    this.root.appendChild(createElement(element));
  }

  customizeAnchorBehavior() {}
}