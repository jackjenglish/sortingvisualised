import React,{Component} from 'react'
import ReactDOM from 'react-dom';
import './css/SpeedSlider.css';
var classNames=require('classnames');
class SpeedSlider extends Component{
	constructor(props){
		super(props);
		this.state={}
		this.onMouseDown= this.onMouseDown.bind(this);
		this.onMouseMove= this.onMouseMove.bind(this);
		this.onMouseUp= this.onMouseUp.bind(this);
		this.state={controlPosition:{left:65-6+"px"},controlValue:65,dragging:false}
	}
	componentDidMount(){
		 var rect = ReactDOM.findDOMNode(this).getBoundingClientRect()
		 document.addEventListener('mouseup', this.onMouseUp)
		 document.addEventListener('mousemove', this.onMouseMove)
		 this.setState({divOffsetX:Math.floor(rect.x)})
	}
	onMouseUp(e){
		this.setState({dragging:false});
		e.stopPropagation()
    	e.preventDefault()
	}
	onMouseDown(e){
		var sliderWidth = this.slider.offsetWidth;
		var left = e.screenX - this.state.divOffsetX
		if (left<0)left=0
		if (left>sliderWidth)left=sliderWidth
		var style={left:left+"px"};
		this.props.onSpeedChange(left);
		this.setState({controlPosition:style,dragging:true})	
		e.stopPropagation()
    	e.preventDefault()	
	}
	onMouseMove(e){
		if(!this.state.dragging)return;
		var sliderWidth = this.slider.offsetWidth;
		var left = e.screenX - this.state.divOffsetX
		if (left<0)left=0
		if (left>sliderWidth)left=sliderWidth
		var style={left:(left - 6)+"px"}
		this.props.onSpeedChange(left);
		this.setState({controlPosition:style})	
	    e.stopPropagation()
	    e.preventDefault()	
	}
	render(){
		return(	
				<div className="speedSlider" ref={(input)=>this.slider=input}>
					<div className="speedSlider-control" style={this.state.controlPosition} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp} onMouseMove={this.onMouseMove}></div>
				</div>);
	}

}
export default SpeedSlider;