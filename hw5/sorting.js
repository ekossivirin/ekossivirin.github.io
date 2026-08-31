/**
 * @param {number[]} arr
 */
function bubbleSorting(arr) {
    if (arr.length == 1) return arr;
    for (let i = 0; i < arr.length; i++) {
        let changesApplied = false;
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr.at(j) > arr.at(j + 1)) {
                let buf = arr.at(j);
                arr[j] = arr[j + 1];
                arr[j + 1] = buf;
                changesApplied = true;
            }
        }
        if (changesApplied == false) break;
    }
    return arr;
}

/**
 * @param {number[]} arr
 */
function selectionSort(arr) {
    if (arr.length == 1) return arr;
    for (let i = 0; i < arr.length; i++) {
        let min = arr[i];
        let minIndex = i;
        for (let j = i; j < arr.length; j++) {
            if (arr[j] < min) {
                min = arr[j];
                minIndex = j;
            }
        }
        arr[minIndex] = arr[i];
        arr[i] = min;
    }
    return arr;
}

/**
 * @param {number[]} arr
 */
function insertionSort(arr) {
    if (arr.length == 1) return arr;
    for (let i = 1; i < arr.length; i++) {
        let value = arr[i];
        let j = i - 1;
        while (value < arr[j] && j >= 0) {
            arr[j + 1] = arr[j]
            j--;
        }
        arr[j + 1] = value;
    }
    return arr;
}

let array = [7, 9, 7, 99, 11, 3, 0, -7];
console.log(array);
console.log(bubbleSorting(array));
array = [7, 9, 7, 99, 11, 3, 0, -7];
console.log(selectionSort(array));
array = [7, 9, 7, 99, 11, 3, 0, -7];
console.log(insertionSort(array));

let arrayAlmostSorted = [1, 2, 3, 4, 6, 5];
console.log(arrayAlmostSorted);
console.log(bubbleSorting(arrayAlmostSorted));
arrayAlmostSorted = [1, 2, 3, 4, 6, 5];
console.log(selectionSort(arrayAlmostSorted));
arrayAlmostSorted = [1, 2, 3, 4, 6, 5];
console.log(insertionSort(arrayAlmostSorted));

let smallArr = [1];
console.log(smallArr);
console.log(bubbleSorting(smallArr));
console.log(selectionSort(smallArr));
console.log(insertionSort(smallArr));

