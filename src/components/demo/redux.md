# redux相关笔记

```js
  import { createStore } from 'redux';
  const store = createStore();
```

### Store

- Store保存数据的地方，一个容器，整个应用只能有一个 Store
- Store对象包含所有数据。如果想得到某个时点的数据，就要对 Store 生成快照。这种时点的数据集合，就叫做 State。
- 一个 State 对应一个 View。只要 State 相同，View 就相同。知道 State，就知道 View 是什么样，反之亦然。

  ```js
    const state = store.getState();
  ```

### Action

- 用户接触 View 触发 Action(描述当前发生的事情)，表示 State 即将发生改变
- Action 是一个对象。type 表示 Action 的名称。其他属性可以自由设置
- 改变 State 的唯一办法，就是使用 Action。它会运送数据到 Store
- 存放数据的对象，即消息的载体，被别人操作，自己不进行任何操作

  ```js
    const action = {
      type: 'ADD_TODO',
      payload: 'Learn Redux'
    };
  ```

### Action Creator

- View 要发送多少种消息，就会有多少种 Action，可以定义一个函数(Action Creator)来生成 Action

  ```js
    const ADD_TODO = '添加 TODO';

    function addTodo(text) {
      return {
        type: ADD_TODO,
        text
      }
    }
    const action = addTodo('Learn Redux');

  ```

### store.dispatch()

- store.dispatch()是 View 发出 Action 的唯一方法

  ```js
    store.dispatch({
      type: 'ADD_TODO',
      payload: 'Learn Redux'
    });
    //store.dispatch(addTodo('Learn Redux'));
  ```

### Reducer

- Store 收到 Action 以后，会给出一个新的 State，这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer。
- View 通过 store.dispatch 发出 Action ，触发 Reducer 执行
- 为此在 Store 生成时 将 Reducer 传入
- Reducer 为纯函数：
- 1.不得改写参数
- 2.不能调用系统 I/O 的API
- 3.不能调用Date.now()或者Math.random()等不纯的方法，因为每次会得到不一样的结果

```js
  const defaultState = 0;
  const reducer = (state = defaultState, action) => {
    // state 设成只读，不去改变它，而是生成一个新的对象，这样保证了 view 对应的 state 总是一个不变的对象
    return Object.assign({}, state, { thingToChange });
    // 或者
    return { ...state, ...newState };
    // 或者
    return [...state, newItem];
  };

  const store = createStore(reducer);
```

### store.subscribe()

- store.subscribe(listener) 设置监听函数，一旦 State 发生变化，就自动执行函数 listener
- 解除监听：let unsubscribe = store.subscribe()();

 ```js
    store.subscribe(listener);

    let unsubscribe = store.subscribe(() =>
      console.log(store.getState())
    );
    unsubscribe();
 ```

### 拆分 reducer：combineReducers

```js
 //三种 Action 分别改变 State 的三个属性
 const chatReducer = (state = defaultState, action = {}) => {
   const { type, payload } = action;
   switch (type) {
     case ADD_CHAT:
       return Object.assign({}, state, {
         chatLog: state.chatLog.concat(payload)
       });
     case CHANGE_STATUS:
       return Object.assign({}, state, {
         statusMessage: payload
       });
     case CHANGE_USERNAME:
       return Object.assign({}, state, {
         userName: payload
       });
     default: return state;
   }
 };
 // 拆分
 const chatReducer = (state = defaultState, action = {}) => {
   return {
     chatLog: chatLog(state.chatLog, action),
     statusMessage: statusMessage(state.statusMessage, action),
     userName: userName(state.userName, action)
   }
 };
```

- 拆分 reducer：Redux 提供 combineReducers 方法用于 Reducer 拆分。
- 定义各个子 Reducer 函数，用 combineReducers 方法合成一个大的 Reducer。
- 并根据 State 的 key 去执行相应的子 Reducer，将返回结果合并成一个大的 State 对象。

```js
  import { combineReducers } from 'redux';
  import reducers from './reducers'
  const chatReducer = combineReducers(reducers)

  // 等同于
  const reducer = combineReducers({
    a: doSomethingWithA,
    b: processB,
    c: c
  })
  // 等同于
  function reducer(state = {}, action) {
    return {
      a: doSomethingWithA(state.a, action),
      b: processB(state.b, action),
      c: c(state.c, action)
    }
  }
```

// store的三个方法：store.getState()、store.dispatch()、tore.subscribe()
let { subscribe, dispatch, getState } = createStore(chatReducer);

### 异步执行 reducers 中间件

- 用相应的生层器生成相应的中间件，后用 redux 原生方法 applyMiddleware 将所有中间件组成一个数组--依次执行
- 中间件内部可以拿到 getState 和 dispatch
- 同步操作只要发出一种相应的 Action，执行 reducers就可以
- 异步操作要发出三种 Action

  ```js
    // 写法一：名称相同，参数不同
    { type: 'FETCH_POSTS' } // 发起时的 Action，切换 state，以此来让 UI 显示加载界面
    { type: 'FETCH_POSTS', status: 'error', error: 'Oops' } // 失败的 Action，切换 state，UI 隐藏加载界面并显示接收到的数据
    { type: 'FETCH_POSTS', status: 'success', response: { ... } } // 成功的 Action

    // 写法二：名称不同
    { type: 'FETCH_POSTS_REQUEST' }
    { type: 'FETCH_POSTS_FAILURE', error: 'Oops' }
    { type: 'FETCH_POSTS_SUCCESS', response: { ... } }

    // 三个 state 反应不同的操作状态
    let state = {
      isFetching: true, //是否在抓取数据
      didInvalidate: true, //数据是否过时
      lastUpdated: 'xxxxxxx' //上一次更新时间
    };
   ```

- 操作开始时，送出一个 Action，触发 State 更新为"正在操作"状态，View 重新渲染
- 操作结束后，再送出一个 Action，触发 State 更新为"操作结束"状态，View 再一次重新渲染
- -------------未完待续----------

### React-Redux

React-Redux将所有组件分成两大类：

- UI 组件（presentational component）
    1. 只负责 UI 的呈现，不带有任何业务逻辑
    2. 没有状态（即不使用this.state这个变量）
    3. 所有数据都由参数（this.props）提供
    4. 不使用任何 Redux 的 API
    5. 为"纯组件"，像纯函数一样，纯粹由参数决定它的值
- 容器组件（container component）
    1. 负责管理数据和业务逻辑，不负责 UI 的呈现
    2. 带有内部状态
    3. 使用 Redux 的 API

 说明：

- 如果一个组件既有 UI 又有业务逻辑，要将它拆分成：外面是一个容器组件，里面包了一个 UI 组件。
- 容器组件负责与外部的通信，将数据传给 UI 组件，由 UI 组件渲染出视图。
- React-Redux 规定，所有的 UI 组件都由用户提供，容器组件则是由 React-Redux 自动生成。

  ```js
    import { connect } from 'react-redux'
    const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList)

    // connect 从 UI 组件 TodoList 生成容器组件 VisibleTodoList
    // mapStateToProps 负责向UI组件输入:外部的数据（即state对象）映射到 UI 组件的参数（props），省略此参数 UI 组件不会订阅Store，即 Store 更新不会引起 UI 组件更新。
    // mapDispatchToProps 负责从UI组件向外输出：用户在UI发出动作如何变为 Action 对象

    // mapStateToProps 函数返回一个对象，该对象的键代表向 UI 组件输入的 props，该对象的值从state计算而来
    // mapStateToProps 会订阅 Store，每当state更新的时候，就会自动执行，重新计算 UI 组件的参数，从而触发 UI 组件的重新渲染。
    const mapStateToProps = (state) => {
      return {
        todos: getVisibleTodos(state.todos, state.visibilityFilter)
      }
    }
    const getVisibleTodos = (todos, filter) => {
      // 参数1：state对象；参数2：容器组件的props，props发生变化时UI组件也会重新渲染
      switch (filter) {
        case 'SHOW_ALL':
          return todos
        case 'SHOW_COMPLETED':
          return todos.filter(t => t.completed)
        case 'SHOW_ACTIVE':
          return todos.filter(t => !t.completed)
        default:
          throw new Error('Unknown filter: ' + filter)
      }
    }

    // mapDispatchToProps 定义了哪些用户的操作应该被当做 Action 传给 Store，可以是函数/对象
    // 作为函数返回一个对象，该对象的每个键名对应 UI 组件的同名参数，定义了 UI 组件的参数怎样发出 Action
    const mapDispatchToProps1 = (dispatch, ownProps) => {
      return {
        onClick: () => {
          dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter: ownProps.filter
          });
        }
      };
    }
    // 作为对象每个键名对应 UI 组件的同名参数，键值是一个函数，被当作 Action creator ，返回的 Action 会由 Redux 自动发出
    const mapDispatchToProps2 = {
      onClick: (filter) => {
        type: 'SET_VISIBILITY_FILTER',
        filter
      }
    }

    // React-Redux 提供 Provider 组件，可以让容器组件拿到state
    import { Provider } from 'react-redux'
    import { createStore } from 'redux'
    import App from './components/App'

    let store = createStore(todoApp);
    /*render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById('root')
    )*/

   ```

- [初次使用Provider编译报错，降低了React-Redux版本后解决,7降至4](https://blog.csdn.net/weixin_42331327/article/details/103908207)
