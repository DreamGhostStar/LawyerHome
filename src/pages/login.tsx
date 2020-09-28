import React, { useRef, useState } from 'react'
import 'styles/pages/login.scss'
import { successToast, errorToast, setToken } from 'components/common/utils'
import { loginApi } from 'http/UserApi';
import md5 from 'md5'
import { useHistory } from 'react-router-dom';
import { Checkbox, Button } from 'antd';

const stylePrefix = 'page-login'

export default function Login() {
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
            history.push('/home')
            setToken(res.data)
            successToast('登录成功')
        } else {
            errorToast(res.message);
        }
    }
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
