import React,{Component} from 'react'
import SortingArray from '../SortingArray.js';
var classNames = require('classnames');
class BubbleSortAnimation extends Component{
	constructor(props){
		super(props);
		this.state={arrayMap:this.arrayMap(this.props.array.slice()),swapping:[],pointerApos:0,pointerAStyles:{},pointerBpos:1,pointerBStyles:{}}
		this.bubbleSort = this.bubbleSort.bind(this);
		this.reset = this.reset.bind(this);
		this.onComplete = this.onComplete.bind(this);
		this.arrayMap = this.arrayMap.bind(this);
	}
	componentDidMount(){
		//this.bubbleSort();
		this.bubbleSort();	
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
			this.setState({array:nextprops.array.slice(),
				arrayMap:this.arrayMap(nextprops.array.slice())})
		}
		if (nextprops.play != this.props.play){
			if (nextprops.play){
				this.bubbleSort();
			} else{
				if (this.state.completed){
					this.setState({completed:false,
						arrayMap:this.arrayMap(this.props.array.slice()),
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
		if (!this.state.interrupt){
			return false;
		}
		this.setState({interrupt:false,arrayMap:this.arrayMap(this.props.array.slice()),pointerAPos:0,pointerBPos:1,highlightRange:[],swapping:[]})
		return true
	}
	onComplete(){
		this.setState({completed:true})
	}
	async bubbleSort(){
		var array=this.state.arrayMap.slice();
		for (var i=0;i<array.length;i++){
			var swapped=false;
			for (var j=0;j<array.length-1-i;j++){
				if (this.reset())return
				this.setState({pointerAPos:j,pointerBPos:j+1})
				await this.sleep(this.props.pointerSpeed)
				if (array[j][0]>array[j+1][0]){
					var tmp = array[j+1]
					array[j+1]= array[j]
					array[j]= tmp	
					swapped=true
					this.setState({arrayMap:array,swapping:[j,j+1]})
					if (this.reset())return
					await this.sleep(this.props.swapSpeed)
					this.setState({swapping:[]})
				}
			}
			if (!swapped){
				this.setState({highlightRange:[0,array.length-1]})
				break
			}	
			this.setState({highlightRange:[array.length-1-i,array.length-1]})
		}
		this.onComplete();
	}
	render(){
		return(
			<div className="sort-root">
				<SortingArray highlightRange={this.state.highlightRange} customStyles={ {[this.state.cur]:{}} } pointerAPos={this.state.pointerAPos} pointerBPos={this.state.pointerBPos}	swapSpeed={this.props.swapSpeed} pointerSpeed={this.props.pointerSpeed} arrayMap={this.state.arrayMap} swapping = {this.state.swapping} arrayPositions={this.state.arrayOffsets}/>
			</div>
		);
	}
}
export default BubbleSortAnimation;