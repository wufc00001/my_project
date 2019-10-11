import React from 'react'
import {Layout, Menu, Dropdown, Icon, Modal, Form, Input, Button, Message} from 'antd'
import axios from 'axios'
import { withRouter } from 'react-router-dom'   
import { connect } from 'react-redux' 
import {set_collapse} from '../../reducer/collapse' 

const { Header } = Layout;

class NavHeader extends React.Component {

    constructor() {
        super()
        this.state = {
            collapsed: true,
            visible: false,
            loading: false
        }
    }
 
    toggle() {
        this.setState({
            collapsed: !this.state.collapsed
        })
        this.props.dispatch(set_collapse(this.state.collapsed))
    }

    logout() { 
        Modal.confirm({
            title: '退出登录?', 
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                axios({
                    method: 'post',
                    url: '/user/logout' 
                })
                .then((res) => {
                    sessionStorage.removeItem('c_loginName')
                    sessionStorage.removeItem('c_realName')
                    sessionStorage.removeItem('c_userId') 
                    sessionStorage.removeItem('c_auth')
                    this.props.history.push('/login') 
                })
                .catch((err) => {
        
                });
            }
        });
    } 

    updatePwd() {
        this.props.form.validateFields(err => {
            if (!err) {
                let data = this.props.form.getFieldsValue()  
                this.setState({
                    loading: true
                })
                axios({
                    method: 'post',
                    url: '/user/modifyPwd',
                    params: data
                })
                .then((res) => { 
                    if(res.data.code == '00'){
                        this.cancelModel()
                        Message.success('修改成功，请重新登录', ()=>{
                            sessionStorage.removeItem('c_loginName')
                            sessionStorage.removeItem('c_realName')
                            sessionStorage.removeItem('c_userId') 
                            sessionStorage.removeItem('c_auth')
                            this.props.history.push('/login') 
                        })
                    }else{
                        Message.error(res.data.msg)
                    }
                    this.setState({ 
                        loading: false
                    })
                })
                .catch(() => {
                    this.setState({ 
                        loading: false
                    })
                    Message.error('系统异常重试')
                }); 
            }
        })
    }

    cancelModel() {
        this.setState({
            visible: false,
            loading: false
        })
        this.props.form.resetFields()
    }

    render () {  
        const { getFieldDecorator } = this.props.form
        return ( 
            <Header style={{ background: '#fff', padding: 0 }}>
                <div className="fl">
                    <Icon
                        className="trigger"
                        type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={this.toggle.bind(this)}
                    />
                </div>
                <div className="fr user_set">
                    <Dropdown overlay={() => 
                        <Menu>
                            <Menu.Item key="1">
                                <span onClick={() => {
                                    this.setState({
                                        visible: true
                                    })
                                }} >
                                    <Icon type="edit" />  修改密码
                                </span>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <span onClick={this.logout.bind(this)} >
                                    <Icon type="logout" />  退出登录
                                </span>
                            </Menu.Item> 
                        </Menu>
                    }>
                    <span className="user_icon">
                        <Icon type="user" /> <span>欢迎，{this.props.nickName}</span> 
                    </span>
                    </Dropdown>  
                </div>
                <Modal 
                    title='修改密码'
                    width={400}
                    visible={this.state.visible}
                    okText= '确认'
                    cancelText= '取消'   
                    onCancel={this.cancelModel.bind(this)}
                    footer={[
                        <Button key="back" onClick={this.cancelModel.bind(this)}>
                            取消
                        </Button>,
                        <Button key="submit" type="primary" loading={this.state.loading} onClick={this.updatePwd.bind(this)}>
                            确认
                        </Button>,
                    ]}
                >
                    <Form.Item label=''>
                    {
                        getFieldDecorator('oldPassword', {
                            rules: [
                                {
                                    required: true,
                                    whitespace: true,
                                    message: '原始密码不能为空',
                                },
                                {
                                    max: 30,
                                    message: '原始密码最多输入30个字符',
                                } 
                            ]
                        })(
                            <Input.Password placeholder="原始密码" />
                        )
                    }                     
                    </Form.Item>
                    <Form.Item label=''>
                    {
                        getFieldDecorator('newPassword', {
                            rules: [
                                {
                                    required: true,
                                    whitespace: true,
                                    message: '新密码不能为空',
                                },
                                {
                                    max: 30,
                                    message: '新密码最多输入30个字符',
                                } 
                            ]
                        })(
                            <Input.Password placeholder="新密码" />
                        )
                    }                     
                    </Form.Item>
                </Modal>
            </Header>
        );
    }
}

const mapStateToProps = state => {  
    return {
        nickName: state.nickname.nickname
    }
}

export default Form.create()(withRouter(connect(mapStateToProps)(NavHeader)))