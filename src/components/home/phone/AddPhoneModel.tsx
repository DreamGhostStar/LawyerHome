import { Button, Input, Modal, Select } from 'antd'
import { errorToast, httpIsSuccess, successToast } from 'components/common/utils';
import { add_unit_phone_api, alter_unit_phone_api } from 'http/Phone';
import React, { useEffect, useState } from 'react'
import 'styles/phone/addPhoneModel.scss'
import { DailyPhoneType, PhoneConfig, UnitConfig } from './DailyPhoneList';
const { Option } = Select;
const stylePrefix = 'phone-addPhoneModel'
interface AddPhoneModelConfig {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    selectID: number | null;
    currentID: number | null;
    editObj: PhoneConfig | UnitConfig | null;
    setEditObj: React.Dispatch<React.SetStateAction<PhoneConfig | UnitConfig | null>>;
    init: ()=>Promise<void>;
}

export default function AddPhoneModel({
    selectID,
    currentID,
    visible,
    setVisible,
    editObj,
    setEditObj,
    init
}: AddPhoneModelConfig) {
    const [loading, setLoading] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [type, setType] = useState<DailyPhoneType>('unit')
    const [address, setAddress] = useState<string>('') // 电话号码或描述
    useEffect(() => {
        setInputValue(editObj ? editObj.value : '')
        setType(editObj ? editObj.type : 'unit')
        if (editObj && (editObj as any).address) {
            setAddress((editObj as UnitConfig).address)
        }
        if (editObj && (editObj as any).phoneNumber) {
            setAddress((editObj as PhoneConfig).phoneNumber)
        }
    }, [editObj])
    // 提交数据
    const handleOk = async () => {
        setLoading(true)
        let res;
        if (selectID === null) {
            // 增加
            res = await add_unit_phone_api({
                unitID: currentID,
                value: inputValue,
                type,
                address: type === 'unit' ? address : undefined,
                phone_number: type === 'phone' ? address : undefined,
            })
        } else {
            if (!selectID) {
                errorToast('未选中单位或者电话')
                return;
            }
            res = await alter_unit_phone_api({
                id: selectID,
                value: inputValue,
                type,
                address: type === 'unit' ? address : undefined,
                phone_number: type === 'phone' ? address : undefined,
            })
        }
        if (httpIsSuccess(res.code)) {
            clear()
            setVisible(false)
            successToast(`${selectID === null ? '增加' : '修改'}成功`)
            init()
            clear()
        } else {
            errorToast(res.message)
        }
        setLoading(false)
    }
    const handleCancel = () => {
        clear()
        setVisible(false)
    }
    // 处理选择器的选择
    const handleChange = (value: DailyPhoneType) => {
        setType(value)
    }
    // 清空
    const clear = () => {
        setAddress('')
        setType('unit')
        setInputValue('')
        setEditObj(null)
    }
    // 构建描述输入框
    const buildAddressInput = () => {
        return < div className={`${stylePrefix}-input-layout`}>
            <p className={`${stylePrefix}-title`} >{type === 'unit' ? '描述' : '电话号码'}</p>
            <Input
                value={address}
                className={`${stylePrefix}-description-input`}
                onChange={(e) => { setAddress(e.target.value) }}
            />
        </div>
    }
    return (
        <Modal
            visible={visible}
            title="Title"
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
            <div className={`${stylePrefix}-input-layout`}>
                <p className={`${stylePrefix}-title`} >类型</p>
                <Select
                    value={type}
                    className={`${stylePrefix}-input`}
                    onChange={handleChange}
                >
                    <Option value="unit">单位</Option>
                    <Option value="phone">日常电话</Option>
                </Select>
            </div>
            <div className={`${stylePrefix}-input-layout`}>
                <p className={`${stylePrefix}-title`} >名称</p>
                <Input
                    value={inputValue}
                    className={`${stylePrefix}-input`}
                    onChange={(e) => { setInputValue(e.target.value) }}
                />
            </div>
            {buildAddressInput()}
        </Modal >
    )
}
