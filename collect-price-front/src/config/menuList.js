
export const menuKey = {
    KIND: '001',
    PRICE: '002',
    SYSTEM: '003',
    DICT: '003001',
    PROJECT: '003001001',
    MATERIAL: '003001002',
    WEIGHT: '003001003',
    SHAPE: '003001004',
    PACK: '003001005',
    IDENTIFY: '003001006',
    GRADE: '003001007',
    PRICETYPE: '003001008',
    PRICEFROM: '003001009',
    MANAGER:'003002',
}
 
const menuList = [
    {
        code: menuKey.KIND,
        name: '纪念币品种',
        key: 'kind',
        path: '/kind',
        icon: 'appstore',
        operate: {
            '001': '查询',
            '002': '新增',
            '003': '新增-保存',
            '004': '纠错',
            '005': '纠错-保存'
        }
    },
    {
        code: menuKey.PRICE,
        name: '纪念币价格',
        key: 'price',
        path: '/price',
        icon: 'money-collect',
        operate: {
            '001': '查询',
            '002': '纠错',
            '003': '纠错-保存',
            '004': '录入',
            '005': '录入-查询',
            '006': '录入-采集价格',
            '007': '录入-采集价格-保存'
        }
    },
    {
        code: menuKey.SYSTEM,
        name: '系统管理',
        key: 'system', 
        icon: 'global',
        children: [
            {
                code: menuKey.DICT,
                name: '枚举管理',
                key: 'dict',
                icon: 'table',
                children: [
                    {
                        code: menuKey.PROJECT,
                        name: '纪念币项目',
                        key: 'project',
                        path: '/system/project',
                        operate: {
                            '001': '查询',
                            '002': '新增',
                            '003': '新增-保存',
                            '004': '修改',
                            '005': '修改-保存' 
                        }
                    },
                    {
                        code: menuKey.MATERIAL,
                        name: '材质',
                        key: 'material',
                        path: '/system/material',
                        operate: {
                            '001': '查询',
                            '002': '新增',
                            '003': '新增-保存',
                            '004': '修改',
                            '005': '修改-保存' 
                        }
                    },
                    {
                        code: menuKey.WEIGHT,
                        name: '重量单位',
                        key: 'weight',
                        path: '/system/weight',
                        operate: {
                            '001': '查询',
                            '002': '新增',
                            '003': '新增-保存',
                            '004': '修改',
                            '005': '修改-保存' 
                        }
                    },
                    {
                        code: menuKey.SHAPE,
                        name: '形状',
                        key: 'shape',
                        path: '/system/shape',
                        operate: {
                            '001': '查询',
                            '002': '新增',
                            '003': '新增-保存',
                            '004': '修改',
                            '005': '修改-保存' 
                        }
                    },
                    {
                        code: menuKey.PACK,
                        name: '包装版本',
                        key: 'pack',
                        path: '/system/pack',
                        operate: {
                            '001': '查询',
                            '002': '新增',
                            '003': '新增-保存',
                            '004': '修改',
                            '005': '修改-保存' 
                        }
                    },
                    {
                        code: menuKey.IDENTIFY,
                        name: '封装认证机构',
                        key: 'identify',
                        path: '/system/identify',
                        operate: {
                            '001': '查询',
                            '002': '新增',
                            '003': '新增-保存',
                            '004': '修改',
                            '005': '修改-保存' 
                        }
                    },
                    {
                        code: menuKey.GRADE,
                        name: '鉴定评级机构',
                        key: 'grade',
                        path: '/system/grade',
                        operate: {
                            '001': '查询',
                            '002': '新增',
                            '003': '新增-保存',
                            '004': '修改',
                            '005': '修改-保存' 
                        }
                    },
                    {
                        code: menuKey.PRICETYPE,
                        name: '价格类型',
                        key: 'priceType',
                        path: '/system/priceType',
                        operate: {
                            '001': '查询',
                            '002': '新增',
                            '003': '新增-保存',
                            '004': '修改',
                            '005': '修改-保存' 
                        }
                    },
                    {
                        code: menuKey.PRICEFROM,
                        name: '价格来源',
                        key: 'priceFrom',
                        path: '/system/priceFrom',
                        operate: {
                            '001': '查询',
                            '002': '新增',
                            '003': '新增-保存',
                            '004': '修改',
                            '005': '修改-保存' 
                        }
                    }
                ]
            },
            {
                code: menuKey.MANAGER,
                name: '用户管理',
                key: 'manager',
                path: '/system/manager',
                icon: 'table',
                operate: {
                    '001': '查询',
                    '002': '新增',
                    '003': '新增-保存',
                    '004': '修改',
                    '005': '修改-保存' ,
                    '006': '启用' ,
                    '007': '停用' ,
                    '008': '密码重置' 
                }
            }
        ]
    }
]

export default menuList
