import React, { Component } from 'react' 
import { Form, Input, Button, Icon, Checkbox, Message } from 'antd'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux' 
import { set_nickname } from '../../reducer/nickname' 
import './index.less'; 

class Login extends Component{

    constructor(props) {
        super(props)
        this.state = {
            loading: false
        } 
    } 

    submitLogin() { 
        this.props.form.validateFields(err => {
            if (!err) {
                let data = this.props.form.getFieldsValue()  
                this.setState({
                    loading: true
                })
                axios({
                    method: 'post',
                    url: '/user/login',
                    params: data
                })
                .then((res) => {
                    let state = res.data.data.loginState 
                    let errorText = ''
                    if(state == '00'){ 
                        sessionStorage.setItem('c_loginName', res.data.data.loginName)
                        sessionStorage.setItem('c_realName', res.data.data.realName)
                        sessionStorage.setItem('c_userId', res.data.data.userId) 
                        sessionStorage.setItem('c_auth', JSON.stringify(res.data.data.components))
                        this.props.dispatch(set_nickname(res.data.data.realName)); 
                        Message.success('登录成功', 0.5, ()=>{
                            this.props.history.push('/welcome')
                        })
                    }else{
                        switch(state) {
                            case '01':
                                errorText = '密码错误'
                                break
                            case '02':
                                errorText = '用户不存在'
                                break
                            case '03':
                                errorText = '当前账户未激活'
                                break
                            default:
                                errorText = res.data.msg
                        } 
                        Message.error(errorText)
                        this.setState({ 
                            loading: false
                        })
                    }
                })
                .catch(() => {
                    this.setState({ 
                        loading: false
                    })
                    Message.error('系统异常重试')
                });
            }
        });
    }

    enterLogin(e) {
        if(e.keyCode === 13){
            this.submitLogin()
        }
    }

    render(){
        const { getFieldDecorator } = this.props.form
        return ( 
            <div className="login-page">
                <div className="login-content-wrap">
                    <div className="login-content"> 
                        <div className="login-logo"> 
                            <img alt="贵金属纪念币价格采集系统" src="/assets/logo.png"/>
                            贵金属纪念币价格采集系统
                        </div>
                        <div className="login-box">
                            <Form className="login-form"> 
                                <Form.Item>
                                {
                                    getFieldDecorator('loginName', {
                                        initialValue: '',
                                        rules: [
                                            {
                                                required: true,
                                                whitespace: true,
                                                message: '用户名不能为空'
                                            },
                                            {
                                                max: 30,
                                                message: '用户名最多输入30个字符',
                                            }
                                        ]
                                    })(
                                        <Input autoComplete="off" onKeyDown={this.enterLogin.bind(this)} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} size="large" placeholder="用户名"/>
                                    )
                                }
                                </Form.Item>
                                <Form.Item>
                                {
                                    getFieldDecorator('password', {
                                        initialValue: '',
                                        rules: [
                                            {
                                                required: true,
                                                whitespace: true,
                                                message: '密码不能为空'
                                            },
                                            {
                                                max: 30,
                                                message: '密码最多输入30个字符',
                                            } 
                                        ]
                                    })(
                                        <Input autoComplete="off" onKeyDown={this.enterLogin.bind(this)} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} size="large" type="password" placeholder="密码"/>
                                    )
                                }
                                </Form.Item>
                                <Form.Item>
                                    <Checkbox className="fl">自动登录</Checkbox>
                                    <NavLink className="fr" to="/login">忘记密码</NavLink>
                                </Form.Item>
                                <div>
                                    <Button type="primary" loading={this.state.loading} block={true} size="large" onClick={this.submitLogin.bind(this)}>
                                        登录
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div> 
            </div>
        );
    }
}

export default Form.create()(connect()(Login))