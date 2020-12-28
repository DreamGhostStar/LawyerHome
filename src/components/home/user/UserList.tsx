import React, { useEffect, useState } from 'react'
import 'styles/home/userList.scss'
import { Table, Button, Select, Space } from 'antd';
import { AuthorConfig, IndentifyConfig, errorToast, successToast, httpIsSuccess } from 'components/common/utils';
import { get_user_list_api, alter_user_identify_api, reset_user_password_api } from 'http/UserApi';
import { ColumnsType, TablePaginationConfig } from 'antd/lib/table';
import AlterUserInfoModal from './AlterUserInfoModal';
import md5 from 'md5';
import indentifyList from 'static/identify.json'
import { useHistory } from 'react-router-dom';
import AddUserInfoModel from './AddUserInfoModel';

const stylePrefix = 'home-userList'
const { Option } = Select;

export interface UserItemConfig {
    id: number;
    key: string;
    isMy: boolean;
    avatar: string;
    name: string;
    identify: IndentifyConfig;
}

export default function UserList() {
    const [loading, setLoading] = useState(false)
    const [userList, setUserList] = useState<UserItemConfig[]>([])
    const [current, setCurrent] = useState(1) // 当前page
    const [visible, setVisible] = useState(false) // 修改用户信息visible
    const [addVisible, setAddVisible] = useState(false) // 增加用户信息visible
    const [selectedUserID, setSelectedUserID] = useState<number | null>(null)
    const [num, setNum] = useState(0)
    const history = useHistory()
    // 修改用户身份
    const handleChange = async (userID: number, identifyID: number) => {
        const res = await alter_user_identify_api({
            userID: userID,
            identifyID: identifyID
        })
        httpIsSuccess(res.code) ? successToast('修改成功') : errorToast(res.message)
    }
    // 重置用户密码
    const resetPassword = async (id: number) => {
        const res = await reset_user_password_api({
            userID: id,
            password: md5('123456')
        })
        httpIsSuccess(res.code) ? successToast('重置密码成功') : errorToast(res.message)
    }
    const openModal = (userID: number) => {
        setSelectedUserID(userID)
        setVisible(true)
    }
    const gotoSalaryPage = (userID: number) => {
        history.push(`/salary/${userID}`);
    }
    const columns: ColumnsType<UserItemConfig> = [
        {
            title: '姓名',
            dataIndex: 'author',
            key: 'author',
            render: (_author: AuthorConfig, record: UserItemConfig) => {
                return (
                    <div className={`${stylePrefix}-author`}>
                        <img className={`${stylePrefix}-avatar`} src={record.avatar} alt="头像" />
                        <p className={`${stylePrefix}-realname`} >{record.name}</p>
                        {
                            record.isMy && <div className={`${stylePrefix}-tag`}>我</div>
                        }
                    </div>
                )
            },
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
                    onChange={(identifyID) => handleChange(record.id, identifyID)}
                >
                    {
                        indentifyList.map((identifyItem, index) => {
                            return <Option key={index} value={identifyItem.id}>{identifyItem.value}</Option>
                        })
                    }
                </Select>
            ),
            align: 'center'
        },
        {
            title: '操作',
            key: 'action',
            render: (text: UserItemConfig) => {
                return (
                    <Space size='large' >
                        <Button
                            type="primary"
                            onClick={() => openModal(text.id)}
                        >修改</Button>
                        <Button
                            type="primary"
                            onClick={() => resetPassword(text.id)}
                        >
                            重置密码
                        </Button>
                        <Button
                            onClick={() => gotoSalaryPage(text.id)}
                        >查看收入</Button>
                    </Space>
                )
            },
            align: 'center'
        },
    ];
    const getUserList = async () => {
        setLoading(true)
        const res = await get_user_list_api()
        if (httpIsSuccess(res.code)) {
            const userListTemp = res.data.map((userItem: any, index: number) => {
                return {
                    ...userItem,
                    key: index.toString()
                }
            })
            setNum(res.data.length)
            setUserList(userListTemp)
            setLoading(false)
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
    }, [getUserList])
    return (
        <div className={`${stylePrefix}-layout`} >
            <div className={`${stylePrefix}-header`}>
                <p>
                    <span className={`${stylePrefix}-title`} >用户总数：</span>
                    <span>{userList.length}</span>
                </p>
                <Button onClick={() => setAddVisible(true)} type="primary">增加账号</Button>
            </div>
            <Table
                loading={loading}
                className={`${stylePrefix}-table`}
                columns={columns}
                dataSource={userList}
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
                userID={selectedUserID}
                getUserList={getUserList}
                current={current}
            />
            <AddUserInfoModel
                visible={addVisible}
                setVisible={setAddVisible}
            />
        </div>
    )
}
