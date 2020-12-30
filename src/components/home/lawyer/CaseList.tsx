import React, { useCallback, useEffect, useState } from 'react'
import 'styles/home/userList.scss'
import { Table, Button, Space } from 'antd';
import { errorToast, httpIsSuccess } from 'components/common/utils';
import { ColumnsType, TablePaginationConfig } from 'antd/lib/table';
import { useHistory } from 'react-router-dom';
import { get_case_list_api } from 'http/Case';
import Tag from 'components/common/Tag';
import caseTypeMap from 'static/caseTypeTagMap.json'
import caseTrialMap from 'static/caseTrialTagMap.json'

const stylePrefix = 'home-userList'

export interface CaseItemConfig {
    id: number;
    key: number;
    name: string;
    type: string;
    trial: string;
    host: string;
}
type ModalType = 'alter' | 'delete' | 'add' // 按钮跳转的类型

export default function CaseList() {
    const [loading, setLoading] = useState(false)
    const [caseList, setCaseList] = useState<CaseItemConfig[]>([])
    const [current, setCurrent] = useState(1) // 当前page
    const [num, setNum] = useState(0)
    const history = useHistory()
    const openModal = (id: number | null, type: ModalType) => {
        if (id === null) {
            history.push('/case')
            return;
        }

        if (type === 'alter') {
            history.push(`/case/${id}`)
            return;
        }
    }
    const columns: ColumnsType<CaseItemConfig> = [
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            render: (name: string, _record: CaseItemConfig) => {
                return (
                    <div className={`${stylePrefix}-author`}>
                        <p className={`${stylePrefix}-realname`} >{name}</p>
                    </div>
                )
            },
        },
        {
            title: '类型',
            key: 'type',
            dataIndex: 'type',
            render: (type: string) => (
                <Tag
                    text={type}
                    type={caseTypeMap[type]}
                />
            ),
            align: 'center'
        },
        {
            title: '申级',
            key: 'trial',
            dataIndex: 'trial',
            render: (trial: string) => (
                <Tag
                    text={trial}
                    type={caseTrialMap[trial]}
                />
            ),
            align: 'center'
        },
        {
            title: '操作',
            key: 'action',
            render: (text: CaseItemConfig) => {
                return (
                    <Space size='large' >
                        <Button
                            type="primary"
                            onClick={() => openModal(text.id, 'alter')}
                        >修改</Button>
                        <Button
                            type="primary"
                            danger
                        // onClick={() => gotoSalaryPage(text.id)}
                        >删除</Button>
                    </Space>
                )
            },
            align: 'center'
        },
    ];
    const getCaseList = useCallback(async () => {
        setLoading(true)
        const res = await get_case_list_api()
        if (httpIsSuccess(res.code)) {
            const userListTemp = res.data.map((caseItem: any, index: number) => {
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
        getCaseList()
    }, [getCaseList])
    return (
        <div className={`${stylePrefix}-layout`} >
            <div className={`${stylePrefix}-header`}>
                <p>
                    <span className={`${stylePrefix}-title`} >案件总数：</span>
                    <span>{caseList.length}</span>
                </p>
                <Button onClick={() => openModal(null, 'add')} type="primary">增加案件</Button>
            </div>
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
