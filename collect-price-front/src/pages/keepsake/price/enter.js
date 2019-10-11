import React, { Component } from 'react' 
import { Button, Table, Modal,message,ConfigProvider } from 'antd'
import axios from 'axios'
import moment from 'moment';
import './../index.less'
import CreateForm from './create'
import { connect } from 'react-redux' 
import { set_bread_crumb } from '../../../reducer/breadCrumb'  
import auth from '../../../auth/index'
import { menuKey } from '../../../config/menuList' 
import zhCN from 'antd/lib/locale-provider/zh_CN';

class ksEnter extends Component{


    constructor(props) {
        super(props)
        this.state = {
            isVisible: false,
            goodsId: this.props.match.params.goodsId,
            baseSelect: '',
            loadingTable: false,
            saveLoading: false
        }
    } 

    page = {
        pageNo: 1,
        pageSize: 10
    }


    requestList=()=>{
        let _this = this;
        let componentCode = auth(menuKey.PRICE, '005').authCode
        this.setState({
            loadingTable: true
        })
        axios({
            method: 'post',
            url: '/manager/busi_goods_price/listByGoodsId',  
            params: {
                pageNo: this.page.pageNo,
                pageSize: this.page.pageSize,
                goodsId: this.props.match.params.goodsId,
                componentCode: componentCode
            }    
        })
        .then((res)=>{
            if(res.status == '200'){
                let code = res.data.code;
                this.setState({
                    loadingTable: false
                })
                if(code == '00'){                
                    (res.data.data.list || []).map((item, index)=>{
                        item.key = index
                    })
                    this.setState({                    
                        dataSource:res.data.data.list,  
                        pagination: {
                            total: res.data.data.listCount,
                            current: this.page.pageNo, 
                            showTotal:()=>{
                                return `共${res.data.data.listCount}条`
                            },
                            onChange: (pageNo,pageSize )=>{
                                _this.page.pageNo = pageNo;
                                _this.page.pageSize = pageSize;
                                _this.requestList();
                            },
                            showSizeChanger : true,
                            onShowSizeChange: (pageNo,pageSize)=>{
                                _this.page.pageNo = pageNo;
                                _this.page.pageSize = pageSize;
                                _this.requestList();
                            },
                            showQuickJumper: {goButton:<a style={{textDecoration:"underline",paddingLeft:10}}>跳转</a>}
                        }
                    })
                }else if(code == '99'){
                    message.error('登录失败，请重新登录', () => {
                        this.props.history.push('/login') 
                    });
                }else if(code == '98'){
                    message.error('权限验证失败');
                }
            }
        })
        .catch(() => {
            message.error('数据异常重试')
        });
    }


    //新建，校改下拉列表选项
    requestSelect=()=>{
        let type = this.state.formType
        let componentCode = ''
        type == 'update' ? componentCode = auth(menuKey.PRICE, '002').authCode : componentCode = auth(menuKey.PRICE, '006').authCode
        axios({
            method: 'post',
            url: '/manager/busi_goods_price/add',
            params: {
                componentCode: componentCode
            }
        })
        .then((res) => {
            if(res.status == '200'){
                let code = res.data.code 
                if(code == '00'){ 
                    this.setState({  
                        isVisible: true,                    
                        baseSelect: res.data.data,                      
                    })  
                }else if(code == '99'){
                    message.error('登录失败，请重新登录', () => {
                        this.props.history.push('/login') 
                    });
                }else if(code == '98'){
                    message.error('权限验证失败');
                }
            }          
        })
        .catch(() => {
            message.error('数据异常重试')
        });
    }

    //进入录入价格
    handleEnterCreateForm=()=>{
        if(!this.state.baseSelect){
            this.requestSelect()  
        }else {
            this.setState({
                isVisible: true,
            })
        }   
        this.setState({
            title:'录入价格',
            formType: 'create',
            updateInfo: ''
        })
        
    }
    
     //保存数据
    handleSubmit = ()=> {
        //获取到创建的所有值
        this.createForm.props.form.validateFields((err, values)=>{
            if(!err){
                this.setState({
                    saveLoading: true
                }) 
                let data = this.createForm.props.form.getFieldsValue()
                data.goodsId = this.state.goodsId
                data.businessTime = data.businessTime.format('YYYY-MM-DD')
                data.componentCode = auth(menuKey.PRICE, '007').authCode
                this.submit(data);
            }
        })  
    }  

    //保存
    submit =(data)=>{
        axios({
            method: 'post',
            url: '/manager/busi_goods_price/save',
            params: data      
        })
        .then((res) => {
            if(res.status == '200'){
                let code = res.data.code 
                if(code == '00'){ 
                    message.success('纪念币数据添加成功');
                    this.setState({
                        isVisible: false,
                        updateInfo: '',                       
                    })
                    this.createForm.props.form.resetFields()
                    this.requestList()                 
                }else if(code == '99'){
                    message.error('登录失败，请重新登录', () => {
                        this.props.history.push('/login') 
                    });
                }else if(code == '98'){
                    message.error('权限验证失败');
                }else {
                    message.error(res.data.msg);
                }
                this.setState({
                    saveLoading: false,
                })
            }           
        })
        .catch(() => {
            this.setState({
                saveLoading: false,
            })
            message.error('数据异常重试')
        });
    }

    //暂不添加
    handleNoAddClick = () =>{
        this.setState({
            isVisible: false,
        })
        this.createForm.props.form.resetFields()
    }

     // 校改操作
     handleUpdate = (record)=>{
        if(!this.state.baseSelect){
            this.requestSelect()  
        }else (
            this.setState({
                isVisible: true, 
            })
        ) 
        this.setState({        
            title: '价格校改',
            updateInfo: record,
            id: record.id,
            formType: 'update'
        })
    }

     //校改保存数据
     handleUptSubmit = () =>{         
        this.createForm.props.form.validateFields((err, values)=>{
            if(!err){
                this.setState({
                    saveLoading: true
                }) 
                let data = this.createForm.props.form.getFieldsValue()
                data.id = this.state.id
                data.businessTime = data.businessTime.format('YYYY-MM-DD')
                data.componentCode = auth(menuKey.PRICE, '003').authCode
                this.update(data);
            }
        })
    }

     //校改保存
     update =(data)=>{
        axios({
            method: 'post',
            url: '/manager/busi_goods_price/saveUpdate',
            params: data,
        })
        .then((res) => {
            if(res.status == '200'){
                let code = res.data.code 
                if(code == '00'){ 
                    message.success('修改成功');
                    this.setState({
                        isVisible: false,
                        updateInfo: '',                      
                    })
                    this.createForm.props.form.resetFields()
                    this.requestList()                 
                }else if(code == '99'){
                    message.error('登录失败，请重新登录', () => {
                        this.props.history.push('/login') 
                    });
                }else if(code == '98'){
                    message.error('权限验证失败');
                }else {
                    message.error(res.data.msg);
                }
                this.setState({
                    saveLoading: false,
                })
            }           
        })
        .catch(() => {
            this.setState({
                saveLoading: false,
            })
            message.error('数据异常重试')
        });
    }

    componentDidMount () {
        this.props.dispatch(set_bread_crumb(['首页', '贵金属纪念币价格', decodeURIComponent(this.props.match.params.goodsName)+this.props.location.hash]));
        this.requestList()
    }
  
    render(){
        const columns = [
            {
                title:'采集人',
                dataIndex:'create_user_name',
                width: 110
            },
            {
                title:'采集时间',
                dataIndex:'create_time',
                width: 110,
                render:(text, record)=>{
                    return <span>{moment(record.create_time).format('YYYY-MM-DD') }</span>
                }
            },
            {
                title: '成交时间',
                dataIndex: 'business_time',
                width: 130,
                render:(text, record)=>{
                    return <span>{moment(record.business_time).format('YYYY-MM-DD') }</span>
                }
            },
            {
                title: '包装版本',
                dataIndex: 'goods_packing_value',
                width: 80,
                render: (text, record)=>{
                    return <span style={{wordBreak:"break-all", width: 80}}>{record.goods_packing_value}</span>
                }
            },
            {
                title: '封装认证机构',
                dataIndex: 'certification_authority_value',
                width: 100,
                render(state){
                    return !state ?'——' : state
                }
            },
            {
                title: '封装评级机构',
                dataIndex: 'rating_agencies_value',
                width: 80,
                render(state){
                    return !state ? '——' : state
                }
            },
            {
                title: '评级分数',
                dataIndex: 'rating_fraction',
                width: 80,
                render(state){
                    return !state ? '——' : state
                }
            },
            {
                title: '价格类型',
                dataIndex: 'price_type_value',
                width: 100
            },
            {
                title: '价格（元）',
                dataIndex: 'goods_price',
                width: 80,
                render: (text, record)=>{
                    return <span style={{wordBreak:"break-all", width: 80}}>{record.goods_price}</span>
                }
            },
            {
                title: '价格来源',
                dataIndex: 'price_source_value',
                width: 80
            },
            {
                title: '成交数量',
                dataIndex: 'quantity',
                width: 80,
                render: (text, record)=>{
                    return <span style={{wordBreak:"break-all", width: 80}}>{record.quantity}</span>
                }
            },
            {
                title: '备注',
                dataIndex: 'remarks',
                width: 100,
                render: (text, record)=>{
                    return <span style={{wordBreak:"break-all", width: 100}}>{record.remarks}</span>
                }
            },
            {
                title: '操作', 
                width: 80,
                render: (text,record)=>{
                    return auth(menuKey.PRICE, '002').isAuth ? <a onClick={() => { this.handleUpdate(record) }}>校改</a> : ''
                }
            }
        ]

        return (           
            <div>       
                <div className='price-enter-btn'>
                    {
                        auth(menuKey.PRICE, '006').isAuth ? <Button type="primary" onClick={this.handleEnterCreateForm}>录入采集价格</Button> : ''
                    }
                                    
                </div>
                <div className='tb-style'>
                    <div className='price-title'>已采集价格</div>
                    <ConfigProvider  locale={zhCN}>
                        <Table                   
                            bordered    
                            columns={columns}
                            dataSource={this.state.dataSource}
                            pagination={this.state.pagination}
                            loading={this.state.loadingTable}
                        />
                    </ConfigProvider>                
                </div>  
                <Modal
                    title={this.state.title}
                    width={700}
                    visible={this.state.isVisible}
                    destroyOnClose= {true}
                    onCancel={()=>{                       
                        this.setState({
                            isVisible: false,
                            updateInfo: ''
                        })
                        this.createForm.props.form.resetFields()
                    }}
                    footer={
                        this.state.formType == 'update' ? 
                            ([                                                                                      
                                <Button key="submit" type="primary" loading={this.state.saveLoading} onClick={this.handleUptSubmit}>确定校改</Button>,
                            ]) : 
                            ([                                                                                           
                                <Button key="submit" type="primary" loading={this.state.saveLoading} onClick={this.handleSubmit}>保存</Button>,
                                <Button key="back" onClick={this.handleNoAddClick}>取消</Button>,
                            ])
                    }
                >    
                    <CreateForm baseSelect={this.state.baseSelect} updateInfo={this.state.updateInfo}  wrappedComponentRef={(inst) => {this.createForm = inst }} />             
                </Modal>     
            </div>
        );
    }
}

export default connect()(ksEnter)