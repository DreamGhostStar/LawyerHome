import React, { useEffect, useState } from 'react'
import 'styles/home/userList.scss'
import { Table, Button, Select, Space } from 'antd';
import { AuthorConfig, IndentifyConfig, errorToast, successToast } from 'components/common/utils';
import { getIdentifyListApi, getUserListApi, resetPasswordApi, alterUserIdentifyApi } from 'http/UserApi';
import { TablePaginationConfig } from 'antd/lib/table';
import AlterUserInfoModal from './AlterUserInfoModal';
import md5 from 'md5';
import UserListModel from 'model/userList.json'

const stylePrefix = 'home-userList'
const { Option } = Select;

export interface UserItemConfig {
    key: string
    isMy: boolean
    author: AuthorConfig,
    username: string,
    phoneNumber: string,
    identify: IndentifyConfig
}

export default function UserList() {
    const [loading, setLoading] = useState(false)
    const [userList, setUserList] = useState<UserItemConfig[]>([])
    const [identifyList, setIdentifyList] = useState<IndentifyConfig[]>([])
    const [current, setCurrent] = useState(1)
    const [visible, setVisible] = useState(false)
    const [selectedUser, setSelectedUser] = useState<null | UserItemConfig>(null)
    const [num, setNum] = useState(0)
    const handleChange = async (userID: number, identifyID: number) => {
        // TODO: 修改用户身份
        const res = await alterUserIdentifyApi({
            userID: userID,
            identifyID: identifyID
        })
        res.code === 0 ? successToast('修改成功') : errorToast(res.message)
    }
    const resetPassword = async (id: number) => {
        const res = await resetPasswordApi({
            userID: id,
            password: md5('123456')
        })
        res.code === 0 ? successToast('重置密码成功') : errorToast(res.message)
    }
    const openModal = (user: UserItemConfig) => {
        setSelectedUser(user)
        setVisible(true)
    }
    const columns = [
        {
            title: '昵称',
            dataIndex: 'author',
            key: 'author',
            render: (author: AuthorConfig, record: UserItemConfig) => {
                return (
                    <div className={`${stylePrefix}-author`}>
                        <img className={`${stylePrefix}-avatar`} src={author.avatar} alt="头像" />
                        <p className={`${stylePrefix}-realname`} >{author.realname}</p>
                        {
                            record.isMy && <div className={`${stylePrefix}-tag`}>我</div>
                        }
                    </div>
                )
            },
        },
        {
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: '手机号',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: '身份',
            key: 'identify',
            dataIndex: 'identify',
            render: (indentify: IndentifyConfig, record: UserItemConfig) => (
                <Select
                    disabled={record.isMy}
                    defaultValue={indentify.id}
                    style={{ width: 120 }}
                    onChange={(identifyID) => handleChange(record.author.id, identifyID)}
                >
                    {
                        identifyList.map((identifyItem, index) => {
                            return <Option key={index} value={identifyItem.id}>{identifyItem.value}</Option>
                        })
                    }
                </Select>
            ),
        },
        {
            title: '操作',
            key: 'action',
            render: (text: UserItemConfig) => {
                return (
                    <Space size='large' >
                        <Button type="primary" onClick={() => openModal(text)} >修改</Button>
                        {
                            <Button
                                type="primary"
                                onClick={() => resetPassword(text.author.id)}
                            >
                                重置密码
                            </Button>
                        }
                    </Space>
                )
            },
        },
    ];
    const getUserList = async () => {
        setLoading(true)
        const res = await getUserListApi()
        if (res.code === 0) {
            const userListTemp = res.data.list.map((userItem: any, index: number) => {
                return {
                    ...userItem,
                    key: index.toString()
                }
            })
            setNum(res.data.list.length)
            setUserList(userListTemp)
            setLoading(false)
        } else {
            errorToast(res.message)
        }
    }
    const getIdentifyList = async () => {
        const res = await getIdentifyListApi();
        if (res.code === 0) {
            setIdentifyList(res.data)
        } else {
            errorToast(res.message)
        }
    }
    const handleTableChange = (pagination: TablePaginationConfig) => {
        if (pagination.current) {
            setCurrent(pagination.current)
        }
    };
    useEffect(() => {
        getUserList()
        getIdentifyList()
    }, [])
    return (
        <div className={`${stylePrefix}-layout`} >
            <Table
                loading={loading}
                className={`${stylePrefix}-table`}
                columns={columns} dataSource={userList}
                pagination={{
                    current: current,
                    pageSize: 10, // 一页多少项
                    total: num, // 总共多少项
                }}
                onChange={handleTableChange}
            />
            <AlterUserInfoModal
                visible={visible}
                setVisible={setVisible}
                user={selectedUser}
                getUserList={getUserList}
                current={current}
            />
        </div>
    )
}
