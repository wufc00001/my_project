import React from 'react' 
import { Form, Input, Select, Col, Row } from 'antd'
import './../index.less'
const FormItem = Form.Item
const Option = Select.Option

export default class SearchForm extends React.Component {

    render(){
        const { getFieldDecorator } = this.props.form;
        const checkSelect = this.props.checkSelect || {}     
        const formWtItemLayout = {
            labelCol:{
               span: 8
            },
            wrapperCol:{
                span:14
            }
        }
        return (
            <Form>  
                <Row>
                    <Col span= {6}>
                        <FormItem label='项目名称' {...formWtItemLayout}>
                        {
                            getFieldDecorator('projectName', {

                            })(
                                <Input />
                            )
                        }                     
                        </FormItem>
                    </Col>
                    <Col span= {6}>
                        <FormItem label='品种名称' {...formWtItemLayout}>
                        {
                            getFieldDecorator('goodsName', {

                            })(
                                <Input />
                            )
                        }
                        </FormItem>
                    </Col>
                    <Col span= {6}>
                        <FormItem label='发行年份' {...formWtItemLayout}>
                        {
                            getFieldDecorator('issueYear', {
                                initialValue: ''
                            })(
                                <Select  getPopupContainer={triggerNode => triggerNode.parentNode}>
                                    <Option value=''>请选择</Option>
                                    {
                                        !checkSelect  ? '' :
                                        (checkSelect.dictionariesYear || []).map((it, index)=>{ 
                                            return (<Option key={index} value={it}>{it}</Option>)
                                        })
                                    }
                                </Select>
                            )
                        }                      
                        </FormItem>
                    </Col>
                    <Col span= {6}>
                    <FormItem label='币面年份' {...formWtItemLayout}>
                        {
                            getFieldDecorator('goodsYear', {
                                initialValue: ''
                            })(
                                <Select  getPopupContainer={triggerNode => triggerNode.parentNode}>
                                    <Option value=''>请选择</Option>
                                    {
                                        !checkSelect ? '' :
                                        (checkSelect.dictionariesYear || [] ).map((it, index)=>{ 
                                            return (<Option key={index} value={it}>{it}</Option>)
                                        })
                                    }
                                </Select>
                            )
                        }                      
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span= {6}>
                    <FormItem label='包装版本' {...formWtItemLayout}>
                        {
                            getFieldDecorator('goodsPacking', {
                                initialValue: '',
                            })(
                                <Select  getPopupContainer={triggerNode => triggerNode.parentNode}>
                                    <Option value=''>请选择</Option>
                                    {
                                        !checkSelect ? '' :
                                        (checkSelect.dictionariesPacking || [] ).map((it)=>{ 
                                            return (<Option key={it.id} value={it.id}>{it.dictionariesValue}</Option>)
                                        })
                                    }
                                </Select>
                            )
                        }                   
                    </FormItem>
                    </Col>
                    <Col span= {6}>
                    <FormItem label='价格类型' {...formWtItemLayout}>
                        {
                            getFieldDecorator('priceType', {
                                initialValue: ''
                            })(
                                <Select  getPopupContainer={triggerNode => triggerNode.parentNode}>
                                    <Option value=''>请选择</Option>
                                    {
                                        !checkSelect  ? '' :
                                        (checkSelect.dictionariesPriceType || [] ).map((it)=>{ 
                                            return (<Option key={it.id} value={it.id}>{it.dictionariesValue}</Option>)
                                        })
                                    }
                                </Select>
                            )
                        }
                    </FormItem>
                    </Col>
                    <Col span= {6}>
                    <FormItem label='价格来源' {...formWtItemLayout}>
                        {
                            getFieldDecorator('priceSource', {
                                initialValue: ''
                            })(
                                <Select className='price-select'  getPopupContainer={triggerNode => triggerNode.parentNode}>
                                    <Option value=''>请选择</Option>
                                    {
                                        !checkSelect ? '' :
                                        (checkSelect.dictionariesPriceSource || []).map((it)=>{ 
                                            return (<Option key={it.id} value={it.id}>{it.dictionariesValue}</Option>)
                                        })
                                    }
                                </Select>
                            )
                        }
                    </FormItem>
                    </Col>
                </Row>     
            </Form>
        )
    }
}
SearchForm = Form.create({})(SearchForm);
