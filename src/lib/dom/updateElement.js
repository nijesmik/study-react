import { createElement } from "./createElement.js";

export const updateElement = (parent, currentVNode, newVNode, index = 0) => {
  // 1. newNode만 있는 경우
  if (!isExist(currentVNode) && isExist(newVNode)) {
    return parent.appendChild(createElement(newVNode));
  }

  // 2. currentNode만 있는 경우
  const node = parent.childNodes[index];
  if (isExist(currentVNode) && !isExist(newVNode)) {
    return parent.removeChild(node);
  }

  // 3. currentNode와 newNode 모두 text 타입일 경우
  if (isTextNode(currentVNode) && isTextNode(newVNode)) {
    if (currentVNode === newVNode) {
      return;
    }
    return parent.replaceChild(createElement(newVNode), node);
  }

  // 4. currentNode와 newNode의 태그 이름(type)이 다를 경우
  if (currentVNode.type !== newVNode.type) {
    return parent.replaceChild(createElement(newVNode), node);
  }

  // 5. currentNode와 newNode의 태그 이름(type)이 같을 경우
  updateAttributes(node, newVNode.props ?? {}, currentVNode.props ?? {});

  // 6. newNode와 currentNode의 모든 자식 태그를 순회하며 1 ~ 5의 내용을 반복한다.
  const maxLength = Math.max(
    newVNode.children.length,
    currentVNode.children.length,
  );
  for (let i = 0; i < maxLength; i++) {
    updateElement(node, currentVNode.children[i], newVNode.children[i], i);
  }
};

const updateAttributes = (target, newProps, oldProps) => {
  for (const [attr, value] of Object.entries(newProps)) {
    if (oldProps[attr] !== newProps[attr]) {
      target.setAttribute(attr, value);
    }
  }

  for (const attr of Object.keys(oldProps)) {
    if (newProps[attr] === undefined) {
      target.removeAttribute(attr);
    }
  }
};

const isExist = (node) => {
  return node !== null && node !== undefined;
};

const isTextNode = (node) => {
  return typeof node === "string" || typeof node === "number";
};
