export const jsx = (type, props, ...children) => {
  if (typeof type === "function") {
    return type({ ...props, children });
  }

  return {
    type,
    props,
    children: children.flat(),
  };
};

// export const jsx = (type, { ...props, children }) => {
//   if (typeof type === 'function') {
//     return type({ ...props, children });
//   }
//
//   return {
//     type,
//     props,
//     children: [children].flat(),
//   };
// };

export const jsxs = jsx;

export const Fragment = ({ children }) => children;
