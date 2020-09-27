// 包含所有的 action creator
import {
    TRANSFORM_CURRENT_PAGE,
    TRANSFORM_TYPE,
    USER_DATA,
    REMOVE_USER_DATA
} from '../redux/action-types';

// 传递给LayoutContent改变的page
export const transfrom_currentPage = (currentPage) => ({
    type: TRANSFORM_CURRENT_PAGE,
    data: currentPage
})

// 传递给LayoutContent改变的type
export const transfrom_type = (typeIndex) => ({
    type: TRANSFORM_TYPE,
    data: typeIndex
})

// 从register里传递已登录的用户数据到其余各个组件
export const transform_user = (user)=>({
    type: USER_DATA,
    data: user
}) 

// 退出登录，删去redux的数据
export const remove_user = (user)=>({
    type: REMOVE_USER_DATA,
    data: user
}) 

// 异步action
// 如果想返回一个函数，必须应用上异步中间件
// export const incrementAsync = (number) => {
//     return dispatch => {
//         // 异步代码
//         setTimeout(() => {
//             // 一秒之后才去分发一个增加的action
//             dispatch(increment(number))
//         }, 1000)
//     }
// }