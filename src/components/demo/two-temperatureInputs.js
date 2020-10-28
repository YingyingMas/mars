import React from "react";
import TemperatureInput from './temperature'

class TwoTemperatures extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scale: 'c',
            temperature: ''
        };
    }

    handleCelsiusChange = (temperature) => {
        this.setState({scale: 'c', temperature});
    }

    handleFahrenheitChange = (temperature) => {
        this.setState({scale: 'f', temperature});
    }

    render() {
        function toCelsius(fahrenheit) {
            return (fahrenheit - 32) * 5 / 9;
        }

        function toFahrenheit(celsius) {
            return (celsius * 9 / 5) + 32;
        }

        function tryConvert(temperature, convert) {
            const input = parseFloat(temperature);
            if (Number.isNaN(input)) {
                return '';
            }
            const output = convert(input);
            const rounded = Math.round(output * 1000) / 1000;
            return rounded.toString();
        }

        const scale = this.state.scale;
        const temperature = this.state.temperature;
        const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
        const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
        // 在 React 中，任何可变数据应当只有唯一“数据源”
        // state 都是首先添加到需要渲染数据的组件中去
        // 如果其他组件也需要这个 state，可以将它提升至这些组件的最近共同父组件中
        // 应当依靠自上而下的数据流，而不是尝试在不同组件间同步 state
        // “存在”于组件中的任何 state，仅有组件自己能够修改它

        // 如何确定state？
        // 某些数据由 props 或 state 推导得出，那么它不应该 是 state
        // 该数据由父组件通过 props 传递而来，那么它不应该是 state。
        // 该数据随时间的推移保持不变，那么它不应该是 state。

        // 在哪存放state？
        // 找到根据这个 state 进行渲染的所有组件。
        // 找到他们的共同所有者组件（在组件层级上高于所有需要该 state 的组件）。
        // 该共同所有者组件或者比它层级更高的组件应该拥有该 state。
        // 若找不到合适的位置存放该 state，可直接建一个新的组件存放该 state，并将这一新组件置于高于共同所有者组件层级的位置。
        return (
            <div className="tem">
                <div>华氏温度与摄氏温度</div>
                <TemperatureInput
                    scale="c"
                    temperature={celsius}
                    onTemperatureChange={this.handleCelsiusChange}/>
                <TemperatureInput
                    scale="f"
                    temperature={fahrenheit}
                    onTemperatureChange={this.handleFahrenheitChange}/>
            </div>
        );
    }

}
export default TwoTemperatures;

