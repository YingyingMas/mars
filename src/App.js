import React from 'react';
import './App.css';

// 1
function Header(props) {
  return <h1>{props.name}</h1>;
}
let name = `熟悉React生命周期钩子函数，自己设计一个组件，将下面的钩子函数全部触发，并观察以下问题：
1.钩子函数的执行次序是什么？
2.如果组件结构有多层，则父组件和子组件钩子函数的执行次序是什么？
3.在哪些钩子函数内可以调用setState方法，哪些不可以，不可以的话是什么表现。
4.如何区分某次render是由组件自身setState触发的还是由父组件触发的？
5.constructor函数中的super(props)可否省略？`;

// 2.计时器二：
class Clock extends React.Component {
  // constructor构造函数：
  // 1.通过给 this.state 赋值对象来初始化内部 state
  // 2.为事件处理函数绑定实例
  // 3.这里只能this.state直接赋值，在其他方法里只能调用 setState()
  // 4.不可将 props 的值复制给 state
  constructor(props) {
    super(props);// 先调用
    this.state = {
      date: new Date(),
      hua: '❀',
      xin: '❤'
    };//初始化state
  }

  //返回 false 则不会调用 render()
  shouldComponentUpdate() {
    
  }
  // 挂载：组件已经被渲染到 DOM 中，可操作dom，实例化请求，添加订阅
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
  // 取消订阅
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    //更新state，不可直接修改state，只能调用setState
    this.setState({
      date: new Date()
    });
    // this.setState((state, props) => ({
    //   date: new Date() + state.hua + state.xin,
    // }));不好使？
  
  }

  render() {
    return (
      <div>
        <h1>time</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <Header name={name}/>
      <Clock/>
    </div>
  );
}



export default App;
