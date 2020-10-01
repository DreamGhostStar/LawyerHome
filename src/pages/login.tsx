import React, { useState, useEffect, useRef } from 'react'
import 'styles/pages/login.scss'
import { successToast, errorToast, setToken, getToken } from 'components/common/utils'
import { loginApi, getBasicUserApi } from 'http/UserApi';
import md5 from 'md5'
import { useHistory } from 'react-router-dom';
import { Checkbox, Button } from 'antd';
import { UserBasicConfig } from 'components/home/Header';
import ReactSimpleVerify from 'react-simple-verify'

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
    const [isVerify, setIsVerify] = useState(false)
    const history = useHistory()
    const verifyRef = useRef(null)
    const [usernameError, setUsernameError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const usernameReg = /^\w{6,}$/
    const passwordReg = /^\w{6,20}$/
    const usernameErrorText = '用户名需由6位及6位以上字母或数字组成'
    const passwordErrorText = '密码需由6-20位字母或数字组成'
    const submit = async () => {
        if (!usernameReg.test(username) || !passwordReg.test(password)) {
            errorToast('请按提示完成信息填入')
            return
        }
        if (!isAgreeDocument) {
            errorToast('请同意服务协议');
            return;
        }
        if (!isVerify) {
            errorToast('请完成人机验证')
            return
        }
        const res = await loginApi({
            username: username,
            password: md5(password),
            isAdmin: true
        })
        if (res.code === 0) {
            history.push('/home')
            setToken(res.data)
            successToast('登录成功')
        } else {
            errorToast(res.message);
        }
    }
    // 处理输入框变化
    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        setErrorStateFunc: React.Dispatch<React.SetStateAction<string>>,
        reg: RegExp,
        setStateFunc: React.Dispatch<React.SetStateAction<string>>,
        symbolErrorText: string
    ) => {
        const inputValue = event.target.value
        setStateFunc(inputValue)
        if (!inputValue) {
            setErrorStateFunc('输入不能为空')
            return
        }

        if (!reg.test(inputValue)) {
            setErrorStateFunc(symbolErrorText)
        } else {
            setErrorStateFunc('')
        }
    }
    const getUserInfo = async () => {
        const token: string = getToken();
        if (token) {
            const res = await getBasicUserApi({});
            if (res.code === 0) {
                const userData: UserBasicConfig = res.data
                transform_user(userData)
                history.push('/home')
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
                            onChange={(e) => handleInputChange(e, setUsernameError, usernameReg, setUsername, usernameErrorText)}
                        />
                        <div className={`${stylePrefix}-input-error-text`}>{usernameError}</div>
                        <input
                            type='password'
                            className={`${stylePrefix}-input`}
                            placeholder='密码'
                            onChange={(e) => handleInputChange(e, setPasswordError, passwordReg, setPassword, passwordErrorText)}
                        />
                        <div className={`${stylePrefix}-input-error-text`}>{passwordError}</div>
                        <ReactSimpleVerify width={270} ref={verifyRef} success={() => setIsVerify(true)} />
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
