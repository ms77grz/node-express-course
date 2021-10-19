const range = require('./range');

const binarySearch = (arr, val) => {
  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);

    if (arr[mid] === val) {
      return mid;
    }

    if (val < arr[mid]) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
  return -1;
};

const myList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

console.log(Array.from(range(4, 10, 2)));

console.log(binarySearch(myList, 3));

// let range = n => [...Array(n).keys()];
