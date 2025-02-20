import { Element } from "./element.js";
import { toArray } from "./children";

// for vite
export const h = (type, props, ...children) =>
  jsx(type, { ...props, children });

// for babel
export const jsx = (type, props) => {
  if (typeof type === "function") {
    return type(props);
  }

  const children = toArray(props.children);
  delete props.children;

  return Element(type, props, children);
};

export const jsxs = jsx;

export const Fragment = ({ children }) => children;
