import React,{Component} from 'react'
import './css/Algorithms.css';
import './css/Sorting.css'
var classNames = require('classnames');
class SortingArray extends Component{
	constructor(props){
		super(props);
		this.state={}
		this.getNumbers = this.getNumbers.bind(this);
		this.getArrayBoxes = this.getArrayBoxes.bind(this)
		this.getPointer = this.getPointer.bind(this);
	}
	componentDidMount(){
		var maxCount=this.sortBox.offsetWidth/60;
		var entryWidth=60
		if (this.props.arrayMap.length > maxCount){
			entryWidth = this.sortBox.offsetWidth/ this.props.arrayMap.length
		}
		this.setState({entryWidth:this.array.offsetWidth/this.props.arrayMap.length,entryWidth2:entryWidth});
	}
	getPointer(pointer){
		if (!this.array)return;
		var arrayWidth = this.array.offsetWidth;
		var array = this.props.arrayMap ? this.props.arrayMap:this.props.array
		var entryWidth = arrayWidth / array.length;
		var pointerIndex = pointer=="A"? this.props.pointerAPos:this.props.pointerBPos;
		var pointerOffset = (entryWidth/2) - 8 + (pointerIndex * entryWidth)
		var  style={
			transform:"translateX("+pointerOffset+"px)",	
			transition: "transform "+this.props.pointerSpeed/1000+"s ease-in-out,opacity 0.3s ease"
		}
		if (pointer=="A"?this.props.pointerAHide:this.props.pointerBHide){
			style.opacity=0;
		}
		var boxClass = pointer=="A"?"pointer-a-box":"pointer-b-box"
		var pointerClass = pointer=="A"?"pointer-a":"pointer-b"
		return (<div style={style} className={boxClass}><div className={pointerClass}></div></div>);
	}
	getArrayBoxes(){
		if (!this.sortBox)return;
		var maxCount=this.sortBox.offsetWidth/60;
		var entryWidth=60
		if (this.props.arrayMap.length > maxCount){
			entryWidth = this.sortBox.offsetWidth/ this.props.arrayMap.length
		}
		return this.props.arrayMap.map((number,index)=>{
			var style = {width:entryWidth+"px"}
			var boxStyles = this.props.boxStyles;
			if (boxStyles){
				boxStyles.forEach((entry)=>{
					var range = entry[0]
					var boxStyle = entry[1]
					if (index >= range[0] && index <= range[1]){
						style = Object.assign({},style,boxStyle)
					}
				})	
			}
			if (this.props.highlightRange && index >= this.props.highlightRange[0] && index <= this.props.highlightRange[1]){
				style.backgroundColor = "#ddd";
			}
			return 	<div key={index} style={style} className={classNames("number-box",{"number-box-last":this.props.arrayMap.length-1==index})}></div>
		})

	}
	getNumbers(){
		if (!this.array)return;
		var numbers=[]
		var numberArray=this.props.arrayMap;
		var maxCount=this.sortBox.offsetWidth/60;
		var entryWidth=60
		if (this.props.arrayMap.length > maxCount){
			entryWidth = this.sortBox.offsetWidth/ this.props.arrayMap.length
		}
		numberArray.forEach((entry,index) =>{
			var currentPosition;
			for (var g=0;g<numberArray.length;g++){
				if(numberArray[g][1]==index){
					currentPosition=g;
					break;
				}
			}
			var numberOffset = (entryWidth/2) - 15 + (currentPosition * entryWidth)
			var isSwapping = this.props.swapping.indexOf(currentPosition)>-1;
			var translation = "translateX("+numberOffset+"px)"; 
			var  style={
				transform:translation,	
				transition: "transform "+this.props.swapSpeed/1000+"s ease-in-out",
			}
			if (isSwapping){
				style.backgroundColor = "#4f7177"
				style.transform = translation + " " + "scale(1.25)"
				style.zIndex=100
			}
			if (this.props.noAnimation)style.transition="";
			if (this.props.customStyles && this.props.customStyles[index])style = Object.assign({},style,this.props.customStyles[index])		
			var numberClasses = classNames('number',{'isSwapping':isSwapping});
			numbers.push(<div style={style} key={index} className={numberClasses}>{numberArray[currentPosition][0]}</div>)
		})
		 
		return numbers;
	}

	render(){
		return(
			<div className="sort-root" ref={(input)=>{this.sortBox=input}}>
				<div className="sort-box" >
					{this.getPointer("A")}
					<div className="array" ref={(input) => {this.array=input}}>
						{this.getArrayBoxes()}
						{this.getNumbers()} 	
					</div>
						{this.getPointer("B")}
				</div>
			</div>
		);
	}
}
export default SortingArray;