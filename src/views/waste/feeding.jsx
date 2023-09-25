import { useState, useEffect, useRef } from 'react';
import { ProForm } from '@ant-design/pro-components';
import { RedoOutlined, SearchOutlined } from '@ant-design/icons';
import { Table, Button, Space } from 'antd';
import { useSelector } from "react-redux";
import { post } from '@/api';
import { priceFormat, setValue } from '@/utils';

import MyInput from '../../components/from/MyInput';
import ElementAuto from '../Element'; // 用来计算表格的高度，实现一个页面显示所有东西

function Feeding(){
  let form = {}
  const [ companyType, setCompanyType ] = useState([]);
  const [ deviceCardTag, setDeviceCardTag ] = useState([]);
  const [ correctState, setCorrectState ] = useState([]);
  const [ deliveryDetailType, setDeliveryDetailType ] = useState([]);
  const [ dataList, setDataList ] = useState([]);

  const [ eleTotal, setEleTotal ] = useState(0);
  const [ total, setTotal ] = useState([]);
  const [ current, setCurrent ] = useState(1);
  const [ size, setSize ] = useState(15);

  const sideView = useSelector(state => state.store.sideView);

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
    }
  ];
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      name: 'id',
      width: 80,
      align: 'center'
    },
    {
      title: '公司名称',
      dataIndex: 'companyName',
      name: 'companyName',
      align: 'center',
      width: 140
    },
    {
      title: '设备名称',
      dataIndex: 'deviceName',
      name: 'deviceName',
      align: 'center',
    },
    {
      title: '投料类型',
      dataIndex: 'type',
      name: 'type',
      align: 'center',
      render: (text) => text == 1 ? '设备投料' : text == 2 ? '人工记账' : '修正投料'
    },
    {
      title: '废料名称',
      dataIndex: 'wasteName',
      name: 'wasteName',
      align: 'center',
    },
    {
      title: '投料重量(kg)',
      dataIndex: 'deliveryWeight',
      name: 'deliveryWeight',
      align: 'right',
      render: (text) => priceFormat(text, 2)
    },
    {
      title: '投料时间',
      dataIndex: 'deliveryAt',
      name: 'deliveryAt',
      align: 'center',
    },
    {
      title: '投料人',
      dataIndex: 'deliveryWeight',
      name: 'deliveryWeight',
      align: 'center',
      render: (text, row) => {
        let listValue = ['tlUserNickName', 'tlUserName', 'tlCardRemark' ,'tlCardCode']
        return setValue(row, listValue);
      }
    },
    {
      title: '工号',
      dataIndex: 'tlUserJobNum',
      name: 'tlUserJobNum',
      align: 'center',
    },
    {
      title: '项目码',
      dataIndex: 'xlCode',
      name: 'xlCode',
      align: 'center',
    },
    {
      title: 'PSA区域号',
      dataIndex: 'psaCode',
      name: 'psaCode',
      align: 'center',
    },
    {
      title: 'SAP物料号',
      dataIndex: 'sapCode',
      name: 'sapCode',
      align: 'center',
    },
    {
      title: '操作',
      align: 'center',
      fixed: 'right',
      width: 100,
      render: (text, row) => {
        return (
          <Space wrap>
          
            {
              row.correctPermission && sideView.includes('waste:deliveryDetail:correct') ? (
                <Button type="primary" size="small">修正</Button>
              ) : ''
            }
            {
              row.type == 3 && sideView.includes('waste:deliveryDetail:view') ? (
                <Button type="primary" size="small">查看详情</Button>
              ) : ''
            }
          </Space>
        )
      }
    },
  ]
  
  const setPage = (page, pageSize) => {
    setCurrent(page);
    setSize(pageSize);
    getList();
  }
  const onFinish = (e) => {
    console.log(e);
  }

  const boxElement = useRef(null);
  const formElement = useRef(null);
  useEffect(() => {
    getDic();
  }, [])

  return(
    <ElementAuto ele={ { boxElement, formElement } } handleTotal={(value) => setEleTotal(value)}>
      <div className='box' ref={boxElement}>
        <div ref={formElement} style={ {marginBottom: '15px'} }>
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
        </div>
        <Table rowKey="id" bordered size="small" columns={columns} dataSource={dataList} scroll={{ y: eleTotal, x: 1600 }} pagination={{
            position: ['none', 'bottomCenter'],
            pageSize: size,
            current: current,
            total: total,
            showTotal: (total) => `共 ${total} 条`,
            onChange: (page, pageSize) => setPage(page, pageSize)
          }} />
      </div>
    </ElementAuto>
  )
}

export default Feeding