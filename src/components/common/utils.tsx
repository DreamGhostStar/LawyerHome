import { message } from 'antd';
import cookies from 'react-cookies'

export interface httpConfig {
    code: number
    data: any
    message: string
}

export const successToast = (msg: string) => {
    message.success(msg);
}

export const errorToast = (msg: string) => {
    message.error(msg);
}

export const getToken = (): string => {
    return cookies.load('Authorization')
}

export const setToken = (token: string) => {
    cookies.save('Authorization', token, {
        maxAge: 60 * 60 * 24 * 7
    })
}

export const removeToken = () => {
    cookies.remove('Authorization')
}

export const getHeaders = () => {
    const token: string = getToken()
    return {
        'Authorization': token
    }
}

export interface AuthorConfig {
    id: number, // 作者ID
    avatar: string, // 作者的头像
    realname: string, // 作者的真实姓名
}

export interface IndentifyConfig {
    id: number
    value: string
}

export const httpIsSuccess = (code: number) => {
    return code === 0;
}

export const isNull = (value: any) => {
    return value === null;
}