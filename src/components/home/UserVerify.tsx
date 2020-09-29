import React, { useState, useEffect } from 'react'
import 'styles/home/userVerify.scss'
import { getUserVerifyListApi } from 'http/UserApi'
import { AuthorConfig, errorToast } from 'components/common/utils'
import Loading2 from 'components/common/Loading2'
import UserVerifyDetail from './UserVerifyDetail'
import AuthorShow from 'components/common/AuthorShow'

const stylePrefix = 'home-userverify'

interface UserVerifyItemConfig {
    id: number, // 审核ID
    author: AuthorConfig
    createTime: string, // 创建时间（距现在多久），如3个月前
    abstract: string, // 摘要30字
    firstPicture: string, // 第一张图片，如果没有则不传
}

export default function UserVerify() {
    const [loading, setLoading] = useState(false)
    const [userVerifyList, setUserVerifyList] = useState<UserVerifyItemConfig[]>([])
    const [visible, setVisible] = useState(false)
    const [verifyID, setVerifyID] = useState<null | number>(null)

    const getUserVerifyList = async () => {
        setLoading(true)
        const res = await getUserVerifyListApi()
        if (res.code === 0) {
            setUserVerifyList(res.data)
        } else {
            errorToast(res.message)
        }

        setLoading(false)
    }
    const openModal = (id: number) => {
        setVisible(true)
        setVerifyID(id)
    }
    useEffect(() => {
        getUserVerifyList()
    }, [])
    return (
        <div className={`${stylePrefix}-layout`} >
            {
                loading
                    ? <Loading2 backgroundColor='#fff' />
                    : userVerifyList.map((userVerifyItem, index) => {
                        return <div
                            key={index}
                            className={`${stylePrefix}-user-verify-item`}
                            onClick={() => openModal(userVerifyItem.id)}
                        >
                            <div className={`${stylePrefix}-user-verify-item-main`}>
                                <AuthorShow
                                    avatar={userVerifyItem.author.avatar}
                                    realname={userVerifyItem.author.realname}
                                    createTime={userVerifyItem.createTime}
                                />
                                <p className={`${stylePrefix}-abstract`}>{userVerifyItem.abstract}</p>
                            </div>
                            {
                                userVerifyItem.firstPicture &&
                                <img src={userVerifyItem.firstPicture} alt="图片" className={`${stylePrefix}-picture`} />
                            }
                        </div>
                    })
            }
            <UserVerifyDetail
                visible={visible}
                setVisible={setVisible}
                verifyID={verifyID}
                getUserVerifyList={getUserVerifyList}
            />
        </div>
    )
}
