import React,{Component} from 'react';
import SelectionSortAnimation from '../animations/SelectionSortAnimation.js';
import SortingSection from '../SortingSection.js';
var classNames=require('classnames');
class SelectionSort extends Component{
	constructor(props){
		super(props);
	}
	getHeader(){
		return (
			<div className="algorithm-header">
				<div className="algorithm-title">Selection Sort</div>
				<div className="algorithm-complexity">
					<div className="algorithm-complexity-text">Time - O(n<sup>2</sup>)</div>
					<div className="algorithm-complexity-text">Space - O(1)</div>
				</div>
				<div className="algorithm-description">
				How it works:
				<ul>
					<li>
					Selection sort splits the list into two parts. A sorted sublist that is built up from the left of the list towards the right and the sublist of items that haven't yet been sorted to the right of that.
					</li>
					<li>
					Initially, the sorted sublist is empty and the unsorted sublist is the entire list.
					</li>
					<li>
					The algorithm finds the smallest element in the unsorted sublist and swaps it with the element just to the right of the sorted sublist. It then expands the boundary of the sorted sublist by one. This is done repeatedly until the whole list is sorted.
					</li>
				</ul>
				</div>					
			</div>
			);
	}
	getNotation(){
		return (
			<div className="algorithm-note">
				<div className="algorithm-note-text">Sorted Area - </div>
				<div className="algorithm-note-legend"></div>
				<div className="algorithm-note-text">Minimum Value - </div>
				<div className="algorithm-note-legend yellow"></div>
			</div>
		);
	}
	getFooter(){
		return (
			<div className="algorithm-footer">
				<div className="algorithm-description">
					<p>Selection sort has an best, average and worst Case complexity of <b>O(n<sup>2</sup>)</b>. It takes n sweeps through the unsorted sublist to construct the sorted sublist. Each one of these sweeps requires scanning all elements in the unsorted sublist to find the minimum. As the unsorted sublist shrinks by one every sweep, this will take checking n elements the first sweep, n-1 on the second and so on. Giving a complexity of n(n-1) / 2 -> <b>O(n<sup>2</sup>)</b></p>							
					<p>As it is an in-place sorting algorithm it uses no extra space.</p>
				</div>
			</div>
			);
	}
	render(){
		return (
			<SortingSection 
			header={this.getHeader()}
			notation={this.getNotation()}
			footer={this.getFooter()}
			algorithm={<SelectionSortAnimation/>} 
			array={this.props.array}
			/>
			);
	}
}

export default SelectionSort