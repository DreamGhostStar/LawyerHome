import SalaryList from 'components/salary/SalaryList'
import UserBasicShow from 'components/salary/UserBasicShow'
import HeaderContainer from 'containers/HeaderContainer'
import React from 'react'
import { Provider } from 'react-redux'
import { useParams } from 'react-router-dom'
import store from 'redux/store'
import 'styles/pages/salary.scss'
const stylePrefix = 'page-salary'

interface salaryParams {
    id: string;
}

export default function Salary() {
    const params = useParams<salaryParams>()
    return (
        <div className={`${stylePrefix}-layout`} >
            <Provider store={store}>
                <HeaderContainer />
            </Provider>
            <div className={`${stylePrefix}-main`} >
                <UserBasicShow userID={parseInt(params.id)} />
                <SalaryList userID={parseInt(params.id)}/>
            </div>
        </div>
    )
}
