import React from 'react'
import { Breadcrumb } from 'antd';
import { connect } from 'react-redux'

class NavBread extends React.Component { 

    render() {  
        return (
            this.props.bread_crumb ? 
            (<Breadcrumb>
                {this.props.bread_crumb.map((item, i) => { 
                    return <Breadcrumb.Item key={i}>{item}</Breadcrumb.Item>
                })}
            </Breadcrumb>)
            : ''
        );
    }

}

const mapStateToProps = state => {   
    return {
        bread_crumb: state.breadCrumb.bread_crumb
    }
}

export default connect(mapStateToProps)(NavBread)