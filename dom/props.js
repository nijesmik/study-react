export const updateProperties = (element, newProps, oldProps) => {
  const payload = diffProperties(newProps, oldProps);

  payload.forEach(({ key, value }) => {
    if (!value) {
      return removeProperty(element, key, oldProps[key]);
    }
    setProperty(element, key, value);
  });
};

const diffProperties = (newProps, oldProps) => {
  const payload = [];

  Object.keys(oldProps).forEach((key) => {
    if (key === "children" || newProps[key]) {
      return;
    }
    if (key === "style") {
      // TODO: 스타일 삭제
      return;
    }
    payload.push({ key, value: undefined });
  });

  Object.keys(newProps).forEach((key) => {
    if (key === "children" || newProps[key] === oldProps[key]) {
      return;
    }
    if (key === "style") {
      // TODO: 스타일 변경
      return;
    }
    payload.push({ key, value: newProps[key] });
  });

  return payload;
};

const isEventProperty = (key, value) =>
  key.startsWith("on") && typeof value === "function";

const removeProperty = (element, key, value) => {
  if (isEventProperty(key, value)) {
    const eventType = key.slice(2).toLowerCase();
    return element.removeEventListener(eventType, value);
  }
  element.removeAttribute(convertPropertyKey(key));
};

const setProperty = (element, key, value) => {
  if (isEventProperty(key, value)) {
    const eventType = key.slice(2).toLowerCase();
    return element.addEventListener(eventType, value);
  }
  element.setAttribute(convertPropertyKey(key), value);
};

export const setInitialProperties = (element, props) => {
  Object.entries(props).forEach(([key, value]) => {
    if (key === "children" || !value) {
      return;
    }
    setProperty(element, key, value);
  });
};

const convertPropertyKey = (key) => {
  if (key === "className") {
    return "class";
  }
  if (key === "htmlFor") {
    return "for";
  }
  return key;
};
