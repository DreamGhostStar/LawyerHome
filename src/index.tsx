import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Entry from 'Entry';
import 'moment/locale/zh-cn';
import locale from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';
import store from 'redux/store';
import Loading2 from 'components/common/Loading2';

function listen() {
  if (document.readyState == 'complete') { // 资源加载完成
    ReactDOM.render(
      <ConfigProvider locale={locale}>
        <Entry />
      </ConfigProvider>,
      document.getElementById('root')
    )
  } else { // 资源加载中
    ReactDOM.render(
      <Provider store={store}>
        <HashRouter>
          <Route path="/" component={Loading2} exact />
        </HashRouter>
      </Provider>,
      document.getElementById('root')
    )
  }
}

document.onreadystatechange = listen

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
