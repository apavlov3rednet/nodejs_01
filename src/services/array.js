class CustomArray {
  static array_merge(array1, array2) {
    return [...new Set([...array1, ...array2])];
  }

  static array_diff(array1, array2) {
    const difference1 = array1.filter((element) => !array2.includes(element));
    const difference2 = array2.filter((element) => !array1.includes(element));
    return [...difference1, ...difference2];
  }
}

module.exports = CustomArray;