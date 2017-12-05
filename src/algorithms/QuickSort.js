import React,{Component} from 'react';
import QuickSortAnimation from '../animations/QuickSortAnimation.js';
import SortingSection from '../SortingSection.js';
var classNames=require('classnames');
class QuickSort extends Component{
	constructor(props){
		super(props);
	}
	getHeader(){
		return (
			<div className="algorithm-header">
				<div className="algorithm-title">QuickSort</div>
				<div className="algorithm-complexity">
					<div className="algorithm-complexity-text">Time - O(n log n)</div>
					<div className="algorithm-complexity-text">Space - O(log n)</div>
				</div>
				<div className="algorithm-description">
				QuickSort is a divide and conquer algorithm:
				<ul>
					<li>
					First a pivot is chosen, from the array. In the version shown, the first element in the array is chosen as the pivot.
					</li>
					<li>
					The array is then re-ordered so that all the elements less than the pivot come before it, 
					and all the elements greater than it come after it. This is called partitioning
					</li>
					<li>
					These steps are then recursively applied to the sublist of elements less than or equal to the pivot and to the sublist of elements greater than the pivot.
					 The recursion stops with a sublist size of zero or one, as they are already sorted.
					</li>
				</ul>
				<p>The sublist Quicksort is being applied to is shown in dark grey.</p>
			</div>					
		</div>
	);
	}
	getNotation(){
		return (
			<div className="algorithm-note">
				<div className="algorithm-note-text">Pivot - </div>
				<div className="algorithm-note-legend yellow"></div>
				<div className="algorithm-note-text">Active Range - </div>
				<div className="algorithm-note-legend darkGrey"></div>
			</div>
		);
	}
	getFooter(){
		return (
			<div className="algorithm-footer">
				<div className="algorithm-description">
					<p>The method of partitioning (the second step) shown is the Hoare partition scheme. 
					Two indices are placed at either end of the list being partitioned, then move toward each other,
					 until they arrive at a pair of elements one greater or equal to the pivot and one less than or equal to it, 
					 that are in the wrong order. They are then swapped.
					 For example, in the list [ 3, 2, 1 ] with 2 being the pivot. 3 and 1 are out of order.
					This continues until the indices meet, at which point quicksort is applied to the two sides of the partition.</p>
					<p>
					 The performance of Quicksort depends on how the pivot divides the list.
					 In the best case the pivot will repeatedly divide the list into two similarly sized sublists, meaning the depth of recursion is <b>log n</b>.
					 Each level of the call tree all together processes in <b>O(n)</b>time, giving a <b>O(n log n) complexity.</b></p>
					 <p>In the worst case the pivot will repeatedly be either the smallest or largest element in the list. This will result in a recursion depth of n-1 with each level doing <b>O(n)</b> work. That gives a <b>O(n<sup>2</sup>)</b> complexity. However, this is very unlikely and the average complexity is <b>O(n log n)</b></p>
					<p>Quicksort uses <b>O(log n)</b> extra space as the recursive calls will add stack frames .</p>
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
			algorithm={<QuickSortAnimation/>} 
			array={this.props.array}
			/>
			);
	}
}

export default QuickSort;