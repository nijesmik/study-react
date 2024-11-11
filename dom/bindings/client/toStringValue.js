export function toString(value) {
  // The coercion safety check is performed in getToStringValue().
  return "" + getToStringValue(value);
}

export function getToStringValue(value) {
  switch (typeof value) {
    case "bigint":
    case "boolean":
    case "number":
    case "string":
    case "undefined":
    case "object":
      return value;
    default:
      // function, symbol are assigned as empty strings
      return "";
  }
}
