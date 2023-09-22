// import { useRef } from "react";
import { modal } from "../../Popups";
import { useNavigate } from 'react-router-dom';
// import { ModalForm } from 'ant-design/pro-components';

import Password from './Password';

function PopoverList(){
  const router = useNavigate();
  // const inputRef = useRef(null);

  const getOut = () => {
    modal.confirm({
      title: '提示',
      content: '是否确认退出',
      cancelText: '取消',
      okText: '确认',
      keyboard: false,
      maskClosable: false,
      centered: true,
      onOk() {
        localStorage.clear();
        router('/login', {replace: true});
      }
    });
  }
  const revise = () => {
    inputRef.current.showModal()
  }
  return(
    <>
      {/* <Password ref={inputRef}></Password> */}
      <div className="clickHeaderList">
        <Password></Password>
        <div className="item" onClick={getOut}>退出登录</div>
      </div>
    </>
  )
}

export default PopoverList;