import React, { Component } from 'react'
import Loadable from "./components/common/Loadable";
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import 'antd/dist/antd.css'
import 'react-simple-verify/dist/react-simple-verify.css'

import { Provider } from 'react-redux'
import store from './redux/store'

// 异步分包处理

const loginPage = Loadable({
    loader: () => import('./containers/LoginContainer'),
});

const homePage = Loadable({
    loader: () => import('./pages/Home'),
});

// 前端路由
export default class Entry extends Component {
    render() {
        return (
            <Provider store={store}>
                <HashRouter>
                    <Switch>
                        <Route path='/home' component={homePage} />
                        <Provider store={store}>
                            <Route path='/login' component={loginPage} />
                        </Provider>
                        <Redirect to='/home' />
                    </Switch>
                </HashRouter>
            </Provider>
        )
    }
}