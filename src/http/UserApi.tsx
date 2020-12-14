import axios from 'axios'
import { backIP, testIP } from 'components/common/config'
import { httpConfig, getHeaders } from 'components/common/utils'
import Http from './Servies'

interface loginConfig {
    username: string
    password: string
    isAdmin: boolean
}

interface getVerifyDetailConfig {
    id: number
}
interface alterUserConfig {
    userID: number
    username: string
    realname: string
    phoneNumber: string
}
interface submitUserVerifyResultConfig {
    id: number
    isAgree: boolean
}
interface resetPasswordConfig {
    userID: number
    password: string
}
interface alterUserIdentifyConfig {
    userID: number
    identifyID: number
}

// 登录
export const loginApi = async (data: loginConfig) => {
    const { data: res }: { data: httpConfig } = await axios({
        method: 'PUT',
        url: `/api/user/login`,
        data: data
    })

    return res
}

// 获取所有身份
export const getIdentifyListApi = async () => {
    const { data: res }: { data: httpConfig } = await axios({
        method: 'GET',
        url: `/api/user/identify`,
        headers: getHeaders()
    })

    return res
}

// 获取用户验证列表
export const getUserVerifyListApi = async () => {
    const { data: res }: { data: httpConfig } = await axios({
        method: 'GET',
        url: `/api/user/verify/list`,
        headers: getHeaders()
    })

    return res
}

// 获取用户验证材料信息
export const getUserVerifyDetailApi = async (data: getVerifyDetailConfig) => {
    const { data: res }: { data: httpConfig } = await axios({
        method: 'GET',
        url: `/api/user/verify`,
        params: data,
        headers: getHeaders()
    })

    return res
}

// 获取用户列表信息
export const getUserListApi = async () => {
    const { data: res }: { data: httpConfig } = await axios({
        method: 'GET',
        url: `/api/admin/user/list`,
        headers: getHeaders()
    })

    return res
}

// 修改用户信息
export const alterUserApi = async (data: alterUserConfig) => {
    const { data: res }: { data: httpConfig } = await axios({
        method: 'PUT',
        url: `/api/admin/realname`,
        data: data,
        headers: getHeaders()
    })

    return res
}

// 提交用户审核结果
export const submitUserVerifyResultApi = async (data: submitUserVerifyResultConfig) => {
    const { data: res }: { data: httpConfig } = await axios({
        method: 'PUT',
        url: `/api/user/verify`,
        data: data,
        headers: getHeaders()
    })

    return res
}

// 重置密码
export const resetPasswordApi = async (data: resetPasswordConfig) => {
    const { data: res }: { data: httpConfig } = await axios({
        method: 'PUT',
        url: `/api/admin/password`,
        data: data,
        headers: getHeaders()
    })

    return res
}

// 修改用户身份
export const alterUserIdentifyApi = async (data: alterUserIdentifyConfig) => {
    const { data: res }: { data: httpConfig } = await axios({
        method: 'PUT',
        url: `/api/admin/indentify`,
        data: data,
        headers: getHeaders()
    })

    return res
}

interface ILoginPassword {
    phoneNumber: string;
    password: string;
    verification_code: string;
    platform: number;
}

interface IGetBasicUserInfo {
    userID?: number;
}

interface IAlterUserIdentify {
    userID: number;
    identifyID: number;
}

interface IResetUserPassword {
    userID: number;
    password: string;
}

interface IGetDetailUserInfo {
    userID: number;
}

export interface IAlterUserInfo {
    name: string ;
    phoneNumber: string ;
    weixin_number: string ;
    lawyer_number: string ;
}

// 获取图片验证码
export const get_verify_code_api = async () => {
    return await Http.request(`${backIP}/public/verificationCode/image`, {}, 'GET')
}

// 管理员手机号密码登录
export const login_password_api = async (data: ILoginPassword) => {
    return await Http.request(`${backIP}/login/password`, data, 'POST')
}

// 获取管理员基本信息
export const get_basic_user_info_api = async (data: IGetBasicUserInfo) => {
    return await Http.request(`${backIP}/user/getBasicInfo`, data, 'GET', getHeaders())
}

// 获取用户列表
export const get_user_list_api = async () => {
    return await Http.request(`${testIP}/admin/userList`, {}, 'GET', getHeaders())
}

// 修改用户身份
export const alter_user_identify_api = async (data: IAlterUserIdentify) => {
    return await Http.request(`${testIP}/admin/user/identify`, data, 'PUT', getHeaders())
}

// 重置用户密码
export const reset_user_password_api = async (data: IResetUserPassword) => {
    return await Http.request(`${testIP}/admin/user/password`, data, 'PUT', getHeaders())
}

// 获取用户详细信息
export const get_user_detail_info_api = async (data: IGetDetailUserInfo) => {
    return await Http.request(`${testIP}/admin/user`, data, 'GET', getHeaders())
}

// 修改用户信息
export const alter_user_info_api = async (data: IAlterUserInfo) => {
    return await Http.request(`${testIP}/admin/user`, data, 'PUT', getHeaders())
}