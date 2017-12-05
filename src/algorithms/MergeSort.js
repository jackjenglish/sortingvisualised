import React,{Component} from 'react';
import MergeSortAnimation from '../animations/MergeSortAnimation.js';
import SortingSection from '../SortingSection.js';
var classNames=require('classnames');
class MergeSort extends Component{
	constructor(props){
		super(props);
	}
	getHeader(){
		return (
			<div className="algorithm-header">
				<div className="algorithm-title">Merge Sort</div>
				<div className="algorithm-complexity">
					<div className="algorithm-complexity-text">Time - O(n log n)</div>
					<div className="algorithm-complexity-text">Space - O(n)</div>
				</div>
				<div className="algorithm-description">
				Merge sort is also a divide and conquer algorithm, this is how it works:
				<ul>
					<li>
					It first divides the unsorted list into n sorted sublists of size 1 (a single element is already sorted).
					</li>
					<li>
					It then repeatedly merges sorted sublists to produce a single sorted sulist. 
					</li>
				</ul>
				<p>First you will see sorted sublists of size 1 being merged into sorted sublists of size 2. Then merging sorted sublists of size 2 into size 4 and so on.</p>
			</div>					
			</div>
			);
	}
	getNotation(){
		return (
			<div className="algorithm-note">
				<div className="algorithm-note-text">Left Sorted Sub Array - </div>
				<div className="algorithm-note-legend darkGrey"></div>
				<div className="algorithm-note-text">Right Sorted Sub Array - </div>
				<div className="algorithm-note-legend darkGreen"></div>
			</div>
		);
	}
	getFooter(){
		return (
			<div className="algorithm-footer">
				<div className="algorithm-description">
					<p>A two pointers algorithm is used to merge the two sorted sublists.
					The elements at the start of the two lists are compared,
					the smaller element is added to a temporary list and its pointer advances to the next element. The next two elements are the compared
					This continues until both pointers reach the end of their lists and the temporary list which is in sorted order is copied back into the original list. This runs in <b>O(n)</b> time where n is the combined length of the two lists.
					</p>
					<p>To recursively combine n sublists of size 1 will take recursion depth of 1 + log n. With Each level will in total be doing <b>O(n)</b> work, Merge sort has a <b>O(n log n)</b>complexity </p>
					<p><b>O(n)</b> extra space is needed for the temporary array during the merging.</p>

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
			algorithm={<MergeSortAnimation/>}
			array={this.props.array} 
			/>
			);
	}
}

export default MergeSort;