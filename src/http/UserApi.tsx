import { backIP } from 'components/common/config'
import { getHeaders } from 'components/common/utils'
import Http from './Servies'

interface ILoginPassword {
    phoneNumber: string;
    password: string;
    verification_code: string;
    platform: number;
}

interface ILoginNumber {
    phoneNumber: string;
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
    userID: number;
    name: string;
    phoneNumber: string;
    weixin_number: string;
    lawyer_number: string;
}

interface IAddUser {
    identify: string;
    lawyerNumber: string;
    identifyNumber: string;
    name: string;
    avatar: string;
    qualificationsNumber: string;
    phone: string;
    startTime: string;
    age: number;
    sex: string;
}

interface ISearchUser {
    value: string;
}

interface ISendVerifyNumber {
    phoneNumber: string;
}

interface ISendImageVerify {
    platform: number;
}

// 获取图片验证码
export const get_verify_code_api = async (data: ISendImageVerify) => {
    return await Http.request(`${backIP}/public/verificationCode/image`, data, 'GET')
}

// 管理员手机号密码登录
export const login_password_api = async (data: ILoginPassword) => {
    return await Http.request(`${backIP}/login/password`, data, 'POST')
}

// 管理员手机号验证码登录
export const login_number_api = async (data: ILoginNumber) => {
    return await Http.request(`${backIP}/login/note`, data, 'POST')
}

// 获取管理员基本信息
export const get_basic_user_info_api = async (data: IGetBasicUserInfo) => {
    return await Http.request(`${backIP}/user/getBasicInfo`, data, 'GET', getHeaders())
}

// 获取用户列表
export const get_user_list_api = async () => {
    return await Http.request(`${backIP}/admin/userList`, {}, 'GET', getHeaders())
}

// 修改用户身份
export const alter_user_identify_api = async (data: IAlterUserIdentify) => {
    return await Http.request(`${backIP}/admin/user/identify`, data, 'PUT', getHeaders())
}

// 重置用户密码
export const reset_user_password_api = async (data: IResetUserPassword) => {
    return await Http.request(`${backIP}/admin/user/password`, data, 'PUT', getHeaders())
}

// 获取用户详细信息
export const get_user_detail_info_api = async (data: IGetDetailUserInfo) => {
    return await Http.request(`${backIP}/admin/user`, data, 'GET', getHeaders())
}

// 修改用户信息
export const alter_user_info_api = async (data: IAlterUserInfo) => {
    return await Http.request(`${backIP}/admin/user`, data, 'PUT', getHeaders())
}

// 上传文件
export const upload_file_api = async (data: FormData) => {
    return await Http.request(`${backIP}/public/upload`, data, 'POST', getHeaders())
}

// 生成新账号
export const add_new_user_api = async (data: IAddUser) => {
    return await Http.request(`${backIP}/admin/user`, data, 'POST', getHeaders())
}

// 查找数据库用户
export const search_user_list_api = async (data: ISearchUser) => {
    return await Http.request(`${backIP}/admin/user/tip`, data, 'GET', getHeaders())
}

// 重新发送手机验证码
export const send_phone_verify_number_api = async (data: ISendVerifyNumber) => {
    return await Http.request(`${backIP}/public/verificationCode/note`, data, 'POST', getHeaders())
}

// 退出登录
export const exit_api = async () => {
    return await Http.request(`${backIP}/user/exit`, {}, 'POST', getHeaders())
}