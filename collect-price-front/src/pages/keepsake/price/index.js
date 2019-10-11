import React, { Component } from 'react' 
import { Button, Table, Modal, message,ConfigProvider } from 'antd'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux' 
import axios from 'axios'
import moment from 'moment';
import CreateForm from './create'
import { set_bread_crumb } from '../../../reducer/breadCrumb'  
import { set_current_menu } from '../../../reducer/switchMenu' 
import auth from '../../../auth/index'
import { menuKey } from '../../../config/menuList' 
import './../index.less'
import SearchForm from './search'
import zhCN from 'antd/lib/locale-provider/zh_CN'


class ksPrice extends Component{

    state = {
        isVisible: false,
        checkSelect: '',
        checkData: {},
        loadingTable: false,
        saveLoading: false,
        checkLoading: false,
        checkBtn: false,
    }

    page = {
        pageNo: 1,
        pageSize: 10
    }

    requestList=()=>{
        let _this = this;
        //权限
        let componentCode = {
            componentCode: auth(menuKey.PRICE, '001').authCode
        } 
        let query = {..._this.state.checkData, ..._this.page, ...componentCode}
        this.setState({
            loadingTable: true
        })
        axios({
            method: 'post',
            url: '/manager/busi_goods_price/list',  
            params: query  
        })
        .then((res)=>{
            if(res.status == '200'){
                let code = res.data.code;
                this.setState({
                    loadingTable: false
                })
                if(code == '00'){  
                    if(this.state.checkBtn){
                        this.setState({
                            checkBtn: false
                        })
                        message.success('查询成功');  
                    }               
                    (res.data.data.list || []).map((item, index)=>{
                        item.key = index
                    })
                    this.setState({                    
                        dataSource:res.data.data.list,  
                        checkSelect: res.data.data,
                        checkLoading: false,
                        saveLoading: false,
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

    componentWillMount() { 
        this.props.dispatch(set_bread_crumb(['首页','贵金属纪念币价格']));
        this.props.dispatch(set_current_menu(['price']))
    } 

    componentDidMount () {     
        let checkData = this.searchForm.props.form.getFieldsValue();
        this.setState({
            checkData
        })
        const pageNum = sessionStorage.getItem('currentPageNo')
        if(pageNum){
            this.page.pageNo = parseInt(pageNum)
            sessionStorage.removeItem('currentPageNo')
        }
        setTimeout(()=>{
            this.requestList()
        },10) 
    }

    //查询
    handleCheck = () => {
        let checkData = this.searchForm.props.form.getFieldsValue()       
        this.setState({
            checkData: checkData,
            checkLoading: true,
            checkBtn: true
        })
        this.page.pageNo = 1
        setTimeout(()=>{
            this.requestList()
        },10)
    }  

   //重置
    handleReset =()=>{
        this.searchForm.props.form.resetFields();
    }

    //暂不添加
    handleNoAddClick = () =>{
        this.setState({
            isVisible: false,
        })
        this.createForm.props.form.resetFields()
    }


    handleUpdate=(record)=>{
        let componentCode = auth(menuKey.PRICE, '002').authCode
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
                        updateInfo:  record,
                        id: record.id                   
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

    handleUpdateSubmit=()=>{
        this.createForm.props.form.validateFields((err, values)=>{   
            if(!err){
                this.setState({
                    saveLoading: true
                }) 
                let data = this.createForm.props.form.getFieldsValue()
                data.id = this.state.id
                data.businessTime = data.businessTime.format('YYYY-MM-DD')
                data.componentCode =  auth(menuKey.PRICE, '003').authCode
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
                    this.setState({
                        isVisible: false,
                        updateInfo: ''
                    })
                    message.success('修改成功');
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
            }           
        })
        .catch(() => {
            this.setState({
                saveLoading: false
            })
            message.error('数据异常重试')
        });
    }

    handleClickGoodsName = (record) => {   
        sessionStorage.setItem('currentPageNo', this.page.pageNo)
        const goodsId = record.goods_id
        const goodsName = record.goods_name
        this.props.history.push('/priceenter/'+goodsId + '/'+ goodsName)
    }


    render(){
        const columns = [
            {
                title:'采集人',
                dataIndex:'create_user_name',
                width: 60
            },
            {
                title: '采集时间',
                dataIndex: 'create_time',
                width: 80,
                render:(text, record)=>{
                    return <span>{moment(record.create_time).format('YYYY-MM-DD') }</span>
                }
            },
            {
                title:'纪念币项目',
                dataIndex:'project_id_value',
                width: 80,
                render: (text, record)=>{
                    return <span style={{display: "inline-block",width: 60,wordBreak:"break-all"}} >{ record.project_id_value }</span>
                }
            },
            {
                title: '纪念币名称',
                dataIndex: 'goods_name',
                width: 80,
                render: (text, record)=>{
                    return <span style={{display: "inline-block",width: 60,wordBreak:"break-all",cursor: "pointer",}} onClick={()=>this.handleClickGoodsName(record)}>{ record.goods_name }</span>
                }
            },
            {
                title: '成交时间',
                dataIndex: 'business_time',
            },
            {
                title: '包装版本',
                dataIndex: 'goods_packing_value',
                width: 90
            },
            {
                title: '封装认证机构',
                dataIndex: 'certification_authority_value',
                width: 80,
                render(state){
                    return !state ? "——" : <span style={{width: 80, wordBreak:"break-all"}}>{state}</span>
                }
            },
            {
                title: '封装评级机构',
                dataIndex: 'rating_agencies_value',
                width: 80,
                render(state){
                    return !state ? "——" : <span style={{width: 80, wordBreak:"break-all"}}>{state}</span>
                }
            },
            {
                title: '评级分数',
                dataIndex: 'rating_fraction',
                width: 80,
                render(state){
                    return !state ? "——" : <span style={{width: 80, wordBreak:"break-all"}}>{state}</span>
                }
            },
            {
                title: '价格类型',
                dataIndex: 'price_type_value',
                width: 90,
            },
            {
                title: '价格（元）',
                dataIndex: 'goods_price',
                width: 60,
                render: (text, record)=>{
                    return <span style={{color: 'red', wordBreak:"break-all", width: 60}}>{record.goods_price}</span>
                }
            },
            {
                title: '价格来源',
                dataIndex: 'price_source_value',
                width: 70
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
                width: 90,
                render: (text, record)=>{
                    return <span style={{wordBreak:"break-all", width: 90}}>{record.remarks}</span>
                }
            },
            {
                title: '操作',
                width: 70,
                render: (text,record)=>{
                    return auth(menuKey.PRICE, '002').isAuth ? <a onClick={() => { this.handleUpdate(record) }}>校改</a> : ''
                }
            }
        ]

        return (           
            <div> 
                <div>
                    <SearchForm checkSelect={this.state.checkSelect}  wrappedComponentRef={(inst) => {this.searchForm = inst }} />
                </div>
                <div className='keepsake-price-btn'>
                    {
                        auth(menuKey.PRICE, '001').isAuth ? <Button type="primary" loading={this.state.checkLoading} onClick={this.handleCheck}>查询</Button> : ''
                    }
                    
                    <Button onClick={this.handleReset}>重置</Button>
                </div>
                <div className='tb-style'>
                    <ConfigProvider  locale={zhCN}>
                        <Table                   
                            bordered    
                            scroll={{x: '100%'}}   
                            columns={columns}
                            dataSource={this.state.dataSource}
                            pagination={this.state.pagination}
                            loading={this.state.loadingTable}
                        />
                    </ConfigProvider>
                </div>  
                <Modal
                    title='价格校改'
                    width={700}
                    visible={this.state.isVisible}
                    onCancel={()=>{                        
                        this.setState({
                            isVisible: false,
                        })
                        this.createForm.props.form.resetFields()
                    }} 
                    footer={ 
                            ([                                                            
                                <Button key="back" onClick={this.handleNoAddClick}>暂不添加</Button>,
                                auth(menuKey.PRICE, '003').isAuth ? <Button key="submit" type="primary" loading={this.state.saveLoading} onClick={this.handleUpdateSubmit}>保存</Button> : '',
                            ])
                        }


                >    
                    <CreateForm baseSelect={this.state.baseSelect} updateInfo={this.state.updateInfo}  wrappedComponentRef={(inst) => {this.createForm = inst }} />             
                </Modal>  
            </div>
        );
    }
}

export default connect()(ksPrice)