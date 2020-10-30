// 引入 redux ，通过 redux 的 createStore 方法生成 store
// store保存数据的地方，一个容器，整个应用只能有一个 Store
import { createStore, applyMiddleware } from 'redux';

// View 通过 store.dispatch() 发出 Action
// store 收到 Action 以后会给出一个新的 state 促使 View 发生变化
// 这种给出新的 state 的过程(即：state 的计算过程)就叫做 Reducer。
// 为此在 store 生成时 将 Reducer 传入
import reducers from "./reducers"

// 异步操作解决方法1：
// store.dispatch(fetchPosts())
// store.dispatch 方法正常情况下，参数只能是对象，不能是函数。
// thunk 中间件改造 store.dispatch，使其可以接受函数作为参数
// fetchPosts 函数，调用后先发出一个Action(表示操作开始)，然后进行异步操作，拿到结果后再发出一个 Action(表示操作结束)，
// fetchPosts 函数是一个 return 函数(参数：dispatch和getState)的 Action Creator
// 普通的 Action Creator 返回对象
import thunkMiddleware from 'redux-thunk';


// 异步操作解决方法2：
// store.dispatch(fetchPosts)
// 使得store.dispatch方法可以接受 Promise 对象作为参数
// fetchPosts 为一个 Promise 对象
// import promiseMiddleware from 'redux-promise';


// 中间件使用实例
import createLogger from 'redux-logger';//生成器
const loggerMiddleware = createLogger()//日志中间件

// redux 原生方法 applyMiddleware 将所有中间件组成一个数组--依次执行
const store  = createStore(reducers, applyMiddleware(thunkMiddleware, loggerMiddleware));

export default store;
