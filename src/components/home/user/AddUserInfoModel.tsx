import { Button, DatePicker, Input, InputNumber, Radio, Select } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import { IconFont } from 'components/common/config'
import { errorToast, httpIsSuccess, successToast } from 'components/common/utils'
import { add_new_user_api, upload_file_api } from 'http/UserApi'
import React, { ChangeEvent, useRef, useState } from 'react'
import 'styles/home/addUserInfoModal.scss'
const stylePrefix = 'home-addUserModel'
const { Option } = Select;

interface AddUserInfoModelConfig {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    getUserList: () => Promise<void>;
}

export default function AddUserInfoModel({ visible, setVisible, getUserList }: AddUserInfoModelConfig) {
    const [loading, setLoading] = useState(false)
    const [identify, setIdentify] = useState('common_lawyer') // 律师、管理员身份选择器
    const [lawyerNumber, setLawyerNumber] = useState('') // 律师证号
    const [identifyNumber, setIdentifyNumber] = useState('') // 身份证号码
    const [name, setName] = useState('') // 真实姓名
    const [img, setImg] = useState<string | null>(null) // 头像
    const [qualificationsNumber, setQualificationsNumber] = useState('') // 法律资格证号
    const [phone, setPhone] = useState('') // 电话号码
    const [startTime, setStartTime] = useState('') // 职业开始时间
    const [age, setAge] = useState<number>(1) // 年龄
    const [sex, setSex] = useState('男') // 性别
    const fileInput = useRef<HTMLInputElement>(null)
    const handleCancel = () => {
        setVisible(false)
        clear()
    }
    const handleOk = async () => {
        if (img) {
            setLoading(true)
            const res = await add_new_user_api({
                identify,
                lawyerNumber,
                identifyNumber,
                name,
                avatar: img,
                qualificationsNumber,
                phone,
                startTime,
                age,
                sex
            })
            if (httpIsSuccess(res.code)) {
                successToast('操作成功')
                setVisible(false)
                clear()
                getUserList()
            } else {
                errorToast(res.message)
            }
            setLoading(false)
        }
    }
    // 清除数据
    const clear = () => {
        setIdentify('')
        setLawyerNumber('')
        setName('')
        setIdentifyNumber('')
        setQualificationsNumber('')
        setPhone('')
        setImg(null)
        setStartTime('')
    }
    // 处理时间选择
    const onChange = (date: any, _dateString: any) => {
        const selectDate = new Date(date._d);
        setStartTime(selectDate.getTime().toString())
    }
    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files) {
            const uploadFile = Array.from(files)[0]
            const formData = new FormData()
            formData.append(uploadFile.name, uploadFile)
            const res = await upload_file_api(formData);
            if (httpIsSuccess(res.code)) {
                setImg(res.data)
            } else {
                errorToast(res.message)
            }
        }
    }
    // 处理年龄的变化
    const handleAge = (value: string | number | undefined) => {
        if (value !== undefined) {
            if (typeof value === 'string') {
                setAge(parseInt(value))
            } else {
                setAge(value)
            }
        }
    }
    // TODO: 正则检验
    return (
        <Modal
            visible={visible}
            title="修改用户信息"
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    返回
                </Button>,
                <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                    提交
                </Button>,
            ]}
        >
            <>
                <div className={`${stylePrefix}-radio-layout`} >
                    <Radio.Group
                        onChange={(e) => setIdentify(e.target.value)}
                        value={identify}
                    >
                        <Radio value='common_lawyer'>律师</Radio>
                        <Radio value='administrator'>管理员</Radio>
                    </Radio.Group>
                </div>
                <Input
                    value={lawyerNumber}
                    placeholder='律师证号'
                    onChange={(e) => setLawyerNumber(e.target.value)}
                    className={`${stylePrefix}-input`}
                />
                <Input
                    value={identifyNumber}
                    placeholder='身份证号'
                    onChange={(e) => setIdentifyNumber(e.target.value)}
                    className={`${stylePrefix}-input`}
                />
                <InputNumber
                    min={1}
                    defaultValue={undefined}
                    placeholder='年龄'
                    max={200}
                    onChange={handleAge}
                    className={`${stylePrefix}-input`}
                />
                <Select
                    defaultValue="男"
                    style={{
                        display: 'block',
                        width: 120
                    }}
                    className={`${stylePrefix}-input`}
                    onChange={(value) => setSex(value)}
                >
                    <Option value="男">男</Option>
                    <Option value="女">女</Option>
                </Select>
                <Input
                    value={name}
                    placeholder='姓名'
                    onChange={(e) => setName(e.target.value)}
                    className={`${stylePrefix}-input`}
                />
                <Input
                    value={qualificationsNumber}
                    placeholder='法律资格证号'
                    onChange={(e) => setQualificationsNumber(e.target.value)}
                    className={`${stylePrefix}-input`}
                />
                <Input
                    value={phone}
                    placeholder='电话号码'
                    onChange={(e) => setPhone(e.target.value)}
                    className={`${stylePrefix}-input`}
                />
                <div className={`${stylePrefix}-datatime-layout`} >
                    <p className={`${stylePrefix}-datatime-title`} >职业起始时间：</p>
                    <DatePicker
                        onChange={onChange}
                        className={`${stylePrefix}-datatime-main`}
                    />
                </div>
                <div>
                    <input
                        type="file"
                        style={{
                            display: 'none'
                        }}
                        ref={fileInput}
                        onChange={handleFileChange}
                    />
                    <div className={`${stylePrefix}-avatar-layout`} >
                        <p className={`${stylePrefix}-avatar-title`} >头像：</p>
                        {
                            img
                                ? <img
                                    src={img}
                                    alt=""
                                    className={`${stylePrefix}-avatar-main`}
                                    onClick={() => fileInput.current?.click()}
                                />
                                : <div
                                    className={`${stylePrefix}-avatar-main`}
                                    onClick={() => fileInput.current?.click()}
                                >
                                    <IconFont
                                        type='iconjia'
                                        className={`${stylePrefix}-avatar-icon`}
                                    />
                                </div>
                        }
                    </div>
                </div>
            </>
        </Modal>
    )
}
