import { createElement } from "./createElement.js";
import { updateProperties } from "./bindings/client/DOMComponent.js";

const updateElement = (parentElement, prevNode, newNode, index) => {
  // 1. newNode만 있는 경우 -> node 추가
  if (!exist(prevNode) && exist(newNode)) {
    parentElement.appendChild(createElement(newNode));
    return;
  }

  const domElement = parentElement.childNodes[index];

  // 2. newNode가 없는 경우 -> node 삭제
  if (!exist(newNode)) {
    parentElement.removeChild(domElement);
    return true;
  }

  // 3. prevNode와 newNode 모두 text node일 경우
  if (isTextNode(prevNode) && isTextNode(newNode)) {
    if (prevNode !== newNode) {
      parentElement.replaceChild(createElement(newNode), domElement);
    }
    return;
  }

  // 4. prevNode와 newNode의 태그 종류가 다를 경우
  if (prevNode.type !== newNode.type) {
    parentElement.replaceChild(createElement(newNode), domElement);
    return;
  }

  // 5. prevNode와 newNode의 태그 종류가 같을 경우
  updateProperties(
    domElement,
    newNode.type,
    prevNode.props ?? {},
    newNode.props ?? {},
  );

  // 6. newNode와 prevNode의 children을 순회하며 1 ~ 5의 내용을 반복한다.
  updateElements(domElement, prevNode.children, newNode.children);
};

export const updateElements = (parentElement, prevNodes, newNodes) => {
  const maxLength = Math.max(prevNodes.length, newNodes.length);
  for (let i = 0, j = 0; i < maxLength; i++, j++) {
    const isDeleted = updateElement(
      parentElement,
      prevNodes[i],
      newNodes[i],
      j,
    );
    if (isDeleted) {
      j--;
    }
  }
};

const exist = (node) => {
  return node !== null && node !== undefined;
};

const isTextNode = (node) => {
  return typeof node === "string" || typeof node === "number";
};
