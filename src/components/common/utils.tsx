import { createFromIconfontCN } from '@ant-design/icons';
import { message } from 'antd';
import cookies from 'react-cookies'

export const IconFont = createFromIconfontCN({
    scriptUrl: 'http://at.alicdn.com/t/font_2103484_igasga44gb.js',
});

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

export const getHeaders = () => {
    const token: string = getToken()
    return {
        'Authorization': token
    }
}