import React, { useState, useEffect } from 'react'
import 'styles/home/userVerify.scss'
import { getUserVerifyListApi } from 'http/UserApi'
import { AuthorConfig, errorToast } from 'components/common/utils'
import Loading2 from 'components/common/Loading2'

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
                        >
                            <div className={`${stylePrefix}-user-verify-item-main`}>
                                <div className={`${stylePrefix}-author-layout`} >
                                    <img src={userVerifyItem.author.avatar} alt="头像" className={`${stylePrefix}-avatar`} />
                                    <div className={`${stylePrefix}-author-info`} >
                                        <p className={`${stylePrefix}-realname`} >{userVerifyItem.author.realname}</p>
                                        <p className={`${stylePrefix}-createTime`} >{userVerifyItem.createTime}</p>
                                    </div>
                                </div>
                                <p className={`${stylePrefix}-abstract`}>{userVerifyItem.abstract}</p>
                            </div>
                            <img src={userVerifyItem.firstPicture} alt="图片" className={`${stylePrefix}-picture`} />
                        </div>
                    })
            }
        </div>
    )
}
