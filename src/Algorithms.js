import React, { Component } from "react";
import SelectionSort from "./algorithms/SelectionSort.js";
import BubbleSort from "./algorithms/BubbleSort.js";
import QuickSort from "./algorithms/QuickSort.js";
import MergeSort from "./algorithms/MergeSort.js";
import InsertionSort from "./algorithms/InsertionSort.js";
import "./css/Algorithms.css";
var classNames = require("classnames");
class Algorithms extends Component {
  constructor(props) {
    super(props);
    this.state = { defaultArray: [9, 4, 6, 7, 8, 1, 2, 3, 5, 0] };
  }
  componentDidMount() {}

  render() {
    return (
      <div className="algorithms-root">
        <SelectionSort array={this.state.defaultArray} />
        <QuickSort array={this.state.defaultArray} />
        <BubbleSort array={this.state.defaultArray} />
        <MergeSort array={this.state.defaultArray} />
        <InsertionSort array={this.state.defaultArray} />
      </div>
    );
  }
}
export default Algorithms;
