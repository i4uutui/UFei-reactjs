import { Popover } from "antd";
import { useSelector } from "react-redux";

import PopoverList from "./head/Popover";

import userImage from '../../assets/img/avatar.png'
import initLogo from '../../assets/img/logo.jpg'
import './Mhead.scss';

function Mhead(){
  const userInfo = useSelector((state) => state.store.userInfo);
  return(
    <>
      <div className="flex row-between header-D">
        <div className="left flex">
          <div className="logo"><img src={initLogo} alt="" /></div>
          <div className="h1">工业固废智能管家 — 后台</div>
        </div>
        <div className="right flex">
          <div className="userInfo flex" id="user">
            <Popover trigger="click" content={PopoverList} getPopupContainer={() => document.getElementById('user')}>
              <div className="avatar">
                {userInfo && userInfo.avatar ? <img src={userInfo.avatar} alt="" /> : <img src={userImage} alt="" />}
              </div>
            </Popover>
            <div className="userName">{userInfo && userInfo.nickName}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Mhead