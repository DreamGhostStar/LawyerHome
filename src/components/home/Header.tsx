import React, { useEffect, useState } from 'react'
import 'styles/home/header.scss'
import logo from 'images/logo.png'
import loadingImage from 'images/loading.gif'
import store from 'redux/store'
import { getToken, IconFont, removeToken, successToast, errorToast } from 'components/common/utils'
import { getBasicUserApi } from 'http/UserApi'
import { useHistory } from 'react-router-dom'

const stylePrefix = 'home-header'

export interface UserBasicConfig {
    avatar: string, // 头像
    realname: string, // 真实姓名
    identify: {
        id: number // 身份ID（0代表未验证）
        value: string // 身份具体值，如果未验证则返回"未验证"
    },
    statusID: number, // 如果用户不为医生，则传0
    money: string, // 余额
    postNum: string, // 帖子数量
    likeNum: string, // 收获喜欢数量
    collectNum: string, // 收藏药店数量
}

interface HeaderConfig {
    transform_user: (user: UserBasicConfig) => {
        type: string;
        data: UserBasicConfig;
    }
    user: any
}

export default function Header({ transform_user, user }: HeaderConfig) {
    const history = useHistory()
    const [userData, setUserData] = useState<null | UserBasicConfig>(null)
    const [isMouse, setIsMouse] = useState(false)
    const getBasicUser = async () => {
        const token: string = getToken()
        if (token && !store.getState().user) {
            const res = await getBasicUserApi({});
            const userData: UserBasicConfig = res.data
            transform_user(userData)
            setUserData(user.user)
        }

        if (!store.getState().user) {
            errorToast('请先登录')
            history.push('/login')
        }
    }
    const exitLogin = () => {
        removeToken()
        successToast('退出登录成功')
        history.push('/login')
    }

    useEffect(() => {
        getBasicUser();
    }, [store.getState().user])
    return (
        <div className={`${stylePrefix}-layout`}>
            <div className={`${stylePrefix}-logo-layout`} >
                <img
                    src={logo}
                    alt="logo"
                    placeholder={loadingImage}
                    className={`${stylePrefix}-logo`}
                />
                <p className={`${stylePrefix}-logo-word`}>云家医</p>
            </div>
            <div
                className={`${stylePrefix}-user-layout`}
                onMouseOver={() => setIsMouse(true)}
                onMouseOut={() => setIsMouse(false)}
            >
                <img src={userData ? userData.avatar : '#'} alt="avatar" className={`${stylePrefix}-avatar`} />
                <IconFont
                    type='icon-xiabiao'
                    className={`${stylePrefix}-icon`}
                    style={{
                        color: isMouse ? '#000' : '#fff'
                    }}
                />
                <div
                    className={`${stylePrefix}-user-operation-layout`}
                    style={{
                        display: isMouse ? 'block' : 'none'
                    }}
                >
                    <p
                        className={`${stylePrefix}-user-operation-word`}
                        onClick={exitLogin}
                    >
                        退出登录
                    </p>
                </div>
            </div>
        </div>
    )
}
