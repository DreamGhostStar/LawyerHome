import { createFromIconfontCN } from '@ant-design/icons';
import { message } from 'antd';

export const IconFont = createFromIconfontCN({
    scriptUrl: 'http://at.alicdn.com/t/font_2103484_ujsate29tbd.js',
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

export const getToken = () => {
    
}