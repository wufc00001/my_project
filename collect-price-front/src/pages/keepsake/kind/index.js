import React, { Component } from 'react' 
import { Button, Table, Modal,message,Carousel,ConfigProvider,Icon } from 'antd'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux' 
import { set_bread_crumb } from '../../../reducer/breadCrumb'  
import { set_current_menu } from '../../../reducer/switchMenu' 
import './../index.less'
import SearchForm from './search'
import CreateForm from './create' 
import auth from '../../../auth/index'
import { menuKey } from '../../../config/menuList'
import { imgKey } from '../../../imgUrl'
import zhCN from 'antd/lib/locale-provider/zh_CN'

class ksKind extends Component{

    state = {
        isVisible: false,
        baseSelect: '',
        checkSelect: {},
        fileList: [],
        coinImgIsVisible: false,
        checkLoading: false,
        checkBtn: false,
        saveLoading: false,
        loadingTable: false,
        addBtnLoading: false,
        imgUrl: ''
    }

    componentWillMount() { 
        this.props.dispatch(set_bread_crumb(['首页','贵金属纪念币']));
        this.props.dispatch(set_current_menu(['kind']))
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

    page = {
        pageNo: 1,
        pageSize: 10
    }


    requestList=()=>{
        let _this = this;
        //权限
        let componentCode = {
            componentCode: auth(menuKey.KIND, '001').authCode
        } 
        let query = {..._this.state.checkData, ..._this.page, ...componentCode}
        this.setState({
            loadingTable: true
        })
        axios({
            method: 'post',
            url: '/manager/busi_goods/list',  
            params: query
        })
        .then((res)=>{
            if(res.status == '200'){
                let code = res.data.code;
                this.setState({
                    loadingTable: false
                })
                if(code == '99'){
                    message.error('登录失败，请重新登录', () => {
                        this.props.history.push('/login') 
                    });
                }else if(code == '98'){
                    message.error('权限验证失败');
                }else if(code == '00'){ 
                    if(this.state.checkBtn){
                        this.setState({
                            checkBtn: false
                        })
                        message.success('查询成功');  
                    }                             
                    (res.data.data.busiGoodsList || [] ).map((item, index)=>{
                        item.key = index
                    })
                    this.setState({                    
                        dataSource:res.data.data.busiGoodsList, 
                        checkSelect: res.data.data,
                        checkLoading: false,
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
                } 
            }
        })
        .catch(() => {
            this.setState({ 
                checkLoading: false
            })
            message.error('系统异常重试')
        });
    }

    //添加操作
    handleCreate = ()=>{ 
        this.setState({
            addBtnLoading: true,
        })
        if(!this.state.baseSelect){
            this.requestSelect()  
        }else {
            this.setState({
                isVisible: true
            })
        }   
        this.setState({
            title:'添加纪念币',
            updateInfo: '',
            formType: 'create',
            addBtnLoading: false
        })
    }

    requestSelect=()=>{
        let type = this.state.formType
        let componentCode = ''
        type == 'update' ? componentCode = auth(menuKey.KIND, '004').authCode : componentCode = auth(menuKey.KIND, '002').authCode
        axios({
            method: 'post',
            url: '/manager/busi_goods/add',
            params: {
                componentCode: componentCode
            }
        })
        .then((res) => {
            if(res.status =='200'){
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
        },100)
    }  

    //重置
    handleReset =()=>{
        this.searchForm.props.form.resetFields();
    }

     // 校改操作
    handleUpdate = (record)=>{
        if(record.img_url){               
            let imgArr = []
            let arr = (record.img_url).split(',') 
            arr.forEach((item,index) => {
                let obj = {}
                obj['uid'] = index
                obj['thumbUrl'] = (imgKey.imgUrl+item)+'?'+new Date().getTime()
                imgArr.push(obj)
            }); 
            this.setState({
                fileList: imgArr
            })
        }
        this.setState({
            addBtnLoading: true
        })
        if(!this.state.baseSelect){
            this.requestSelect()  
        }else (
            this.setState({
                isVisible: true, 
            })
        ) 
        this.setState({        
            title: '纪念币校改',
            updateInfo: record,
            id: record.id,
            formType: 'update',
            addBtnLoading: false
        })
    }

    //校改保存数据
    handleUptSubmit = () =>{   
        this.createForm.props.form.validateFields((err, values)=>{       
            if(!err){       
                let data = this.createForm.props.form.getFieldsValue()
                this.setState({
                    saveLoading: true
                })
                data.id = this.state.id
                const formData = new FormData();
                let files = []
                if(data.files){
                    files = data.files.fileList;
                }else {
                    files = this.state.fileList
                }       
                files.forEach(file => {
                    let url = file.thumbUrl            
                    if(url.includes(imgKey.imgUrl)){
                        let len = imgKey.imgUrl.length
                        url = url.substring(len)
                        let endNum = url.indexOf('?')
                        url = url.substring(0, endNum)
                    }
                    formData.append('fileList', url);
                });         
                Object.keys(data).map((item)=>{
                    if(!data[item]){   
                        formData.append(item,"");
                    }else{
                        formData.append(item,data[item]);
                    }
                    
                })
                let componentCode = auth(menuKey.KIND, '005').authCode
                formData.append('componentCode', componentCode)
                this.update(formData);  
            }
        })
    }

    //校改保存
    update =(data)=>{
        axios({
            method: 'post',
            url: '/manager/busi_goods/saveUpdate',
            data: data,
        })
        .then((res) => {
            if(res.status == '200'){
                let code = res.data.code 
                if(code == '00'){ 
                    message.success('纪念币数据修改成功');
                    this.setState({
                        isVisible: false,                 
                        updateInfo: '',
                        fileList: []
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
            message.error('系统异常重试')
        });
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
                const formData = new FormData();  
                let files = []
                if(data.files){
                    files = data.files.fileList;
                }else {
                    files = this.state.fileList
                }
                files.forEach(file => {
                    formData.append('fileList', file.thumbUrl);
                });         
                Object.keys(data).map((item)=>{
                    if(!data[item]){   
                        formData.append(item,"");
                    }else{
                        formData.append(item,data[item]);
                    }
                    
                })
                let componentCode = auth(menuKey.KIND, '003').authCode
                formData.append('componentCode', componentCode)
                this.submit(formData);
            }
        })  
    }

    //保存
    submit =(data)=>{
        axios({
            method: 'post',
            url: '/manager/busi_goods/save',
            data: data       
        })
        .then((res) => {
            if(res.status == '200'){
                let code = res.data.code 
                if(code == '00'){ 
                    message.success('纪念币数据添加成功');
                    this.setState({
                        isVisible: false,                      
                        updateInfo: '',
                        fileList: []
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
            message.error('系统异常重试')
        });
    }

    //点击图片
    handleClickImg=(arr)=>{ 
        let coin = true
        if(arr.length <= 1){
            coin = false
        }
        let imgList = []
        arr.forEach((item) => {
            imgList.push((imgKey.imgUrl+item)+'?'+new Date().getTime())
        }); 
        this.setState({
            coinImgIsVisible: true,
            imgArr: imgList,
            coin
        })
    }

    //暂不添加
    handleNoAddClick = () =>{
        this.setState({
            isVisible: false,
            fileList: []
        })
        this.createForm.props.form.resetFields()
    }

    next = () => {
        this.slider.slick.slickNext()
    }

    prev = () => {
        this.slider.slick.slickPrev(    )
    }

    handleClickGoodsName = (record) => {   
        sessionStorage.setItem('currentPageNo', this.page.pageNo)
        const goodsId = record.id
        const goodsName = record.goods_name
        this.props.history.push('/priceenter/'+goodsId + '/'+ goodsName)
    }

  
    render(){
        const columns = [
            {
                title:'纪念币编码',
                dataIndex:'id',
                width: 70,
                render: (text, record)=>{
                    return <span style={{display: "inline-block",width: 40,wordBreak:"break-all"}}>{ record.id }</span>
                }
            },
            {
                title: '所属纪念币项目',
                dataIndex: 'project_id_value',
                width: 100,
                render: (text, record)=>{
                    return <span style={{display: "inline-block",width: 70,wordBreak:"break-all"}}>{ record.project_id_value }</span>
                }
            },
            {
                title: '纪念币名称',
                dataIndex: 'goods_name',
                width: 110,
                render: (text, record)=>{
                    return <span style={{display: "inline-block",width: 70,wordBreak:"break-all",cursor: "pointer",}} onClick={()=>this.handleClickGoodsName(record)}>{ record.goods_name }</span>
                }
            },
            {
                title: '币图',
                dataIndex: 'img_url',
                width: 70,
                className: 'coinImg',
                render: (text, record)=>{
                    let imgs = record.img_url
                    let imgUrl = null
                    let arr = null
                    if(imgs){
                        arr = imgs.split(',')
                        imgUrl = arr[0]
                    }
                    return !imgs ? '' : <img onClick={()=>this.handleClickImg(arr)} style={{width: 50, cursor: 'pointer'}} src={(imgKey.imgUrl+imgUrl)+'?'+new Date().getTime()} />
                }
            },
            {
                title: '类型',
                dataIndex: 'goods_type_value',
                width: 70,
                render: (text, record)=>{
                    return <span style={{display: "inline-block",width: 40,wordBreak:"break-all"}}>{ record.goods_type_value }</span>
                }
            },
            {
                title: '材质',
                dataIndex: 'goods_material_value',
                width: 70,
                render: (text, record)=>{
                    return <span style={{display: "inline-block",width: 40,wordBreak:"break-all"}}>{ record.goods_material_value }</span>
                }
            },
            {
                title: '币面年份',
                dataIndex: 'goods_year',
                width: 70,
                render: (text, record)=>{
                    return <span style={{display: "inline-block",width: 40,wordBreak:"break-all"}}>{ record.goods_year }</span>
                }
            },
            {
                title: '重量',
                dataIndex: 'goods_weight_value',
                width: 70,
                render: (text, record)=>{
                    return <span style={{display: "inline-block",width: 25,wordBreak:"break-all"}}>{ record.goods_weight_value }</span>
                }
            },
            {
                title: '形状',
                dataIndex: 'goods_shape_value',
                width: 70,
                render: (text, record)=>{
                    return <span style={{display: "inline-block",width: 25,wordBreak:"break-all"}}>{ record.goods_shape_value }</span>
                }
            },
            {
                title: '公告最大发行量',
                dataIndex: 'max_circulation',
                width: 80,
                render: (text, record)=>{
                    return <span style={{display: "inline-block",width: 50,wordBreak:"break-all"}}>{ record.max_circulation }</span>
                }
            },
            {
                title: '实铸量',
                dataIndex: 'actual_casting_quantity',
                width: 70,
                render: (text, record)=>{
                    return <span style={{display: "inline-block",width: 40,wordBreak:"break-all"}}>{ record.actual_casting_quantity }</span>
                }
            },
            {
                title: '最新采集价格',
                dataIndex: 'goods_price_new',
                width: 80,
                render: (text, record)=>{
                    return <span style={{display: "inline-block",width: 40,wordBreak:"break-all"}}>{record.goods_price_new}</span>
                }
            },
            {
                title: '价格走势',
                dataIndex: 'priceTrend',
                width: 70,
                render: (text,  record)=>{
                    if(record.is_price_rise == '0'){
                        return <NavLink
                                    to={`/priceenter/${record.id}/${record.goods_name}`}
                                >
                                    <Icon style={{fontSize: 20, width: 40, color: 'red'}} type="fall" />
                                </NavLink>
                    }else if(record.is_price_rise == '1'){
                        return <NavLink
                                    to={`/priceenter/${record.id}/${record.goods_name}`}
                                >
                                    <Icon style={{fontSize: 20, width: 40, color: 'blue'}} type="rise" />
                                </NavLink>
                    }else {
                        return ''
                    }
                    
                }
            },
            {
                title: '操作',
                render: (text,record)=>{
                    return auth(menuKey.KIND, '004').isAuth ? <a loading={this.setState.addBtnLoading} onClick={() => { this.handleUpdate(record) }}>校改</a> : ''
                }
            }
        ]

        return (           
            <div> 
                <div>
                    <SearchForm checkSelect={this.state.checkSelect}  wrappedComponentRef={(inst) => {this.searchForm = inst }} />
                </div>
                <div className='btn'>
                    {
                        auth(menuKey.KIND, '002').isAuth ? <Button type="primary" loading={this.state.addBtnLoading} onClick={this.handleCreate}>添加纪念币</Button> : ''
                    }
                    {
                        auth(menuKey.KIND, '001').isAuth ? <Button type="primary" loading={this.state.checkLoading} onClick={this.handleCheck}>查询</Button> : ''
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
                    title={this.state.title}
                    width={700}
                    visible={this.state.isVisible}  
                    destroyOnClose={true}   
                    className='kind-upload'                     
                    onCancel={()=>{                        
                        this.setState({
                            isVisible: false,
                            fileList: []
                        })
                        this.createForm.props.form.resetFields()
                    }}                   
                    footer={
                        this.state.formType == 'update' ? 
                            ([                                                                                      
                                auth(menuKey.KIND, '005').isAuth ? <Button key="submit" type="primary" loading={this.state.saveLoading}  onClick={this.handleUptSubmit}>确定校改</Button> : '',
                            ]) : 
                            ([                                                            
                                <Button key="back" onClick={this.handleNoAddClick}>暂不添加</Button>,
                                auth(menuKey.KIND, '003').isAuth ? <Button key="submit" type="primary" loading={this.state.saveLoading} onClick={this.handleSubmit}>保存纪念币</Button> : '',
                            ])
                    }
                >
                    <CreateForm fileList={this.state.fileList}  baseSelect={this.state.baseSelect} updateInfo={this.state.updateInfo} wrappedComponentRef={(inst) => {this.createForm = inst }} />
                </Modal>    
                <Modal
                    title='币图浏览'
                    width={300}
                    visible={this.state.coinImgIsVisible}
                    destroyOnClose={true}
                    footer={null}  
                    onCancel={()=>{                        
                        this.setState({
                            coinImgIsVisible: false,
                        })
                    }}                
                >
                    <div className="home-lunbo">
                        <Carousel 
                            ref={el => (this.slider = el)}                   
                        >                      
                            {                           
                                (this.state.imgArr || []).map((item,index)=>{
                                    return (
                                            <div key={index}>
                                                <img style={{width: '66%'}} src={item}/>
                                            </div>
                                        )
                                })
                            }                                                      
                        </Carousel>
                        {
                            this.state.coin ? 
                            <div>
                                <Icon type="left-circle"onClick={this.prev}/>
                                <Icon className='right' type="right-circle" onClick={this.next}/>
                            </div> : ''
                        }
                        
                        
                        
                    </div>
                    
                </Modal>     
            </div>
        );
    }
}

export default connect()(ksKind)