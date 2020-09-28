import { Button, Input, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { UserItemConfig } from './UserList'
import 'styles/home/alterUserInfoModal.scss'

const stylePrefix = 'home-alterUser'

interface AlterUserInfoModalConfig {
    visible: boolean
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
    user: UserItemConfig | null
    getUserList: () => Promise<void>
}

export default function AlterUserInfoModal({ visible, setVisible, user, getUserList }: AlterUserInfoModalConfig) {
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState(user?.username)
    const [realname, setRealname] = useState(user?.author.realname)
    const [phone, setPhone] = useState(user?.phoneNumber)
    const handleOk = () => {
        setLoading(true)

        console.log(username, realname, phone);
        // TODO: 修改用户信息
        setTimeout(() => {
            setVisible(false)
            setLoading(false)
            getUserList()
        }, 2000);
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
            title="Title"
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
