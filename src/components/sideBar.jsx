let menuList = [
  {
    id: 13000,
    title: '固废管理',
    icon: 'el-icon-home',
    path: '/waste',
    name: "waste",
    permission: "waste",
    children: [
      {
        id: 13100,
        title: '投料记录',
        name: 'waste/feeding',
        path: '/waste/feeding',
        permission: "waste:deliveryDetail"
      },
      {
        id: 13150,
        title: '暂存单',
        name: 'waste/storage',
        path: '/waste/storage',
        permission: "waste:storageDetail"
      },
      {
        id: 13160,
        title: '入库单',
        name: 'waste/orderIn',
        path: '/waste/orderIn',
        permission: "waste:orderIn"
      },
      {
        id: 13170,
        title: '出库单',
        name: 'waste/orderOut',
        path: '/waste/orderOut',
        permission: "waste:orderOut"
      },
      {
        id: 13300,
        title: '拉货单',
        name: 'waste/good',
        path: '/waste/good',
        permission: "waste:orderCargo"
      },
      {
        id: 13400,
        title: '结帐单',
        name: 'waste/settlement',
        path: '/waste/settlement',
        permission: "waste:orderSettle"
      }
    ]
  },
  {
    id: 13500,
    title: '危废管理',
    icon: 'el-icon-weifei',
    path: '/danger',
    name: "danger",
    permission: 'hw',
    children: [
      {
        id: 13510,
        title: '危废产生记录',
        name: 'danger/delivery',
        path: '/danger/delivery',
        permission: 'hw:delivery',
      },
      {
        id: 13520,
        title: '危废入库记录',
        name: 'danger/storageIn',
        path: '/danger/storageIn',
        permission: 'hw:storageIn',
      },
      {
        id: 13530,
        title: '危废出库记录',
        name: 'danger/storageOut',
        path: '/danger/storageOut',
        permission: 'hw:storageOut',
      }
    ]
  },
  {
    id: 14000,
    title: '原料管理',
    icon: 'el-icon-yuanliaocangfengbao',
    path: '/material',
    name: "material",
    permission: 'materiel',
    children: [
      {
        id: 14100,
        title: '今日行情',
        name: "material/today",
        path: '/material/today',
        permission: 'materiel:price'
      },
      {
        id: 14200,
        title: '行情导入',
        name: "material/quotation",
        path: '/material/quotation',
        permission: 'materiel:market'
      }
    ]
  },
  {
    id: 15000,
    title: '客户管理',
    icon: 'el-icon-waste',
    name: "customer",
    path: '/customer/list',
    permission: "company:list"
  },
  {
    id: 16000,
    title: '设备管理',
    icon: 'el-icon-device',
    path: '/device',
    name: 'device',
    permission: "device",
    children: [
      {
        id: 16100,
        title: '设备列表',
        name: 'device/list',
        path: '/device/list',
        permission: "device:list"
      },
      {
        id: 16200,
        title: '运行日志',
        name: 'device/func',
        path: '/device/func',
        permission: "device:log"
      },
      {
        id: 16300,
        title: '异常警告',
        name: 'device/warn',
        path: '/device/warn',
        permission: "device:warning"
      }
    ]
  },
  {
    id: 17000,
    title: '运营单位',
    icon: 'el-icon-waste',
    name: "operates",
    path: '/operates/list',
    permission: "operator:list",
  },
  {
    id: 17900,
    title: '数据分析',
    icon: 'el-icon-waste',
    path: '/analysis',
    name: "analysis",
    permission: 'ds',
    children: [
      {
        id: 17910,
        title: '大屏配置',
        name: "analysis/data",
        path: '/analysis/data',
        permission: 'ds:ls',
      }
    ]
  },
  {
    id: 18000,
    title: '移动设置',
    icon: 'el-icon-waste',
    name: "mobile",
    path: '/mobile',
    permission: 'ma',
    children: [
      {
        id: 18100,
        title: '新闻资讯',
        name: "mobile/news",
        path: '/mobile/news',
        permission: 'ma:news',
      },
      {
        id: 18200,
        title: '原料行情',
        name: "mobile/waste",
        path: '/mobile/waste',
        permission: 'ma:materielMarket',
      },
      {
        id: 18300,
        title: '预约上门',
        name: "mobile/appoint",
        path: '/mobile/appoint',
        permission: 'ma:reserve',
      },
      {
        id: 18400,
        title: '意见反馈',
        name: "mobile/opinion",
        path: '/mobile/opinion',
        permission: 'ma:feedback',
      }
    ]
  },
  {
    id: 19000,
    title: '系统配置',
    icon: 'el-icon-peizhi',
    path: '/setting',
    name: "setting",
    permission: 'setting',
    children: [
      {
        id: 19100,
        title: '设备类型',
        name: "setting/device",
        path: '/setting/device',
        permission: 'setting:deviceType'
      },
      {
        id: 20000,
        title: '产品配置',
        name: "setting/product",
        path: '/setting/product',
        permission: 'setting:product'
      },
      {
        id: 19200,
        title: '原料配置',
        name: "setting/material",
        path: '/setting/material',
        permission: 'setting:materiel'
      },
      {
        id: 19300,
        title: '客户配置',
        name: "setting/company",
        path: '/setting/company',
        permission: 'setting:company'
      },
      {
        id: 19400,
        title: '运营配置',
        name: "setting/operate",
        path: '/setting/operate',
        permission: 'setting:operator'
      },
      {
        id: 19500,
        title: '后台用户',
        name: "setting/user",
        path: '/setting/user',
        permission: 'setting:sysUser'
      },
      {
        id: 19600,
        title: '角色管理',
        name: "setting/role",
        path: '/setting/role',
        permission: 'setting:secRole'
      },
      {
        id: 19700,
        title: '数据字典',
        name: "setting/dictionary",
        path: '/setting/dictionary',
        permission: 'setting:sysDict'
      },
      {
        id: 19800,
        title: '操作日志',
        name: "setting/running",
        path: '/setting/running',
        permission: 'setting:sysOperateLog'
      },
      {
        id: 19900,
        title: '预警配置',
        name: "setting/warning",
        path: '/setting/warning',
        permission: 'setting:alertConfig'
      }
    ]
  }
]
export default menuList;