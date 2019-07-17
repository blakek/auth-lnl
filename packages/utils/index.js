/**
 * Creates an Object from key/value pairs; opposite of Object.entries
 * @param {Array[]} pairs - key/value pairs to combine
 * @return {Object}
 */
export const fromEntries = pairs =>
  Array.from(pairs).reduce(
    (obj, [key, value]) => ({ ...obj, [key]: value }),
    {}
  );

/**
 * Returns a copy of an object with the specified properties removed
 * @param {String[]} blacklist - properties to remove
 * @param {Object} obj - the object to copy
 */
export const omit = (blacklist, obj) =>
  fromEntries(Object.entries(obj).filter(([key]) => !blacklist.includes(key)));
