import React, { useState, useEffect, useRef, useCallback } from 'react'
import 'styles/pages/login.scss'
import { successToast, errorToast, setToken, getToken, httpIsSuccess } from 'components/common/utils'
import { get_basic_user_info_api, get_verify_code_api, login_number_api, login_password_api } from 'http/UserApi';
import md5 from 'md5'
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';
import { UserBasicConfig } from 'components/home/Header';
import ReactSimpleVerify from 'react-simple-verify'
import VerifyCode from 'components/login/VerifyCode';
import VerifyNumber from 'components/login/VerifyNumber';

const stylePrefix = 'page-login'

interface LoginConfig {
    transform_user: (user: UserBasicConfig) => {
        type: string;
        data: UserBasicConfig;
    }
}

export default function Login({ transform_user }: LoginConfig) {
    const [method, setMethod] = useState(1) // 登录的方式，1为密码，2为验证码
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [verifyCode, setVerifyCode] = useState('')
    const [verifyNumber, setVerifyNumber] = useState('')
    const [isVerify, setIsVerify] = useState(false)
    const [verifyCodeImg, setVerifyCodeImg] = useState<string | null>(null)
    const history = useHistory()
    const verifyRef = useRef(null)
    const [phoneError, setPhoneError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [verifyCodeError, setVerifyCodeError] = useState('')
    const phoneReg = /^\w{6,}$/
    const passwordReg = /^\w{6,20}$/
    const verifyCodeReg = /^\w{6}$/
    const verifyNumberReg = /^\d{6}$/
    const phoneErrorText = '用户名需由6位及6位以上字母或数字组成'
    const passwordErrorText = '密码需由6-20位字母或数字组成'
    const verifyCodeErrorText = '图片验证码需由6位字母或数字组成'
    const verifyNumberErrorText = '手机验证码需由6位数字组成'
    const submit = async () => {
        if (method === 1) {
            if (!phoneReg.test(phone) || !passwordReg.test(password) || !verifyCodeReg.test(verifyCode)) {
                errorToast('请按提示完成信息填入')
                return
            }
        } else {
            if (!phoneReg.test(phone) || !verifyNumberReg.test(verifyNumber)) {
                errorToast('请按提示完成信息填入')
                return
            }
        }
        if (!isVerify) {
            errorToast('请完成人机验证')
            return
        }
        let res;
        if (method === 1) {
            res = await login_password_api({
                phoneNumber: phone,
                password: md5(password),
                verification_code: verifyCode,
                platform: 2
            })
        } else {
            res = await login_number_api({
                phoneNumber: phone,
                verification_code: verifyNumber,
                platform: 2
            })
        }
        if (res) {
            if (httpIsSuccess(res.code)) {
                history.push('/home')
                setToken(res.data)
                successToast('登录成功')
            } else {
                errorToast(res.message);
                initVerifyCode()
            }
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
    // 获取用户基本信息
    const getUserInfo = useCallback(async () => {
        const token: string = getToken();
        if (token) {
            const res = await get_basic_user_info_api({});
            if (httpIsSuccess(res.code)) {
                const userData: UserBasicConfig = res.data
                transform_user(userData)
                history.push('/home')
            }
        }
    }, [transform_user, history])
    // 变更验证码图片
    const initVerifyCode = useCallback(async () => {
        const res = await get_verify_code_api({ platform: 2 });
        if (httpIsSuccess(res.code)) {
            setVerifyCodeImg(res.data)
        } else {
            errorToast(res.message)
        }
    }, [])
    useEffect(() => {
        getUserInfo()
        initVerifyCode()
    }, [getUserInfo, initVerifyCode])
    return (
        <div className={`${stylePrefix}-layout`}>
            <div className={`${stylePrefix}-main-layout`}>
                <div className={`${stylePrefix}-sider`}>
                    <div className={`${stylePrefix}-note-layout`}>
                        <p className={`${stylePrefix}-note`}>欢迎！</p>
                        <p className={`${stylePrefix}-note`}>律政云后台管理平台</p>
                    </div>
                </div>
                <div className={`${stylePrefix}-main`}>
                    <p className={`${stylePrefix}-title`}>手机{method === 1 ? '密码' : '验证码'}登录</p>
                    <div className={`${stylePrefix}-content`} >
                        <input
                            type="text"
                            className={`${stylePrefix}-input`}
                            placeholder='手机号'
                            onChange={(e) => handleInputChange(e, setPhoneError, phoneReg, setPhone, phoneErrorText)}
                        />
                        <div className={`${stylePrefix}-input-error-text`}>{phoneError}</div>
                        {
                            method === 1 && <>
                                <input
                                    type='password'
                                    className={`${stylePrefix}-input`}
                                    placeholder='密码'
                                    onChange={(e) => handleInputChange(e, setPasswordError, passwordReg, setPassword, passwordErrorText)}
                                />
                                <div className={`${stylePrefix}-input-error-text`}>{passwordError}</div>
                            </>
                        }
                        {
                            method === 1
                                ? <VerifyCode
                                    handleInputChange={handleInputChange}
                                    verifyCodeErrorText={verifyCodeErrorText}
                                    verifyCodeReg={verifyCodeReg}
                                    setVerifyCode={setVerifyCode}
                                    setVerifyCodeError={setVerifyCodeError}
                                    verifyCodeImg={verifyCodeImg}
                                    initVerifyCode={initVerifyCode}
                                />
                                : <VerifyNumber
                                    setVerifyNumberError={setVerifyCodeError}
                                    setVerifyNumber={setVerifyNumber}
                                    verifyNumberReg={verifyNumberReg}
                                    verifyNumberErrorText={verifyNumberErrorText}
                                    handleInputChange={handleInputChange}
                                    phone={phone}
                                    phoneReg={phoneReg}
                                />
                        }
                        <div className={`${stylePrefix}-input-error-text`}>{verifyCodeError}</div>
                        <ReactSimpleVerify width={270} ref={verifyRef} success={() => setIsVerify(true)} />
                        <div className={`${stylePrefix}-operation-layout`}>
                            <p
                                className={`${stylePrefix}-method`}
                                onClick={() => setMethod(method === 1 ? 2 : 1)}
                            >
                                手机{method === 1 ? '验证码' : '密码'}登录
                            </p>
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