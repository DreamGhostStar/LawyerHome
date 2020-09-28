// 包含n个ruducer函数的模块
import {
    USER_DATA,
    REMOVE_USER_DATA
} from './action-types'

export function transfromData(state = { user: null }, action: any) {
    let temp = state
    switch (action.type) {
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