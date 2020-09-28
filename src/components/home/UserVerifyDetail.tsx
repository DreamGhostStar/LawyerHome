import { Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { AuthorConfig } from 'components/common/utils'
import AuthorShow from 'components/common/AuthorShow'
import Loading2 from 'components/common/Loading2'
import { getUserVerifyDetailApi } from 'http/UserApi'
import 'styles/home/userVerifyDetail.scss'

const stylePrefix = 'home-verifyDetail'

interface UserVerifyDetailConfig {
    visible: boolean
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
    verifyID: number | null
}

interface UserVerifyDetailDataConfig {
    author: AuthorConfig,
    createTime: string, // 创建时间，3个月前
    content: string, // 内容
    files: string[]
}

export default function UserVerifyDetail({ visible, setVisible, verifyID }: UserVerifyDetailConfig) {
    const [verifyDetail, setVerifyDetail] = useState<UserVerifyDetailDataConfig | null>(null)
    const [loading, setLoading] = useState(false)
    const handleCancel = () => {
        setVisible(false)
    }
    const getVerifyDetail = async () => {
        if (verifyID !== null) {
            setLoading(true)
            const res = await getUserVerifyDetailApi({
                id: verifyID
            })
            if (res.code === 0) {
                setLoading(false)
                setVerifyDetail(res.data)
            }
        }
    }
    useEffect(() => {
        getVerifyDetail()
    }, [verifyID])
    return (
        <Modal
            visible={visible}
            title="用户审核详情"
            onCancel={handleCancel}
            footer={[]}
        >
            {
                loading
                    ? <Loading2 />
                    : verifyDetail && <>
                        <AuthorShow
                            avatar={verifyDetail.author.avatar}
                            realname={verifyDetail.author.realname}
                            createTime={verifyDetail.createTime}
                        />
                        <p className={`${stylePrefix}-content`} >{verifyDetail.content}</p>
                        <div className={`${stylePrefix}-image-layout`}>
                            {
                                verifyDetail.files.map((file, index) => {
                                    return <img
                                        key={index}
                                        src={file}
                                        className={`${stylePrefix}-image`}
                                        alt="图片"
                                    />
                                })
                            }
                        </div>
                    </>
            }
        </Modal>
    )
}
