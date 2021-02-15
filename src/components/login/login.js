import React, {Component} from 'react'
import WithSportService from '../hoc'
import {AUTHORIZATION_HEADER, ROLE_HEADER} from '../../constants'
import {userLoaded} from "../../actions"
import {connect} from "react-redux"
import { Redirect } from 'react-router-dom'

class Login extends Component {

    state = {
        username: '',
        password: ''
    }
    
    state = {
        username: '',
        password: '',
        resultObject: {
            success: false,
            message: ''
        }
    }

    handleInputChanges = (event) => {
        const target = event.target
        const inputName = target.name
        const inputValue = target.value

        this.setState({
            [inputName]: inputValue
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()

        const {authService, userLoaded} = this.props
        const {username, password} = this.state

        const loginRequest = {
            username: username,
            password: password
        }

        authService.login(
            "/api/v1/auth/login", loginRequest
            ).then(res => {
                const headers = res.headers
                const authorizationTokenHeader = headers.get(AUTHORIZATION_HEADER)
                const roleHeader = headers.get(ROLE_HEADER)

                console.log(res.status)
                
                if (authorizationTokenHeader && roleHeader) {
                    userLoaded(authorizationTokenHeader, roleHeader)
                    this.setState({
                        resultObject: {success: true, message: ''},
                        username: '', 
                        password: ''
                    })
                } else {
                    throw new Error("Token or Roles is not defined")
                }
            })
            .catch(reason => {
                this.setState({
                    resultObject: {success: false, message: 'Login or password is not correct'}, 
                    username: '',
                    password: ''
                })
            })
    }

    render() {
        const {resultObject} = this.state

        if (resultObject.success) {
            return <Redirect to="/" exact/>
        }

        const errorRendering = resultObject.success ? null : <h2>{resultObject.message}</h2>

        return (
            <div>
                {errorRendering}
                <form onSubmit={this.handleSubmit}>
                    <input type="email" 
                        name="username" 
                        className="form-control" 
                        placeholder="Email"
                        onChange={this.handleInputChanges} 
                        value={this.state.username}/>
                    <input type="password" 
                        name="password" 
                        className="form-control" 
                        placeholder="Password" 
                        onChange={this.handleInputChanges} 
                        value={this.state.password}
                        />
                    <button type="submit">Login</button>
                </form>     
            </div>               
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.token,
        role: state.role
    }
}

const mapDispatchToProps = {
    userLoaded
}

export default WithSportService()(connect(mapStateToProps, mapDispatchToProps)(Login))