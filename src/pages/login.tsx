import React, { useRef, useState, useEffect } from 'react'
import 'styles/pages/login.scss'
import { successToast, errorToast, setToken, getToken } from 'components/common/utils'
import { loginApi, getBasicUserApi } from 'http/UserApi';
import md5 from 'md5'
import { useHistory } from 'react-router-dom';
import { Checkbox, Button } from 'antd';
import { UserBasicConfig } from 'components/home/Header';

const stylePrefix = 'page-login'

interface LoginConfig {
    transform_user: (user: UserBasicConfig) => {
        type: string;
        data: UserBasicConfig;
    }
}

export default function Login({ transform_user }: LoginConfig) {
    const [isAgreeDocument, setIsAgreeDocument] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()
    const submit = async () => {
        const res = await loginApi({
            username: username,
            password: md5(password)
        })
        if (res.code === 0) {
            history.push('/')
            setToken(res.data)
            successToast('登录成功')
        } else {
            errorToast(res.message);
        }
    }
    const getUserInfo = async () => {
        const token: string = getToken();
        if (token) {
            const res = await getBasicUserApi({});
            if (res.code === 0) {
                const userData: UserBasicConfig = res.data
                transform_user(userData)
                history.push('/')
            }
        }
    }
    useEffect(() => {
        getUserInfo()
    }, [])
    return (
        <div className={`${stylePrefix}-layout`}>
            <div className={`${stylePrefix}-main-layout`}>
                <div className={`${stylePrefix}-sider`}>
                    <div className={`${stylePrefix}-note-layout`}>
                        <p className={`${stylePrefix}-note`}>欢迎！</p>
                        <p className={`${stylePrefix}-note`}>云家医后台管理平台</p>
                    </div>
                </div>
                <div className={`${stylePrefix}-main`}>
                    <p className={`${stylePrefix}-title`}>登录</p>
                    <div className={`${stylePrefix}-content`} >
                        <input
                            type="text"
                            className={`${stylePrefix}-input`}
                            placeholder='用户名'
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type='password'
                            className={`${stylePrefix}-input`}
                            placeholder='密码'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className={`${stylePrefix}-operation-layout`}>
                            <Checkbox
                                onChange={() => setIsAgreeDocument(!isAgreeDocument)}
                                className={`${stylePrefix}-checkBox`}
                            >
                                我已同意
                                <a href="#">《服务协议》</a>
                            </Checkbox>
                            <p className={`${stylePrefix}-forget-word`} >忘记密码</p>
                        </div>
                        <Button
                            type="primary"
                            shape="round"
                            size={'large'}
                            className={`${stylePrefix}-btn`}
                            onClick={submit}
                        >
                            登录
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
