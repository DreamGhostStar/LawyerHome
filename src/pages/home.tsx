import React, { useState } from 'react'
import 'styles/pages/home.scss'
import { Provider } from 'react-redux'
import store from 'redux/store'
import HeaderContainer from 'containers/HeaderContainer'
import Sider from 'components/home/Sider'
import UserList from 'components/home/user/UserList'
import CaseList from 'components/home/lawyer/CaseList'
import DailyPhoneList from 'components/home/phone/DailyPhoneList'
import RequestList from 'components/home/request/RequestList'

const stylePrefix = 'page-home'

export default function Home() {
    const [activeSiderIndex, setActiveSiderIndex] = useState(0)
    const mainPageMap = new Map();
    mainPageMap.set(0, <UserList />)
    mainPageMap.set(1, <CaseList />)
    mainPageMap.set(2, <DailyPhoneList />)
    mainPageMap.set(3, <RequestList />)
    return (
        <div className={`${stylePrefix}-layout`}>
            <Provider store={store}>
                <HeaderContainer />
            </Provider>
            <div className={`${stylePrefix}-main`} >
                <Sider activeIndex={activeSiderIndex} setActiveSiderIndex={setActiveSiderIndex} />
                {
                    mainPageMap.get(activeSiderIndex)
                }
            </div>
        </div>
    )
}
