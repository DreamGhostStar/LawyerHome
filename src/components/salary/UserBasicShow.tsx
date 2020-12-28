import Loading2 from 'components/common/Loading2';
import { errorToast, httpIsSuccess } from 'components/common/utils';
import { UserDetailConfig } from 'components/home/user/AlterUserInfoModal';
import { get_user_info_in_salary_api } from 'http/Salary';
import React, { useCallback, useEffect, useState } from 'react'
import 'styles/salary/userBasicShow.scss'

const stylePrefix = 'salary-userBasicShow'

interface UserBasicShowConfig {
    userID: number;
}

interface UserDetailInfoConfig extends UserDetailConfig {
    salaryNum?: string;
    avatar?: string;
}

export default function UserBasicShow({ userID }: UserBasicShowConfig) {
    const [user, setUser] = useState<UserDetailInfoConfig>({})
    const [loading, setLoading] = useState(false)
    // 初始化用户信息
    const init = useCallback( async () => {
        setLoading(true)
        const res = await get_user_info_in_salary_api({ userID })
        if (httpIsSuccess(res.code)) {
            setUser(res.data);
        } else {
            errorToast(res.message)
        }
        setLoading(false)
    }, [userID])
    useEffect(() => {
        init()
    }, [userID, init])
    const buildOtherInfoItem = (key: string, value: string) => {
        return <p>
            <span className={`${stylePrefix}-title`} >{key}：</span>
            <span className={`${stylePrefix}-value`}>{value}</span>
        </p>
    }
    return (
        <div className={`${stylePrefix}-layout`} >
            {
                !loading
                    ? <div className={`${stylePrefix}-main`} >
                        <div className={`${stylePrefix}-name-avatar-layout`} >
                            <img src={user.avatar} className={`${stylePrefix}-avatar`} alt="" />
                            <p className={`${stylePrefix}-name`} >{user.name}</p>
                        </div>
                        <div className={`${stylePrefix}-other-info`} >
                            {buildOtherInfoItem('收入总额', `${user.salaryNum || '0'}元`)}
                            {buildOtherInfoItem('手机号', user.phoneNumber || '无')}
                            {buildOtherInfoItem('微信号', user.weixin_number || '无')}
                            {buildOtherInfoItem('律师证号', user.lawyer_number || '无')}
                        </div>
                    </div>
                    : <Loading2 />
            }
        </div>
    )
}
