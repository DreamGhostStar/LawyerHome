import React from 'react'
import 'styles/login/verifyCode.scss'

const stylePrefix = 'login-verifyCode'

interface VerifyCodeConfig {
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>, setErrorStateFunc: React.Dispatch<React.SetStateAction<string>>, reg: RegExp, setStateFunc: React.Dispatch<React.SetStateAction<string>>, symbolErrorText: string) => void
    setVerifyCode: React.Dispatch<React.SetStateAction<string>>;
    setVerifyCodeError: React.Dispatch<React.SetStateAction<string>>;
    verifyCodeErrorText: string;
    verifyCodeReg: RegExp;
    verifyCodeImg: string | null;
    initVerifyCode: () => Promise<void>;
}

export default function VerifyCode({
    handleInputChange,
    setVerifyCode,
    setVerifyCodeError,
    verifyCodeErrorText,
    verifyCodeReg,
    verifyCodeImg,
    initVerifyCode,
}: VerifyCodeConfig) {
    return (
        <div className={`${stylePrefix}-layout`} >
            <input
                className={`${stylePrefix}-input`}
                placeholder='验证码'
                onChange={(e) => handleInputChange(e, setVerifyCodeError, verifyCodeReg, setVerifyCode, verifyCodeErrorText)}
            />
            {
                verifyCodeImg
                    ? <div
                        onClick={initVerifyCode}
                        className={`${stylePrefix}-img`}
                        dangerouslySetInnerHTML={{ __html: verifyCodeImg }}
                    ></div>
                    : <div className={`${stylePrefix}-img`}>加载中</div>
            }
        </div>
    )
}
