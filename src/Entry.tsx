import React, { Component } from 'react'
import Loadable from "./components/common/Loadable";
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import 'antd/dist/antd.css'

import { Provider } from 'react-redux'
import store from './redux/store'

// 异步分包处理

const loginPage = Loadable({
    loader: () => import('./pages/login'),
});

const homePage = Loadable({
    loader: () => import('./pages/home'),
});

// 前端路由
export default class Entry extends Component {
    render() {
        return (
            <Provider store={store}>
                <HashRouter>
                    <Switch>
                        <Route path='/home' component={homePage} />
                        <Route path='/login' component={loginPage} />
                        <Redirect to='/home' />
                    </Switch>
                </HashRouter>
            </Provider>
        )
    }
}