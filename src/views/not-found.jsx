import notFoundImage from '../assets/img/404.png'

import '../assets/pageStyle/notFound.scss';

function NotFound(){
  return(
    <div className="tcy_404 container">
      <img src={notFoundImage} />
      <h2>抱歉，您访问的页面出错了</h2>
      <p>您可能输错了网址，或该网页已删除或不存在</p>
      <a href="/" className="btn btn-primary btn_blue">返回主页</a>
    </div>
  )
}

export default NotFound