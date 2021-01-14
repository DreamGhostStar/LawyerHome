import { DatePicker, Tooltip } from 'antd'
import { IconFont } from 'components/common/config';
import { errorToast, httpIsSuccess } from 'components/common/utils';
import { get_log_api } from 'http/Log';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import 'styles/log/logList.scss'
const stylePrefix = 'log-logList'
const dateFormat = 'YYYY-MM-DD';
interface LogListConfig {
    userID: number;
}
interface LogItemConfig {
    log_id: number;
    title: string;
    content: string;
    create_time: string; // 创建时间
    is_alter: boolean;
    select_time: string; // 选择的时间
}

export default function LogList({ userID }: LogListConfig) {
    const getNowDate = () => {
        const nowDate = new Date()
        const year = nowDate.getFullYear();
        const month = nowDate.getMonth() + 1;
        const day = nowDate.getDate();
        return `${year}-${month}-${day}`
    }
    const [date, setDate] = useState(getNowDate()) // 选择的时间
    const [list, setList] = useState<LogItemConfig[]>([])
    const getLogList = async () => {
        const dateList = date.split('-')
        const res = await get_log_api({
            userID,
            year: parseInt(dateList[0]),
            month: parseInt(dateList[1]),
            day: parseInt(dateList[2]),
        })
        if (httpIsSuccess(res.code)) {
            console.log(res.data)
            setList(res.data)
        } else {
            errorToast(res.message)
        }
    }
    useEffect(() => {
        getLogList()
    }, [userID, date])
    const onChange = (_date: any, dateString: any) => {
        setDate(dateString)
    }
    const formatHourMinute = (time: string) => {
        const date = new Date(parseInt(time))
        const hour = date.getHours();
        const minute = date.getMinutes();
        return `${hour} : ${minute}`
    }
    return (
        <div className={`${stylePrefix}-layout`}>
            <div className={`${stylePrefix}-date-select`}>
                <DatePicker
                    defaultValue={moment(getNowDate(), dateFormat)}
                    onChange={onChange}
                />
            </div>
            <div className={`${stylePrefix}-list-layout`}>
                {
                    list.map((logItem, index) => {
                        return <div
                            key={index}
                            className={`${stylePrefix}-list-item-layout`}
                        >
                            <div className={`${stylePrefix}-leading`}>
                                <div className={`${stylePrefix}-prefix-icon-line`} ></div>
                                <div className={`${stylePrefix}-prefix-icon-layout`}>
                                    <IconFont
                                        className={`${stylePrefix}-prefix-icon`}
                                        type={logItem.is_alter ? 'iconyonghu' : 'iconxitong'}
                                    />
                                </div>
                                <div className={`${stylePrefix}-prefix-icon-line`} ></div>
                            </div>
                            <div className={`${stylePrefix}-main-layout`}>
                                <div className={`${stylePrefix}-time`}>
                                    <p>
                                        <span className={`${stylePrefix}-title`}>创建时间：</span>
                                        {formatHourMinute(logItem.create_time)}
                                    </p>
                                    <p>
                                        <span className={`${stylePrefix}-title`}>选择时间：</span>
                                        {formatHourMinute(logItem.select_time)}
                                    </p>
                                </div>
                                <div className={`${stylePrefix}-main`}>
                                    <h2 className={`${stylePrefix}-title`}>{logItem.title}</h2>
                                    <Tooltip placement="top" title={logItem.content}>
                                        <p className={`${stylePrefix}-content`}>{logItem.content}</p>
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}
