import { AutoComplete, Button } from 'antd'
import { errorToast, httpIsSuccess } from 'components/common/utils'
import useThrottle from 'hooks/useThrottle'
import { search_user_list_api } from 'http/UserApi'
import React, { useState } from 'react'
import 'styles/lawyer/assistInput.scss'
import CouterStep from './CouterStep'
const stylePrefix = 'lawyer-assistInput'
interface OptionConfig {
    id: string;
    value: string;
}
interface assiantConfig {
    id: string;
    username: string;
    scale: number;
}

export default function AssistInput() {
    const [assistValue, setAssistValue] = useState('')
    const [assistIDList, setAssistIDList] = useState<assiantConfig[]>([]) // 协办人选中的ID列表
    const [assistOption, setaAssistOption] = useState<OptionConfig[]>([]) // 协办人选项
    // 当输入的值发生改变，则向后端发起请求符合输入条件的用户列表
    const onSearch = async (searchText: string) => {
        if (!searchText) return
        const res = await search_user_list_api({ value: searchText });
        if (httpIsSuccess(res.code)) {
            setaAssistOption(res.data)
        } else {
            errorToast(res.message)
        }
    };
    // 选中列表项，添加协办人用户
    const onSelect = (data: string) => {
        for (let index = 0; index < assistOption.length; index++) {
            const item = assistOption[index];
            if (item.id === data) {
                // 说明列表中肯定会有该用户ID，则不予添加并提示当前正在使用的用户
                let isExist = false; // 是否存在
                assistIDList.forEach(assist => {
                    if (assist.id === item.id) {
                        isExist = true
                        return
                    }
                })
                if (isExist) {
                    errorToast('该用户已添加，请检查')
                } else {
                    setAssistIDList([...assistIDList, {
                        id: item.id,
                        username: item.value,
                        scale: 0
                    }])
                    setAssistValue('')
                }
                return
            }
        }
    };
    // 处理表中数值变化
    const handleCouterStep = (inputValue: number, assist: assiantConfig) => {
        const res = assistIDList.map(assistItem => {
            if (assist.id === assistItem.id) {
                return {
                    ...assistItem,
                    scale: inputValue
                }
            } else {
                return assistItem
            }
        })
        setAssistIDList(res)
    }
    // 节流模块
    useThrottle(onSearch, 0.5 * 1000, assistValue)()

    return (
        <>
            <h3 className={`${stylePrefix}-title`}>协办人</h3>
            <div className={`${stylePrefix}-input-layout`}>
                <AutoComplete
                    value={assistValue}
                    className={`${stylePrefix}-autoComplete`}
                    onSelect={onSelect}
                    onChange={(value) => setAssistValue(value)}
                    placeholder="协办人"
                >
                    {assistOption.map((item, index) => (
                        <AutoComplete.Option key={index} value={item.id}>
                            {item.value}
                        </AutoComplete.Option>
                    ))}
                </AutoComplete>
                <Button>新增</Button>
            </div>
            <div className={`${stylePrefix}-user-show-layout`} >
                {
                    assistIDList.map((assist, index) => {
                        return <div
                            key={index}
                            className={`${stylePrefix}-user-show`}
                        >
                            <p className={`${stylePrefix}-value`} >{assist.username}</p>
                            <div className={`${stylePrefix}-value`}>
                                <CouterStep
                                    value={assist.scale}
                                    callback={(inputValue) => handleCouterStep(inputValue, assist)}
                                />
                                &nbsp; %
                            </div>
                        </div>
                    })
                }
            </div>
        </>
    )
}
