import React, { Component } from 'react'  
import { Form, Input } from 'antd'   

const FormItem = Form.Item 

class OtherForm extends Component{

    render(){
        const { getFieldDecorator } = this.props.form
        const { modalData, fromData } = this.props 
        return (
            <Form labelCol={{span:8}} wrapperCol={{span: 16}}>
                <FormItem label={fromData.cnName}>
                {
                    getFieldDecorator(`${fromData.key}`, {
                        initialValue: modalData[fromData.key],
                        rules: [
                            {
                                required: true,
                                whitespace: true,
                                message: `${fromData.cnName}不能为空`
                            },
                            {
                                max: 50,
                                message: `${fromData.cnName}最多输入50个字符`
                            } 
                        ]
                    })(
                        <Input autoComplete="off" />
                    )
                }
                </FormItem>
            </Form> 
        )
    }
}

export default Form.create()(OtherForm);