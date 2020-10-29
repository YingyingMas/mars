import React from "react";

// demo 文件夹下全部 css
import "./index.css";

// 官方demo计时器
import Clock from "./clock";

// 作业 NumAdd，加减计算器
import NumAdd from "./num-add";
// import NumAddRedux from "./num-add-redux";
import NumAddReactRedux from "./num-add-react-redux";

// react 中的表单控件
import Form from "./form"

// 官方文档里的demo，描述数据方向流动
import FilterableProductTable from "./reverse-data-flow";

// 官方 demo 摄氏温度与华氏温度转化
import TwoTemperatures from "./two-temperatureInputs";

// react函数组件：一个函数，接受props对象数据，返回一个react元素
function Demo(props) {
    const PRODUCTS = [
        { category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football' },
        { category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball' },
        { category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball' },
        { category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch' },
        { category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5' },
        { category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' }
    ];
    return (
        <div className="Demo">

            <Clock/>

            <FilterableProductTable products={PRODUCTS} />

            <NumAdd/>

            {/*
                用户触发action，reduce 立即计算响应的 state
                用户触发action，异步操作结束后 reduce 计算响应的 state？？----中间件
            */}
            {/*<NumAddRedux*/}
            {/*    value={store.getState().count}*/}
            {/*    onIncrement={() => store.dispatch({ type: 'INCREMENT' })}*/}
            {/*    onDecrement={() => store.dispatch({ type: 'DECREMENT' })}*/}
            {/*/>*/}

            <NumAddReactRedux/>

            <Form/>

            <TwoTemperatures/>

        </div>
    );
};

export default Demo;

