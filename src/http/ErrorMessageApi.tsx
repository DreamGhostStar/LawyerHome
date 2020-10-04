import axios from 'axios'
import { httpConfig, getHeaders } from 'components/common/utils'

interface getErrorListConfig {
    identityID: number
    page: number
}
interface getErrorDetailConfig {
    errorID: number
}

// 获取错误列表
export const getErrorListApi = async (data: getErrorListConfig) => {
    const { data: res }: { data: httpConfig } = await axios({
        method: 'GET',
        url: '/api/error/list',
        params: data,
        headers: getHeaders()
    })

    return res
}

// 获取错误详情
export const getErrorDetailApi = async (data: getErrorDetailConfig) => {
    const { data: res }: { data: httpConfig } = await axios({
        method: 'GET',
        url: '/api/error',
        params: data,
        headers: getHeaders()
    })

    return res
}