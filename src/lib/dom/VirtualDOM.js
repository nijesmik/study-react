import { updateElement } from "./updateElement.js";

class VirtualDOM {
  constructor() {
    this.root = null;
    this.VDOM = {
      instance: null,
      function: null,
    };
  }

  createRoot(root) {
    this.root = root;
    return this;
  }

  render(component) {
    if (component) {
      this.VDOM.function = component;
    }
    const newVDOM = this.VDOM.function();
    updateElement(this.root, this.VDOM.instance, newVDOM);
    this.VDOM.instance = newVDOM;
  }
}

export const virtualDOM = new VirtualDOM();
