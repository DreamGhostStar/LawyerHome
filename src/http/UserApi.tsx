import axios from 'axios'
import { httpConfig } from 'components/common/utils'

interface loginConfig {
    username: string
    password: string
}

// 登录
export const loginApi = async (data: loginConfig) => {
    const { data: res }: { data: httpConfig } = await axios({
        method: 'PUT',
        url: '/api/user/login',
        data: data
    })

    return res
}

// 获取用户基本信息
export const getBasicUserApi = async (data: loginConfig) => {
    const { data: res }: { data: httpConfig } = await axios({
        method: 'GET',
        url: '/api/user/basic',
        data: data,
        // headers: 
    })

    return res
}