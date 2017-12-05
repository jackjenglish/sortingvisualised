import React,{Component} from 'react'
import SortingArray from '../SortingArray.js';
var classNames = require('classnames');
class MergeSortAnimation extends Component{
	constructor(props){
		super(props);
		this.state={
			arrayMap:this.arrayMap(this.props.array.slice()),
			tempArray:this.arrayMap(Array(this.props.array.length).fill(null)),
			swapping:[],
			tempSwapping:[],
			pointerApos:0,
			pointerBpos:1}
		this.mergeSort = this.mergeSort.bind(this);
		this.merge = this.merge.bind(this);
		this.sleep = this.sleep.bind(this);
		this.reset = this.reset.bind(this);
		this.onComplete = this.onComplete.bind(this);
		this.initialiseSort = this.initialiseSort.bind(this);
	}
	componentDidMount(){
		this.initialiseSort()
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
			this.setState({
				array:nextprops.array.slice(),
				arrayMap:this.arrayMap(nextprops.array.slice()),
				tempArray:this.arrayMap(Array(nextprops.array.length).fill(null))},
				()=>{console.log("set",this.state.array,this.state.arrayOffsets)})
		}
		if (nextprops.play != this.props.play){
			if (nextprops.play){
				this.initialiseSort()
			} else{
				if (this.state.completed){
				this.setState({
					completed:false,
					arrayMap:this.arrayMap(this.props.array.slice()),
					tempArray:this.arrayMap(Array(this.props.array.length).fill(null)),
					interrupt:false,
					pointerAPos:0,
					pointerBPos:1,
					highlightRange:[],
					swapping:[]})
				}else{
				this.setState({interrupt:true})
				}
			}
		}
	}
	reset(){
		this.setState({interrupt:false,
			arrayMap:this.arrayMap(this.props.array.slice()),
			tempArray:this.arrayMap(Array(this.props.array.length).fill(null)),
			pointerAPos:0,
			pointerBPos:1,
			highlightRange:[],
			swapping:[]})
	}
	onComplete(){
		this.setState({completed:true})
	}
	async merge(array,temp,leftStart,mid,rightEnd){
		var temp = this.arrayMap(Array(array.length).fill(null));
		this.setState({tempArray:temp,tempBoxStyles:[]})
		var leftEnd = mid
		var rightStart = leftEnd+1
		var i = leftStart;
		var j= rightStart;
		var index=leftStart;

		var leftRange = [[leftStart,leftEnd],{backgroundColor:"#444"}]
		var rightRange =[[rightStart,rightEnd],{backgroundColor:"#fff200"}]
		this.setState({boxStyles:[leftRange,rightRange] ,pointerAPos:i,pointerBPos:j})
		if(this.state.interrupt)return;
		await this.sleep(this.props.pointerSpeed)

		while (i<=leftEnd || j<=rightEnd){
			if (i==leftEnd+1){
				for (j;j<=rightEnd;j++){
					temp[index][0] = array[j][0]
					index+=1
					var hide=false;
					if (j==rightEnd)hide=true;
					this.setState({swapping:[j],tempSwapping:[index-1]})
					if(this.state.interrupt)return;
					await this.sleep(this.props.pointerSpeed)
					this.setState({swapping:[],tempSwapping:[],pointerBPos:j+1,pointerBHide:hide})
					await this.sleep(this.props.pointerSpeed)

				}
				break;
			} else if (j==rightEnd+1){
				for (i;i<=leftEnd;i++){
					temp[index][0] = array[i][0]
					index+=1
					var hide=false;
					if (i==leftEnd)hide=true;
					if(this.state.interrupt)return;
					this.setState({swapping:[i],tempSwapping:[index-1]})
					await this.sleep(this.props.pointerSpeed)
					this.setState({swapping:[],tempSwapping:[],pointerAPos:i+1,pointerAHide:hide})
					await this.sleep(this.props.pointerSpeed)
				}
				break;
			} else if(array[i][0] < array[j][0]){
				temp[index][0] = array[i][0]
				index+=1
				i+=1
				var hide=false
				if (i==leftEnd+1)hide=true;
				if(this.state.interrupt)return;
				this.setState({swapping:[i-1],tempSwapping:[index-1]})
				await this.sleep(this.props.pointerSpeed)
				this.setState({swapping:[],tempSwapping:[],pointerAPos:i,pointerAHide:hide})
				await this.sleep(this.props.pointerSpeed)

			} else{
				temp[index][0] = array[j][0]
				index+=1
				j+=1
				var hide=false
				if (j==rightEnd+1)hide=true;
				if(this.state.interrupt)return;
				this.setState({swapping:[j-1],tempSwapping:[index-1]})
				await this.sleep(this.props.pointerSpeed)
				this.setState({swapping:[],tempSwapping:[],pointerBPos:j,pointerBHide:hide})
				await this.sleep(this.props.pointerSpeed)
			}
		}
		var swapping=[]
		for (var k = leftStart;k<=rightEnd;k++){
			array[k][0] = temp[k][0]
			swapping.push(k)
		}
		this.setState({arrayMap:array,pointerAHide:false,pointerBHide:false,swapping:swapping});
		if(this.state.interrupt)return;
		await this.sleep(this.props.swapSpeed);
		this.setState({swapping:[]})
	}
	async mergeSort(array,temp,stack){
		if (stack.length==0){
			this.onComplete()
			return;
		}
		var cur = stack.pop()
		var leftStart = cur[0]
		var mid = cur[1]
		var rightEnd = cur[2]
		this.merge(array,temp,leftStart,mid,rightEnd).then(()=>{
			if(this.state.interrupt){
				this.reset()
				return;
			}
			this.mergeSort(array,temp,stack)
		});	
	}
	initialiseSort(){
		var stack = []
		var temp = [];
		var array = this.state.arrayMap.slice();
		for (var curSize=1;curSize<array.length;curSize*=2){
			for (var leftStart=0;leftStart<array.length-curSize;leftStart += (2*curSize)){
				var mid = leftStart + curSize -1
				var rightEnd = Math.min(mid + curSize,array.length-1);
				stack.push([leftStart,mid,rightEnd])
			}
		}
		var stackReverse=[];
		for (var i =stack.length-1;i>=0;i--){
			stackReverse.push(stack[i])
		}
		this.mergeSort(array,temp,stackReverse);	
	}
	render(){
		//var pivotIndex = this.state.arrayOffsets.indexOf(this.state.pivot);
		return(
			<div className="sort-root">
				<SortingArray 
				pointerAHide={this.state.pointerAHide}
				 pointerBHide={this.state.pointerBHide} 
				 boxStyles={this.state.boxStyles} 
				 pointerAPos={this.state.pointerAPos}
				 arrayMap={this.state.arrayMap} 
				 pointerBPos={this.state.pointerBPos}	
				 swapSpeed={this.props.swapSpeed}
				 pointerSpeed={this.props.pointerSpeed} 
				 swapping = {this.state.swapping} 
				 arrayPositions={this.state.arrayOffsets} />
				<SortingArray pointerAHide={true} pointerBHide={true} noAnimation={true} pointerAPos={0} pointerBPos={0} boxStyles={this.state.tempBoxStyles} swapSpeed={this.props.swapSpeed} pointerSpeed={this.props.pointerSpeed} arrayMap={this.state.tempArray} array={this.state.array} swapping = {this.state.tempSwapping} arrayPositions={this.state.tempArray}/>
			
			</div>
		);
	}
}
export default MergeSortAnimation;