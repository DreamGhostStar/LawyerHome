// 包含n个ruducer函数的模块
import {
    TRANSFORM_CURRENT_PAGE,
    TRANSFORM_TYPE,
    USER_DATA,
    REMOVE_USER_DATA
} from './action-types'

export function transfromData(state = {
    type: 0,
    page: 1,
    user: null
}, action) {
    let temp = state
    switch (action.type) {
        case TRANSFORM_CURRENT_PAGE:
            temp.page = action.data;
            return temp
        case TRANSFORM_TYPE:
            temp.type = action.data
            temp.page = 1;
            return temp
        case USER_DATA:
            temp.user = action.data
            return temp
        case REMOVE_USER_DATA:
            temp.user = null
            return temp
        default:
            return state;
    }
}