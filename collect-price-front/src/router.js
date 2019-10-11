import React, { Component } from 'react'
import { HashRouter, Route, Switch, Redirect} from 'react-router-dom' 
import App from './app'
import Welcome from './pages/welcome'
import Login from './pages/login'
import KindList from './pages/keepsake/kind'
import PriceList from './pages/keepsake/price'
import PriceEnter from './pages/keepsake/price/enter'
import Grade from './pages/system/dict/grade'
import Identify from './pages/system/dict/identify'
import Material from './pages/system/dict/material'
import Pack from './pages/system/dict/pack'
import PriceFrom from './pages/system/dict/priceFrom'
import PriceType from './pages/system/dict/priceType'
import Project from './pages/system/dict/project'
import Shape from './pages/system/dict/shape'
import Weight from './pages/system/dict/weight'
import Manager from './pages/system/manager'

export default class ERouter extends Component{

    render(){
        return (
            <HashRouter> 
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route render={()=>
                        <App>
                            <Switch> 
                                <Route path='/welcome' component={Welcome} />
                                <Route path="/kind" component={KindList} />
                                <Route path="/price" component={PriceList} />
                                <Route path="/priceenter/:goodsId/:goodsName" component={PriceEnter} />                               
                                <Route path="/system/grade" component={Grade} />
                                <Route path="/system/identify" component={Identify} />
                                <Route path="/system/material" component={Material} />
                                <Route path="/system/pack" component={Pack} />
                                <Route path="/system/priceFrom" component={PriceFrom} />
                                <Route path="/system/priceType" component={PriceType} />
                                <Route path="/system/project" component={Project} />
                                <Route path="/system/shape" component={Shape} />
                                <Route path="/system/weight" component={Weight} />
                                <Route path="/system/manager" component={Manager} />  
                            </Switch>
                        </App>         
                    } /> 
                    <Redirect to="/login"/>
                </Switch> 
            </HashRouter>
        );
    }
}