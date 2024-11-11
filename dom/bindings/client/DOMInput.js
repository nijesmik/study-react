import { toString } from "./toStringValue.js";

export const updateInput = ({
  element,
  value,
  defaultValue,
  lastDefaultValue,
  checked,
  defaultChecked,
  type,
  name,
}) => {
  const node = element;

  // 1. node.name 임시 제거
  node.name = "";

  // 2. type 속성 업데이트
  if (
    type != null &&
    typeof type !== "function" &&
    typeof type !== "symbol" &&
    typeof type !== "boolean"
  ) {
    node.type = type;
  } else {
    node.removeAttribute("type");
  }

  // 3. value 속성 업데이트
  if (value != null) {
    if (type === "number") {
      if ((value === 0 && node.value === "") || node.value != value) {
        node.value = toString(value);
      }
    } else if (node.value !== toString(value)) {
      node.value = toString(value);
    }
  } else if (type === "submit" || type === "reset") {
    node.removeAttribute("value");
  }

  // 4. TODO: defaultValue 속성 업데이트
  // 5. TODO: defaultChecked 속성 업데이트

  // 6. checked 속성 업데이트
  if (checked != null) {
    node.checked =
      checked && typeof checked !== "function" && typeof checked !== "symbol";
  }

  // 7. name 속성 업데이트
  if (
    name != null &&
    typeof name !== "function" &&
    typeof name !== "symbol" &&
    typeof name !== "boolean"
  ) {
    node.name = toString(name);
  } else {
    node.removeAttribute("name");
  }
};

export const initInput = ({
  element,
  value,
  defaultValue,
  checked,
  defaultChecked,
  type,
  name,
  isHydrating,
}) => {
  const node = element;

  // 1. type 속성 설정
  if (
    type != null &&
    typeof type !== "function" &&
    typeof type !== "symbol" &&
    typeof type !== "boolean"
  ) {
    node.type = type;
  }

  // 2. value, defaultValue 속성 설정
  if (value != null || defaultValue != null) {
    const isButton = type === "submit" || type === "reset";

    if (isButton && (value === undefined || value === null)) {
      return;
    }

    const defaultValueStr = defaultValue != null ? toString(defaultValue) : "";
    const initialValue = value != null ? toString(value) : defaultValueStr;

    if (!isHydrating) {
      if (initialValue !== node.value) {
        node.value = initialValue;
      }
    }

    node.defaultValue = initialValue;
  }

  // 3. checked, defaultChecked 속성 설정
  const checkedOrDefault = checked != null ? checked : defaultChecked;
  const initialChecked =
    typeof checkedOrDefault !== "function" &&
    typeof checkedOrDefault !== "symbol" &&
    !!checkedOrDefault;

  if (!isHydrating) {
    node.checked = !!initialChecked;
  }

  node.defaultChecked = !node.defaultChecked;
  node.defaultChecked = !!initialChecked;

  // 4. name 속성 설정
  if (
    name != null &&
    typeof name !== "function" &&
    typeof name !== "symbol" &&
    typeof name !== "boolean"
  ) {
    node.name = name;
  }
};
