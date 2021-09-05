export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
  }
  
  function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  }
  
  function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, i]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, i]);
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([j, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([j, j]);
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
}

export function getQuickSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    quickSortHelper(array, 0, array.length - 1, animations);
    return animations;
}

function quickSortHelper(mainArray, left, right, animations){
  if (right - left >= 1){
    let pivot = partition(mainArray, left, right ,animations);
    quickSortHelper(mainArray, left, pivot-1,animations);
    quickSortHelper(mainArray, pivot+1, right ,animations);
  }
}

function swap(array, left, right , animations){
  //indicate swap
  let next = -1;
  animations.push([next, next]);

  let temp = array[left];
  
  //push swap animation
  animations.push([left, array[right]]);
  animations.push([right, temp]);

  //push highlight animation
  animations.push([left, right]);
  animations.push([left, right]);
  
  array[left] = array[right];
  array[right] = temp;
}

function getPivot (left, right){
  return randomIntFromInterval(left, right);
}

function partition(array, low, high,animations){
  let p = getPivot(low, high);
  //Get animation for swap of pivot and lowest

  //put pivot at the lowest index
  swap(array, low, p,animations);
  let border = low + 1;
  for (let i = border; i <= high; i++){
    animations.push([i, low]);
    animations.push([i, low]);
    if (array[i] < array[low]){
      swap(array, i, border++, animations);
    }
  }
  //put pivot back to original position
  swap(array, low, border-1,animations);
  return border-1;
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}


export function getHeapSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    heapSortHelper(array, animations);
    return animations;
}

function heapSortHelper(array, animations){
  let n = array.length;

  for (let i = Math.floor(n/2)-1; i>=0; i--){
    heapify(array, n ,i, animations);
  }

  for (let i = n - 1; i > 0; i--){
    swap(array, 0, i, animations);

    heapify (array, i, 0, animations);
  }
}

function heapify(arr, n, i, animations)
{
    let largest = i; // Initialize largest as root
    let l = 2 * i + 1; // left = 2*i + 1
    let r = 2 * i + 2; // right = 2*i + 2

    if (l < n){
      animations.push([l, largest]);
      animations.push([l, largest]);
    }
    // If left child is larger than root
    if (l < n && arr[l] > arr[largest])
        largest = l;

    if (r < n){
      animations.push([r, largest]);
      animations.push([r, largest]);
    }
    // If right child is larger than largest so far
    if (r < n && arr[r] > arr[largest])
        largest = r;

    // If largest is not root
    if (largest != i) {
        swap(arr, i, largest, animations);

        // Recursively heapify the affected sub-tree
        heapify(arr, n, largest, animations);
    }
}


export function getBubbleSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    bubbleSortHelper(array, animations);
    return animations;
}

function bubbleSortHelper(array, animations){
  let i, j;
  let len = array.length;
  let isSwapped = false;
  for(i =0; i < len; i++){
    isSwapped = false;
    for(j = 0; j < len; j++){
        if (j+1 < len){
          animations.push([j, j+1]);
          animations.push([j, j+1]);
        }
        if(array[j] > array[j + 1]){
          swap(array, j, j+1, animations);
          isSwapped = true;
        }
    }
    // IF no two elements were swapped by inner loop, then break 
    if(!isSwapped){
      break;
    }
  } 
} 


export function getInsertionSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    insertionSortHelper(array, array.length, animations);
    return animations;
}

function insertionSortHelper(arr, n, animations){
  let i, j; 
  for (i = 1; i < n; i++) { 
    j = i ; 

    /* Move elements of arr[0..i-1], that are 
    greater than key, to one position ahead 
    of their current position */

    animations.push([j, i]);
    animations.push([j, i]);
    while (j > 0 && arr[j-1] > arr[j]) { 
      animations.push([j, i]);
      animations.push([j, i]);
      swap(arr, j, j-1, animations);
      j--; 
    } 
  } 
}

export function getSelectionSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    selectionSortHelper(array, array.length, animations);
    return animations;
}

function selectionSortHelper(arr, n, animations){
  for (let i = 0; i < n; i++){
    let min_index = i;
    for (let j = i; j < n; j++){
      animations.push([j, min_index]);
      animations.push([j, min_index]);
      if (arr[j] < arr[min_index]){
        min_index = j;
      }
    }
    if (min_index != i){
      swap(arr, i, min_index, animations);
    }
  }
}