import { REACT_ELEMENT_TYPE } from "../shared/symbol";

const isArray = Array.isArray;

function mapIntoArray(children, array, callback) {
  const type = typeof children;

  if (type === "undefined" || type === "boolean") {
    children = null;
  }

  let invokeCallback = false;

  if (children === null) {
    invokeCallback = true;
  } else {
    switch (type) {
      case "string":
      case "number":
        invokeCallback = true;
        break;
      case "object":
        switch (children.$$typeof) {
          case REACT_ELEMENT_TYPE:
            invokeCallback = true;
        }
    }
  }

  if (invokeCallback) {
    const child = children;
    let mappedChild = callback(child);
    if (isArray(mappedChild)) {
      mapIntoArray(mappedChild, array, (c) => c);
    } else if (mappedChild != null) {
      array.push(mappedChild);
    }
    return 1;
  }

  let child;
  let subtreeCount = 0;

  if (isArray(children)) {
    for (let i = 0; i < children.length; i++) {
      child = children[i];
      subtreeCount += mapIntoArray(child, array, callback);
    }
  } else {
    // TODO: iterable object 처리
  }

  return subtreeCount;
}

function mapChildren(children, func, context) {
  if (children == null) {
    return children;
  }
  const result = [];
  let count = 0;
  mapIntoArray(children, result, function (child) {
    return func.call(context, child, count++);
  });
  return result;
}

export function toArray(children) {
  return mapChildren(children, (child) => child) || [];
}
