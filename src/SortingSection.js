import React,{Component} from 'react';
import SpeedSlider from './SpeedSlider.js';
var classNames=require('classnames');

class SortingSection extends Component{
	constructor(props){
		super(props);
		this.state={array:this.props.array,editArrayValue:this.props.array.slice().toString().replace(/,/g," "),play:true,swapSpeed:400,pointerSpeed:275}
		this.editArray =this.editArray.bind(this);
		this.updateArray = this.updateArray.bind(this);
		this.onClick=this.onClick.bind(this)
		this.stop = this.stop.bind(this);
		this.onSpeedChange = this.onSpeedChange.bind(this);
	}
	onClick(){
		this.setState({play:!this.state.play})
	}
	stop(index){
		this.setState({play:false})
	}
	onSpeedChange(value){
		var maxSwapSpeed = 25;
		var minSwapSpeed = 1000;

		var point = (minSwapSpeed - maxSwapSpeed) / 100;
		var swapSpeed = minSwapSpeed - (point*value)

		var maxPointerSpeed = 15;
		var minPointerSpeed=650;
		var point = (minPointerSpeed - maxPointerSpeed) /100
		var pointerSpeed = minPointerSpeed - (point*value);
		this.setState({swapSpeed:swapSpeed,pointerSpeed:pointerSpeed})
	}
	editArray(){
		this.stop();
	}
	updateArray(e){
		console.log("blur",e.target.value)
		var invalidCharacters = e.target.value.replace(/\s+/g,"").replace(/[0-9]/g,"");
		console.log(invalidCharacters)
		if (invalidCharacters.length>0){
			var style={border:"1px solid #d64242"}
			this.setState({inputStyle:style})
		} else{
			var newArray = e.target.value.trim().replace(/\s{2,}/,"f").split(' ')
			for (var i =0;i<newArray.length;i++){
				newArray[i] = parseInt(newArray[i])
			}
			this.setState({inputStyle:{},array:newArray})
		}
	}
	getAlgorithm(){
		var algorithm = this.props.algorithm;
		return React.cloneElement(algorithm, {
      		array: this.state.array,
      		play:this.state.play,
      		pointerSpeed:this.state.pointerSpeed,
      		swapSpeed:this.state.swapSpeed
    	});
	}
	render(){
		return (
				<div className="algorithm-section">
					{this.props.header}
					<div className="algorithm-container">
						<div className="algorithm-notation">
						<div className="algorithm-play" onClick={()=>this.onClick()}><i className={classNames("fa",{"fa-undo":this.state.play},{"fa-play":!this.state.play})} aria-hidden="true"></i></div>
						<div className="algorithm-array-input">
							<input style={this.state.inputStyle} type="text" defaultValue={this.state.editArrayValue} onFocus={this.editArray} onBlur={this.updateArray}/>
						</div>					
						{this.props.notation}
						<div className="algorithm-slider">
							<SpeedSlider onSpeedChange={(value)=>this.onSpeedChange(value)}/>
						</div>
						</div>
						<div className="algorithm">
							{this.getAlgorithm()}
						</div>
					</div>
					{this.props.footer}
				</div>
			);
	}
}

export default SortingSection