import React,{Component} from 'react';
import InsertionSortAnimation from '../animations/InsertionSortAnimation.js';
import SortingSection from '../SortingSection.js';
var classNames=require('classnames');
class SelectionSort extends Component{
	constructor(props){
		super(props);
	}
	getHeader(){
		return (
			<div className="algorithm-header">
				<div className="algorithm-title">InsertionSort</div>
				<div className="algorithm-complexity">
					<div className="algorithm-complexity-text">Time - O(n<sup>2</sup>)</div>
					<div className="algorithm-complexity-text">Space - O(1)</div>
				</div>
				<div className="algorithm-description">
				How it works:
				<ul>
					<li>
					Insertion Sort maintains a sorted sublist that is built out from the left of the list.
					</li>
					<li>
						Initially the sorted sublist just has the first element in it.
						</li>
					<li>
					The element just to the right of the sorted sublist is inserted into it. This element will continually do pair swaps with elements to the left until it is in its correct position. 
					The boundary of the sorted sublist is then expanded by one. 
					</li>
					<li>The above step is carried out until all the elements are inserted into the sorted section.</li>
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
			</div>
		);
	}
	getFooter(){
		return (
			<div className="algorithm-footer">
				<div className="algorithm-description">
					<p>Insertion sort has an best case complexity of <b>O(n)</b> when the list is already sorted. It has an average and worst Case complexity of <b>O(n<sup>2</sup>)</b>.</p>							
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
			algorithm={<InsertionSortAnimation/>} 
			array={this.props.array}
			/>
			);
	}
}

export default SelectionSort