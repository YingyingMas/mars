import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from "./store";


// 用 react-redux 实现：
import { Provider } from 'react-redux'
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)


// 仅 redux 实现：
// const render = () => ReactDOM.render(<App />, document.getElementById('root'));
// render();
// store.subscribe(render);
// store.subscribe(render) 设置监听函数，一旦 State 发生变化，就自动执行函数 render


// 此处是一个官方demo：计时器-第一版：
// clock.js 为计时器-第二版
// function Clock(props) {
//     return (
//       <div>
//         <h1>Hello, world!</h1>
//         <h2>It is {props.date.toLocaleTimeString()}.</h2>
//       </div>
//     );
//   }
// function tick() {
//     ReactDOM.render(<Clock date={new Date()} />, document.getElementById('root'));
// }
// setInterval(tick, 1000);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
