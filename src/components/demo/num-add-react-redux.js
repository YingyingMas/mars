
import React from "react";
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { decrementAction, incrementAction} from '../../actions/index'
// onDecrement 和 onIncrement 向外发出 Action，从内向外输出
class NumAddRR extends React.Component {
    render() {
        const { value, countInfo, onIncrement, onDecrement } = this.props
        return (
            <div className="num-add">
                <div>加减demo-react-redux</div>
                <span className="left" onClick={onDecrement}>-</span>
                <span className="num">{value}</span>
                <span className="right" onClick={onIncrement}>+</span>
                <div>{countInfo}</div>
            </div>
        );
    }
}


// mapStateToProps 负责向UI组件输入:外部的数据（即state对象）映射到 UI 组件的参数（props）
// 返回一个对象，该对象的键代表向 UI 组件输入的 props，该对象的值从state计算而来
function mapStateToProps(state) {
    return {
        value: state.count,
        countInfo: state.countInfo
    }
}



// mapDispatchToProps 负责从UI组件向外输出：用户在UI发出动作如何变为 Action 对象
// 作为函数返回一个对象，该对象的每个键名对应 UI 组件的同名参数，定义了 UI 组件的参数怎样发出 Action
// 也可直接是一个对象


// 第一版
// function mapDispatchToProps(dispatch) {
//     return {
//         onDecrement: () => dispatch({ type: 'DECREMENT' }),
//         onIncrement: () => dispatch({ type: 'INCREMENT' })
//     }
// }

// 用户在UI层触发，致 store.dispatch 发出一个 Action，Action 是一个对象，type属性必须，表示 Action 的名，它会运送数据到 store，store 触发 Reducer 执行
// 可以定义一个函数(Action Creator)来生成 Action，如下：


// 第二版
// 打开次注释需要注释掉头部引用import { decrementAction, incrementAction} from '../../actions/index'
// const DECREMENT = 'DECREMENT';
// function decrementActionCreator(val) {
//     return {
//         type: DECREMENT,
//         val
//     }
// }
// const decrementAction = decrementActionCreator(2);
//
// const INCREMENT = 'INCREMENT';
// function incrementActionCreator(val) {
//     return {
//         type: INCREMENT,
//         val
//     }
// }
// const incrementAction = incrementActionCreator(2);
// function mapDispatchToProps(dispatch) {
//     return {
//         onDecrement: () => dispatch(decrementAction),
//         onIncrement: () => dispatch(incrementAction)
//     }
// }


// 第三版
// 抽离出Action，引入 bindActionCreators
console.log(decrementAction);
const mapDispatchToProps = dispatch => ({
    ...bindActionCreators({
        onDecrement: () => dispatch(decrementAction),
        onIncrement: () => dispatch(incrementAction)
    }, dispatch)
});


// 这个是干嘛用的呢，不用的话暂时没有发现问题
NumAddRR.propTypes = {
    value: PropTypes.number.isRequired,
    onDecrement: PropTypes.func.isRequired,
    onIncrement: PropTypes.func.isRequired
}

const NumAddReactRedux = connect(
    mapStateToProps,
    mapDispatchToProps
)(NumAddRR);


export default NumAddReactRedux;