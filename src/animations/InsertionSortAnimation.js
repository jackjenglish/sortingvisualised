import React,{Component} from 'react'
import SortingArray from '../SortingArray.js'
var classNames = require('classnames');
class SelectionSortAnimation extends Component{
	constructor(props){
		super(props);
		this.state={arrayMap:this.arrayMap(this.props.array.slice()),swapping:[],pointerApos:0,pointerBpos:1}
		this.insertionSort = this.insertionSort.bind(this);
		this.sleep = this.sleep.bind(this);
		this.reset = this.reset.bind(this);
		this.onComplete = this.onComplete.bind(this);
	}
	componentDidMount(){
		this.insertionSort()
	}
	sleep(ms){
		return new Promise(resolve=>setTimeout(resolve,ms));
	}
	arrayMap(array){
		var arrayMap=Array(array.length);
		for (var p=0;p<array.length;p++){
			var cur = array[p]
			arrayMap[p] =[cur,p]
		}
		return arrayMap;
	}
	componentWillReceiveProps(nextprops){
		if (nextprops.array !=this.props.array){
			this.setState({array:nextprops.array.slice(),arrayMap:this.arrayMap(nextprops.array.slice())})
		}
		if (nextprops.play != this.props.play){
			if (nextprops.play){
				this.insertionSort()
			} else{
				if (this.state.completed){
					this.setState({completed:false,
						arrayMap:this.arrayMap(this.props.array.slice()),
						interrupt:false,
						pointerAPos:0,
						pointerBPos:1,
						highlightRange:[],
						swapping:[]})
				} else{
					this.setState({interrupt:true})
				}
			}
		}
	}
	reset(){
		if (!this.state.interrupt){
			return false;
		}
		this.setState({
			interrupt:false,
			arrayMap:this.arrayMap(this.props.array.slice()),
			pointerAPos:0,
			pointerBPos:1,
			highlightRange:[],
			swapping:[]})
		return true
	}
	onComplete(){
		this.setState({completed:true})
	}
	async insertionSort(){
		var array = this.state.arrayMap.slice();
		for (var i = 1; i< array.length;i++){
			var j=i;
			this.setState({pointerAPos:j-1,pointerBPos:j})
			if (this.reset())return
			await this.sleep(this.props.pointerSpeed)
			while (j>0 && array[j-1][0] > array[j][0]){
				var tmp = array[j]
				array[j] = array[j-1]
				array[j-1] =tmp
				this.setState({pointerAPos:j-2,pointerBPos:j-1,arrayMap:array,swapping:[j,j-1]})
				j-=1
				if (this.reset())return
				await this.sleep(this.props.swapSpeed)
				this.setState({swapping:[]})
			}
			this.setState({highlightRange:[0,i]})
		}
		this.onComplete();
	}
	render(){
		return(
			<div className="sort-root">
				<SortingArray
				arrayMap={this.state.arrayMap}
				highlightRange={this.state.highlightRange}
				pointerAPos={this.state.pointerAPos}
				pointerBPos={this.state.pointerBPos}
				swapSpeed={this.props.swapSpeed}
				pointerSpeed={this.props.swapSpeed}
				swapping={this.state.swapping} 
				arrayPositions={this.state.arrayOffsets}/>
			</div>
		);
	}
}
export default SelectionSortAnimation;