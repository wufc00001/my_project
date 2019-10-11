import React from 'react' 
import { Form, Input, Select, Button, Radio, Col, Row, Upload, Icon, message } from 'antd'
import './../index.less'
const FormItem = Form.Item
const Option = Select.Option
const RadioGroup = Radio.Group;



export default  class CreateForm extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            fileList: props.fileList||[],
        }
        this.num = this.state.fileList.length
    } 


    handleBeforeUpload = file => {  
        const isJpgOrPng = file.type == 'image/jpeg' || file.type == 'image/png';
        if (!isJpgOrPng) {
            message.error('图片上传格式不对，请重新上传');
            return isJpgOrPng
        }    
        const isLit = file.size /  1024 <= 200;
        if (!isLit) {
            this.error = true
            message.error('上传图片大小不超过200k');
            return isLit
        } 
        return false
    }

    handleMove = file => {
        this.setState(({fileList})=>{
            const index=fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index,1);
            return {
                fileList:newFileList
            }
        })
    }

    handleChange = info => {
        let list = info.fileList
        list.forEach((file, index) => {
            const bool = file.name ? true : false
            if(bool){
                const isJpgOrPng = file.type == 'image/jpeg' || file.type == 'image/png';
                if(!isJpgOrPng){
                    list.splice(index, 1)
                }
                const isLit = file.size /  1024 <= 200
                if(!isLit){
                    list.splice(index, 1)
                }
            }        
        }); 
        if(list.length > 2){
            message.error('最多上传2张图片')
            return false
        }
        this.num = list.length 
        this.setState(({fileList})=>{
            return {
                fileList:list
            }
        })
    }


    handleUploadValidator = (rule, value, callback) => {
        if(this.num <= 0){
            callback('请上传图片')
        }else {
            callback()
        }
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        const updateInfo = this.props.updateInfo || '';
        const { dictionariesShape, dictionariesProject, dictionariesYear, dictionariesMaterial, dictionariesWeight} = this.props.baseSelect;

        const formBigItemLayout = {
            labelCol:{
               span: 4
            },
            wrapperCol:{
                span:18
            }
        }
        const formPriceItemLayout = {
            labelCol:{
               span: 8
            },
            wrapperCol:{
                span:12
            }
        }
        const formMQItemLayout = {
            labelCol:{
               span: 8
            },
            wrapperCol:{
                span:12
            }
        }
        const { fileList } = this.state;
        return (
            <div>
                <Form>                               
                    <FormItem label='项目名称' {...formBigItemLayout}>
                    {
                        getFieldDecorator('projectName', {
                            initialValue:  !updateInfo ? '' : parseInt(updateInfo.project_id),
                            rules: [
                                {
                                    required: true,
                                    message: '请选择项目名称'
                                }
                            ]
                        })(
                            <Select getPopupContainer={triggerNode => triggerNode.parentNode}> 
                                <Option value=''>请选择</Option>
                                {
                                    (dictionariesProject || []).map((it, index)=>{ 
                                        return (<Option key={it.id} value={it.id}>{it.projectName}</Option>)
                                    })
                                }
                            </Select>
                        )
                    }                                       
                    </FormItem>
                    <FormItem label='品种名称' {...formBigItemLayout}>
                    {
                        getFieldDecorator('goodsName', {
                            initialValue: !updateInfo ? '' : updateInfo.goods_name,
                            rules: [
                                {
                                    required: true,
                                    message: '请填写品种名称'
                                },
                                {
                                    max: 200,
                                    message: '最多输入200个字符'
                                }
                            ]
                        })(
                            <Input autoComplete="off" allowClear />
                        )
                    }
                    </FormItem>
                    <Row>
                        <Col span={12}>
                            <FormItem label='类型' labelCol={{ span: 8}} wrapperCol={{span:16}}>                        
                                {
                                    getFieldDecorator('goodsType', {
                                        initialValue: !updateInfo ? '' : updateInfo.goods_type,
                                        rules: [
                                            {
                                                required: true,
                                                message: '请选择类型'
                                            }
                                        ]
                                    })(
                                    <RadioGroup>
                                        <Radio value="0">单枚</Radio>
                                        <Radio value="1">套装</Radio>
                                    </RadioGroup>
                                    )
                                }                      
                            </FormItem>
                        </Col>
                        <Col span={12}>
                                <FormItem label='币面年份' {...formPriceItemLayout}> 
                            {
                                getFieldDecorator('goodsYear', {
                                    initialValue: !updateInfo ? '' : updateInfo.goods_year,
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择币面年份'
                                        }
                                    ]
                                })(
                                    <Select getPopupContainer={triggerNode => triggerNode.parentNode}>
                                        <Option value=''>请选择</Option>
                                        {
                                            (dictionariesYear || [] ).map((it, index)=>{ 
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
                        <Col span={12}>
                            <FormItem label='材质'  {...formMQItemLayout}>
                                {
                                    getFieldDecorator('goodsMaterial', {
                                        initialValue: !updateInfo ? '' : parseInt(updateInfo.goods_material),
                                        rules: [
                                            {
                                                required: true,
                                                message: '请选择材质'
                                            }
                                        ]
                                    })(
                                        <Select getPopupContainer={triggerNode => triggerNode.parentNode}>
                                            <Option value=''>请选择</Option>
                                            {
                                                (dictionariesMaterial || []).map((it, index)=>{ 
                                                    return (<Option key={index} value={it.id}>{it.dictionariesValue}</Option>)
                                                })
                                            }
                                        </Select>
                                    )
                                }
                            </FormItem>
                        </Col> 
                        <Col span={12}>
                            <Row>
                                <Col span={16}>
                                    <FormItem label='重量' labelCol={{span: 12}} wrapperCol={{span:8}} >
                                        {
                                            getFieldDecorator('goodsWeight', {
                                                initialValue: !updateInfo ? '' : String(updateInfo.goods_weight),
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: '请填写重量'
                                                    },
                                                    {
                                                        pattern: new RegExp("^[1-9]{1}[0-9]*$|^0{1}\.{1}[0-9]+$|^[1-9]{1}[0-9]*\.{1}[0-9]+$"),
                                                        message: '请输入大于0的数字'
                                                    },
                                                    {
                                                        max: 20,
                                                        message: '最多输入20个字符'
                                                    }
                                                ]
                                                
                                            })(
                                                <Input autoComplete="off" /> 
                                            )
                                        }
                                    </FormItem> 
                                </Col>
                                <Col span={4}>
                                    <FormItem style={{marginLeft: -35}} >
                                        {
                                            getFieldDecorator('goodsWeightUnit', {
                                                initialValue: !updateInfo ? '' : parseInt(updateInfo.goods_weight_unit),
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: '请选择重量单位'
                                                    }
                                                ]
                                            })(
                                                <Select getPopupContainer={triggerNode => triggerNode.parentNode}>
                                                    <Option value=''>请选择</Option>
                                                    {
                                                        (dictionariesWeight || [] ).map((it, index)=>{ 
                                                            return (<Option key={index} value={it.id}>{it.dictionariesValue}</Option>)
                                                        })
                                                    }
                                                </Select>
                                            )
                                        }
                                    </FormItem> 
                                </Col>                               
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem label='形状' {...formMQItemLayout}> 
                            {
                                getFieldDecorator('goodsShape', {
                                    initialValue: !updateInfo ? '' : parseInt(updateInfo.goods_shape),
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择形状'
                                        }
                                    ]
                                })(
                                    <Select getPopupContainer={triggerNode => triggerNode.parentNode}>
                                        <Option value=''>请选择</Option>
                                        {
                                            (dictionariesShape || []).map((it, index)=>{ 
                                                return (<Option key={it.id} value={it.id}>{it.dictionariesValue}</Option>)
                                            })
                                        }                                     
                                    </Select>
                                )
                            }
                            </FormItem>
                        </Col>
                        <Col span={12}>
                        <FormItem label='面额' {...formPriceItemLayout}>
                        {
                            getFieldDecorator('goodsDenomination', {
                                initialValue: !updateInfo ? '' : updateInfo.goods_denomination,
                                rules: [
                                    {
                                        pattern: new RegExp(/^[1-9]\d*$/, "g"),
                                        message: '请输入正确的面额'
                                    },
                                    {
                                        max: 20,
                                        message: '最多输入20个字符'
                                    }
                                ]   

                            })(
                                <Input autoComplete="off" />
                            )
                        }
                        </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                        <FormItem label='最大发行量' {...formMQItemLayout}>
                        {
                            getFieldDecorator('maxCirculation', {
                                initialValue: !updateInfo ? '' : String(updateInfo.max_circulation),
                                rules: [
                                    {
                                        required: true, 
                                        message: '请填写最大发行量'
                                    },
                                    {
                                        pattern: new RegExp(/^[1-9]\d*$/, "g"),
                                        message: '请输入正确的最大发行量'
                                    },
                                    {
                                        max: 15,
                                        message: '最多输入15个字符'
                                    }
                                ]
                            })(
                                <Input autoComplete="off" />
                            )
                        }
                        </FormItem>
                        </Col>
                        <Col span={12}>
                        <FormItem label='实铸量' {...formPriceItemLayout}> 
                        {
                            getFieldDecorator('actualCastingQuantity', {
                                initialValue: !updateInfo ? '' : (!updateInfo.actual_casting_quantity ? '' : String(updateInfo.actual_casting_quantity)),
                                rules: [
                                    {
                                        pattern: new RegExp(/^[1-9]\d*$/, "g"),
                                        message: '请输入正确的实铸量'
                                    },
                                    {
                                        max: 15,
                                        message: '最多输入15个字符'
                                    }
                                ]
                            })(
                                <Input autoComplete="off" />
                            )
                        }
                        </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <FormItem label='币面图片' {...formBigItemLayout}>
                            {
                                getFieldDecorator('files', {
                                    rules: [
                                        {
                                            required: true,
                                            validator: this.handleUploadValidator
                                        }
                                    ]
                                })(
                                    <Upload
                                        listType="picture"
                                        multiple={true} 
                                        beforeUpload={this.handleBeforeUpload} // 上传之前，对图片的格式做校验，并获取图片的宽高
                                        onRemove={this.handleMove}
                                        onChange={this.handleChange}
                                        defaultFileList = {[...fileList]}
                                        fileList={fileList}
                                    >
                                        {
                                            this.num >= 2 ? null :
                                            <div>
                                                <Button><Icon type="upload" /> 上传图片</Button>
                                                <div style={{display: 'initial',marginLeft: 15}}>.jpg、.png文件，大小不超过200K，最多上传两张</div>
                                            </div>
                                        }
                                        
                                        
                                        
                                    </Upload>
                                )
                            }
                            </FormItem>                        
                        </Col>
                    </Row>
                     
                </Form>
            </div>
        )
    }
}
CreateForm = Form.create({})(CreateForm);
