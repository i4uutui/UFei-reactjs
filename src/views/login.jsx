import { useState } from 'react';
import { Button } from 'antd';
import { post } from '@/api';
import { message } from '../components/Popups';
import { setItem } from '../assets/js/storage';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { 
  setSideBar,
  setUserInfo,
  setSideView
} from '@/stores/storeSlice';
import routerList from '../router/router';

import backl from '../assets/img/backl.png';
import rightImage from '../assets/img/rightImage.png';
import '../assets/pageStyle/login.scss';
import menuList from '../components/sideBar';

// 迭代遍历
// obj 数组对象
// val 要获取的属性
function traverse(obj, keys, val) {
  const stack = [];
  stack.push({ obj, depth: 0 });
  let k = [];

  while (stack.length > 0) {
    const { obj, depth } = stack.pop();
    for (let key in obj) {
      const value = obj[key];
      if (typeof value === 'object') {
        stack.push({ obj: value, depth: depth + 1 });
        if(val){
          if(value && value[keys] && value[keys] == val){
            k.push(value);
          }
        }else{
          console.log();
          if(value && value[keys]){
            k.push(value[keys]);
          }
        }
      }
    }
  }
  return k
}
// 递归获取左侧栏的有权限的对象，进行跳转
function findInArray(arr, target) {
  // 遍历数组中的每一个元素
  for (let i = 0; i < arr.length; i++) {
    // 如果找到目标值，返回true
    if (arr[i].permission === target) {
      return arr[i];
    }
    // 如果元素是数组，递归调用这个函数
    if (arr[i].children && arr[i].children.length) {
      return findInArray(arr[i].children, target)
    }
  }
  // 如果没有找到，返回false
  return false;
}

function Login () {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [ name, setName ] = useState('');
  const [ password, setPassword ] = useState(import.meta.env.VITE_APP_MODE == 'development' ? 'Aa123456@' : '');
  const [ loading, setLoading ] = useState(false);

  const changName = (e) => {
    const value = e.target.value;
    setName(value)
  }
  const changPassword = (e) => {
    const value = e.target.value;
    setPassword(value)
  }
  const onKeyUpLogin = (e) => {
    if(e.keyCode == 13){
      getLogin();
    }
  }
  const getLogin = () => {
    if(!name) return message.error('请输入账号');
    if(!password) return message.error('请输入密码');
    setLoading(true)

    post('/portal/login', { name, password }).then(res => {
      setLoading(false);

      if(res.succeed){
        const data = res.data;
        if(data.tag != 'system') return message.error('账号不存在');
        // 获取用户信息
        const user = { avatar: data.avatar, nickName: data.nickName, userId: data.userId };

        // 获取所有的权限配置信息
        const fun = data.functionTagList;
        const sideView = [...fun, ...traverse(data.sideBarTree, 'permission')];

        // 处理左侧栏
        // 特殊处理固废栏目
        const barShow = ['waste:deliveryDetail', 'waste:storageDetail', 'waste:orderIn', 'waste:orderOut', 'waste:orderCargo', 'waste:orderSettle'];
        let barList = data.sideBarTree[0].treeData;
        let wasteIndex = barList.findIndex(o => o.permission == 'waste');
        if(wasteIndex >= 0){
          let s = [];
          barShow.forEach(e => {
            s = [...s, ...traverse(data.sideBarTree[wasteIndex].treeData, 'permission', e)]
          })
          if(s.length) barList[wasteIndex].child = s;
          else barList.splice(wasteIndex, 1);
        }

        if(!(barList && barList.length)){
          message.error('请联系管理员配置导航信息');
          return;
        }
        // 处理栏目的icon
        var list = [];
        menuList.forEach(e => {
          list.push(e);
          if(e.children && e.children.length){
            list = [...list, ...e.children];
          }
        })
        let bar = [];
        barList.forEach(e => {
          const obj = list.find(o => o.permission == e.permission);
          let nav;
          if(obj){
            nav = {label: obj.title, key: obj.permission, path: obj.path, icon: obj.icon};
          }
          if(e.child && e.child.length){
            let child = [];
            e.child.forEach(s => {
              let objs = list.find(o => o.permission == s.permission);
              if(objs){
                child.push({label: objs.title, key: objs.permission, path: objs.path})
              }
            })
            nav.children = child;
          }
          bar = [...bar, nav];
        })
        
        // 保存数据
        setItem('token', data.token);
        setItem('socket', data.topicId);
        setItem('sideBar', bar);
        setItem('userInfo', user);
        setItem('sideView', sideView);

        dispatch(setSideBar(bar));
        dispatch(setUserInfo(user));
        dispatch(setSideView(sideView));
        
        const row = bar[0];

        if(row.child && row.child.length){
          const obj = findInArray(routerList, row.child[0].permission);
          navigate(obj.path, {replace: true});
        }else{
          const obj = routerList.find(o => o.permission == row.permission);
          navigate(obj.path, {replace: true});
        }
      }
    })
  }
  return (
    <div className="Login">
      <div className="base">
        <div className="poser">
          <img src={backl} alt="" />
          <div className="form">
            <div className="left">
              <div className="post">
                <div className="name">登录</div>
                <div className="say">
                  <div className="item">
                    <div className="label">请输入账号</div>
                    <div className="test"><input type="text" placeholder="账号" value={name} onChange={(e) => changName(e)} /></div>
                  </div>
                  <div className="item">
                    <div className="label">请输入密码</div>
                    <div className="test"><input type="password" placeholder="密码" value={password} onChange={(e) => changPassword(e)} onKeyUp={ e => onKeyUpLogin(e) } /></div>
                  </div>
                </div>
                <div className="btnLogin">
                  <Button type="primary" className="btn" loading={loading} onClick={getLogin}>立即登录</Button>
                </div>
              </div>
            </div>
            <div className="right">
              <div className="ims">
                <img src={rightImage} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login