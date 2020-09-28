import React from 'react'
import 'styles/pages/home.scss'
import { Provider } from 'react-redux'
import store from 'redux/store'
import HeaderContainer from 'containers/HeaderContainer'

const stylePrefix = 'page-home'

export default function Home() {
    return (
        <div>
            <Provider store={store}>
                <HeaderContainer />
            </Provider>
        </div>
    )
}
