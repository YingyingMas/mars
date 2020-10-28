
import React from "react";

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