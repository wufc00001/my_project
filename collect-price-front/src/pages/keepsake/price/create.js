import React from 'react' 
import { Form, Input, Select, Col, Row, DatePicker  } from 'antd'
import moment from 'moment';
import './../index.less'
import 'moment/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'
const FormItem = Form.Item
const Option = Select.Option
const TextArea = Input.TextArea;

moment.locale('zh-cn');

export default  class CreateForm extends React.Component {

    constructor(props) {
        super(props)
        this.baseSelect = props.baseSelect
        this.commonPacking = false
        this.rate = false
    }

    handleSelectChange = (value, text)  => {
        this.commonPacking = false
        this.rate = false
        if(text.props.children == '封装认证'){
            this.commonPacking = true
        }
        if(text.props.children == '鉴定评级'){
            this.rate = true
        }
    }

    render(){
        const { getFieldDecorator } = this.props.form; 
        const { dictionariesRatingAgencies,dictionariesPriceSource,dictionariesPriceType,dictionariesCertificationAuthority,dictionariesPacking } = this.baseSelect; 
        const updateInfo = this.props.updateInfo || '';
        const formBigItemLayout = {
            labelCol:{
               span: 4
            },
            wrapperCol:{
                span: 7
            }
        }    
        const formSmallItemLayout = {
            labelCol:{
               span: 8
            },
            wrapperCol:{
                span: 14
            }
        }    
        const formTextItemLayout = {
            labelCol:{
               span: 4
            },
            wrapperCol:{
                span: 20
            }
        }
        return (
            <div>
                <Form>                               
                    <FormItem label='成交时间' {...formBigItemLayout}> 
                    {
                        getFieldDecorator('businessTime', {
                            initialValue: !updateInfo ? null : moment(updateInfo.business_time ),
                            rules: [
                                {
                                    required: true,
                                    message: '请选择成交时间'
                                }
                            ]
                        })(
                            <DatePicker  
                                locale={locale}
                                format="YYYY-MM-DD"  
                            />                         
                        )                    
                    }  
                    </FormItem>

                    <Row>
                        <Col span={12}>
                            <FormItem label='包装版本' {...formSmallItemLayout}>
                            {
                                getFieldDecorator('packing', {
                                    initialValue: updateInfo ? (updateInfo.goods_packing ? parseInt(updateInfo.goods_packing) : '') : '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择包装版本'
                                        }
                                    ]
                                })(
                                    <Select getPopupContainer={triggerNode => triggerNode.parentNode}  onChange={this.handleSelectChange}>
                                        <Option value=''>请选择</Option>
                                        {
                                            (dictionariesPacking || []).map((it)=>{ 
                                                return (<Option key={it.id} value={it.id}>{it.dictionariesValue}</Option>)
                                            })
                                        }                                     
                                    </Select>
                                )
                            }
                            </FormItem>                       
                        </Col>
                        <Col span={12}>
                            <FormItem label='封装认证机构' {...formSmallItemLayout}>
                            {
                                getFieldDecorator('certificationAuthority', {
                                    initialValue : updateInfo ? (updateInfo.certification_authority ? parseInt(updateInfo.certification_authority) : '') : '',
                                    rules: [
                                        {
                                            required: this.commonPacking,
                                            message: '请选择封装认证机构'
                                        }
                                    ]
                                })(
                                    <Select getPopupContainer={triggerNode => triggerNode.parentNode}>
                                        <Option value=''>请选择</Option>
                                        {
                                            (dictionariesCertificationAuthority || []).map((it)=>{ 
                                                return (<Option key={it.id} value={it.id}>{it.dictionariesValue}</Option>)
                                            })
                                        }
                                    </Select>
                                )
                            }
                            </FormItem>                       
                        </Col>
                    </Row>


                    <Row>
                        <Col span={12}>
                            <FormItem label='鉴定评级机构' {...formSmallItemLayout}>
                            {
                                getFieldDecorator('ratingAgencies', {
                                    initialValue : updateInfo ? (updateInfo.rating_agencies ? parseInt(updateInfo.rating_agencies) : '') : '',                   
                                    rules: [
                                        {
                                            required: this.rate,
                                            message: '请选择鉴定评级机构'
                                        }
                                    ]
                                })(
                                    <Select getPopupContainer={triggerNode => triggerNode.parentNode}>
                                        <Option value=''>请选择</Option>
                                        {
                                            (dictionariesRatingAgencies || [] ).map((it)=>{ 
                                                return (<Option key={it.id} value={it.id}>{it.dictionariesValue}</Option>)
                                            })
                                        }
                                    </Select>
                                )
                            }
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label='评级分数' {...formSmallItemLayout}>
                            {
                                getFieldDecorator('ratingFraction', {
                                    initialValue : updateInfo ? updateInfo.rating_fraction : '', 
                                    rules: [
                                        {
                                            required: this.rate,
                                            message: '请填写评级分数'
                                        },{
                                            pattern: new RegExp("^([1-9]|[1-9]\\d|100)$"),
                                            message: '请输入正确的评级分数'
                                        }
                                    ]
                                })(
                                    <Input autoComplete="off"/>
                                )
                            }
                            </FormItem>                      
                        </Col>
                    </Row>

                    <FormItem label='价格类型' {...formBigItemLayout}>
                    {
                        getFieldDecorator('priceType', {
                            
                            initialValue : updateInfo ? (updateInfo.price_type ? parseInt(updateInfo.price_type) : '') : '',
                            rules: [
                                {
                                    required: true,
                                    message: '请选择价格类型'
                                }
                            ]
                        })(
                            <Select getPopupContainer={triggerNode => triggerNode.parentNode}>
                                <Option value=''>请选择</Option>
                                {
                                    (dictionariesPriceType || []).map((it)=>{ 
                                        return (<Option key={it.id} value={it.id}>{it.dictionariesValue}</Option>)
                                    })
                                }
                            </Select>
                        )
                    }
                    </FormItem>
                    <FormItem label='价格来源' {...formBigItemLayout}>
                    {
                        getFieldDecorator('priceSource', {
                            initialValue : updateInfo ? parseInt(updateInfo.price_source) : '',
                            rules: [
                                {
                                    required: true,
                                    message: '请选择价格来源'
                                }
                            ]
                        })(
                            <Select getPopupContainer={triggerNode => triggerNode.parentNode}>
                                <Option value=''>请选择</Option>
                                {
                                    (dictionariesPriceSource || []).map((it)=>{ 
                                        return (<Option key={it.id} value={it.id}>{it.dictionariesValue}</Option>)
                                    })
                                }
                            </Select>
                        )
                    }
                    </FormItem>
                    <FormItem label='价格' {...formBigItemLayout}>
                    {
                        getFieldDecorator('price', {
                            initialValue : updateInfo ? String(updateInfo.goods_price) : '',
                            rules: [
                                {
                                    required: true,
                                    message: '请填写价格'
                                },
                                {
                                    pattern: new RegExp("^[1-9]{1}[0-9]*$|^0{1}\.{1}[0-9]+$|^[1-9]{1}[0-9]*\.{1}[0-9]+$"),
                                    message: '请输入大于0的数字'
                                },
                                {
                                    max: 15,
                                    message: '最多输入15个字符'
                                }
                            ]
                        })(
                            <Input autoComplete="off"/>
                        )
                    }
                    </FormItem>
                    <FormItem label='成交量' {...formBigItemLayout}>
                    {
                        getFieldDecorator('quantity', {
                            initialValue : updateInfo ? (!updateInfo.quantity ? '' : String(updateInfo.quantity)) : '',
                            rules: [
                                {
                                    pattern: new RegExp(/^[1-9]\d*$/, "g"),
                                    message: '请输入正确的成交量'
                                },
                                {
                                    max: 15,
                                    message: '最多输入15个字符'
                                }
                            ]
                        })(
                            <Input autoComplete="off"/>
                        )
                    }
                    </FormItem>


                    <FormItem label='备注' {...formTextItemLayout}>
                    {
                        getFieldDecorator('remarks', {
                            initialValue : updateInfo ? updateInfo.remarks : '',
                            rules: [
                                {
                                    max: 255,
                                    message: '最多输入255个字符'
                                }
                            ]
                        })(
                            <TextArea />
                        )
                    }
                    </FormItem>
                </Form>
            </div>
        )
    }
}
CreateForm = Form.create({})(CreateForm);
