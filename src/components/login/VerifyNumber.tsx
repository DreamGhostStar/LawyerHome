import { Button } from 'antd'
import { errorToast, httpIsSuccess, successToast } from 'components/common/utils'
import { send_phone_verify_number_api } from 'http/UserApi'
import React, { useEffect, useRef, useState } from 'react'
import 'styles/login/verifyNumber.scss'

const stylePrefix = 'login-verifyNumber'

interface VerifyNumberConfig {
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>, setErrorStateFunc: React.Dispatch<React.SetStateAction<string>>, reg: RegExp, setStateFunc: React.Dispatch<React.SetStateAction<string>>, symbolErrorText: string) => void
    setVerifyNumber: React.Dispatch<React.SetStateAction<string>>;
    setVerifyNumberError: React.Dispatch<React.SetStateAction<string>>;
    verifyNumberErrorText: string;
    verifyNumberReg: RegExp;
    phone: string;
    phoneReg: RegExp;
}

interface RefConfig {
    timer: NodeJS.Timeout | null
}

export default function VerifyNumber({
    handleInputChange,
    setVerifyNumber,
    setVerifyNumberError,
    verifyNumberErrorText,
    verifyNumberReg,
    phone,
    phoneReg,
}: VerifyNumberConfig) {
    const [delayNumber, setDelayNumber] = useState(0)
    const [isSend, setIsSend] = useState(false)
    const { current } = useRef<RefConfig>({ timer: null })
    const handleClickSend = async () => {
        if (!phoneReg.test(phone)) {
            errorToast('手机号未输入正确，请确认后重试')
            return
        }
        const res = await send_phone_verify_number_api({
            phoneNumber: phone
        })
        if (httpIsSuccess(res.code)) {
            successToast('发送成功')
            setDelayNumber(60)
            setIsSend(true)
        } else {
            errorToast(res.message)
        }
    }
    useEffect(() => {
        if (isSend) {
            if (delayNumber !== 0) {
                current.timer = setTimeout(() => {
                    setDelayNumber(delayNumber - 1)
                }, 1000)
            } else {
                setIsSend(false)
            }
        }
        return () => {
            if (delayNumber === 0 && current.timer) {
                clearTimeout(current.timer)
            }
        }
    }, [isSend, delayNumber])
    return (
        <div className={`${stylePrefix}-layout`} >
            <input
                className={`${stylePrefix}-input`}
                placeholder='验证码'
                onChange={(e) => handleInputChange(
                    e,
                    setVerifyNumberError,
                    verifyNumberReg,
                    setVerifyNumber,
                    verifyNumberErrorText
                )}
            />
            {
                isSend
                    ? <div className={`${stylePrefix}-delay`}>
                        {delayNumber} s
                    </div>
                    : <Button onClick={handleClickSend}>发送验证码</Button>
            }
        </div>
    )
}
