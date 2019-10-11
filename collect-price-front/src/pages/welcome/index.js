import React, { Component } from 'react' 
import { connect } from 'react-redux'  
import { set_current_menu } from '../../reducer/switchMenu' 
import { set_bread_crumb } from '../../reducer/breadCrumb'  
import './index.less'

class Welcome extends Component{

    componentWillMount() {
        this.props.dispatch(set_current_menu([])) 
        this.props.dispatch(set_bread_crumb([]));
    }

    render(){
        return (
            <div className='home-wrap'>
                欢迎登录贵金属纪念币价格采集系统
            </div>
        );
    }
}

export default connect()(Welcome)