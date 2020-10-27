import React from "react";


function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      <div className="SplitPane-c">
        {props.children}
      </div>
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}


class TemperatureInput extends React.Component {
  handleChange = (e) => {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <div className="tem-box">
        <FancyBorder color="blue" left={<span>props.left</span>} right={<span>props.right</span>} >
          <legend>props.children温度{scale}:</legend>
        </FancyBorder>
        <input value={temperature} onChange={this.handleChange} />
      </div>
    );
  }
}

export default TemperatureInput;