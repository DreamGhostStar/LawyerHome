import React, { useEffect, useState } from 'react'
import 'styles/home/userList.scss'
import { Table, Button, Select, Space } from 'antd';
import userListModel from 'model/userList.json'
import { AuthorConfig, IndentifyConfig, errorToast, successToast } from 'components/common/utils';
import { getIdentifyListApi, getUserListApi } from 'http/UserApi';
import { TablePaginationConfig } from 'antd/lib/table';
import AlterUserInfoModal from './AlterUserInfoModal';

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
    const [pageNum, setPageNum] = useState(1)
    const [current, setCurrent] = useState(1)
    const [visible, setVisible] = useState(false)
    const [selectedUser, setSelectedUser] = useState<null | UserItemConfig>(null)
    const handleChange = (id: number) => {
        // TODO: 修改用户身份
        console.log(id);
    }
    const deleteUser = (id: number) => {
        // TODO: 重新获取用户列表
        // TODO: 删除用户
        successToast(`删除${id}成功`)
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
            render: (indentify: IndentifyConfig) => (
                <Select defaultValue={indentify.id} style={{ width: 120 }} onChange={handleChange}>
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
                            !text.isMy && <Button
                                type="primary"
                                danger
                                onClick={() => deleteUser(text.author.id)}
                            >
                                删除
                            </Button>
                        }
                    </Space>
                )
            },
        },
    ];
    const getUserList = async () => {
        setLoading(true)
        // const res = await getUserListApi({
        //     page: current
        // })
        // if (res.code === 0) {
        const userListTemp = userListModel.list.map((userItem, index) => {
            return {
                ...userItem,
                key: index.toString()
            }
        })
        setPageNum(userListModel.page)
        setUserList(userListTemp)
        setLoading(false)
        // } else {
        //     errorToast(res.message)
        // }
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
            // TODO: 重新获取用户列表
            getUserList()
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
                    total: pageNum * 10, // 总共多少项
                }}
                onChange={handleTableChange}
            />
            <AlterUserInfoModal
                visible={visible}
                setVisible={setVisible}
                user={selectedUser}
                getUserList={getUserList}
            />
        </div>
    )
}
