import fetch from 'cross-fetch'

// 计数器demo中的同步action，action creator 返回一个对象
export const DECREMENT = 'DECREMENT';
function decrementActionCreator (val) {
  return {
    type: DECREMENT,
    val
  }
}
export const decrementAction = decrementActionCreator(2);//生成action后在UI层dispatch它


export const INCREMENT = 'INCREMENT';
function incrementActionCreator (val) {
  return {
    type: INCREMENT,
    val
  }
}
export const incrementAction = incrementActionCreator(2);


// 异步action，需要借助中间件 redux-thunk
// action creator 会返回一个函数，这个函数可以有副作用、可以执行异步请求，最终会被 Redux Thunk middleware 中间件执行
// 中间件内部可以拿到 getState 和 dispatch

export const REQUEST_POSTS = 'REQUEST_POSTS';
function requestPosts (subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit
  }
}

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
function receivePosts (subreddit, json) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';
export function invalidateSubreddit (subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  }
}

// 如下 thunk action creator，返回一个函数，函数内执行异步获取
// 虽然内部操作不同，但可以像其它 action creator 一样使用它：
// store.dispatch(fetchPosts('reactjs'))
export function fetchPosts (subreddit) {

  // Thunk middleware 知道如何处理函数。
  // 这里把 dispatch 方法通过参数的形式传给函数，
  // 以此来让它自己也能 dispatch action。
  return function (dispatch) {

    // 首次 dispatch：更新应用的 state 来通知
    // API 请求发起了。
    dispatch(requestPosts(subreddit));

    // thunk middleware 调用的函数可以有返回值，
    // 它会被当作 dispatch 方法的返回值传递。
    // 这个案例中，我们返回一个等待处理的 promise。
    // 这并不是 redux middleware 所必须的，但这对于我们而言很方便。
    return fetch(`http://www.subreddit.com/r/${subreddit}.json`)
      // 不要使用 catch，因为会捕获
      .then(response => response.json(), error => console.log('An error occurred.', error))
      // 这里使用 API 请求结果来更新应用的 state。
      .then(json =>dispatch(receivePosts(subreddit, json)))
  }
}

function shouldFetchPosts(state, subreddit) {
  const posts = state.postsBySubreddit[subreddit]
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}

export function fetchPostsIfNeeded(subreddit) {

  // 注意这个函数也接收了 getState() 方法
  // 它让你选择接下来 dispatch 什么。
  // 当缓存的值是可用时，
  // 减少网络请求很有用。
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      // 在 thunk 里 dispatch 另一个 thunk！
      return dispatch(fetchPosts(subreddit))
    } else {
      // 告诉调用代码不需要再等待。
      return Promise.resolve()
    }
  }
}