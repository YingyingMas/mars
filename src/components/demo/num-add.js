import React from "react";

class NumAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            num: 0
        }
        //this.leftClick = this.leftClick.bind(this); 如果绑定的函数不是箭头函数的话
    }

    render() {
        return (
            <div className="num-add">
                <span className="left" onClick={this.leftClick}>-</span>
                <span className="num">{this.state.num}</span>
                <span className="right" onClick={this.rightClick}>+</span>
            </div>
        );
    }

    leftClick = (e) => {
        // e 是react合成事件，e.preventDefault() 阻止默认行为，无兼容问题
        this.setState({num: this.state.num - 1});
    }

    rightClick = () => {
        this.setState({num: this.state.num + 1});
    }
}

export default NumAdd;