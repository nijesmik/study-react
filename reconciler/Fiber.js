import { PLACEMENT } from "./constants.js";
import { setInitialProperties } from "../dom/props.js";

const createFiber = (element, parentFiber) => {
  return {
    type: element.type,
    props: element.props,
    stateNode: createDomElement(element),

    // fiber tree에서의 위치
    return: parentFiber, // 부모 fiber
    sibling: null, // 형제 fiber
    child: null, // 자식 fiber

    flags: PLACEMENT,
  };
};

const createDomElement = (element) => {
  if (typeof element === "string" || typeof element === "number") {
    return document.createTextNode(String(element));
  }

  const { type, props } = element;
  const dom = document.createElement(type);

  setInitialProperties(dom, props ?? {});

  return dom;
};

export const createFiberTree = (element, parentFiber) => {
  const fiber = createFiber(element, parentFiber);

  const { children } = element.props ?? {};
  if (children) {
    let prevChildFiber = null;
    children.forEach((child) => {
      const childFiber = createFiberTree(child, fiber);
      if (!fiber.child) {
        fiber.child = childFiber;
      } else {
        prevChildFiber.sibling = childFiber;
      }
      prevChildFiber = childFiber;
    });
  }

  return fiber;
};
