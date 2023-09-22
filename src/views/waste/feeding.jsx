import { useState, useEffect } from 'react';
import { ProForm } from '@ant-design/pro-components';
import { RedoOutlined, SearchOutlined } from '@ant-design/icons';
import { Table, Pagination } from 'antd';
import { post } from '@/api';

import MyInput from '../../components/from/MyInput';

function Feeding(){
  let form = {}
  const [ companyType, setCompanyType ] = useState([]);
  const [ deviceCardTag, setDeviceCardTag ] = useState([]);
  const [ correctState, setCorrectState ] = useState([]);
  const [ deliveryDetailType, setDeliveryDetailType ] = useState([]);
  const [ dataList, setDataList ] = useState([]);
  const [ total, setTotal ] = useState([]);
  const [ current, setCurrent ] = useState(1);
  const [ size, setSize ] = useState(10);

  let getDic = async () => {
    let params = {
      typeCodes: ['deliveryDetailType', 'correctState', 'deviceCardTag', 'companyType']
    }
    let res = await post('/admin/snippet/dictMap', params);
    if(res.succeed){
      let data = res.data;
      setDeliveryDetailType(data.deliveryDetailType);
      setCorrectState(data.correctState);
      setDeviceCardTag(data.deviceCardTag);
      setCompanyType(data.companyType);
      getList();
    }
  }
  let getList = async () => {
    let params = {
      current: current,
      size: size,
      ...form
    }
    // if (dateRange.value && dateRange.value.length) {
    //   params.beginAt = dateRange.value[0] + '00:00:00';
    //   params.endAt = dateRange.value[1] + '23:59:59';
    // }
    var res = await post('/admin/deliveryDetail/page', params);
    if (res.succeed) {
      var data = res.data;
      setTotal(data.total);
      setDataList(data.records)
    }
  }
  useEffect(() => {
    getDic();
  }, [])
  
  const onFinish = (e) => {
    console.log(e);
  }

  const inputContent = [
    {
      type: 'date',
      label: '日期',
      name: 'dateRange',
      props: {size: 'small'}
    },
    {
      type: 'text',
      label: '公司名称',
      name: 'companyName',
      props: {size: 'small', allowClear: false}
    },
    {
      type: 'select',
      label: '公司类型',
      name: 'companyType',
      list: companyType,
      props: { size: 'small', style:{width: '175px'}, fieldNames: {label: 'name', value: 'code'} }
    },
    {
      type: 'text',
      label: '设备编码',
      name: 'deviceCode',
      props: {size: 'small', allowClear: false}
    },
    {
      type: 'text',
      label: '废料名称',
      name: 'wasteName',
      props: {size: 'small', allowClear: false}
    },
    {
      type: 'select',
      label: '投料类型',
      name: 'type',
      list: deliveryDetailType,
      props: { size: 'small', style:{width: '175px'}, fieldNames: {label: 'name', value: 'code'} }
    },
    {
      type: 'select',
      label: '投料状态',
      name: 'state',
      list: correctState,
      props: { size: 'small', style:{width: '175px'}, fieldNames: {label: 'name', value: 'code'} }
    },
    {
      type: 'select',
      label: '废料状态',
      name: 'storageFlag',
      list: [{ name: '已暂存', code: 1 }, { name: '未暂存', code: 0 }],
      props: { size: 'small', style:{width: '175px'}, fieldNames: {label: 'name', value: 'code'} }
    },
    {
      type: 'select',
      label: '卡标签',
      name: 'tlCardTag',
      list: deviceCardTag,
      props: { size: 'small', style:{width: '175px'}, fieldNames: {label: 'name', value: 'code'} }
    },
    {
      type: 'text',
      label: '项目码',
      name: 'xlCode',
      props: {size: 'small', allowClear: false}
    },
    {
      type: 'text',
      label: 'PSA区域号',
      name: 'psaCode',
      props: {size: 'small', allowClear: false}
    },
    {
      type: 'text',
      label: 'SAP物料号',
      name: 'sapCode',
      props: {size: 'small', allowClear: false}
    },
    {
      type: 'text',
      label: '工号',
      name: 'jobNum',
      props: {size: 'small', allowClear: false}
    },
    {
      type: 'text',
      label: '设备名称',
      name: 'deviceName',
      props: {size: 'small', allowClear: false}
    },
  ]

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      name: 'id'
    },
    {
      title: '公司名称',
      dataIndex: 'companyName',
      name: 'companyName'
    },
    {
      title: '设备名称',
      dataIndex: 'deviceName',
      name: 'deviceName'
    },
    {
      title: '投料类型',
      dataIndex: 'type',
      name: 'type',
      render: (text) => <a>{text == 1 ? '设备投料' : text == 2 ? '人工记账' : '修正投料'}</a>
    }
  ]

  return(
    <div className='box'>
      <ProForm layout="inline" submitter={ {
        searchConfig: {
          submitText: '搜索',
          resetText: '重置',
        },
        submitButtonProps: {
          size: 'small',
          icon: <SearchOutlined />
        },
        resetButtonProps: {
          size: 'small',
          icon: <RedoOutlined />
        }
      } } onFinish={ onFinish }>
        <MyInput child={inputContent}></MyInput>
      </ProForm>
      <Table columns={columns} dataSource={dataList} pagination={{
          position: ['none', 'bottomCenter'],
          pageSize: size,
          current: current,
          total: total,
          showTotal: (total) => `共 ${total} 条`
        }} />
    </div>
  )
}

export default Feeding