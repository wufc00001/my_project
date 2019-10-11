import React from 'react'
import { Menu, Icon } from 'antd';
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'   
import menuList from '../../config/menuList' 

const Item = Menu.Item
const SubMenu = Menu.SubMenu

class NavLeft extends React.Component {

    constructor(){
        super()
        this.state = {
            openKeys: [],
            selectedKeys: [],
            menuNode: null,
            defaultOpenKeys: [],
            storageData: JSON.parse(sessionStorage.getItem('c_auth')) 
        }
    } 

    componentWillMount() {    
        let menuNode = this.renderMenu(menuList)
        this.setState({
            menuNode
        })
        let pathname = this.props.location.pathname
        if(pathname.indexOf('system') != -1){
            let pathArr = ['system'] 
            if(pathname.indexOf('manager') == -1){
                pathArr.push('dict')
            } 
            this.setState({
                defaultOpenKeys: pathArr
            })
        }
    }

    getStorageData(key) {
        let storageData = this.state.storageData
        return storageData && storageData[key] ? true : false
    } 

    renderMenu(data) {
        return data.map((item) => {
            if(!this.getStorageData(item.code)){return;}
            if(item.children){
                return (
                    <SubMenu  
                    title={ 
                        <span>
                            {
                                item.icon ? <Icon type={item.icon}/> : ''
                            } 
                            <span>
                                {item.name}
                            </span>
                        </span>
                    } 
                    key={item.key}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return <Item title={item.name} key={item.key}>
                        <NavLink to={item.path}>
                        <span>
                        {
                            item.icon ? <Icon type={item.icon}/> : ''
                        }
                            <span>
                                {item.name}
                            </span>
                        </span>
                        </NavLink>
                    </Item>
        })
    }

    render() { 
        return (
            <Menu
                mode="inline"
                theme="dark"   
                defaultOpenKeys={this.state.defaultOpenKeys}
                selectedKeys={this.props.menu_key ? this.props.menu_key : []}  
            > 
                {this.state.menuNode}
            </Menu>
        );
    }

}

const mapStateToProps = state => {    
    return {
        menu_key: state.switchMenu.menu_key
    }
}

export default withRouter(connect(mapStateToProps)(NavLeft))
 