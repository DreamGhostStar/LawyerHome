import React, { Component } from 'react'
import Loadable from "./components/common/Loadable";
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import 'antd/dist/antd.css'
import 'react-simple-verify/dist/react-simple-verify.css'

import { Provider } from 'react-redux'
import store from './redux/store'

// 异步分包处理

const loginPage = Loadable({
    loader: () => import('./pages/login'),
});

const homePage = Loadable({
    loader: () => import('./pages/home'),
});

const salaryPage = Loadable({
    loader: () => import('./pages/salary'),
});

const logPage = Loadable({
    loader: () => import('./pages/log'),
});

const editCasePage = Loadable({
    loader: () => import('./pages/editCase'),
});

const requestPage = Loadable({
    loader: () => import('./pages/request'),
});

const mainPage = Loadable({
    loader: () => import('./pages/main'),
});

// 前端路由
export default class Entry extends Component {
    render() {
        return (
            <Provider store={store}>
                <HashRouter>
                    <Switch>
                        <Route path='/' component={mainPage} exact />
                        <Route path='/home' component={homePage} />
                        <Route path='/salary/:id' component={salaryPage} />
                        <Route path='/case' component={editCasePage} exact/>
                        <Route path='/case/:id' component={editCasePage} />
                        <Route path='/log/:id' component={logPage} />
                        <Route path='/request/:id' component={requestPage} />
                        <Provider store={store} >
                            <Route path='/login' component={loginPage} />
                        </Provider>
                        <Redirect to='/home' />
                    </Switch>
                </HashRouter>
            </Provider>
        )
    }
}