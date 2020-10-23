import React from "react";

class NumAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            num: 0
        }
        // 为了在回调中使用 `this`，这个绑定是必不可少的
        this.leftClick = this.leftClick.bind(this);
        this.rightClick = this.rightClick.bind(this);
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
    leftClick(e) {
        // e 是react合成事件，e.preventDefault() 阻止默认行为，无兼容问题
        this.setState(state => ({
            num: state.num - 1
        }));
    }
    rightClick() {
        this.setState(state => ({
            num: state.num + 1
        }));
    }
}

export default NumAdd;