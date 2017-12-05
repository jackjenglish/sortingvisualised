import React,{Component} from 'react'
import SortingArray from '../SortingArray.js'
var classNames = require('classnames');
class SelectionSortAnimation extends Component{
	constructor(props){
		super(props);
		this.state={arrayMap:this.arrayMap(this.props.array.slice()),swapping:[],pointerApos:0,pointerBpos:1}
		this.selectionSort = this.selectionSort.bind(this);
		this.sleep = this.sleep.bind(this);
		this.reset = this.reset.bind(this);
		this.onComplete = this.onComplete.bind(this);
	}
	componentDidMount(){
		this.selectionSort();		
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
			this.setState({arrayMap:this.arrayMap(nextprops.array.slice()) })
		}
		if (nextprops.play != this.props.play){
			if (nextprops.play){
				this.selectionSort()
			} else{
				if (this.state.completed){
					this.setState({completed:false,
				 		arrayMap:this.arrayMap(this.props.array.slice()),
				 		interrupt:false,
				 		customStyles:{},pointerAPos:0,pointerBPos:1,highlightRange:[],swapping:[]})
				} else{
					this.setState({interrupt:true});
				}
			}
		}
	}
	reset(){
		if (!this.state.interrupt)return false;
		this.setState({
			interrupt:false,
			arrayMap:this.arrayMap(this.props.array.slice()),
			pointerAPos:0,
			customStyles:{},
			pointerBPos:1,
			highlightRange:[],
			swapping:[]})
		return true
	}
	onComplete(){
		this.setState({completed:true})
	}
	async selectionSort(){
		var array = this.state.arrayMap.slice()
		for (var i=0;i<array.length;i++){
			var minVal=i
			this.setState({pointerAPos:i,customStyles:{[array[minVal][1]]:{"backgroundColor":"yellow"},}})
			if (this.reset())return
			await this.sleep(this.props.pointerSpeed)
			for (var j =i+1;j<array.length;j++){
				this.setState({pointerBPos:j})
				if (this.reset())return
				await this.sleep(this.props.pointerSpeed)
				if (array[j][0] < array[minVal][0]){
					minVal = j
					this.setState({customStyles:{[array[minVal][1]]:{"backgroundColor":"yellow"}}})
				}
			}
			if (minVal != i){
				var tmp = array[minVal]
				array[minVal] = array[i]
				array[i] = tmp	

				this.setState({arrayMap:array,swapping:[i,minVal]})
				if (this.reset())return
				await this.sleep(this.props.swapSpeed)
				this.setState({swapping:[]})
			}
			this.setState({highlightRange:[0,i],customStyles:{}})
		}
		this.onComplete()			
	}
	render(){
		return(
			<div className="sort-root">
				<SortingArray 
				 highlightRange={this.state.highlightRange} 
				 customStyles={ this.state.customStyles }
				 pointerAPos={this.state.pointerAPos} 
				 pointerBPos={this.state.pointerBPos}	
				 swapSpeed={this.props.swapSpeed} 
				 pointerSpeed={this.props.pointerSpeed} 
				 arrayMap={this.state.arrayMap} 
				 swapping = {this.state.swapping}
				 arrayPositions={this.state.arrayOffsets}/>
			</div>
		);
	}
}
export default SelectionSortAnimation;