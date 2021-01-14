import { Button } from 'antd'
import LoadingWidget from 'components/common/LoadingWidget'
import { errorToast, httpIsSuccess, successToast } from 'components/common/utils'
import SendMessageModal from 'components/request/SendMessageModal'
import HeaderContainer from 'containers/HeaderContainer'
import { add_request_api, get_request_detail_api } from 'http/Case'
import React, { useEffect, useState } from 'react'
import FileViewer from 'react-file-viewer'
import { Provider } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import store from 'redux/store'
import 'styles/pages/request.scss'
const stylePrefix = 'page-request'
interface requestDetailConfig {
    caseID: number;
    type: string;
    url: string;
}
interface paramsConfig {
    id: string;
}

export default function Request() {
    const params = useParams<paramsConfig>()
    const [visible, setVisible] = useState(false)
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const requestID = params.id
    const [requestDetail, setRequestDetail] = useState<requestDetailConfig | null>(null)
    const getRequestDetail = async () => {
        setLoading(true)
        console.log(parseInt(requestID))
        const res = await get_request_detail_api({
            requestID: parseInt(requestID)
        })
        if (httpIsSuccess(res.code)) {
            setRequestDetail(res.data)
        } else {
            errorToast(res.message)
        }
        setLoading(false)
    }
    const agreeRequest = async () => {
        const res = await add_request_api({
            requestID: parseInt(requestID),
            isAgree: true,
            message: ''
        })
        if (httpIsSuccess(res.code)) {
            successToast('提交成功')
            history.goBack()
        } else {
            errorToast(res.message)
        }
    }
    useEffect(() => {
        getRequestDetail()
    }, [requestID])
    return (
        <div className={`${stylePrefix}-layout`}>
            <Provider store={store} >
                <HeaderContainer title='代理词' />
            </Provider>
            <LoadingWidget loading={loading}>
                <div className={`${stylePrefix}-main`}>
                    {
                        requestDetail &&
                        <FileViewer
                            fileType={requestDetail.type}
                            filePath={requestDetail.url}
                        />
                    }
                    <div className={`${stylePrefix}-button-layout`}>
                        <Button
                            className={`${stylePrefix}-button`}
                            type='primary'
                            onClick={() => agreeRequest()}
                        >同意</Button>
                        <Button
                            className={`${stylePrefix}-button`}
                            onClick={() => history.goBack()}
                        >暂定</Button>
                        <Button
                            className={`${stylePrefix}-button`}
                            type='primary'
                            danger
                            onClick={() => setVisible(true)}
                        >不同意</Button>
                    </div>
                </div>
            </LoadingWidget>
            <SendMessageModal
                visible={visible}
                setVisible={setVisible}
                requestID={parseInt(requestID)}
            />
        </div>
    )
}
