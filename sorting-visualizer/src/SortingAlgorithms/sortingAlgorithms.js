/*
* Author: Alvin Hsu
* Date: 9/4/2021
*
*
* File Name: sortingAlgorithms.js
* Description: This file contains the sorting algorithmns that will
* be used by the sorting visualizer file. An animations array is used
* by each sorting algorithm that either pushes [index, index] used when
* comparing two indexes or [index, height], when needing to change the height
* at an index. This allows for the visualization of comparison and height change.
*/

/******************* GENERAL HELPER FUNCTIONS *********************/
/**
 * This function gives a random int from the interval min and max inclusive
 * 
 * @param {*} min lowest num
 * @param {*} max highest num
 * @returns number in between min and max inclusive
 */
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * This function will swap two elements given the left and
 * right indeces. It will also push either [index,index] 
 * when comparison two indeces or [index, height] when 
 * changing height at and index to the animations 
 * array which will be used for visualization.
 * 
 * @param {*} array input array
 * @param {*} left left index
 * @param {*} right right index
 * @param {*} animations animations array
 */
function swap(array, left, right , animations){
  //indicate swap - used to determine when a swap is ocurring
  let next = -1;
  animations.push([next, next]);

  let temp = array[left];
  
  //push change animation
  animations.push([left, array[right]]);
  animations.push([right, temp]);

  //push compare animation
  animations.push([left, right]);
  animations.push([left, right]);
  
  //swap the two elements
  array[left] = array[right];
  array[right] = temp;
}
/******************************************************************/





/************************** MERGE SORT ****************************/
/**
 * This function is the driver function for the merge sort algorithm.
 * It calls the mergeSortHelper function that contains the code to update
 * the animations array for the visualizations. 
 * 
 * @param {*} array input array
 * @returns animations array
 */
export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  //get a copy of the array keep track of values during merges
  const helperArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, helperArray, animations);
  return animations;
}
  
/**
 * This function will recursively break down an array into two sub arrays
 * from the starting index to the mid, and the mid+1 index to the end index.
 * It then calls doMerge which will sort and merge the subarrays.
 * 
 * @param {*} array input array
 * @param {*} startIdx starting index
 * @param {*} endIdx ending index
 * @param {*} helperArray helper array to keep track of values
 * @param {*} animations animations array
 */
function mergeSortHelper(array, startIdx, endIdx, helperArray, animations) {
  if (startIdx === endIdx) return;

  //get mid index
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  
  //Merge from start to mid, and mid+1 to end
  //Use helper array to keep track of recursively broken down subarrays
  mergeSortHelper(helperArray, startIdx, middleIdx, array, animations);
  mergeSortHelper(helperArray, middleIdx + 1, endIdx, array, animations);
  doMerge(array, startIdx, middleIdx, endIdx, helperArray, animations);
}
  

/**
 * This function merges two sub arrays into one. It uses the helper array
 * which contains the values of the two array, one starting from the startIdx
 * and the other from the middleIdx+1. It will push comparing values to the 
 * animations array which will be used to visualizations. The main input array
 * will be changed to contain the values of the helper arrays.
 * 
 * @param {*} array input array
 * @param {*} startIdx starting index
 * @param {*} middleIdx middle index
 * @param {*} endIdx ending index
 * @param {*} helperArray helper array to keep track of values
 * @param {*} animations animations array
 */
function doMerge(array,startIdx,middleIdx,endIdx,helperArray,animations){
  let i = startIdx, k = startIdx;
  let j = middleIdx + 1;
  //Iterate through valid indeces of the two subarrays
  while (i <= middleIdx && j <= endIdx) {

    // Comparing: push [index and index] to change color once, and push again to revert
    animations.push([i, j]);
    animations.push([i, j]);

    //If the left subarray is less than the right subarray, push left value
    if (helperArray[i] <= helperArray[j]) {
      // Change: push [index and height] to set new height and index
      animations.push([k, helperArray[i]]);
      //place value in main array and increment pointers
      array[k++] = helperArray[i++];

    //otherwise, push right value
    } else {
      //Change: push [index and height] to set new height and index
      animations.push([k, helperArray[j]]);
      //place value in main array and increment pointers
      array[k++] = helperArray[j++];
    }
  }

  //If we still have values in one of the subarrays, we push all values onto main array
  while (i <= middleIdx) {
    //Comparison
    animations.push([i, i]);
    animations.push([i, i]);

    //Change
    animations.push([k, helperArray[i]]);
    array[k++] = helperArray[i++];
  }
  //If we still have values in one of the subarrays, we push all values onto main array
  while (j <= endIdx) {
    //Comparison
    animations.push([j, j]);
    animations.push([j, j]);

    //Change
    animations.push([k, helperArray[j]]);
    array[k++] = helperArray[j++];
  }
}
/******************************************************************/





/************************** QUICK SORT ****************************/
/**
 * This function is the driver function for the quick sort algorithm.
 * It calls the quickSortHelper function that contains the code to update
 * the animations array for the visualizations. 
 * 
 * @param {*} array input array 
 * @returns animations array
 */
export function getQuickSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  quickSortHelper(array, 0, array.length - 1, animations);
  return animations;
}

/**
 * This function will recursively break the input array into
 * two subarrays depending on the pivot which is given by a
 * random index from the range left to right inclusive. 
 * 
 * @param {*} array input array 
 * @param {*} left left index
 * @param {*} right right index
 * @param {*} animations animations array
 */
function quickSortHelper(array, left, right, animations){
  //Make sure that there are more than one element between
  //left and right, otherwise single element is sorted
  if (right - left >= 1){
    //Get the pivot point and sort partitions
    let pivot = partition(array, left, right ,animations);
    quickSortHelper(array, left, pivot-1,animations);
    quickSortHelper(array, pivot+1, right ,animations);
  }
}

/**
 * This function will get the pivot for the algorithm which
 * is a random int from the interval left to right
 * 
 * @param {*} left left index
 * @param {*} right right index
 * @returns random number between left and right inclusive
 */
function getPivot (left, right){
  return randomIntFromInterval(left, right);
}

/**
 * This function sorts the partition by placing the 
 * pivot value all the way to the left and places smallers 
 * numbers to the right of it. It then places the pivot
 * value to the right of the last smaller number which 
 * ensures that all numbers to the left of the pivot is
 * smaller and sorted.
 * 
 * @param {*} array input array
 * @param {*} low left index
 * @param {*} high right index
 * @param {*} animations animations index
 * @returns position where pivot is supposed to be
 */
function partition(array, low, high,animations){
  //Get pivot index
  let p = getPivot(low, high);

  //put pivot at the lowest index
  swap(array, low, p,animations);
  //Border is at the right of lowest(currently pivot) index
  let border = low + 1;
  //Interate from border to high
  for (let i = border; i <= high; i++){
    //Compare
    animations.push([i, low]);
    animations.push([i, low]);
    //If the value at i is lower than pivot
    if (array[i] < array[low]){
      //swap and increment border
      swap(array, i, border++, animations);
    }
  }
  //put pivot next to the last smaller element
  swap(array, low, border-1,animations);
  return border-1;
}

/******************************************************************/





/************************** HEAP SORT ****************************/
/**
 * This function is the driver function for the heap sort algorithm.
 * It calls the heapSortHelper function that contains the code to update
 * the animations array for the visualizations. 
 * @param {*} array input array 
 * @returns animations array
 */
export function getHeapSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    heapSortHelper(array, animations);
    return animations;
}

/**
 * This function will create heaps from the input array
 * and move the largest elements to the end. It then builds
 * another heap from the change array to another heap and repeat
 * this process until the array is sorted.
 * 
 * @param {*} array input array
 * @param {*} animations animations array
 */
function heapSortHelper(array, animations){
  let n = array.length;

  //Build max heap (placing the largest number at the root)
  for (let i = Math.floor(n/2)-1; i>=0; i--){
    heapify(array, n ,i, animations);
  }

  //Swap max to the end index, and then build heap again
  for (let i = n - 1; i > 0; i--){
    swap(array, 0, i, animations);
    heapify (array, i, 0, animations);
  }
}
/**
 * This function will turn the input array into a heap with node i 
 * which is an index in the array. 
 * 
 * @param {*} arr input array
 * @param {*} n size of heap
 * @param {*} i index in array
 * @param {*} animations animations array
 */
function heapify(arr, n, i, animations) {
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
  if (largest !== i) {
      swap(arr, i, largest, animations);

      // Recursively heapify the affected sub-tree
      heapify(arr, n, largest, animations);
  }
}
/******************************************************************/





/************************** BUBBLE SORT ****************************/
/**
 * This function is the driver function for the bubble sort algorithm.
 * It calls the bubbleSortHelper function that contains the code to update
 * the animations array for the visualizations. 
 * @param {*} array input array 
 * @returns animations array
 */
export function getBubbleSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    bubbleSortHelper(array, animations);
    return animations;
}

/**
 * This function loop and swap adjacent elements if the left
 * element is greater than the right element. This will continue
 * to loop until there is a full loop with no element swap. This ends
 * with a sorted array.
 * 
 * @param {*} array input array
 * @param {*} animations animations array
 */
function bubbleSortHelper(array, animations){
  let i, j;
  let len = array.length;
  //Check if we swapped an element or not
  let isSwapped = false;
  //worse case scenerio, O(n) outer loop
  for(i =0; i < len; i++){
    isSwapped = false;
    //loop through entire array
    for(j = 0; j < len; j++){
        if (j+1 < len){
          animations.push([j, j+1]);
          animations.push([j, j+1]);
        }
        //if the left is greater than right, swap
        if(array[j] > array[j + 1]){
          swap(array, j, j+1, animations);
          isSwapped = true;
        }
    }
    // If no two elements were swapped by inner loop, then break 
    if(!isSwapped){
      break;
    }
  } 
} 
/******************************************************************/





/************************** INSERTION SORT ****************************/
/**
 * This function is the driver function for the insertion sort algorithm.
 * It calls the insertionSortHelper function that contains the code to update
 * the animations array for the visualizations. 
 * @param {*} array input array 
 * @returns animations array
 */
export function getInsertionSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    insertionSortHelper(array, array.length, animations);
    return animations;
}

/**
 * This function will loop through the array and move the
 * right index values that are greater than the right-1 index
 * values to the right which will ultimately result in a sorted
 * array.
 * 
 * @param {*} arr input array
 * @param {*} n array length
 * @param {*} animations animations array
 */
function insertionSortHelper(arr, n, animations){
  let i, j;
  //Loop from index 1 to n-1 and compare previous values 
  for (i = 1; i < n; i++) { 
    j = i ; 

    animations.push([j, i]);
    animations.push([j, i]);
    //Move greater elements to the right of lower elements
    while (j > 0 && arr[j-1] > arr[j]) { 
      animations.push([j, i]);
      animations.push([j, i]);
      swap(arr, j, j-1, animations);
      j--; 
    } 
  } 
}
/******************************************************************/





/************************** SELECTION SORT ****************************/
/**
 * This function is the driver function for the selection sort algorithm.
 * It calls the selectionSortHelper function that contains the code to update
 * the animations array for the visualizations. 
 * @param {*} array input array 
 * @returns animations array
 */
export function getSelectionSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    selectionSortHelper(array, array.length, animations);
    return animations;
}

/**
 * This function will loop through the array and
 * place the minimum value of the subarray[i...n-1]
 * in the unsorted partitions. This will ultimately 
 * lead to a sorted array.
 * 
 * @param {*} arr input array 
 * @param {*} n length of array
 * @param {*} animations animations array
 */
function selectionSortHelper(arr, n, animations){
  //Loop through each index
  for (let i = 0; i < n; i++){
    let min_index = i;
    //find the minimum index
    for (let j = i; j < n; j++){
      animations.push([j, min_index]);
      animations.push([j, min_index]);
      if (arr[j] < arr[min_index]){
        min_index = j;
      }
    }
    //swap minimun value to the ith index
    if (min_index !== i){
      swap(arr, i, min_index, animations);
    }
  }
}
/******************************************************************/