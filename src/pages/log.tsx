import LogList from 'components/log/LogList'
import UserBasicShow from 'components/salary/UserBasicShow'
import HeaderContainer from 'containers/HeaderContainer'
import React from 'react'
import { Provider } from 'react-redux'
import { useParams } from 'react-router-dom'
import store from 'redux/store'
import 'styles/pages/log.scss'
const stylePrefix = 'page-log'

interface logParams {
    id: string;
}

export default function Log() {
    const params = useParams<logParams>()
    return (
        <div className={`${stylePrefix}-layout`} >
            <Provider store={store}>
                <HeaderContainer />
            </Provider>
            <div className={`${stylePrefix}-main`} >
                <UserBasicShow userID={parseInt(params.id)} />
                <LogList userID={parseInt(params.id)}/>
            </div>
        </div>
    )
}
