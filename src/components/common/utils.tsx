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

// http请求是否正确
export const httpIsSuccess = (code: number) => {
    return code === 0;
}

export const isNull = (value: any) => {
    return value === null;
}

// 转换时间
export const formatTime = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDay();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const seconds = date.getSeconds();
    return `${year}-${month}-${day} ${hour}:${minute}:${seconds}`
}