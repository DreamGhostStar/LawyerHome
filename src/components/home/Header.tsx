import React, { useEffect, useState } from 'react'
import 'styles/home/header.scss'
import store from 'redux/store'
import { getToken, IconFont, removeToken, successToast, errorToast } from 'components/common/utils'
import { useHistory } from 'react-router-dom'
import { get_basic_user_info_api } from 'http/UserApi'

const stylePrefix = 'home-header'

export interface UserBasicConfig {
    avatar: string; // 头像
    name: string; // 真实姓名
    lawyer_number: string;
}

interface HeaderConfig {
    transform_user: (user: UserBasicConfig) => {
        type: string;
        data: UserBasicConfig;
    }
}

export default function Header({ transform_user }: HeaderConfig) {
    const history = useHistory()
    const [avatar, setAvatar] = useState(store.getState().user?.avatar)
    const [isMouse, setIsMouse] = useState(false)
    const getBasicUser = async () => {
        const token: string = getToken()
        if (token && !store.getState().user) {
            const res = await get_basic_user_info_api({});
            const tempUserData: UserBasicConfig = res.data
            console.log(tempUserData)
            setAvatar(tempUserData.avatar)
            transform_user(tempUserData)
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
    const gotoHome = () => {
        history.push('/home')
    }

    useEffect(() => {
        store.subscribe(()=>{
            getBasicUser();
        })
        getBasicUser();
    }, [])
    return (
        <div className={`${stylePrefix}-layout`}>
            <p className={`${stylePrefix}-title`} onClick={gotoHome}>律政云</p>
            <div
                className={`${stylePrefix}-user-layout`}
                onMouseOver={() => setIsMouse(true)}
                onMouseOut={() => setIsMouse(false)}
            >
                <img onClick={() => console.log(avatar)} src={avatar} alt="avatar" className={`${stylePrefix}-avatar`} />
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
