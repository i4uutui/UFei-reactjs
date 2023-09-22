import { ModalForm, ProForm, ProFormText } from '@ant-design/pro-components';
import { post } from '@/api';
import { message } from '../../Popups';

const Password = (() => {

  const trigger = <div className="item">修改密码</div>;
  const modalProps = {
    keyboard: false,
    maskClosable: false,
    okText: '提交',
    cancelText: '取消',
    centered: true,
    closeIcon: false,
    destroyOnClose: true,
    getContainer: false
  }
  let rules = {
    originPassword: [
      { required: true, message: '请输入原密码', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入新密码', trigger: 'blur' },
      { min: 8, message: '请输入大于8位数的密码', trigger: 'blur' }
    ]
  }
  const onFinish = (params) => {
    return new Promise((resolve) => {
      post('/portal/updatePassword', params).then(res => {
        if(res.succeed){
          message.success('操作成功');
          resolve(true);
        }
      })
    });
  }
  return(
    <>
      <ModalForm title="修改密码" layout='horizontal' submitTimeout={2000} trigger={trigger} grid={true} width={450} modalProps={modalProps} onFinish={ async (e) => { await onFinish(e); return true } }>
        <ProForm.Group>
          <ProFormText name="originPassword" label="原密码" placeholder="请输入原密码" allowClear={false} rules={rules.originPassword} />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText.Password name="password" label="新密码" placeholder='请输入新密码' fieldProps={ {visibilityToggle: false} } rules={rules.password} />
        </ProForm.Group>
      </ModalForm>
    </>
  )
}) 

export default Password