import { AutoComplete, Button, DatePicker, Input, Select } from 'antd'
import HeaderContainer from 'containers/HeaderContainer'
import React, { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import store from 'redux/store'
import 'styles/pages/editCase.scss'
import StaticCaseTrial from 'static/caseTrial.json'
import StaticCaseType from 'static/caseType.json'
import StaticCaseStatus from 'static/caseStatus.json'
import { search_user_list_api } from 'http/UserApi'
import { errorToast, httpIsSuccess, successToast } from 'components/common/utils'
import AssistInput from 'components/home/lawyer/AssistInput'
import CouterStep from 'components/home/lawyer/CouterStep'
import { add_case_api, get_case_detail_api, IAddCase, ICaseDetail, update_case_api } from 'http/Case'
import UseThrottle from 'hooks/useThrottle'
import UploadAgency from 'components/home/lawyer/UploadAgency'
import { BaseHttpResponse } from 'http/Servies'
import moment from 'moment'
const { Option } = Select;
const { TextArea } = Input;
const stylePrefix = 'page-editCase'
const dateFormat = 'YYYY-MM-DD';
interface IParams {
    id: string
}
interface OptionConfig {
    id: string;
    value: string;
}
export interface assiantConfig {
    id: number;
    username: string;
    scale: number;
}
export interface AgencyWordConfig {
    url: string;
    filename: string;
    uploadTime: string;
}

export default function EditCase() {
    const params = useParams<IParams>()
    const history = useHistory()
    const isAdd = params.id === undefined
    const [loading, setLoading] = useState(false)
    const [caseNumber, setCaseNumber] = useState('') // 案件号
    const [name, setName] = useState('') // 案件名称
    const [money, setMoney] = useState('') // 案件总金额
    const [accuser, setAccuser] = useState('') // 原告
    const [defendant, setDefendant] = useState('') // 被告
    const [caseTrial, setCaseTrial] = useState(StaticCaseTrial[0].id) // 审级
    const [caseType, setCaseType] = useState(StaticCaseType[0].id) // 类型
    const [caseReason, setCaseReason] = useState('') // 案由
    const [detail, setDetail] = useState('') // 详情
    const [hostOption, setHostOption] = useState<OptionConfig[]>([]) // 主办人选项
    const [hostValue, setHostValue] = useState('') // 主办人输入框值
    const [hostID, setHostID] = useState<number | null>(null) // 主办人ID
    const [hostScale, setHostScale] = useState(0) // 主办人比例
    const [createTime, setCreateTime] = useState('') // 接取时间
    const [status, setStatus] = useState('in_office') // 案件状态ID
    const [assistIDList, setAssistIDList] = useState<assiantConfig[]>([]) // 协办人选中的ID列表
    const [agencyWord, setAgencyWord] = useState<AgencyWordConfig | null>(null) // 代理词word的http路径
    // 负责更新值
    const handleInput = (
        func: React.Dispatch<React.SetStateAction<any>>,
        value: string
    ) => {
        func(value)
    }
    const getFormatDate = () => {
        if (createTime === '') {
            const nowDate = new Date()
            const year = nowDate.getFullYear();
            const month = nowDate.getMonth() + 1;
            const day = nowDate.getDate();
            return `${year}-${month}-${day}`
        } else {
            const date = new Date(parseInt(createTime))
            const year = date.getFullYear();
            const month = date.getMonth() + 1
            const day = date.getDate();
            return `${year}-${month}-${day}`
        }
    }
    // 构建输入框
    const buildInput = (
        title: string,
        placeholder: string,
        func: React.Dispatch<React.SetStateAction<any>>,
        value: string,
    ) => {
        return <div className={`${stylePrefix}-input-layout`}>
            <p>
                <span className={`${stylePrefix}-title`} >{title}</span>
                <span className={`${stylePrefix}-symbol`} >：</span>
            </p>
            <Input
                value={value}
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
        func: React.Dispatch<React.SetStateAction<any>>,
        value: string,
    ) => {
        return <div className={`${stylePrefix}-input-layout`}>
            <p>
                <span className={`${stylePrefix}-title`} >{title}</span>
                <span className={`${stylePrefix}-symbol`} >：</span>
            </p>
            <TextArea
                value={value}
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
    const onSearch = async (value: string) => {
        if (!value) return
        const res = await search_user_list_api({ value });
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
    // 提交
    const handleSubmit = async (callback: (data: IAddCase) => Promise<BaseHttpResponse>) => {
        let infoIsNull = false;
        [
            caseNumber,
            caseReason,
            caseTrial,
            caseType,
            accuser,
            defendant,
            hostID,
            hostScale,
            agencyWord,
            money,
            name,
            status
        ].map(item => {
            infoIsNull = infoIsNull ? true : (item === null || item === '')
        })
        if (infoIsNull) {
            errorToast('信息未填写完，请检查后重试')
            return
        }
        const moneyReg: RegExp = /^[1-9]\d*.?\d{0,2}$/
        if (!moneyReg.test(money)) {
            errorToast('金额必须全为数字或至多为两位小数，请检查后重试')
            return
        }
        const statusMap = {
            in_office: 1,
            off_office: 2
        }
        setLoading(true)
        const res = await callback({
            id: isAdd ? undefined : parseInt(params.id),
            name,
            caseNumber,
            caseReason,
            caseTrial,
            caseType,
            accuser,
            defendant,
            detail,
            status_id: isAdd ? 1 : statusMap[status],
            create_time: createTime,
            money: parseInt(money),
            agency: (agencyWord as AgencyWordConfig).url,
            host: {
                id: (hostID as number),
                scale: hostScale / 100
            },
            assiant: assistIDList.map(assist => {
                return {
                    id: assist.id,
                    scale: assist.scale / 100
                }
            })
        })
        if (httpIsSuccess(res.code)) {
            successToast(`${isAdd ? '新建' : '修改'}案件成功`)
            history.goBack()
        } else {
            errorToast(res.message)
        }
        setLoading(true)
    }
    // 获取案件详细信息
    const getCaseDetail = async (caseID: number) => {
        const statusMap = ['in_office', 'off_office']
        const res = await get_case_detail_api({ id: caseID })
        if (httpIsSuccess(res.code)) {
            const data: ICaseDetail = res.data;
            setCaseNumber(data.caseNumber);
            setName(data.name)
            setAccuser(data.accuser)
            setAgencyWord(data.agency)
            setDefendant(data.defendant)
            setCreateTime(data.create_time)
            setDetail(data.detail)
            setCaseType(data.caseType)
            setCaseTrial(data.caseTrial)
            setCaseReason(data.caseReason)
            setMoney(data.money.toString())
            setHostID(data.host.id)
            setHostValue(data.host.username)
            setHostScale(data.host.scale * 100)
            setAssistIDList(data.assiant)
            setStatus(statusMap[data.status_id])
        } else {
            errorToast(res.message)
        }
    }
    // 处理时间选择
    const onChange = (date: any, _dateString: any) => {
        const selectDate = new Date(date._d);
        setCreateTime(selectDate.getTime().toString())
    }
    useEffect(() => {
        if (!isAdd) {
            getCaseDetail(parseInt(params.id))
        }
    }, [params.id])
    UseThrottle(onSearch, 0.5 * 1000)(hostValue)
    return (
        <div className={`${stylePrefix}-layout`}>
            <Provider store={store} >
                <HeaderContainer title={isAdd ? '新建案件' : '修改案件'} />
            </Provider>
            <div className={`${stylePrefix}-main`}>
                {buildInput('案件号', '案件号', setCaseNumber, caseNumber)}
                {buildInput('案件名称', '案件名称', setName, name)}
                {buildInput('原告', '原告', setAccuser, accuser)}
                {buildInput('被告', '被告', setDefendant, defendant)}
                {buildSelect('类型', setCaseType, StaticCaseType, caseType)}
                {buildSelect('审级', setCaseTrial, StaticCaseTrial, caseTrial)}
                {buildInput('案由', '案由', setCaseReason, caseReason)}
                {buildTextArea('详情', '详情', setDetail, detail)}
                {
                    !isAdd &&
                    buildSelect('状态', setStatus, StaticCaseStatus, status)
                }
                <div className={`${stylePrefix}-input-layout`}>
                    <p>
                        <span className={`${stylePrefix}-title`} >接取时间</span>
                        <span className={`${stylePrefix}-symbol`} >：</span>
                    </p>
                    <DatePicker
                        className={`${stylePrefix}-select`}
                        onChange={onChange}
                        value={moment(getFormatDate(), dateFormat)}
                    />
                </div>
                {buildInput('案件总金额', '案件总金额', setMoney, money)}
                <div className={`${stylePrefix}-input-layout`}>
                    <p>
                        <span className={`${stylePrefix}-title`} >主办人</span>
                        <span className={`${stylePrefix}-symbol`} >：</span>
                    </p>
                    <AutoComplete
                        value={hostValue}
                        className={`${stylePrefix}-autoComplete`}
                        onSelect={onSelect}
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
                <div className={`${stylePrefix}-input-layout`}>
                    <p>
                        <span className={`${stylePrefix}-title`} >主办人比例</span>
                        <span className={`${stylePrefix}-symbol`} >：</span>
                    </p>
                    <div className={`${stylePrefix}-couter-step`}>
                        <CouterStep
                            value={hostScale}
                            callback={(inputValue) => setHostScale(inputValue)}
                        />
                        &nbsp; %
                    </div>
                </div>
                <UploadAgency
                    agencyWord={agencyWord}
                    setAgencyWord={setAgencyWord}
                />
            </div>
            <div className={`${stylePrefix}-main`}>
                <AssistInput
                    assistIDList={assistIDList}
                    setAssistIDList={setAssistIDList}
                />
            </div>
            <div className={`${stylePrefix}-submit-layout`}>
                <Button
                    loading={loading}
                    type='primary'
                    onClick={() => handleSubmit(isAdd ? add_case_api : update_case_api)}
                >{loading ? '提交中' : '提交'}</Button>
            </div>
        </div>
    )
}
