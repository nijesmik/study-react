export const setValueForKnownAttribute = (node, name, value) => {
  if (value === null) {
    node.removeAttribute(name);
    return;
  }
  switch (typeof value) {
    case "undefined":
    case "function":
    case "symbol":
    case "boolean": {
      node.removeAttribute(name);
      return;
    }
  }
  node.setAttribute(name, value);
};

export const setValueForAttribute = (node, name, value) => {
  // if (isAttributeNameSafe(name)) {
  if (value === null) {
    node.removeAttribute(name);
    return;
  }
  switch (typeof value) {
    case "undefined":
    case "function":
    case "symbol":
      node.removeAttribute(name);
      return;
    case "boolean": {
      const prefix = name.toLowerCase().slice(0, 5);
      if (prefix !== "data-" && prefix !== "aria-") {
        node.removeAttribute(name);
        return;
      }
    }
  }
  node.setAttribute(name, value);
  // }
};
