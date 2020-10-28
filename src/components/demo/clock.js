// 计时器-第二版：以此上路，看一下组件生命周期、state、props、父子组件、条件判断等

import React from "react";
import ClockSon from "./clock-son";

// class 组件
class Clock extends React.Component {
    // constructor构造函数：
    // 1.通过给 this.state 赋值对象来初始化内部 state
    // 2.为事件处理函数绑定实例
    // 3.这里只能this.state直接赋值，在其他方法里只能调用 setState()
    // 4.不可将 props 的值复制给 state
    constructor(props) {
        console.log('父1-constructor')
        // 最先调用
        super(props);
        //初始化state
        this.state = {
            date: new Date(),
            hua: '❀',
            xin: '❤',
            scale: 'c',
            temperature: ''
        };
    }

    // render 前调用
    // 生而仅为：让组件在 props 变化时更新 state
    static getDerivedStateFromProps() {
        console.log('父2-static getDerivedStateFromProps');
        return true;
    }

    render() {
        console.log('父3-render')
        // JXS中的属性值，用引号指定字符串字面量，用{}指定js表达式
        // JSX中的属性名不使用HTML属性名称，而是以小驼峰方式命名，如下 className（JSX 语法上更接近 JavaScript 而不是 HTML）
        // JSX本身会被编译为js对象，可以作为参数、返回值、赋值给变量等
        return (
            <div className="demo-p">
                <div>父组件</div>
                <div>{this.state.date.toLocaleTimeString()}</div>
                <div>{this.state.xin}</div>
                {/*将 JSX 的 attributes 和 children 转换为单个对象(props)传给组件，如下name*/}
                <ClockSon name="myy"></ClockSon>
            </div>
        );
    }

    // 挂载：组件已经被渲染到 DOM 中，可操作dom，实例化请求，添加订阅
    // 这里调用 setState() 将触发额外渲染，在浏览器更新屏幕之前
    // 会导致性能问题
    componentDidMount() {
        console.log('父4-componentDidMount');
        // this.timerID = setInterval(
        //   () => this.tick(),
        //   10000
        // );
        setTimeout(() => {
            this.tick()
        }, 1000);
    }

    // 更新后会被立即调用,首次渲染不会执行
    // 在这里调用 setState()，必须被包裹在一个条件语句里，否则导致死循环
    // 参数 snapshot 为 getSnapshotBeforeUpdate钩子的返回值，无则为 undefined
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('父componentDidUpdate');
    }

    // 组件卸载及销毁前调用
    // 在这里做清除操作：清除 timer，取消网络请求、清除在 componentDidMount() 中创建的订阅等
    componentWillUnmount() {
        console.log('父componentWillUnmount');
        clearInterval(this.timerID);
    }

    // 当 props 或 state 发生变化时，会在渲染执行之前被调用
    // 仅作能优化
    // 不要以此“阻止”渲染
    // 返回 false 则不会调用 render()、componentDidUpdate()
    // 必须有 return
    shouldComponentUpdate(nextProps, nextState) {
        console.log('父shouldComponentUpdate');
        return true;
    }

    // 此钩子返回值将作为 componentDidUpdate() 第三个参数 “snapshot” 传递
    // 使组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）
    getSnapshotBeforeUpdate() {
        console.log('父getSnapshotBeforeUpdate');
        return null;
    }

    // 后代组件抛出错误后被调用
    // 抛出的错误作为参数error
    // 返回一个值以更新 state
    // 在渲染阶段调用，不允许出现副作用
    static getDerivedStateFromError(error) {
        console.log('父static getDerivedStateFromError');
        return { hasError: true };
    }

    // 在后代组件抛出错误后被调用
    // 在“提交”阶段被调用，允许执行副作用
    componentDidCatch(error, info) {
        console.log('父componentDidCatch');
    }

    tick() {
        // 更新state，不可直接修改state，只能调用setState
        this.setState({
            date: new Date()
        });
        // this.setState((state, props) => ({
        //   date: new Date() + state.hua + state.xin,
        // }));不好使？

    }
}

export default Clock;

/*
一.钩子函数的执行次序是什么？
二.如果组件结构有多层，则父组件和子组件钩子函数的执行次序是什么？

 1. 初步渲染
   父constructor
   父static getDerivedStateFromProps
   父render
   子constructor
   子static getDerivedStateFromProps
   子render
   子componentDidMount
   父componentDidMount

 2.父组件更新时
   父static getDerivedStateFromProps
   父shouldComponentUpdate
   父render
   子static getDerivedStateFromProps
   子shouldComponentUpdate
   子render
   子getSnapshotBeforeUpdate
   父getSnapshotBeforeUpdate
   子componentDidUpdate
   父componentDidUpdate

 3.子组件更新时
   子static getDerivedStateFromProps
   子shouldComponentUpdate
   子render
   子getSnapshotBeforeUpdate
   子componentDidUpdate


三.在哪些钩子函数内可以调用setState方法，哪些不可以，不可以的话是什么表现。

  constructor 中 只能this.state直接赋值，不可使用 setState()，会报错：clock.js:1406 Warning: Can't call setState on a component that is not yet mounted
  componentDidMount 这里调用 setState() 将触发额外渲染，在浏览器更新屏幕之前
  componentDidUpdate 调用 setState()，必须被包裹在一个条件语句里，否则导致死循环
  componentWillUnmount 中不可 setState()，修改了也不会渲染

四.如何区分某次render是由组件自身setState触发的还是由父组件触发的？
   额，，答不上来~
五.constructor函数中的super(props)可否省略
  不可以省略，为 React.Component 子类实现构造函数时，继承父类的属性和方法
  如果不绑定事件，不设置this.state可以不写constructor
*/
