import React, { Component } from 'react'  
import { Form, Input, DatePicker } from 'antd' 
import locale from 'antd/es/date-picker/locale/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'

moment.locale('zh-cn');

const FormItem = Form.Item 

class ProjectForm extends Component{

    constructor() {
        super()  
        this.state = {
            Idate: null,
            Adate: null 
        }
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

    formData() {
        let data = this.props.form.getFieldsValue() 
        data['announcementDay'] = this.state.Adate
        data['issuanceDay'] = this.state.Idate
        return data
    }

    componentDidMount() { 
        this.setState({
            Adate: this.props.modalData.announcementDay,
            Idate: this.props.modalData.issuanceDay
        })
    }

    render(){
        const { getFieldDecorator } = this.props.form 
        const modalData = this.props.modalData      
        return (
            <Form labelCol={{span:5}} wrapperCol={{span: 18}}>
                <FormItem label='项目名称'>
                {
                    getFieldDecorator('projectName', {
                        initialValue: modalData.projectName,
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
                        initialValue: modalData.abbreviationName,
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
                        initialValue: modalData.announcementDay ? moment(modalData.announcementDay, 'YYYY-MM-DD') : null
                    })(
                        <DatePicker locale={locale} format={'YYYY-MM-DD'} onChange={this.handleAd.bind(this)} />
                    ) 
                }     
                </FormItem>
                <FormItem label='发行日'>
                {
                    getFieldDecorator('issuanceDay', {
                        initialValue: moment(modalData.issuanceDay, 'YYYY-MM-DD'),
                        rules: [
                            {
                                required: true,
                                message: '请选择发行日'
                            } 
                        ]
                    })(
                        <DatePicker  locale={locale} format={'YYYY-MM-DD'} onChange={this.handleId.bind(this)}/>
                    )
                }
                </FormItem> 
            </Form> 
        )
    }
}

export default Form.create()(ProjectForm);