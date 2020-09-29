import { Modal, Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { AuthorConfig, successToast, errorToast } from 'components/common/utils'
import AuthorShow from 'components/common/AuthorShow'
import Loading2 from 'components/common/Loading2'
import { getUserVerifyDetailApi, submitUserVerifyResultApi } from 'http/UserApi'
import 'styles/home/userVerifyDetail.scss'

const stylePrefix = 'home-verifyDetail'

interface UserVerifyDetailConfig {
    visible: boolean
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
    verifyID: number | null
    getUserVerifyList: () => Promise<void>
}

interface UserVerifyDetailDataConfig {
    author: AuthorConfig,
    createTime: string, // 创建时间，3个月前
    content: string, // 内容
    files: string[]
}

export default function UserVerifyDetail({ visible, setVisible, verifyID, getUserVerifyList }: UserVerifyDetailConfig) {
    const [verifyDetail, setVerifyDetail] = useState<UserVerifyDetailDataConfig | null>(null)
    const [loading, setLoading] = useState(false)
    const handleCancel = () => {
        setVisible(false)
        getUserVerifyList()
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
    const submit = async (result: boolean) => {
        if (verifyID) {
            const res = await submitUserVerifyResultApi({
                id: verifyID,
                isAgree: result
            })
            if (res.code === 0) {
                successToast(res.message)
            } else {
                errorToast(res.message)
            }
            handleCancel()
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
                        <div className={`${stylePrefix}-btn-layout`} >
                            <Button type="primary" onClick={() => submit(true)} >同意审核</Button>
                            <Button type="primary" danger onClick={() => submit(false)} >不同意审核</Button>
                        </div>
                    </>
            }
        </Modal>
    )
}
