import React, { useState } from 'react'
import 'styles/pages/home.scss'
import { Provider } from 'react-redux'
import store from 'redux/store'
import HeaderContainer from 'containers/HeaderContainer'
import Sider from 'components/home/Sider'
import UserVerify from 'components/home/UserVerify'
import UserList from 'components/home/UserList'
import ErrorList from 'components/home/ErrorList'

const stylePrefix = 'page-home'

export default function Home() {
    const [activeSiderIndex, setActiveSiderIndex] = useState(0)
    const mainPageMap = new Map();
    mainPageMap.set(0, <UserList />)
    mainPageMap.set(1, <UserVerify />)
    mainPageMap.set(2, <ErrorList />)
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
