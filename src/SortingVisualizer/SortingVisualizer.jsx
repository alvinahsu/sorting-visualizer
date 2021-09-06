import React from 'react';
import './SortingVisualizer.css';
import * as sortingAlgorithms from '../SortingAlgorithms/sortingAlgorithms';

const PRIMARY_COLOR = 'navy';
const SECONDARY_COLOR = 'red';

let array_size = 75;
let animation_speed_ms = 5;

export default class SortingVisualizer extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            array: [],
        };
    }

    /* When page loads, we generate array */
    componentDidMount(){
        document.title = "Sorting Visualizer";
        this.resetArray();
    }

    /* Resets the values of array */
    resetArray(){
        const array = [];
        for (let i = 0; i < array_size; i++){
            array.push(randomIntFromInterval(5, 500));
        }
        this.setState({array}); 
    }


    disableButton(){
        let buttons = document.getElementsByTagName('button');
        for (let i = 0 ;i < buttons.length; i++){
            buttons[i].disabled = true;
        }
        document.getElementById("barRange").disabled = true;
    }

    enableButton(){
        let buttons = document.getElementsByTagName('button');
        for (let i = 0 ;i < buttons.length; i++){
            buttons[i].disabled = false;
        }
        document.getElementById("barRange").disabled = false;
    }

    changeArraySizeAndSpeed(newSize, newSpeed){
        array_size = newSize;
        animation_speed_ms = newSpeed;
        this.resetArray();
    }


    mergeSort(callback){
        const animations = sortingAlgorithms.getMergeSortAnimations(this.state.array);
        const timer = ms => new Promise(res => setTimeout(res, ms))
        async function load(enableB){
           for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            //every two is comparison and third is change bar height
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                },  animation_speed_ms);
            } 
            else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, animation_speed_ms);
            }
            await timer(animation_speed_ms);
            }
            enableB();
        }
        load(callback);
    }

  quickSort(callback) {
        const animations = sortingAlgorithms.getQuickSortAnimations(this.state.array);

        const timer = ms => new Promise(res => setTimeout(res, ms))
        async function load(enableB){
            let isSwap = false;
            let count = 0, colorCount = 0;
           for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const [first, second] = animations[i];
            if (first === -1 && second === -1){
                isSwap = true;
            }
            else if (!isSwap && first !== -1 && second !== -1) {
                colorCount++;
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = colorCount === 1 ? SECONDARY_COLOR : PRIMARY_COLOR;
                if (colorCount === 2) colorCount = 0;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                },  animation_speed_ms);
            } 
            else if (isSwap && first !== -1 && second !== -1) {
                count++;
                const [barOneIdx, newHeight] = animations[i];
                setTimeout(() => {
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, animation_speed_ms);
                if (count === 2){
                    isSwap = false;
                    count = 0;
                }
            }

            await timer(animation_speed_ms);
            }
            enableB();
        }
        load(callback);
  }

  heapSort(callback) {
        const animations = sortingAlgorithms.getHeapSortAnimations(this.state.array);

        const timer = ms => new Promise(res => setTimeout(res, ms))
        async function load(enableB){
            let isSwap = false;
            let count = 0, colorCount = 0;
           for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const [first, second] = animations[i];
            if (first === -1 && second === -1){
                isSwap = true;
            }
            else if (!isSwap && first !== -1 && second !== -1) {
                colorCount++;
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = colorCount === 1 ? SECONDARY_COLOR : PRIMARY_COLOR;
                if (colorCount === 2) colorCount = 0;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                },  animation_speed_ms);
            } 
            else if (isSwap && first !== -1 && second !== -1) {
                count++;
                const [barOneIdx, newHeight] = animations[i];
                setTimeout(() => {
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, animation_speed_ms);
                if (count === 2){
                    isSwap = false;
                    count = 0;
                }
            }

            await timer(animation_speed_ms);
            }
            enableB();
        }
        load(callback);

  }

  bubbleSort(callback) {
    const animations = sortingAlgorithms.getBubbleSortAnimations(this.state.array);
    const timer = ms => new Promise(res => setTimeout(res, ms))
    async function load(enableB){
        let isSwap = false;
        let count = 0, colorCount = 0;
        for (let i = 0; i < animations.length; i++) {
        const arrayBars = document.getElementsByClassName('array-bar');
        const [first, second] = animations[i];
        if (first === -1 && second === -1){
            isSwap = true;
        }
        else if (!isSwap && first !== -1 && second !== -1) {
            colorCount++;
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = colorCount === 1 ? SECONDARY_COLOR : PRIMARY_COLOR;
            if (colorCount === 2) colorCount = 0;
            setTimeout(() => {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
            },  animation_speed_ms);
        } 
        else if (isSwap && first !== -1 && second !== -1) {
            count++;
            const [barOneIdx, newHeight] = animations[i];
            setTimeout(() => {
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${newHeight}px`;
            }, animation_speed_ms);
            if (count === 2){
                isSwap = false;
                count = 0;
            }
        }

        await timer(animation_speed_ms);
        }
        enableB();
    }
    load(callback);
  }


  insertionSort(callback) {
     const animations = sortingAlgorithms.getInsertionSortAnimations(this.state.array);
     console.log(animations);
    const timer = ms => new Promise(res => setTimeout(res, ms))
    async function load(enableB){
        let isSwap = false;
        let count = 0, colorCount = 0;
        for (let i = 0; i < animations.length; i++) {
        const arrayBars = document.getElementsByClassName('array-bar');
        const [first, second] = animations[i];
        if (first === -1 && second === -1){
            isSwap = true;
        }
        else if (!isSwap && first !== -1 && second !== -1) {
            colorCount++;
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = colorCount === 1 ? SECONDARY_COLOR : PRIMARY_COLOR;
            if (colorCount === 2) colorCount = 0;
            setTimeout(() => {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
            },  animation_speed_ms);
        } 
        else if (isSwap && first !== -1 && second !== -1) {
            count++;
            const [barOneIdx, newHeight] = animations[i];
            setTimeout(() => {
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${newHeight}px`;
            }, animation_speed_ms);
            if (count === 2){
                isSwap = false;
                count = 0;
            }
        }

        await timer(animation_speed_ms);
        }
        enableB();
    }
    load(callback);
}

  selectionSort(callback) {
     const animations = sortingAlgorithms.getSelectionSortAnimations(this.state.array);
     console.log(animations);
    const timer = ms => new Promise(res => setTimeout(res, ms))
    async function load(enableB){
        let isSwap = false;
        let count = 0, colorCount = 0;
        for (let i = 0; i < animations.length; i++) {
        const arrayBars = document.getElementsByClassName('array-bar');
        const [first, second] = animations[i];
        if (first === -1 && second === -1){
            isSwap = true;
        }
        else if (!isSwap && first !== -1 && second !== -1) {
            colorCount++;
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = colorCount === 1 ? SECONDARY_COLOR : PRIMARY_COLOR;
            if (colorCount === 2) colorCount = 0;
            setTimeout(() => {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
            },  animation_speed_ms);
        } 
        else if (isSwap && first !== -1 && second !== -1) {
            count++;
            const [barOneIdx, newHeight] = animations[i];
            setTimeout(() => {
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${newHeight}px`;
            }, animation_speed_ms);
            if (count === 2){
                isSwap = false;
                count = 0;
            }
        }

        await timer(animation_speed_ms);
        }
        enableB();
    }
    load(callback);
}





  render() {
    const {array} = this.state;

    return (

        <div className="array-container">
            <div className="buttons">
                <button onClick={() => this.resetArray()}>Generate New Array</button>
                <div className="slide-container">
                    <p>Change Array Size</p>
                    <input type="range" min="4" max="150" defaultValue="75" 
                        step="1" onChange={this.handleChange, e => this.changeArraySizeAndSpeed(e.target.value)} className="slider" id="barRange"/>
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

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
