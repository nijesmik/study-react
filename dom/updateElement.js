import { createElement } from "./createElement.js";
import { updateProperties } from "./bindings/client/DOMComponent.js";

export const updateElement = (parent, prevVNode, newVNode, index = 0) => {
  // 1. newNode만 있는 경우 -> node 추가
  if (!isExist(prevVNode) && isExist(newVNode)) {
    parent.appendChild(createElement(newVNode));
    return;
  }

  // 2. newNode가 없는 경우 -> node 삭제
  if (!isExist(newVNode)) {
    return deleteElement(parent, prevVNode, index);
  }

  // 3. prevNode와 newNode 모두 text 타입일 경우
  if (isTextNode(prevVNode) && isTextNode(newVNode)) {
    return updateTextElement(parent, prevVNode, newVNode, index);
  }

  // 4. prevNode와 newNode의 태그 이름(type)이 다를 경우
  const node = parent.childNodes[index];
  if (prevVNode.type !== newVNode.type) {
    if (node) {
      parent.replaceChild(createElement(newVNode), node);
      return;
    }
    parent.appendChild(createElement(newVNode));
    return;
  }

  // 5. prevNode와 newNode의 태그 이름(type)이 같을 경우
  updateProperties(
    node,
    newVNode.type,
    prevVNode.props ?? {},
    newVNode.props ?? {},
  );

  // 6. newNode와 prevNode의 모든 자식 태그를 순회하며 1 ~ 5의 내용을 반복한다.
  updateElements(node, prevVNode.children, newVNode.children);
};

const deleteElement = (parent, prevVNode, index) => {
  if (!isExist(prevVNode)) {
    return;
  }
  const node = parent.childNodes[index];
  parent.removeChild(node);
  return index;
};

export const updateTextElement = (parent, prevVNode, newVNode, index) => {
  if (prevVNode === newVNode) {
    return;
  }
  const node = parent.childNodes[index];
  parent.replaceChild(createElement(newVNode), node);
};

export const updateElements = (parent, prevVNodes, newVNodes) => {
  const maxLength = Math.max(prevVNodes?.length, newVNodes?.length);
  let index = undefined;
  for (let i = 0; i < maxLength; i++) {
    index = updateElement(parent, prevVNodes[i], newVNodes[i], index ?? i);
  }
};

const isExist = (node) => {
  return node !== null && node !== undefined;
};

const isTextNode = (node) => {
  return typeof node === "string" || typeof node === "number";
};
