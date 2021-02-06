// 归档请求
import { Button, Popover, Space, Table } from 'antd'
import { ColumnsType, TablePaginationConfig } from 'antd/lib/table'
import { IconFont } from 'components/common/config'
import { errorToast, httpIsSuccess } from 'components/common/utils'
import { get_request_list_api } from 'http/Case'
import React, { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import 'styles/home/userList.scss'
const stylePrefix = 'home-userList'
interface MessageItemConfig { // 归档列表项
    id: number;
    name: string;
    host: string;
    assistant: string[];
    requestID: number;
};

export default function RequestList() {
    const [loading, setLoading] = useState(false)
    const [caseList, setCaseList] = useState<MessageItemConfig[]>([])
    const [current, setCurrent] = useState(1) // 当前page
    const [num, setNum] = useState(0)
    const history = useHistory()
    // 进入归档请求页面
    const gotoRequest = (requestID: number) => {
        history.push(`/request/${requestID}`)
    }
    const buildTipContent = (assistant: string[]) => {
        return <div>
            {
                assistant.map((item, index) => {
                    return <p
                        style={{
                            margin: 0
                        }}
                        key={index}
                    >{item}</p>
                })
            }
        </div>
    }
    const columns: ColumnsType<MessageItemConfig> = [
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            render: (name: string) => {
                return (
                    <div className={`${stylePrefix}-author`}>
                        <p className={`${stylePrefix}-realname`} >{name}</p>
                    </div>
                )
            },
        },
        {
            title: '主办人',
            dataIndex: 'host',
            key: 'host',
            render: (host: string) => {
                return (
                    <p className={`${stylePrefix}-realname`} >{host}</p>
                )
            },
        },
        {
            title: '协办人',
            key: 'assistant',
            dataIndex: 'assistant',
            render: (assistant: string[]) => (
                <Popover
                    content={buildTipContent(assistant)}
                    title='协办人列表'
                    trigger="hover"
                >
                    <IconFont type='iconyanjing' className={`${stylePrefix}-icon`} />
                </Popover>
            ),
            align: 'center'
        },
        {
            title: '操作',
            key: 'action',
            render: (text: MessageItemConfig) => {
                return (
                    <Space size='large' >
                        <Button
                            type="primary"
                            onClick={() => gotoRequest(text.requestID)}
                        >查看详情</Button>
                    </Space>
                )
            },
            align: 'center'
        },
    ];
    const getRequestList = useCallback(async () => {
        setLoading(true)
        const res = await get_request_list_api()
        if (httpIsSuccess(res.code)) {
            const userListTemp = res.data.map((caseItem: MessageItemConfig, index: number) => {
                return {
                    ...caseItem,
                    key: index
                }
            })
            setNum(res.data.length)
            setCaseList(userListTemp)
            setLoading(false)
        } else {
            errorToast(res.message)
        }
    }, [])
    const handleTableChange = (pagination: TablePaginationConfig) => {
        if (pagination.current) {
            setCurrent(pagination.current)
        }
    };
    useEffect(() => {
        getRequestList()
    }, [getRequestList])
    return (
        <div className={`${stylePrefix}-layout`} >
            <Table
                loading={loading}
                className={`${stylePrefix}-table`}
                columns={columns}
                dataSource={caseList}
                pagination={{
                    current: current,
                    pageSize: 10, // 一页多少项
                    total: num, // 总共多少项
                }}
                onChange={handleTableChange}
            />
        </div>
    )
}
