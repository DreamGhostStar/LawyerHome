// 包含n个ruducer函数的模块
import {
    USER_DATA,
    REMOVE_USER_DATA
} from './action-types'
import { UserBasicConfig } from 'components/home/Header'

export function transfromData(
    state: { user: UserBasicConfig | null } = { user: null },
    action: {
        data: UserBasicConfig
        type: string
    }
) {
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