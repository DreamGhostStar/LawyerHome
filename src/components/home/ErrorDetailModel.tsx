import React, { useState, useEffect } from 'react'
import { Modal } from 'antd'
import AuthorShow from 'components/common/AuthorShow'
import { AuthorConfig, errorToast } from 'components/common/utils'
import Loading2 from 'components/common/Loading2'
import errorDetailModel from 'model/errorDetail.json'
import 'styles/home/errorDetailModal.scss'
import { getErrorDetailApi } from 'http/ErrorMessageApi'

const stylePrefix = 'home-errorDetail'

interface ErrorDetailConfig {
    visible: boolean
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
    errorID: number | null
}

interface ErrorDetailDataConfig {
    author: AuthorConfig,
    createTime: string, // 创建时间，3个月前
    content: string, // 内容
    files: string[]
}

export default function ErrorDetailModel({ visible, setVisible, errorID }: ErrorDetailConfig) {
    const [errorDetail, setErrorDetail] = useState<ErrorDetailDataConfig | null>(null)
    const [loading, setLoading] = useState(false)
    const handleCancel = () => {
        setVisible(false)
    }
    const getErrorDetail = async () => {
        if (errorID === null) {
            return
        }
        setLoading(true)
        const res = await getErrorDetailApi({
            errorID: errorID
        })
        if (res.code === 0) {
            setErrorDetail(res.data)
        } else {
            errorToast(res.message)
        }
        setLoading(false)
    }
    useEffect(() => {
        getErrorDetail()
    }, [errorID])
    return (
        <Modal
            visible={visible}
            title="查看错误详情"
            onCancel={handleCancel}
            footer={[]}
        >
            {
                loading
                    ? <Loading2 />
                    : <>
                        {
                            errorDetail && <AuthorShow
                                avatar={errorDetail.author.avatar}
                                realname={errorDetail.author.realname}
                                createTime={errorDetail.createTime}
                            />
                        }
                        <p className={`${stylePrefix}-content`} >{errorDetail?.content}</p>
                        <div className={`${stylePrefix}-img-layout`} >
                            {
                                errorDetail && errorDetail.files.map((file, index) => {
                                    return <img
                                        className={`${stylePrefix}-img`}
                                        key={index}
                                        src={file}
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
