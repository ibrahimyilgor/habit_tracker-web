export function sumArrays(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    throw new Error("Arrays must be of equal length.");
  }

  let result = [];
  for (let i = 0; i < arr1.length; i++) {
    result.push(arr1[i] + arr2[i]);
  }
  return result;
}
