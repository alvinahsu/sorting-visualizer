/*
* Author: Alvin Hsu
* Date: 9/4/2021
*
* File Name: SortingVisualizer.jsx
* Description: This file is the drive file for the sorting visualizer.
* It contains the class SortingVisualizer and its methods that is used
* to create the sorting visualizations for each sorting algorithm. It 
* contains HTML code for the webpage.
*/

/* Imports */
import React from 'react';
import './SortingVisualizer.css';
import * as sortingAlgorithms from '../SortingAlgorithms/sortingAlgorithms';

/* Global variables */
const PRIMARY_COLOR = 'navy';
const SECONDARY_COLOR = 'red';
let array_size = 75;
let animation_speed_ms = 5;

/**
 * This class contains the methods used to create a sorting
 * visualizations. It also contains HTML code for the webpage
 * as it extends React.Component.
 */
export default class SortingVisualizer extends React.Component{

    //call constructor of super class(React.Component)
    constructor(props){
        super(props);

        //array of ints for sorting
        this.state = {
            array: [],
        };
    }

    /* When page loads, we generate array */
    componentDidMount(){
        //Set title for the page
        document.title = "Sorting Visualizer";
        this.resetArray();
        //Resize slider max value based on width of screen
        if (window.innerWidth <= 450){
            document.getElementById('barRange').max = 70;
        }
        else {
            document.getElementById('barRange').max = 150;
        }
    }

    /* Resets the values of array */
    resetArray(){
        const array = [];
        for (let i = 0; i < array_size; i++){
            //get random ints
            array.push(randomIntFromInterval(5, 500));
        }
        this.setState({array}); 
    }

    /* Disables all buttons on page*/
    disableButton(){
        //get all buttons
        let buttons = document.getElementsByTagName('button');
        for (let i = 0 ;i < buttons.length; i++){
            //set disabled to be true
            buttons[i].disabled = true;
        }
        //disable slider
        document.getElementById("barRange").disabled = true;
    }

    /* Enables all buttons on page*/
    enableButton(){
        //get all buttons
        let buttons = document.getElementsByTagName('button');
        for (let i = 0 ;i < buttons.length; i++){
            //set disabled to be false
            buttons[i].disabled = false;
        }
        //enable slider
        document.getElementById("barRange").disabled = false;
    }

    /**
     * This function sets the array_size to the value
     * of the new input size.
     * 
     * @param {*} newSize new size of array
     */
    changeArraySize(newSize){
        array_size = newSize;
        this.resetArray();
    }


    /**
     * This function calls getMergeSortAnimations from sortingAlgorithms.js and uses the return
     * array to create visualizations for merge sort.
     *  
     * @param {*} callback enable buttons function call 
     */
    mergeSort(callback){
        //get animations array
        const animations = sortingAlgorithms.getMergeSortAnimations(this.state.array);

        //create promise
        const timer = ms => new Promise(res => setTimeout(res, ms))

        /* load function */
        async function load(enableB){
            //loop through animations array
            for (let i = 0; i < animations.length; i++) {
                //get arraybars
                const arrayBars = document.getElementsByClassName('array-bar');
                //every two is comparison and third is change bar height
                const isColorChange = i % 3 !== 2;
                //change the color
                if (isColorChange) {
                    const [barOneIdx, barTwoIdx] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    //if third color, set to primary color, else sec color
                    const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                    setTimeout(() => {
                        barOneStyle.backgroundColor = color;
                        barTwoStyle.backgroundColor = color;
                    },  animation_speed_ms);
                } 
                //else change the height
                else {
                    setTimeout(() => {
                        //set the height of the bar the barOneIdx
                        const [barOneIdx, newHeight] = animations[i];
                        const barOneStyle = arrayBars[barOneIdx].style;
                        barOneStyle.height = `${newHeight}px`;
                    }, animation_speed_ms);
                }
                await timer(animation_speed_ms);
            }
            //enable all buttons
            enableB();
        }
        //call load function
        load(callback);
    }


    /**
     * This function calls getQuickSortAnimations from sortingAlgorithms.js and uses the return
     * array to create visualizations for quick sort.
     *  
     * @param {*} callback enable buttons function call 
     */
    quickSort(callback) {
        //get animations array
        const animations = sortingAlgorithms.getQuickSortAnimations(this.state.array);

        //create promise
        const timer = ms => new Promise(res => setTimeout(res, ms))

        /* load function */
        async function load(enableB){
        //indicate if the next elements in array is a swap or not
        let isSwap = false;
        //count of swaps, count of color changes
        let count = 0, colorCount = 0;
        //loop through animations array;
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const [first, second] = animations[i];
            //if animations[i][0] == -1 && animations[i][1] == -1
            //this indicates that the next two elements is swapped
            if (first === -1 && second === -1){
                isSwap = true;
            }
            //color change
            else if (!isSwap && first !== -1 && second !== -1) {
                colorCount++;
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                //if first colorCount, change to sec color, else primary
                const color = colorCount === 1 ? SECONDARY_COLOR : PRIMARY_COLOR;
                if (colorCount === 2) colorCount = 0; //finish change, reset colorCount
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                },  animation_speed_ms);
            } 
            //swap 
            else if (isSwap && first !== -1 && second !== -1) {
                count++;
                const [barOneIdx, newHeight] = animations[i];
                setTimeout(() => {
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, animation_speed_ms);
                //once we swapped both elements, we reset isSwap and count
                if (count === 2){
                    isSwap = false;
                    count = 0;
                }
            }

            await timer(animation_speed_ms);
            }
            //enable all buttons
            enableB();
        }
        //call load function
        load(callback);
    } 

    /**
     * This functions call getHeapSortAnimations from sortingAlgorithms.js and uses the return
     * array to create visualizations for heap sort.
     *  
     * @param {*} callback enable buttons function call 
     */
    heapSort(callback) {
        //get animations array
        const animations = sortingAlgorithms.getHeapSortAnimations(this.state.array);

        //create promise
        const timer = ms => new Promise(res => setTimeout(res, ms))

        /* load function */
        async function load(enableB){
            //indicate if the next elements in array is a swap or not
            let isSwap = false; 
            //count of swaps, count of color changes
            let count = 0, colorCount = 0;
            //loop through animations array;
            for (let i = 0; i < animations.length; i++) {
                const arrayBars = document.getElementsByClassName('array-bar');
                //if animations[i][0] == -1 && animations[i][1] == -1
                //this indicates that the next two elements is swapped
                const [first, second] = animations[i];
                if (first === -1 && second === -1){
                    isSwap = true;
                }
                //color change
                else if (!isSwap && first !== -1 && second !== -1) {
                    colorCount++;
                    const [barOneIdx, barTwoIdx] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    //if first colorCount, change to sec color, else primary
                    const color = colorCount === 1 ? SECONDARY_COLOR : PRIMARY_COLOR;
                    if (colorCount === 2) colorCount = 0;
                    setTimeout(() => {
                        barOneStyle.backgroundColor = color;
                        barTwoStyle.backgroundColor = color;
                    },  animation_speed_ms);
                } 
                //swap
                else if (isSwap && first !== -1 && second !== -1) {
                    count++;
                    const [barOneIdx, newHeight] = animations[i];
                    setTimeout(() => {
                        const barOneStyle = arrayBars[barOneIdx].style;
                        barOneStyle.height = `${newHeight}px`;
                    }, animation_speed_ms);
                    //once we swapped both elements, we reset isSwap and count
                    if (count === 2){
                        isSwap = false;
                        count = 0;
                    }
                }

            await timer(animation_speed_ms);
            }
            //enable all buttons
            enableB();
        }
        //call load function
        load(callback);

    }

    /**
     * This functions call getBubbleSortAnimations from sortingAlgorithms.js and uses the return
     * array to create visualizations for bubble sort.
     *  
     * @param {*} callback enable buttons function call 
     */
    bubbleSort(callback) {
        //get animations array
        const animations = sortingAlgorithms.getBubbleSortAnimations(this.state.array);
        
        //create promise
        const timer = ms => new Promise(res => setTimeout(res, ms))

        /* load function */
        async function load(enableB){
            //indicate if the next elements in array is a swap or not
            let isSwap = false;
            //count of swaps, count of color changes
            let count = 0, colorCount = 0;
            //loop through animations array;
            for (let i = 0; i < animations.length; i++) {
                const arrayBars = document.getElementsByClassName('array-bar');
                //if animations[i][0] == -1 && animations[i][1] == -1
                //this indicates that the next two elements is swapped
                const [first, second] = animations[i];
                if (first === -1 && second === -1){
                    isSwap = true;
                }
                //color change
                else if (!isSwap && first !== -1 && second !== -1) {
                    colorCount++;
                    const [barOneIdx, barTwoIdx] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    //if first colorCount, change to sec color, else primary
                    const color = colorCount === 1 ? SECONDARY_COLOR : PRIMARY_COLOR;
                    if (colorCount === 2) colorCount = 0;
                    setTimeout(() => {
                        barOneStyle.backgroundColor = color;
                        barTwoStyle.backgroundColor = color;
                    },  animation_speed_ms);
                } 
                //swap
                else if (isSwap && first !== -1 && second !== -1) {
                    count++;
                    const [barOneIdx, newHeight] = animations[i];
                    setTimeout(() => {
                        const barOneStyle = arrayBars[barOneIdx].style;
                        barOneStyle.height = `${newHeight}px`;
                    }, animation_speed_ms);
                    //once we swapped both elements, we reset isSwap and count
                    if (count === 2){
                        isSwap = false;
                        count = 0;
                    }
                }

            await timer(animation_speed_ms);
            }
            //enable all buttons
            enableB();
        }
        //call load function
        load(callback);
    }

    /**
     * This functions call getInsertionSortAnimations from sortingAlgorithms.js and uses the return
     * array to create visualizations for insertion sort.
     *  
     * @param {*} callback enable buttons function call 
     */
    insertionSort(callback) {
        //get animations array
        const animations = sortingAlgorithms.getInsertionSortAnimations(this.state.array);
        
        //create promise
        const timer = ms => new Promise(res => setTimeout(res, ms))

        /* load function */
        async function load(enableB){
            //indicate if the next elements in array is a swap or not
            let isSwap = false;
            //count of swaps, count of color changes
            let count = 0, colorCount = 0;
            //loop through animations array;
            for (let i = 0; i < animations.length; i++) {
                const arrayBars = document.getElementsByClassName('array-bar');
                //if animations[i][0] == -1 && animations[i][1] == -1
                //this indicates that the next two elements is swapped
                const [first, second] = animations[i];
                if (first === -1 && second === -1){
                    isSwap = true;
                }
                //color change
                else if (!isSwap && first !== -1 && second !== -1) {
                    colorCount++;
                    const [barOneIdx, barTwoIdx] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    //if first colorCount, change to sec color, else primary
                    const color = colorCount === 1 ? SECONDARY_COLOR : PRIMARY_COLOR;
                    if (colorCount === 2) colorCount = 0;
                    setTimeout(() => {
                        barOneStyle.backgroundColor = color;
                        barTwoStyle.backgroundColor = color;
                    },  animation_speed_ms);
                } 
                //swap
                else if (isSwap && first !== -1 && second !== -1) {
                    count++;
                    const [barOneIdx, newHeight] = animations[i];
                    setTimeout(() => {
                        const barOneStyle = arrayBars[barOneIdx].style;
                        barOneStyle.height = `${newHeight}px`;
                    }, animation_speed_ms);
                    //once we swapped both elements, we reset isSwap and count
                    if (count === 2){
                        isSwap = false;
                        count = 0;
                    }
                }

            await timer(animation_speed_ms);
            }
            //enable all buttons
            enableB();
        }
        //call load function
        load(callback);
    }

    /**
     * This functions call getSelectionSortAnimations from sortingAlgorithms.js and uses the return
     * array to create visualizations for selection sort.
     *  
     * @param {*} callback enable buttons function call 
     */
    selectionSort(callback) {
        //get animations array
        const animations = sortingAlgorithms.getSelectionSortAnimations(this.state.array);
        
        //create promise
        const timer = ms => new Promise(res => setTimeout(res, ms))

        /* load function */
        async function load(enableB){
            //indicate if the next elements in array is a swap or not
            let isSwap = false;
            //count of swaps, count of color changes
            let count = 0, colorCount = 0;
            //loop through animations array;
            for (let i = 0; i < animations.length; i++) {
                const arrayBars = document.getElementsByClassName('array-bar');
                const [first, second] = animations[i];
                //if animations[i][0] == -1 && animations[i][1] == -1
                //this indicates that the next two elements is swapped
                if (first === -1 && second === -1){
                    isSwap = true;
                }
                //color change
                else if (!isSwap && first !== -1 && second !== -1) {
                    colorCount++;
                    const [barOneIdx, barTwoIdx] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    //if first colorCount, change to sec color, else primary
                    const color = colorCount === 1 ? SECONDARY_COLOR : PRIMARY_COLOR;
                    if (colorCount === 2) colorCount = 0;
                    setTimeout(() => {
                        barOneStyle.backgroundColor = color;
                        barTwoStyle.backgroundColor = color;
                    },  animation_speed_ms);
                } 
                //swap
                else if (isSwap && first !== -1 && second !== -1) {
                    count++;
                    const [barOneIdx, newHeight] = animations[i];
                    setTimeout(() => {
                        const barOneStyle = arrayBars[barOneIdx].style;
                        barOneStyle.height = `${newHeight}px`;
                    }, animation_speed_ms);
                    //once we swapped both elements, we reset isSwap and count
                    if (count === 2){
                        isSwap = false;
                        count = 0;
                    }
                }

            await timer(animation_speed_ms);
            }
            //enable all buttons
            enableB();
        }
        //call load function
        load(callback);
    }

    /* render function to display HTML code */
    render() {
        const {array} = this.state;

        return (
            <div className="array-container">
                <div className="buttons">
                    <button onClick={() => this.resetArray()}>Generate New Array</button>
                    <div className="slide-container">
                        <p>Change Array Size</p>
                        <input type="range" min="4" max="150" defaultValue="75" 
                            step="1" onChange={this.handleChange, e => this.changeArraySize(e.target.value)} className="slider" id="barRange"/>
                    </div>
                    <button onClick={() => {this.mergeSort(this.enableButton); this.disableButton()}}>Merge Sort</button>
                    <button onClick={() => {this.quickSort(this.enableButton); this.disableButton()}}>Quick Sort</button>
                    <button onClick={() => {this.heapSort(this.enableButton); this.disableButton()}}>Heap Sort</button>
                    <button onClick={() => {this.bubbleSort(this.enableButton); this.disableButton()}}>Bubble Sort</button>
                    <button onClick={() => {this.insertionSort(this.enableButton); this.disableButton()}}>Insertion Sort</button>
                    <button onClick={() => {this.selectionSort(this.enableButton); this.disableButton()}}>Selection Sort</button>
                </div>
                <div className="bars">
                    {array.map((value, idx) => (
                    <div
                        className="array-bar"
                        key={idx}
                        style={{
                        backgroundColor: PRIMARY_COLOR,
                        height: `calc(.1 * ${value}vh)`,
                        }}></div>
                    ))}
                </div>
            </div>
        );
    }
}

/**
 * 
 * @param {*} min minimun range
 * @param {*} max maximum range
 * @returns int between the interval range min and max 
 */
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
