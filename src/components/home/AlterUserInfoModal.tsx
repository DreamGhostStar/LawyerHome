import { Button, Input, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { UserItemConfig } from './UserList'
import 'styles/home/alterUserInfoModal.scss'
import { alterUserApi } from 'http/UserApi'
import { errorToast, successToast } from 'components/common/utils'

const stylePrefix = 'home-alterUser'

interface AlterUserInfoModalConfig {
    visible: boolean
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
    user: UserItemConfig | null
    getUserList: (page: number) => Promise<void>
    current: number
}

export default function AlterUserInfoModal({ visible, setVisible, user, getUserList, current }: AlterUserInfoModalConfig) {
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState(user?.username)
    const [realname, setRealname] = useState(user?.author.realname)
    const [phone, setPhone] = useState(user?.phoneNumber)
    const handleOk = async () => {
        if (user && username && realname && phone) {
            setLoading(true)
            const res = await alterUserApi({
                userID: user?.author.id,
                username: username,
                realname: realname,
                phoneNumber: phone
            })
            if (res.code === 0) {
                getUserList(current)
                successToast('修改成功')
            } else {
                errorToast(res.message)
            }
            setVisible(false)
            setLoading(false)
        }
    }
    const handleCancel = () => {
        setVisible(false)
    }
    const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }
    const handleRealname = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRealname(e.target.value)
    }
    const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value)
    }
    useEffect(() => {
        setRealname(user?.author.realname)
        setUsername(user?.username)
        setPhone(user?.phoneNumber)
    }, [user])
    return (
        <Modal
            visible={visible}
            title="修改用户信息"
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    返回
                </Button>,
                <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                    提交
                </Button>,
            ]}
        >
            {
                user && <>
                    <Input value={username} onChange={handleUsername} className={`${stylePrefix}-input`} />
                    <Input value={realname} onChange={handleRealname} className={`${stylePrefix}-input`} />
                    <Input value={phone} onChange={handlePhone} className={`${stylePrefix}-input`} />
                </>
            }
        </Modal>
    )
}
