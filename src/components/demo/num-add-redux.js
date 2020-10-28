
import React from "react";

// UI组件：
// value 从 state 计算以 props 的形式得到，从外向内输入
// onDecrement 和 onIncrement 向外发出 Action，从内向外输出
class NumAddRedux extends React.Component {
    render() {
        const { value, onIncrement, onDecrement } = this.props
        return (
            <div className="num-add">
                <div>加减demo-redux</div>
                <span className="left" onClick={onDecrement}>-</span>
                <span className="num">{value}</span>
                <span className="right" onClick={onIncrement}>+</span>
            </div>
        );
    }
}

export default NumAddRedux;