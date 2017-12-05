import React,{Component} from 'react';
import BubbleSortAnimation from '../animations/BubbleSortAnimation.js';
import SortingSection from '../SortingSection.js';
var classNames=require('classnames');
class BubbleSort extends Component{
	constructor(props){
		super(props);
	}
	getHeader(){
		return (
			<div className="algorithm-header">
				<div className="algorithm-title">BubbleSort</div>
				<div className="algorithm-complexity">
					<div className="algorithm-complexity-text">Time - O(n<sup>2</sup>)</div>
					<div className="algorithm-complexity-text">Space - O(1)</div>
				</div>
				<div className="algorithm-description">
				How it works:
				<ul>
					<li>
						Bubble sort works by stepping through the list comparing each pair of adjacent items and swapping them if they are out of order.
					</li>
					<li>
						This pass through is repeated until no swaps are needed, meaning the list is sorted.
					</li>
				</ul>
				Notice how on each pass through the largest element "bubbles" to the top of the list.
				</div>					
			</div>
	);
	}
	getNotation(){
		return (
			<div className="algorithm-note">
				<div className="algorithm-note-text">'Bubble' Area - </div>
				<div className="algorithm-note-legend"></div>
			</div>
		);
	}
	getFooter(){
		return (
			<div className="algorithm-footer">
				<div className="algorithm-description">
					<p>After the first pass through we know the largest element is in the correct place at the end of the list. 
					Therefore, on the subsequent pass throughs we only need to check n-1 elements. 
					This pattern continues until we only need to do one comparison or will stop before that if no swaps are made in a pass through. 
					The section we don't need to check is shown in grey in the animation.</p>
					<p>BubbleSort is an inefficient sorting algorithm with an Average/Worst Case complexity of <b>O(n<sup>2</sup>)</b>. Although one advantage it has is a Best Case complexity of <b>O(n)</b> when the list is already sorted. It will do one pass through taking <b>O(n)</b> time, and then finish as it made no swaps.  </p>							
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
			algorithm={<BubbleSortAnimation/>} 
			array={this.props.array}
			/>
			);
	}
}

export default BubbleSort;