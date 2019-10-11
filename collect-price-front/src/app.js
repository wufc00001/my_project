import React from 'react'
import { Layout } from 'antd';
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom"
import NavLeft from './components/NavLeft' 
import NavHeader from './components/NavHeader'
import NavBread from './components/NavBread' 
import { set_nickname } from '../src/reducer/nickname'

const {Sider, Content } = Layout;

class App extends React.Component {

    componentWillMount() {
        let authData = sessionStorage.getItem('c_auth')   
        if(!authData){
            this.props.history.push('/login') 
        }
        let realName = sessionStorage.getItem('c_realName')
        this.props.dispatch(set_nickname(realName)); 
    }
    
    state = {
        collapsed: false,
    };  

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() { 
        return (
            <Layout className="wrap">
                <Sider trigger={null} collapsible collapsed={this.props.collapsed ? this.props.collapsed : false} width="246">
                    <div className="logo" />
                    <NavLeft></NavLeft>
                </Sider>
                <Layout>
                    <NavHeader></NavHeader>
                    <Content
                        style={{
                            margin: '10px 10px',
                            padding: 12,
                            background: '#fff',
                            minHeight: 'auto',
                        }}
                        >
                        <NavBread></NavBread>
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        );
    }
} 

const mapStateToProps = state => {   
    return {
        collapsed: state.collapse.collapse
    }
}

export default withRouter(connect(mapStateToProps)(App)) 