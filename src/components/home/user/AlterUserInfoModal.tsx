import { Button, Input, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import 'styles/home/alterUserInfoModal.scss'
import { alter_user_info_api, get_user_detail_info_api, IAlterUserInfo } from 'http/UserApi'
import { errorToast, httpIsSuccess, successToast } from 'components/common/utils'
import Loading2 from 'components/common/Loading2'

const stylePrefix = 'home-alterUser'

interface AlterUserInfoModalConfig {
    visible: boolean
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
    userID: number | null;
    getUserList: (page: number) => Promise<void>
    current: number
}

export interface UserDetailConfig {
    name?: string;
    phoneNumber?: string;
    weixin_number?: string;
    lawyer_number?: string;
}

export default function AlterUserInfoModal({ visible, setVisible, userID, getUserList, current }: AlterUserInfoModalConfig) {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState<UserDetailConfig | null>(null)
    const handleOk = async () => {
        if (user && user.name && user.phoneNumber && user.lawyer_number && user.weixin_number) {
            setLoading(true)
            const res = await alter_user_info_api((user as IAlterUserInfo))
            if (httpIsSuccess(res.code)) {
                getUserList(current)
                successToast('修改成功')
            } else {
                errorToast(res.message)
            }
            setVisible(false)
            setLoading(false)
        }
    }
    // 处理输入框变化
    const handleInput = (key: string, value: string) => {
        if (user) {
            setUser({
                ...user,
                [key]: value
            })
        }
    }
    // 获取用户详细信息
    const getUserDetail = async () => {
        if (userID !== null) {
            const res = await get_user_detail_info_api({ userID });
            if (httpIsSuccess(res.code)) {
                setUser(res.data)
            } else {
                errorToast(res.message)
            }
        }
    }
    const handleCancel = () => {
        setVisible(false)
    }
    useEffect(() => {
        getUserDetail()
    }, [userID])
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
                user ? <>
                    <Input
                        value={user.name || ''}
                        placeholder='姓名'
                        onChange={(e) => handleInput('name', e.target.value)}
                        className={`${stylePrefix}-input`}
                    />
                    <Input
                        value={user.phoneNumber || ''}
                        placeholder='手机号'
                        onChange={(e) => handleInput('phoneNumber', e.target.value)}
                        className={`${stylePrefix}-input`}
                    />
                    <Input
                        value={user.lawyer_number || ''}
                        placeholder='律师证号'
                        onChange={(e) => handleInput('lawyer_number', e.target.value)}
                        className={`${stylePrefix}-input`}
                    />
                    <Input
                        value={user.weixin_number || ''}
                        placeholder='微信号'
                        onChange={(e) => handleInput('weixin_number', e.target.value)}
                        className={`${stylePrefix}-input`}
                    />
                </>
                    : <Loading2 />
            }
        </Modal>
    )
}
