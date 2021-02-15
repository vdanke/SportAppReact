import React, {Component} from 'react'
import WithSportService from '../hoc'
import {connect} from 'react-redux'
import Login from '../login'
import Registration from '../registration'
import { Redirect, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from '../header'
import Trainees from '../trainees'
import Coaches from '../coaches'
import Gyms from '../gyms'
import TraineeCabinet from '../trainee-cabinet'

class App extends Component {

    render() {
        return (
            <div className="app">
                <Header/>
                <Route path="/login" component={Login}/>
                <Route path="/registration" component={Registration}/>
                <Route path="/logout">
                    <Redirect to="/" exact/>
                </Route>
                <Route path="/trainees" component={Trainees}/>
                <Route path="/coaches" component={Coaches}/>
                <Route path="/gyms" component={Gyms}/>
                <Route path="/cabinet/trainee/" component={TraineeCabinet}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {            
        token: state.token,
        role: state.role
    }
}
      
export default WithSportService()(connect(mapStateToProps)(App))