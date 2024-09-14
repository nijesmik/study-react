import { setAttribute } from "./attribute.js";

export const createDomFromVNode = (VNode) => {
  // null이나 undefined의 경우 fragment 생성
  if (VNode === null || VNode === undefined) {
    return document.createDocumentFragment();
  }

  // 기본형 타입의 경우 text노드를 생성
  if (typeof VNode === "string" || typeof VNode === "number") {
    return document.createTextNode(String(VNode));
  }

  // VNode.type 기반으로 실제 dom에 element생성
  const element = VNode.type
    ? document.createElement(VNode.type)
    : document.createDocumentFragment();

  // 정의한 속성을 삽입
  Object.entries(VNode.props || {})
    .filter(([attr, value]) => value)
    .forEach(([attr, value]) => {
      setAttribute(element, attr, value);
    });

  // 자식노드가 있는 경우 재귀호출
  VNode.props.children.forEach((child) =>
    element.appendChild(createDomFromVNode(child)),
  );

  return element;
};
