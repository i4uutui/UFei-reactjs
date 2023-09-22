import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, } from "react-router-dom";
import { ConfigProvider, App as AntdApp } from 'antd';
import { Provider } from 'react-redux'
import store from './stores'
import Popups from './components/Popups';
import router from './router'
import zhCN from 'antd/locale/zh_CN';

import './assets/css/app.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <ConfigProvider locale={zhCN} theme={{ token: {colorPrimary: '#4AB250'} }}>
      <AntdApp message={{ maxCount: 3 }}>
        <Popups />
        <RouterProvider router={router}></RouterProvider>
      </AntdApp>
    </ConfigProvider>
  </Provider>
  // </React.StrictMode>
)
