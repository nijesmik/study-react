import getAttributeAlias from "../shared/getAttributeAlias.js";
import {
  setValueForAttribute,
  setValueForKnownAttribute,
} from "./DOMPropertyOperations.js";
import { initInput, updateInput } from "./DOMInput.js";

export const updateProperties = (domElement, tag, lastProps, nextProps) => {
  switch (tag) {
    case "input":
      return updateInputProperties(domElement, lastProps, nextProps);
  }
  for (const propKey in lastProps) {
    const lastProp = lastProps[propKey];
    if (
      lastProps.hasOwnProperty(propKey) &&
      lastProp != null &&
      !nextProps.hasOwnProperty(propKey)
    ) {
      setProp(domElement, tag, propKey, null, nextProps, lastProp);
    }
  }
  for (const propKey in nextProps) {
    const nextProp = nextProps[propKey];
    const lastProp = lastProps[propKey];
    if (
      nextProps.hasOwnProperty(propKey) &&
      nextProp !== lastProp &&
      (nextProp != null || lastProp != null)
    ) {
      setProp(domElement, tag, propKey, nextProp, nextProps, lastProp);
    }
  }
};

const setProp = (domElement, tag, key, value, props, prevValue) => {
  switch (key) {
    case "defaultValue":
    case "defaultChecked":
      break;
    case "className":
      return setValueForKnownAttribute(domElement, "class", value);
    case "disabled": {
      if (value && typeof value !== "function" && typeof value !== "symbol") {
        domElement.setAttribute(key, "");
      } else {
        domElement.removeAttribute(key);
      }
      break;
    }
    default: {
      if (
        key.length > 2 &&
        (key[0] === "o" || key[0] === "O") &&
        (key[1] === "n" || key[1] === "N")
      ) {
        // TODO: change to synthetic event
        const event = key.slice(2).toLowerCase();
        domElement.removeEventListener(event, prevValue);
        if (value) {
          domElement.addEventListener(event, value);
        }
      } else {
        const attributeName = getAttributeAlias(key);
        setValueForAttribute(domElement, attributeName, value);
      }
    }
  }
};

const updateInputProperties = (domElement, lastProps, nextProps) => {
  let name = null;
  let type = null;
  let value = null;
  let defaultValue = null;
  let lastDefaultValue = null;
  let checked = null;
  let defaultChecked = null;
  for (const propKey in lastProps) {
    const lastProp = lastProps[propKey];
    if (lastProps.hasOwnProperty(propKey) && lastProp != null) {
      switch (propKey) {
        case "checked":
        case "value":
          break;
        case "defaultValue": {
          lastDefaultValue = lastProp;
        }
        // defaultChecked and defaultValue are ignored by setProp
        // Fallthrough
        default: {
          if (!nextProps.hasOwnProperty(propKey))
            setProp(domElement, "input", propKey, null, nextProps, lastProp);
        }
      }
    }
  }
  for (const propKey in nextProps) {
    const nextProp = nextProps[propKey];
    const lastProp = lastProps[propKey];
    if (
      nextProps.hasOwnProperty(propKey) &&
      (nextProp != null || lastProp != null)
    ) {
      switch (propKey) {
        case "type": {
          type = nextProp;
          break;
        }
        case "name": {
          name = nextProp;
          break;
        }
        case "checked": {
          checked = nextProp;
          break;
        }
        case "defaultChecked": {
          defaultChecked = nextProp;
          break;
        }
        case "value": {
          value = nextProp;
          break;
        }
        case "defaultValue": {
          defaultValue = nextProp;
          break;
        }
        default: {
          if (nextProp !== lastProp)
            setProp(
              domElement,
              "input",
              propKey,
              nextProp,
              nextProps,
              lastProp,
            );
        }
      }
    }
  }
  updateInput({
    element: domElement,
    value,
    defaultValue,
    lastDefaultValue,
    checked,
    defaultChecked,
    type,
    name,
  });
};

export const setInitialProperties = (domElement, tag, props) => {
  switch (tag) {
    case "input":
      return setInitialInputProperties(domElement, props);
  }
  for (const propKey in props) {
    if (!props.hasOwnProperty(propKey)) {
      continue;
    }
    const propValue = props[propKey];
    if (propValue == null) {
      continue;
    }
    setProp(domElement, tag, propKey, propValue, props, null);
  }
};

const setInitialInputProperties = (domElement, props) => {
  let name = null;
  let type = null;
  let value = null;
  let defaultValue = null;
  let checked = null;
  let defaultChecked = null;
  for (const propKey in props) {
    if (!props.hasOwnProperty(propKey)) {
      continue;
    }
    const propValue = props[propKey];
    if (propValue == null) {
      continue;
    }
    switch (propKey) {
      case "name": {
        name = propValue;
        break;
      }
      case "type": {
        type = propValue;
        break;
      }
      case "checked": {
        checked = propValue;
        break;
      }
      case "defaultChecked": {
        defaultChecked = propValue;
        break;
      }
      case "value": {
        value = propValue;
        break;
      }
      case "defaultValue": {
        defaultValue = propValue;
        break;
      }
      default: {
        setProp(domElement, "input", propKey, propValue, props, null);
      }
    }
  }

  initInput({
    element: domElement,
    value,
    defaultValue,
    checked,
    defaultChecked,
    type,
    name,
    isHydrating: false,
  });
};
