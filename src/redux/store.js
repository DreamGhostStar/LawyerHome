import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { transfromData } from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension'
//生成store对象
const store = createStore(transfromData,
    composeWithDevTools(applyMiddleware(thunk)) // 应用上异步中间件
); // 内部会第一次调用reducer函数，得到初始state 

export default store