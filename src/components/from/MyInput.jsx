import { ProFormText, ProFormDateRangePicker, ProFormSelect } from '@ant-design/pro-components';

function MyInput({child}) {
  const fieldProps = {
    style:{ width: '175px' },
    size: 'small'
  }
  return (
    <>
      {
        child.map((e, index) => {
          if(e.type == 'text'){
            return <ProFormText key={index} type='text' fieldProps={ { ...e.props, ...fieldProps } } name={e.name} label={e.label} placeholder={'请输入' + e.label} />
          }else if(e.type == 'select'){
            return <ProFormSelect key={index} name={e.name} label={e.label} placeholder={'请选择' + e.label} fieldProps={ { ...e.props, ...fieldProps } } options={e.list} />
          }else if(e.type == 'date'){
            return <ProFormDateRangePicker key={index} name={e.name} label="日期" fieldProps={ { ...e.props, ...fieldProps, style:{ width: '250px' } } } />
          }
        })
      }
    </>
  )
}

export default MyInput