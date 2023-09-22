import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { StyleProvider } from '@ant-design/cssinjs';

const { Header, Content } = Layout;

import Mhead from "../components/main/Mhead";
import MyMenu from "../components/main/MyMenu";

function LayOut() {
  const headerStyle = {
    height: '68px',
    boxShadow: '0px 1px 4px 0px rgba(0, 21, 41, 0.12)',
    backgroundColor: "#fff",
    color: "#333",
    position: "relative",
    zIndex: 5,
    lineHeight: 1
  }
  const yfMainStyle = {
    height: 'calc(100vh - 68px)'
  }
  const contentStyle = {
    height: 'calc(100vh - 68px)',
    color: '#333',
    overflow: 'hidden',
    overflowY: 'auto',
    padding: '20px'
  }
  const containerStyle = {
    height: '100vh'
  }
  return(
    <StyleProvider hashPriority="high">
      <Layout style={containerStyle}>
        <Header style={headerStyle}>
          <Mhead></Mhead>
        </Header>
        <Layout hasSider style={yfMainStyle}>
          <MyMenu></MyMenu>
          <Content style={contentStyle}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </StyleProvider>
  )
}

export default LayOut