/**
 * 배열의 요소 중 중첩된 배열이 있는지 확인합니다.
 * @param {Array} arr - 검사할 배열
 * @returns {boolean} - 중첩 배열이 있으면 true, 없으면 false
 */
export const arrayNestedArray = arr => arr.some(element => Array.isArray(element));


export const makeFlatArray = nestedArray => nestedArray.flat(1);