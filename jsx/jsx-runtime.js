export const jsx = (type, props, ...children) => {
  return createElement(type, props, children);
};

const createElement = (type, props, children) => {
  if (typeof type === "function") {
    return type({ ...props, children });
  }

  return {
    type,
    props: { ...props, children },
  };
};

export const jsxs = jsx;

export const Fragment = ({ children }) => children;
