import { Button, Input, Modal } from 'antd'
import { errorToast, httpIsSuccess, successToast } from 'components/common/utils'
import { add_request_api } from 'http/Case'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
interface SendMessageModalConfig {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    requestID: number;
}

export default function SendMessageModal({ 
    visible, 
    setVisible, 
    requestID 
}: SendMessageModalConfig) {
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const [value, setValue] = useState('')
    const handleOk = async () => {
        setLoading(true)
        const res = await add_request_api({
            requestID,
            message: value,
            isAgree: false
        })
        if (httpIsSuccess(res.code)) {
            setVisible(false)
            successToast('提交成功')
            history.goBack()
        } else {
            errorToast(res.message)
        }
        setLoading(false)
    }
    const handleCancel = () => {
        setVisible(false)
    }
    return (
        <Modal
            visible={visible}
            title="建议"
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    返回
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    loading={loading}
                    onClick={handleOk}
                >
                    提交
                </Button>,
            ]}
        >
            <Input
                value={value}
                placeholder="请输入你想向主办人的意见（可为空）"
                onChange={(e) => setValue(e.target.value)}
            />
        </Modal>
    )
}
