import axios from 'axios'
import { httpConfig, getHeaders } from 'components/common/utils'

interface getErrorListConfig {
    identityID: number
    page: number
}

// 获取错误列表
export const getErrorListApi = async (data: getErrorListConfig) => {
    const { data: res }: { data: httpConfig } = await axios({
        method: 'GET',
        url: '/api/error/list',
        data: data,
        headers: getHeaders()
    })

    return res
}