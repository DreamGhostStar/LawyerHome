import { errorToast, httpIsSuccess, successToast } from 'components/common/utils'
import { get_unit_phone_api, remove_unit_phone_api } from 'http/Phone'
import React, { useEffect, useState } from 'react'
import 'styles/phone/dailyPhoneList.scss'
import classnames from 'classnames'
import { IconFont } from 'components/common/config'
import LoadingWidget from 'components/common/LoadingWidget'
import AddPhoneModel from './AddPhoneModel'
import { Button } from 'antd'
const stylePrefix = 'phone-dailyPhoneList'
export type DailyPhoneType = 'phone' | 'unit'
export interface UnitConfig {
    type: DailyPhoneType;
    id: number;
    value: string;
    address: string;
}
export interface PhoneConfig {
    type: DailyPhoneType;
    id: number;
    value: string;
    phoneNumber: string;
}
interface PathConfig {
    id: null | number;
    value: string;
}

export default function DailyPhoneList() {
    const [path, setPath] = useState<PathConfig[]>([{ id: null, value: "根" }])
    const [list, setList] = useState<(PhoneConfig | UnitConfig)[]>([])
    const [currentID, setCurrentID] = useState<number | null>(null)
    const [selectedID, setSelectedID] = useState<number | null>(null) // 当前单位ID
    const [editObj, setEditObj] = useState<PhoneConfig | UnitConfig | null>(null) // 修改和增加时选择的对象
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    // 获取单位和日常电话
    const init = async () => {
        setLoading(true)
        const res = await get_unit_phone_api({ unitID: currentID })
        if (httpIsSuccess(res.code)) {
            setList(res.data)
        } else {
            errorToast(res.message)
        }
        setLoading(false)
    }
    useEffect(() => {
        init();
    }, [currentID])
    const handleClick = (id: number, type: DailyPhoneType, value: string) => {
        if (type === 'unit') {
            setCurrentID(id)
            setPath([...path, {
                id,
                value
            }])
        }
    }
    const handleClickPath = (index: number) => {
        setCurrentID(path[index].id)
        const temp = path
        temp.splice(index + 1, path.length - index - 1)
        setPath(temp)
    }
    const handleRemove = async (
        id: number | null,
        e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
        type: DailyPhoneType
    ) => {
        e.stopPropagation()
        if (id !== null) {
            const res = await remove_unit_phone_api({ id, type })
            if (httpIsSuccess(res.code)) {
                successToast("删除成功")
                init()
            } else {
                errorToast(res.message)
            }
        }
    }
    const handleAdd = () => {
        setVisible(true);
        setSelectedID(null)
        setEditObj(null)
    }
    const handleEdit = (
        e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
        obj: PhoneConfig | UnitConfig,
        id: number,
    ) => {
        e.stopPropagation();
        setSelectedID(id)
        setEditObj(obj)
        setVisible(true);
    }
    return (
        <LoadingWidget loading={loading}>
            <div className={`${stylePrefix}-layout`}>
                <div className={`${stylePrefix}-path-layout`}>
                    <p className={`${stylePrefix}-title`}>路径：</p>
                    <div className={`${stylePrefix}-path`}>
                        {
                            path.map((pathItem, index) => {
                                return <div
                                    key={index}
                                    className={`${stylePrefix}-path-item-layout`}
                                >
                                    <p
                                        className={`${stylePrefix}-path-item`}
                                        onClick={() => handleClickPath(index)}
                                    >{pathItem.value}</p>
                                    {
                                        index !== path.length - 1 &&
                                        <p className={`${stylePrefix}-path-icon`} >&gt;</p>
                                    }
                                </div>
                            })
                        }
                    </div>
                </div>
                <Button
                    type='primary'
                    className={`${stylePrefix}-add-button`}
                    onClick={() => handleAdd()}
                >在当前路径下增加</Button>
                <div className={`${stylePrefix}-main`}>
                    {
                        list.map((phoneUnitItem, index) => {
                            return <div
                                className={classnames(`${stylePrefix}-unitPhone`, {
                                    [`${stylePrefix}-${phoneUnitItem.type}`]: phoneUnitItem.type
                                })}
                                onClick={() => handleClick(phoneUnitItem.id, phoneUnitItem.type, phoneUnitItem.value)}
                                key={index}
                            >
                                <p
                                    className={`${stylePrefix}-unit-phone-value`}
                                >{phoneUnitItem.value}</p>
                                <div className={`${stylePrefix}-icon-layout`} >
                                    <IconFont
                                        className={`${stylePrefix}-icon`}
                                        type='iconxiugai'
                                        onClick={(e) => handleEdit(e, phoneUnitItem, phoneUnitItem.id)}
                                    />
                                    <IconFont
                                        className={`${stylePrefix}-icon`}
                                        type='iconshanchu'
                                        onClick={(e) => handleRemove(phoneUnitItem.id, e, phoneUnitItem.type)}
                                    />
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
            <AddPhoneModel
                visible={visible}
                setVisible={setVisible}
                selectID={selectedID}
                currentID={currentID}
                editObj={editObj}
                setEditObj={setEditObj}
                init={init}
            />
        </LoadingWidget>
    )
}
