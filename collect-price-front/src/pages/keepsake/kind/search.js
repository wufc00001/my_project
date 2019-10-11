import React from 'react' 
import { Form, Input, Select } from 'antd'
import './../index.less'
const FormItem = Form.Item
const Option = Select.Option

export default class SearchForm extends React.Component {

    render(){
        const { getFieldDecorator } = this.props.form;
        const checkSelect = this.props.checkSelect || {} 
        return (
            <Form layout="inline">                                 
                <FormItem label='项目名称'>
                {
                    getFieldDecorator('projectName', {
                        initialValue: ''
                    })(
                        <Input />
                    )
                }                     
                </FormItem>
                <FormItem label='纪念币名称'>
                {
                    getFieldDecorator('goodsName', {
                        initialValue: ''
                    })(
                        <Input />
                    )
                }
                </FormItem>
                <FormItem label='币面年份' labelCol={{ span: 11}} wrapperCol={{span:13}}>
                    {
                        getFieldDecorator('goodsYear', {
                            initialValue: ''
                        })(
                            <Select style={{width: 100}}  getPopupContainer={triggerNode => triggerNode.parentNode} >
                                <Option value=''>请选择</Option>
                                {
                                    !checkSelect ? '' :
                                    (checkSelect.dictionariesYear || []).map((it, index)=>{ 
                                        return (<Option key={index} value={it}>{it}</Option>)
                                    })
                                }
                            </Select>
                        )
                    }                      
                </FormItem>
                <FormItem label='材质' labelCol={{ span: 8}} wrapperCol={{span:16}}>
                    {
                        getFieldDecorator('goodsMaterial', {
                            initialValue: '',
                        })(
                            <Select  className='sel-style'  getPopupContainer={triggerNode => triggerNode.parentNode}>
                                <Option value=''>请选择</Option>
                                {
                                    !checkSelect ? '' :
                                    (checkSelect.dictionariesMaterial || [] ).map((it)=>{ 
                                        return (<Option key={it.id} value={it.id}>{it.dictionariesValue}</Option>)
                                    })
                                }
                            </Select>
                        )
                    }
                
                </FormItem>
                <FormItem label='形状' labelCol={{ span: 8}} wrapperCol={{span:16}}>
                    {
                        getFieldDecorator('goodsShape', {
                            initialValue: ''
                        })(
                            <Select className='sel-style'  getPopupContainer={triggerNode => triggerNode.parentNode}>
                                <Option value=''>请选择</Option>
                                {
                                    !checkSelect ? '' :
                                    (checkSelect.dictionariesShape || [] ).map((it)=>{ 
                                        return (<Option key={it.id} value={it.id}>{it.dictionariesValue}</Option>)
                                    })
                                }
                            </Select>
                        )
                    }
                </FormItem>
            </Form>
        )
    }
}
SearchForm = Form.create({})(SearchForm);
