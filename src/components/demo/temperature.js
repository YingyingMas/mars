import React from "react";

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { temperature: '' };
  }

  handleChange(e) {
    this.setState({ temperature: e.target.value });
  }

  render() {
    const temperature = this.state.temperature;
    const name = this.props.name;
    return (
      <div className="tem-box">
        <legend>温度{name}:</legend>
        <input value={temperature}
          onChange={this.handleChange} />
      </div>
    );
  }
}

export default TemperatureInput;