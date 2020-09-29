import React, { useState, useEffect } from 'react'
import 'styles/home/errorList.scss'
import { AuthorConfig, errorToast, IndentifyConfig } from 'components/common/utils'
import ErrorListModel from 'model/errorList.json'
import 'styles/home/errorList.scss'
import Loading2 from 'components/common/Loading2'
import AuthorShow from 'components/common/AuthorShow'
import { Radio, Button } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio'
import { getIdentifyListApi } from 'http/UserApi'

const stylePrefix = 'home-error'

interface ErrorItem {
    id: number, // 错误单项ID
    author: AuthorConfig,
    createTime: string, // 创建时间
    abstract: string, // 摘要30字
}

export default function ErrorList() {
    const [loading, setLoading] = useState(false)
    const [errorList, setErrorList] = useState<ErrorItem[]>([])
    const [radioIdentifyID, setRadioIdentifyID] = useState(-1)
    const [currentPage, setCurrentPage] = useState(1)
    const [pageNum, setPageNum] = useState(1)
    const [identifyList, setIdentifyList] = useState<IndentifyConfig[]>([])
    const getErrorList = async (page: number) => {
        setLoading(true)
        setTimeout(() => {
            setErrorList(ErrorListModel.list)
            setPageNum(ErrorListModel.page)
            setLoading(false)
        }, 2000);
    }
    const getIdentifyList = async () => {
        const res = await getIdentifyListApi();
        if (res.code === 0) {
            setIdentifyList(res.data)
        } else {
            errorToast(res.message)
        }
    }
    const onChange = (e: RadioChangeEvent) => {
        setRadioIdentifyID(e.target.value)
        setCurrentPage(1)
    }
    useEffect(() => {
        getErrorList(currentPage)
        getIdentifyList()
    }, [currentPage || radioIdentifyID])
    return (
        <div className={`${stylePrefix}-layout`} >
            <Radio.Group className={`${stylePrefix}-radio-group`} onChange={onChange} value={radioIdentifyID}>
                <Radio value={-1}>全部</Radio>
                {
                    identifyList.map((identifyItem, index) => {
                        return <Radio
                            key={index}
                            value={identifyItem.id}
                        >
                            {identifyItem.value}
                        </Radio>
                    })
                }
            </Radio.Group>
            {
                loading
                    ? <Loading2 backgroundColor='#fff' />
                    :
                    errorList.map((errorItem, index) => {
                        return <div
                            key={index}
                            className={`${stylePrefix}-errorItem-layout`}
                        >
                            <AuthorShow
                                avatar={errorItem.author.avatar}
                                realname={errorItem.author.realname}
                                createTime={errorItem.createTime}
                            />
                            <p className={`${stylePrefix}-abstract`} >{errorItem.abstract}</p>
                        </div>
                    })
            }
            <div className={`${stylePrefix}-btn-layout`}>
                <Button size='large' onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} >Previous</Button>
                <Button size='large' onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === pageNum} >Next</Button>
            </div>
        </div>
    )
}
