import React,{Component} from 'react'
import SortingArray from '../SortingArray.js';
var classNames = require('classnames');
class QuickSortAnimation extends Component{
	constructor(props){
		super(props);
		this.state={arrayMap:this.arrayMap(this.props.array.slice()),swapping:[],pointerApos:0,pointerAStyles:{},pointerBpos:1,pointerBStyles:{}}
		this.quickSort = this.quickSort.bind(this);
		this.partition = this.partition.bind(this);
		this.sleep = this.sleep.bind(this);
		this.reset = this.reset.bind(this);
		this.onComplete = this.onComplete.bind(this);
		this.initialiseSort= this.initialiseSort.bind(this);
	}
	componentDidMount(){
		this.initialiseSort();	
	}
	initialiseSort(){
		var stack = [];
		var array = this.state.arrayMap.slice()
		var start = 0;
		var end = array.length-1;
		stack.push([start,end]);
		this.quickSort(array,stack)	
	}
	arrayMap(array){
		var arrayMap=Array(array.length);
		for (var p=0;p<array.length;p++){
			var cur = array[p]
			arrayMap[p] =[cur,p]
		}
		return arrayMap;
	}
	sleep(ms){
		return new Promise(resolve=>setTimeout(resolve,ms));
	}
	componentWillReceiveProps(nextprops){
		if (nextprops.array !=this.props.array){
			this.setState({arrayMap:this.arrayMap(nextprops.array.slice())})
		}
		if (nextprops.play != this.props.play){
			if (nextprops.play){
				this.initialiseSort();
			} else{
				if(this.state.completed){
					this.setState({completed:false,
						interrupt:false,
						arrayMap:this.arrayMap(this.props.array.slice()),
						boxStyles:[],
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
		this.setState({interrupt:false,
			arrayMap:this.arrayMap(this.props.array.slice()),
			boxStyles:[],
			pointerAPos:0,
			pointerBPos:1,
			highlightRange:[],
			swapping:[]})
		return true
	}
	onComplete(){
		this.setState({completed:true})
	}
	async partition(array,lo,hi){
		var pivot = array[lo][0];
		var i = lo-1;
		var j = hi+1;
		this.setState({pointerAPos:i,pointerBPos:j})
		if(this.state.interrupt)return;
		await this.sleep(this.props.pointerSpeed);
		while (true){
			do{
				i+=1
				this.setState({pointerAPos:i})
				if(this.state.interrupt)return;
				await this.sleep(this.props.pointerSpeed)
			} while (array[i][0] < pivot)
			do {
				j-=1
				this.setState({pointerBPos:j})
				if(this.state.interrupt)return;
				await this.sleep(this.props.pointerSpeed)
			} while (array[j][0] > pivot)

			if (i>=j){
				return j;
			} 
			var temp = array[i]
			array[i] = array[j]
			array[j] = temp;
			if(this.state.interrupt)return;
			this.setState({arrayMap:array,swapping:[i,j]})
			await this.sleep(this.props.swapSpeed)
			this.setState({swapping:[]})

		}
	}
	async quickSort(array,stack){
		if (stack.length >0){
			var cur = stack.pop();
			var lo = cur[0];
			var hi = cur[1];
			if (lo < hi){
				var pivot = array[lo];
				this.setState({pivot:array[lo][1], highlightRange:[lo,hi],boxStyles:[ [[lo,hi],{backgroundColor:"#444"}] ]})
				this.partition(array,lo,hi).then((j)=>{
					if(this.reset())return;
					stack.push([lo,j])
					stack.push([j+1,hi])
					this.quickSort(array,stack)
				})
			} else{
				if(this.reset())return;
				this.quickSort(array,stack)
			}
		} else{
			this.onComplete()
		}
	}
	render(){
		return(
			<div className="sort-root">
				<SortingArray 
				boxStyles={this.state.boxStyles} 
				customStyles={ {[this.state.pivot]:{"backgroundColor":"#fff200"}} } 
				pointerAPos={this.state.pointerAPos} 
				pointerBPos={this.state.pointerBPos}
				arrayMap={this.state.arrayMap} 
				swapSpeed={this.props.swapSpeed} 
				pointerSpeed={this.props.pointerSpeed} 
				swapping = {this.state.swapping} 
				arrayPositions={this.state.arrayOffsets}/>
			</div>
		);
	}
}
export default QuickSortAnimation;