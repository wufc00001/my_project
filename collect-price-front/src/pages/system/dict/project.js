import React, { Component } from 'react'  
import { Form, Input, Button, Table, DatePicker, Modal, Message, ConfigProvider } from 'antd'
import { set_bread_crumb } from '../../../reducer/breadCrumb'  
import { set_current_menu } from '../../../reducer/switchMenu' 
import locale from 'antd/es/date-picker/locale/zh_CN'
import axios from 'axios'
import { connect } from 'react-redux' 
import moment from 'moment'
import 'moment/locale/zh-cn'
import ProjectForm from './form/projectForm'
import auth from '../../../auth/index'
import { menuKey } from '../../../config/menuList' 
import zhCN from 'antd/lib/locale-provider/zh_CN'

moment.locale('zh-cn');

const FormItem = Form.Item 

class Project extends Component{

    constructor() {
        super() 
        this.state = {
            visible: false,
            saveLoading: false,
            Idate: null,
            Adate: null,
            loadingTable: true,
            data: [],
            currentData: {},
            modelLoading: false 
        }
    }

    columns = [
        {
            title:'编号',
            key:'id',
            dataIndex:'id',
            width: 50 
        }, 
        {
            title: '项目名称',
            key: 'projectName',
            dataIndex: 'projectName',
            width: 130 
        },
        { 
            title: '项目简称',
            key: 'abbreviationName',
            dataIndex: 'abbreviationName',
            width: 100 
        },
        {
            title: '发行年份',
            key: 'issueYear',
            dataIndex: 'issueYear',
            width: 60 
        },
        {
            title: '公告日',
            key: 'announcementDay',
            dataIndex: 'announcementDay',
            width: 60 
        },
        {
            title: '发行日',
            key: 'issuanceDay',
            dataIndex: 'issuanceDay',
            width: 100 
        },
        {
            title: '操作',
            key: 'operation',
            width: 60,
            dataIndex: "operation",
            render:(text, record)=>{  
                return auth(menuKey.PROJECT, '004').isAuth ? <a onClick={() => { this.handleUpdate(record) }}>修改</a> : ''
            }
        }
    ] 

    handleUpdate(record) {
        this.setState({
            visible: true,
            currentData: record
        })
    }

    handleSave() { 
        this.props.form.validateFields((error) => { 
            if(error) {
                return;
            }
            let data = this.props.form.getFieldsValue() 
            data['announcementDay'] = this.state.Adate
            data['issuanceDay'] = this.state.Idate
            data['componentCode'] = auth(menuKey.PROJECT, '003').authCode 
            this.setState({
                saveLoading: true
            })
            axios({
                method: 'post',
                url: '/manager/busi_dictionaries_project/save',
                params: data
            })
            .then((res) => {
                if(res.data.code == '00'){
                    let resData = res.data.data
                    resData['key'] = res.data.id
                    const newData = [...this.state.data]
                    newData.unshift(resData) 
                    this.setState({
                        data: newData
                    })
                    this.resetForm()
                    Message.success('保存成功')
                }else if(res.data.code == '99'){
                    Message.error('登录失败，请重新登录', () => {
                        this.props.history.push('/login') 
                    });
                }else if(res.data.code == '98'){
                    Message.error('权限验证失败');
                }
                this.setState({ 
                    saveLoading: false
                })
            })
            .catch(() => {
                this.setState({ 
                    saveLoading: false
                })
                Message.error('系统异常重试')
            }); 
        });
    }

    resetForm() {
        this.props.form.resetFields()
    }

    handleAd(date, dateString) { 
        this.setState({
            Adate: dateString
        })
    }

    handleId(date, dateString) {
        this.setState({
            Idate: dateString
        })
    }

    componentWillMount() { 
        this.props.dispatch(set_bread_crumb(['首页','系统管理','枚举管理','纪念币项目']));
        this.props.dispatch(set_current_menu(['project']))
    } 

    componentDidMount() {
        axios({
            method: 'post',
            url: '/manager/busi_dictionaries_project/list',
            params: {
                componentCode: auth(menuKey.PROJECT, '001').authCode 
            } 
        })
        .then((res) => {
            if(res.data.code == '00'){
                let data = res.data.data
                data.map((item,index)=>{
                    item.key = index
                })
            }else if(res.data.code == '99'){
                Message.error('登录失败，请重新登录', () => {
                    this.props.history.push('/login') 
                });
            }else if(res.data.code == '98'){
                Message.error('权限验证失败');
            }
            this.setState({
                data: res.data.data,
                loadingTable: false
            })
        })
        .catch(() => { 
            Message.error('系统异常重试')
        }); 
    }

    cancelModel() {
        this.setState({
            visible: false
        })
        this.projectForm.props.form.resetFields()
    }

    saveModel() {
        this.projectForm.props.form.validateFields((error) => { 
            if(error) {
                return;
            }
            let data = {...this.state.currentData, ...this.projectForm.formData()} 
            data['componentCode'] = auth(menuKey.PROJECT, '005').authCode 
            this.setState({ 
                modelLoading: true
            })
            axios({
                method: 'post',
                url: '/manager/busi_dictionaries_project/saveUpdate',
                params: data
            })
            .then((res) => { 
                if(res.data.code == '00'){
                    this.cancelModel()
                    this.handleUpdateRow(data)
                    Message.success('修改成功')
                }else if(res.data.code == '99'){
                    Message.error('登录失败，请重新登录', () => {
                        this.props.history.push('/login') 
                    });
                }else if(res.data.code == '98'){
                    Message.error('权限验证失败');
                }
                this.setState({ 
                    modelLoading: false
                })
            })
            .catch(() => {
                this.setState({ 
                    modelLoading: false
                })
                Message.error('系统异常重试')
            }); 
        })
    }

    handleUpdateRow(row) {   
        let issueYear = row.issuanceDay
        issueYear = issueYear.substr(0, 4)
        row.issueYear = issueYear
        const newData = [...this.state.data];
        const index = newData.findIndex(item => row.key == item.key);
        const item = newData[index];   
        newData.splice(index, 1, {
          ...item,
          ...row,
        }); 
        this.setState({ data: newData });
    }

    render(){
        const { getFieldDecorator } = this.props.form 
        return (
            <div> 
                <div>
                    <Form id="no_inline_bottom" layout='inline'>                                 
                        <FormItem label='项目名称'>
                        {
                            getFieldDecorator('projectName', {
                                rules: [
                                    {
                                        required: true,
                                        whitespace: true,
                                        message: '项目名称不能为空'
                                    },
                                    {
                                        max: 50,
                                        message: '项目名称最多输入50个字符'
                                    } 
                                ]
                            })(
                                <Input autoComplete="off" />
                            )
                        }                     
                        </FormItem>
                        <FormItem label='项目简称'>
                        {
                            getFieldDecorator('abbreviationName', {
                                rules: [
                                    {
                                        required: true,
                                        whitespace: true,
                                        message: '项目简称不能为空'
                                    },
                                    {
                                        max: 30,
                                        message: '项目简称最多输入30个字符'
                                    } 
                                ]
                            })(
                                <Input autoComplete="off" />
                            )
                        }
                        </FormItem>
                        <FormItem label='公告日'>
                            {
                                getFieldDecorator('announcementDay', { 
                                })(
                                    <DatePicker locale={locale} format={'YYYY-MM-DD'} onChange={this.handleAd.bind(this)} />
                                )
                            }                      
                        </FormItem>
                        <FormItem label='发行日'>
                            {
                                getFieldDecorator('issuanceDay', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择发行日'
                                        } 
                                    ]
                                })(
                                    <DatePicker locale={locale} format={'YYYY-MM-DD'} onChange={this.handleId.bind(this)}/>
                                )
                            }
                        </FormItem> 
                        <FormItem>
                            {
                                auth(menuKey.PROJECT, '002').isAuth ? <Button type="primary" loading={this.state.saveLoading} onClick={this.handleSave.bind(this)}>增加</Button> : ''
                            }
                        </FormItem>
                        <FormItem>
                            {
                                auth(menuKey.PROJECT, '002').isAuth ? <Button onClick={this.resetForm.bind(this)}>重置</Button> : ''
                            }
                        </FormItem>
                    </Form>
                </div>
                <div className='tb-style'>
                <ConfigProvider  locale={zhCN}>
                    <Table                   
                        bordered    
                        columns={this.columns}
                        dataSource={this.state.data}  
                        pagination={false}
                        loading={this.state.loadingTable}
                    />
                </ConfigProvider>       
                </div>
                <Modal 
                    title='修改'
                    width={400}
                    visible={this.state.visible}
                    okText= '确认'
                    cancelText= '取消' 
                    onCancel={this.cancelModel.bind(this)}
                    footer={[
                        <Button key="back" onClick={this.cancelModel.bind(this)}>
                            取消
                        </Button>,
                        <Button key="submit" type="primary" loading={this.state.modelLoading} onClick={this.saveModel.bind(this)}>
                            确认
                        </Button>,
                    ]}
                >
                    <ProjectForm modalData={this.state.currentData} wrappedComponentRef={(form) => { this.projectForm = form }}></ProjectForm>
                </Modal>
            </div>
        );
    }
}

export default Form.create()(connect()(Project));