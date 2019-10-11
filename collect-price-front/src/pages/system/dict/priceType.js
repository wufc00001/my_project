import React, { Component } from 'react'  
import { Form, Input, Button, Table, Modal, Message, ConfigProvider } from 'antd'
import { set_bread_crumb } from '../../../reducer/breadCrumb'  
import { set_current_menu } from '../../../reducer/switchMenu' 
import axios from 'axios'
import { connect } from 'react-redux' 
import OtherForm from './form/otherForm' 
import auth from '../../../auth/index'
import { menuKey } from '../../../config/menuList' 
import zhCN from 'antd/lib/locale-provider/zh_CN'

const FormItem = Form.Item 

class PriceType extends Component{

    constructor() {
        super() 
        this.state = {
            visible: false,
            saveLoading: false, 
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
            width: 110 
        }, 
        {
            title: '价格类型',
            key: 'dictionariesValue',
            dataIndex: 'dictionariesValue',
            width: 180 
        },
        {
            title: '操作',
            key: 'operation',
            width: 60,
            dataIndex: "operation",
            render:(text, record)=>{  
                return auth(menuKey.PRICETYPE, '004').isAuth ? <a onClick={() => { this.handleUpdate(record) }}>修改</a> : ''
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
            data['componentCode'] = auth(menuKey.PRICETYPE, '003').authCode 
            this.setState({
                saveLoading: true
            })
            axios({
                method: 'post',
                url: '/manager/busi_dictionaries_price_type/save',
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

    componentWillMount() { 
        this.props.dispatch(set_bread_crumb(['首页','系统管理','枚举管理','价格类型']));
        this.props.dispatch(set_current_menu(['priceType']))
    } 

    componentDidMount() {
        axios({
            method: 'post',
            url: '/manager/busi_dictionaries_price_type/list',
            params: {
                componentCode: auth(menuKey.PRICETYPE, '001').authCode 
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
        this.otherForm.props.form.resetFields()
    }

    saveModel() {
        this.otherForm.props.form.validateFields((error) => { 
            if(error) {
                return;
            }
            let data = {...this.state.currentData, ...this.otherForm.props.form.getFieldsValue()} 
            data['componentCode'] = auth(menuKey.PRICETYPE, '005').authCode 
            this.setState({ 
                modelLoading: true
            })
            axios({
                method: 'post',
                url: '/manager/busi_dictionaries_price_type/saveUpdate',
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
                        <FormItem label='价格类型'>
                        {
                            getFieldDecorator('dictionariesValue', {
                                rules: [
                                    {
                                        required: true,
                                        whitespace: true,
                                        message: '价格类型不能为空'
                                    },
                                    {
                                        max: 50,
                                        message: '价格类型最多输入50个字符'
                                    } 
                                ]
                            })(
                                <Input autoComplete="off" />
                            )
                        }                     
                        </FormItem>
                        <FormItem>
                            {
                                auth(menuKey.PRICETYPE, '002').isAuth ? <Button type="primary" loading={this.state.saveLoading} onClick={this.handleSave.bind(this)}>增加</Button>  : ''
                            }
                        </FormItem>
                        <FormItem>
                            {
                                auth(menuKey.PRICETYPE, '002').isAuth ? <Button onClick={this.resetForm.bind(this)}>重置</Button>  : ''
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
                    <OtherForm modalData={this.state.currentData} fromData={{'cnName': '价格类型', 'key': 'dictionariesValue'}} wrappedComponentRef={(form) => { this.otherForm = form }}></OtherForm>
                </Modal>
            </div>
        );
    }
}

export default Form.create()(connect()(PriceType));