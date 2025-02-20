import { REACT_ELEMENT_TYPE } from "../shared/symbol";

export const Element = function (type, props, children) {
  const element = {
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    props,
    children,
  };

  return element;
};
