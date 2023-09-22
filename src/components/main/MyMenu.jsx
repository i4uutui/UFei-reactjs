import { Layout, Menu } from "antd"
import { createFromIconfontCN } from '@ant-design/icons';
import { useSelector } from "react-redux";

const { Sider } = Layout;
import './MyMenu.scss';

function MyMenu(){

  const MyIcon = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/c/font_3772028_lbxrqqn5e5n.js', // 在 iconfont.cn 上生成
  });
  const sideBar = useSelector(state => state.store.sideBar);
  const siderStyle = {
    zIndex: 4,
    padding: '28px 16px 0',
    position: 'relative',
    height: 'calc(100vh - 68px)',
    borderRight: '1px solid rgb(231,243,231)',
    background: 'inherit',
    overflow: 'auto'
  }
  const menuStyle = {
    boxShadow: '0 1px 5px #0000001f',
    borderRadius: '4px',
    overflow: 'hidden'
  }
  const items = sideBar.map(e => {
    return {label: e.label, key: e.key, path: e.path, icon: <MyIcon type={e.icon} />, children: e.children}
  })
  return(
    <>
      <Sider style={siderStyle} width={235}>
        <div className="MyMenu">
          <Menu defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode="inline" theme="light" items={items} style={menuStyle} />
        </div>
      </Sider>
    </>
  )
}

export default MyMenu