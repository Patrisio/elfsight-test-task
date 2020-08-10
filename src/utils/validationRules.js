function isArray(val) {
  return Array.isArray(val);
}

export const isNotEmptyArray = (val) => {
  return isArray(val) && val.length > 0;
}

export const isEmptyArray = (val) => {
  return isArray(val) && val.length === 0;
}