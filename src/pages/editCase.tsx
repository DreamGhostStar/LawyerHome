import { AutoComplete, Input, Select } from 'antd'
import HeaderContainer from 'containers/HeaderContainer'
import React, { useState } from 'react'
import { Provider } from 'react-redux'
import { useParams } from 'react-router-dom'
import store from 'redux/store'
import 'styles/pages/editCase.scss'
import StaticCaseTrial from 'static/caseTrial.json'
import StaticCaseType from 'static/caseType.json'
import { search_user_list_api } from 'http/UserApi'
import { errorToast, httpIsSuccess } from 'components/common/utils'
import AssistInput from 'components/home/lawyer/AssistInput'
const { Option } = Select;
const { TextArea } = Input;
const stylePrefix = 'page-editCase'
interface IParams {
    id: string
}
interface OptionConfig {
    id: string;
    value: string;
}

export default function EditCase() {
    const params = useParams<IParams>()
    const isAdd = params.id === undefined
    const [caseNumber, setCaseNumber] = useState('') // 案件号
    const [accuser, setAccuser] = useState('') // 原告
    const [defendant, setDefendant] = useState('') // 被告
    const [caseTrial, setCaseTrial] = useState(StaticCaseTrial[0].id) // 审级
    const [caseType, setCaseType] = useState(StaticCaseType[0].id) // 类型
    const [caseReason, setCaseReason] = useState('') // 案由
    const [detail, setDetail] = useState('') // 详情
    const [hostOption, setHostOption] = useState<OptionConfig[]>([]) // 主办人选项
    const [hostValue, setHostValue] = useState('') // 主办人输入框值
    const [hostID, setHostID] = useState<number | null>(null) // 主办人ID
    // 负责更新值
    const handleInput = (
        func: React.Dispatch<React.SetStateAction<any>>,
        value: string
    ) => {
        func(value)
    }

    // 构建输入框
    const buildInput = (
        title: string,
        placeholder: string,
        func: React.Dispatch<React.SetStateAction<any>>
    ) => {
        return <div className={`${stylePrefix}-input-layout`}>
            <p>
                <span className={`${stylePrefix}-title`} >{title}</span>
                <span className={`${stylePrefix}-symbol`} >：</span>
            </p>
            <Input
                onChange={(e) => handleInput(func, e.target.value)}
                className={`${stylePrefix}-input`}
                placeholder={placeholder}
            />
        </div>
    }

    // 构建多行文本框
    const buildTextArea = (
        title: string,
        placeholder: string,
        func: React.Dispatch<React.SetStateAction<any>>
    ) => {
        return <div className={`${stylePrefix}-input-layout`}>
            <p>
                <span className={`${stylePrefix}-title`} >{title}</span>
                <span className={`${stylePrefix}-symbol`} >：</span>
            </p>
            <TextArea
                className={`${stylePrefix}-input`}
                rows={4}
                placeholder={placeholder}
                onChange={(e) => handleInput(func, e.target.value)}
            />
        </div>
    }

    // 构建选择框
    const buildSelect = (
        title: string,
        func: React.Dispatch<React.SetStateAction<any>>,
        arr: OptionConfig[],
        value: string
    ) => {
        return <div className={`${stylePrefix}-input-layout`}>
            <p>
                <span className={`${stylePrefix}-title`} >{title}</span>
                <span className={`${stylePrefix}-symbol`} >：</span>
            </p>
            <Select
                defaultValue={value}
                className={`${stylePrefix}-select`}
                onChange={(value) => func(value)}
            >
                {
                    arr.map((optionItem, index) => {
                        return <Option key={index} value={optionItem.id}>{optionItem.value}</Option>
                    })
                }
            </Select>
        </div>
    }
    const onSearch = async (searchText: string) => {
        const res = await search_user_list_api({ value: searchText });
        if (httpIsSuccess(res.code)) {
            setHostOption(res.data)
        } else {
            errorToast(res.message)
        }
    };
    const onSelect = (data: string) => {
        for (let index = 0; index < hostOption.length; index++) {
            const item = hostOption[index];
            if (item.id === data) {
                setHostValue(item.value)
                setHostID(parseInt(data))
                return
            }
        }
    };
    return (
        <div className={`${stylePrefix}-layout`}>
            <Provider store={store} >
                <HeaderContainer title={isAdd ? '新建案件' : '修改案件'} />
            </Provider>
            <div className={`${stylePrefix}-main`}>
                {buildInput('案件号', '案件号', setCaseNumber)}
                {buildInput('原告', '原告', setAccuser)}
                {buildInput('被告', '被告', setDefendant)}
                {buildSelect('类型', setCaseType, StaticCaseType, caseType)}
                {buildSelect('审级', setCaseTrial, StaticCaseTrial, caseTrial)}
                {buildInput('案由', '案由', setCaseReason)}
                {buildTextArea('详情', '详情', setDetail)}
                <div className={`${stylePrefix}-input-layout`}>
                    <p>
                        <span className={`${stylePrefix}-title`} >主办人</span>
                        <span className={`${stylePrefix}-symbol`} >：</span>
                    </p>
                    <AutoComplete
                        value={hostValue}
                        className={`${stylePrefix}-autoComplete`}
                        onSelect={onSelect}
                        onSearch={onSearch}
                        onChange={(value) => setHostValue(value)}
                        placeholder="主办人"
                    >
                        {hostOption.map((item, index) => (
                            <AutoComplete.Option key={index} value={item.id}>
                                {item.value}
                            </AutoComplete.Option>
                        ))}
                    </AutoComplete>
                </div>
            </div>
            <div className={`${stylePrefix}-main`}>
                <AssistInput />
            </div>
        </div>
    )
}
