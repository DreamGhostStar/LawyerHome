import axios from 'axios'
import { httpConfig, getHeaders } from 'components/common/utils'

interface loginConfig {
    username: string
    password: string
}

interface getBasicUserConfig {
    userID?: number
}

interface getVerifyDetailConfig {
    id: number
}

interface getUserListConfig {
    page: number
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
export const getBasicUserApi = async (data: getBasicUserConfig) => {
    const { data: res }: { data: httpConfig } = await axios({
        method: 'GET',
        url: '/api/user/basic',
        data: data,
        headers: getHeaders()
    })

    return res
}

// 获取所有身份
export const getIdentifyListApi = async () => {
    const { data: res }: { data: httpConfig } = await axios({
        method: 'GET',
        url: '/api/user/identify',
        headers: getHeaders()
    })

    return res
}

// 获取用户验证列表
export const getUserVerifyListApi = async () => {
    const { data: res }: { data: httpConfig } = await axios({
        method: 'GET',
        url: '/api/user/verify/list',
        headers: getHeaders()
    })

    return res
}

// 获取用户验证材料信息
export const getUserVerifyDetailApi = async (data: getVerifyDetailConfig) => {
    const { data: res }: { data: httpConfig } = await axios({
        method: 'GET',
        url: '/api/user/verify',
        params: data,
        headers: getHeaders()
    })

    return res
}

// 获取用户列表信息
export const getUserListApi = async (data: getUserListConfig) => {
    const { data: res }: { data: httpConfig } = await axios({
        method: 'GET',
        url: '/api/admin/user/list',
        params: data,
        headers: getHeaders()
    })

    return res
}