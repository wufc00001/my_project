import React, { Component } from 'react'  
import { Form, Input, Modal, Button, Table, Message, Row, Col, Checkbox, ConfigProvider } from 'antd'
import { withRouter } from 'react-router-dom'    
import axios from 'axios'
import { connect } from 'react-redux' 
import { set_bread_crumb } from '../../../reducer/breadCrumb'  
import { set_current_menu } from '../../../reducer/switchMenu' 
import auth from '../../../auth/index'
import { menuKey } from '../../../config/menuList' 
import zhCN from 'antd/lib/locale-provider/zh_CN'

const FormItem = Form.Item 

class Manager extends Component{

    constructor(){
        super();
        this.state = {
            loading: false,
            loadingTable: true,
            dataSource: [],
            isUpdate: false,
            updateId: null,
            rowData: {},
            stopState: true,
            resetPwdState: true
        }
    }

    formSpl = {
        labelCol: {
            span: 5
        },
        wrapperCol: {
            span: 16
        }
    }

    columns = [
        {
            title:'用户ID',
            key:'id',
            dataIndex:'id',
            width: 30
        },
        {
            title: '用户状态',
            key: 'userStatus',
            dataIndex: 'userStatus',
            width: 100,
            render: (item) => { 
                return item == 'ACT' ? '启用' : '停用' 
            }
        },
        {
            title: '账号',
            key: 'loginName',
            dataIndex: 'loginName',
            width: 100
        },
        {
            title: '姓名',
            key: 'realName',
            dataIndex: 'realName',
            width: 80
        },
        {
            title: '手机号',
            key: 'mobile',
            dataIndex: 'mobile',
            width: 60
        },
        {
            title: '角色',
            key: 'roleNames',
            dataIndex: 'roleNames',
            width: 60
        },
        {
            title: '操作',
            width: 100,
            render:(record)=>{ 
                return (
                    <div>
                        {
                            auth(menuKey.MANAGER, '004').isAuth ? (<a onClick={() => { this.handleUpdate(record)}}> 修改 </a> ) : ''
                        }
                        {
                            record.userStatus == 'ACT' ? 
                            auth(menuKey.MANAGER, '007').isAuth ? <a onClick={() => { this.handleStopDown(record) }}> 停用 </a> : ''
                            :
                            auth(menuKey.MANAGER, '006').isAuth ? <a onClick={() => { this.handleStopUp(record) }}> 启用 </a> : ''
                        }
                        {
                            auth(menuKey.MANAGER, '008').isAuth ? <a onClick={() => { this.handleResetPwd(record) }}> 重置密码 </a> : ''
                        }
                    </div>
                )
            }
        }
    ]

    handleUpdate(row) {  
        this.props.form.setFieldsValue({
            loginName: row.loginName,
            realName: row.realName,
            mobile: row.mobile,
            roleIds: row.roleIds
        })
        this.setState({
            isUpdate: true,
            updateId: row.userId
        })  
    }

    handUpdateUser() {
        this.props.form.validateFields((err) => { 
            if (!err) {
                let data = this.props.form.getFieldsValue()   
                data['roleIds'] = data.roleIds.join(',')
                data['componentCode'] = auth(menuKey.MANAGER, '005').authCode 
                data['userId'] = this.state.updateId
                this.setState({
                    loading: true
                })
                axios({
                    method: 'post',
                    url: '/manager/core_user/saveUpdate',
                    params: data
                })
                .then((res) => { 
                    this.setState({
                        loading: false
                    })
                    let code = res.data.code 
                    if(code == '00'){
                        this.handleUpdateRow(res.data.data.coreUser)
                        this.cancelForm('isUpdate')
                        Message.success('账户修改成功');
                    }else if(code == '98'){
                        Message.error('权限验证失败');
                    }else if(code == '99'){
                        Message.error('登录失败，请重新登录', () => {
                            this.props.history.push('/login') 
                        });
                    }else{
                        Message.error(res.data.msg);
                    }
                })
                .catch(() => { 
                    Message.error('系统异常请重试');
                });
            }
        })
    }

    handleUpdateRow(row) {  
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.userId == item.userId);
        const item = newData[index];   
        newData.splice(index, 1, {
          ...item,
          ...row,
        }); 
        this.setState({ dataSource: newData });
    }

    handleSaveRow(row) {  
        const newData = [...this.state.dataSource];
        row['key'] = this.state.dataSource.length
        row['id'] = this.state.dataSource.length + 1
        newData.push(row) 
        this.setState({ dataSource: newData });
    }

    handleStopUp(row) {
        if(!this.state.stopState) return;
        Modal.confirm({
            title: `您确定启用${row.realName}的账户?`, 
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                this.setState({
                    stopState: false
                })
                Message.loading('正在执行...', 0)
                axios({
                    method: 'post',
                    url: '/manager/core_user/startUp',
                    params: {
                        userId: row.userId,
                        componentCode: auth(menuKey.MANAGER, '006').authCode 
                    }
                })
                .then((res) => { 
                    this.setState({
                        stopState: true
                    })
                    Message.destroy()
                    if(res.data.code == '00'){
                        row['userStatus'] = 'ACT'
                        this.handleUpdateRow(row)
                        Message.success(`已启用${row.realName}的账户`)
                    }else if(res.data.code == '99'){
                        Message.error('登录失败，请重新登录', () => {
                            this.props.history.push('/login') 
                        });
                    }else if(res.data.code == '98'){
                        Message.error('权限验证失败');
                    }else{
                        Message.error(res.data.msg);
                    }
                })
            }
        });
    }

    handleStopDown(row) {
        if(!this.state.stopState) return;
        Modal.confirm({
            title: `您确定停用${row.realName}的账户?`, 
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                this.setState({
                    stopState: false
                })
                Message.loading('正在执行...', 0)
                axios({
                    method: 'post',
                    url: '/manager/core_user/startDown',
                    params: {
                        userId: row.userId,
                        componentCode: auth(menuKey.MANAGER, '007').authCode 
                    }
                })
                .then((res) => { 
                    this.setState({
                        stopState: true
                    })
                    Message.destroy()
                    if(res.data.code == '00'){
                        row['userStatus'] = 'NOACT'
                        this.handleUpdateRow(row)
                        Message.success(`已停用${row.realName}的账户`)
                    }else if(res.data.code == '99'){
                        Message.error('登录失败，请重新登录', () => {
                            this.props.history.push('/login') 
                        });
                    }else if(res.data.code == '98'){
                        Message.error('权限验证失败');
                    }
                })
            }
        });
    }

    handleResetPwd(row) {
        if(!this.state.resetPwdState) return;
        Modal.confirm({
            title: `您确定重置${row.realName}的密码?`, 
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                this.setState({
                    resetPwdState: false
                })
                Message.loading('正在执行...', 0)
                axios({
                    method: 'post',
                    url: '/manager/core_user/initPwd',
                    params: {
                        userId: row.userId,
                        componentCode: auth(menuKey.MANAGER, '008').authCode 
                    }
                })
                .then((res) => { 
                    this.setState({
                        resetPwdState: true
                    })
                    Message.destroy()
                    if(res.data.code == '00'){ 
                        Message.success(`已重置${row.realName}的密码`)
                    }else if(res.data.code == '99'){
                        Message.error('登录失败，请重新登录', () => {
                            this.props.history.push('/login') 
                        });
                    }else if(res.data.code == '98'){
                        Message.error('权限验证失败');
                    }
                })
            }
        });
    }

    componentWillMount() {
        this.props.dispatch(set_bread_crumb(['首页','系统管理','枚举管理','用户管理']));
        this.props.dispatch(set_current_menu(['manager'])); 
    }

    componentDidMount () {
        axios({
            method: 'post',
            url: '/manager/core_user/list',
            params: {
                componentCode: auth(menuKey.MANAGER, '001').authCode 
            }
        })
        .then((res) => { 
            let data = res.data.data
            if(res.data.code == '00'){
                data.map((item,index)=>{
                    item.key = index;
                    item.id = index + 1;
                })
            }else if(res.data.code == '99'){
                Message.error('登录失败，请重新登录', () => {
                    this.props.history.push('/login') 
                });
            }else if(res.data.code == '98'){
                Message.error('权限验证失败');
            }
            this.setState({
                dataSource: data,
                loadingTable: false
            })
        }) 
    }

    handSaveUser() { 
        this.props.form.validateFields((err) => { 
            if (!err) {
                let data = this.props.form.getFieldsValue()  
                data['roleIds'] = data.roleIds.join(',')
                data['componentCode'] = auth(menuKey.MANAGER, '003').authCode 
                this.setState({
                    loading: true
                })
                axios({
                    method: 'post',
                    url: '/manager/core_user/save',
                    params: data
                })
                .then((res) => { 
                    this.setState({
                        loading: false
                    })
                    let code = res.data.code 
                    if(code == '00'){
                        this.handleSaveRow(res.data.data.coreUser)
                        this.cancelForm()
                        Message.success('账户添加成功');
                    }else if(code == '99'){
                        Message.error('登录失败，请重新登录', () => {
                            this.props.history.push('/login') 
                        });
                    }else if(code == '98'){
                        Message.error('权限验证失败');
                    }else{
                        Message.error(res.data.msg);
                    }
                })
                .catch(() => {
                    Message.error('系统异常请重试');
                });
            }
        })
    }

    cancelForm(type) {
        if(type == 'isUpdate'){
            this.setState({
                isUpdate: false,
                updateId: null,
                rowData: {}
            })
        }
        this.props.form.resetFields()
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol:{
               span: 8
            },
            wrapperCol:{
                span:14
            }
        }
        return (         
            <Row>
                <Col span={14}>
                    <div className="tb-style" style={{
                        marginTop: 0
                    }}> 
                        <ConfigProvider  locale={zhCN}>
                            <Table                   
                                bordered    
                                columns={this.columns}
                                dataSource={this.state.dataSource} 
                                pagination={false}
                                loading={this.state.loadingTable}
                            />
                        </ConfigProvider>
                        
                    </div>
                </Col>
                <Col span={1}></Col>
                <Col span={9}>
                    <Form {...this.formSpl}>      
                        <Row style={{
                            paddingTop: 20
                        }}>
                            <Col span={12}>
                                                        
                                    <FormItem label='账号' {...formItemLayout}>
                                    {
                                        getFieldDecorator('loginName', {
                                            rules: [
                                                {
                                                    required: true,
                                                    whitespace: true,
                                                    message: '账号不能为空',
                                                },
                                                {
                                                    max: 15,
                                                    message: '账号最多输入15个字符',
                                                },{
                                                    pattern: /^[0-9a-zA-Z]+$/,
                                                    message: '格式不正确',
                                                }
                                            ]
                                        })(
                                            <Input autoComplete="off" />
                                        )
                                    }                     
                                    </FormItem>
                                    <FormItem label='姓名' {...formItemLayout}>
                                    {
                                        getFieldDecorator('realName', {
                                            rules: [
                                                {
                                                    required: true,
                                                    whitespace: true,
                                                    message: '姓名不能为空',
                                                },
                                                {
                                                    max: 30,
                                                    message: '账号最多输入30个字符',
                                                }
                                            ]
                                        })(
                                            <Input autoComplete="off" />
                                        )
                                    }
                                    </FormItem>
                                    <FormItem label='手机号' {...formItemLayout}>
                                    {
                                        getFieldDecorator('mobile', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '手机号不能为空'
                                                },
                                                {
                                                    whitespace: true,
                                                    message: '手机号不能为空'
                                                },
                                                {
                                                    pattern: /^1\d{10}$/,
                                                    message: '手机号格式不正确'
                                                } 
                                            ]
                                        })(
                                            <Input autoComplete="off" maxLength={11} />
                                        )
                                    }
                                    </FormItem>
                            </Col>
                            <Col span={12}>
                                <Row>
                                    <Col>角色:</Col>
                                </Row> 
                                <Row>
                                    <Col>
                                        <FormItem>
                                        {
                                            getFieldDecorator('roleIds', { 
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: '请设置角色'
                                                    } 
                                                ]
                                            })(
                                                <Checkbox.Group>
                                                    <div style={{marginTop: 10}}>
                                                        <Checkbox value="b22ca12f1db64004afd4f8c1c3a931b5">数据录入</Checkbox>
                                                    </div>
                                                    <div style={{marginTop: 10}}>
                                                        <Checkbox value="a600974ad0ed45818cfb91706627f398">数据校改</Checkbox>
                                                    </div>
                                                    <div style={{marginTop: 10}}>
                                                        <Checkbox value="55fab9a4afcb415e9042c9e57572e453">数据报送-马甸</Checkbox>
                                                    </div>
                                                    <div style={{marginTop: 10}}>
                                                        <Checkbox value="d20fb7f1540645308b8fe3e8e3ab6b60">数据报送-卢工</Checkbox>
                                                    </div>
                                                </Checkbox.Group>
                                            )
                                        }
                                        </FormItem>
                                    </Col>
                                </Row> 
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{
                                textAlign: "center"
                            }}>
                                    {
                                        !this.state.isUpdate ? 
                                        auth(menuKey.MANAGER, '003').isAuth ? 
                                            (<FormItem>
                                                <Button loading={this.state.loading} onClick={this.handSaveUser.bind(this)} type="primary" htmlType="submit">添加账户</Button> <Button onClick={this.cancelForm.bind(this)}>重置</Button>  
                                            </FormItem>) : ''
                                        :
                                        auth(menuKey.MANAGER, '005').isAuth ? 
                                            (<FormItem>
                                                <Button loading={this.state.loading} onClick={this.handUpdateUser.bind(this)} type="primary" htmlType="submit">修改账户</Button> <Button onClick={this.cancelForm.bind(this, 'isUpdate')}>取消</Button>
                                            </FormItem>) : ''
                                    }
                                
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        );
    }
}
export default Form.create()(withRouter(connect()(Manager)));


