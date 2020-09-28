import React from 'react'
import 'styles/common/authorShow.scss'

const stylePrefix = 'common-author'

interface AuthorShowConfig {
    avatar: string
    realname: string
    createTime: string
}

export default function AuthorShow({ avatar, realname, createTime }: AuthorShowConfig) {
    return (
        <div className={`${stylePrefix}-author-layout`} >
            <img src={avatar} alt="头像" className={`${stylePrefix}-avatar`} />
            <div className={`${stylePrefix}-author-info`} >
                <p className={`${stylePrefix}-realname`} >{realname}</p>
                <p className={`${stylePrefix}-createTime`} >{createTime}</p>
            </div>
        </div>
    )
}
