import React, {Component} from 'react'
import { Redirect } from 'react-router-dom'
import WithSportService from '../hoc'

class Registration extends Component {

    state = {
        username: '',
        password: '',
        firstname: '',
        lastname: '',
        phoneNumber: '',
        repeatPassword: '',
        role: '',
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

        const {authService} = this.props
        const {username, password, repeatPassword, firstname, lastname, phoneNumber, role} = this.state

        if (password !== repeatPassword) {
            this.setState({resultObject: {
                success: false,
                message: "Password didn't match"
            }})
            return
        }

        let registrationRequest = {
            username: username,
            password: password,
            firstname: firstname,
            lastname: lastname,
            role: role
        }

        if (phoneNumber !== "") {
            registrationRequest = {
                ...registrationRequest,
                phoneNumber: phoneNumber
            }
        }

        authService.registration(registrationRequest
        ).then(res => {
            this.setState({resultObject: {success: true, message: ''}, 
            username: '',
            password: '', 
            repeatPassword: '', 
            firstname: '',
            lastname: '',
            phoneNumber: ''})
        }).catch(data => {
            this.setState({
                resultObject: {success: false, message: "Registration failed"}, 
                username: '', 
                password: '',
                repeatPassword: '',
                firstname: '',
                lastname: '',
                phoneNumber: ''
            })
        })
    }

    render() {
        const {resultObject} = this.state

        if (resultObject.success) {
            return <Redirect to="/" exact/>
        }

        const renderComponent = resultObject.success ? null : <h2>{resultObject.message}</h2>

        return (
            <div>
                {renderComponent}
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
                        value={this.state.password}/>
                    <input type="password" 
                        name="repeatPassword" 
                        className="form-control" 
                        placeholder="Repeat password" 
                        onChange={this.handleInputChanges} 
                        value={this.state.repeatPassword}/>
                     <input type="text" 
                        name="firstname" 
                        className="form-control" 
                        placeholder="First Name"
                        onChange={this.handleInputChanges} 
                        value={this.state.firstname}/>
                    <input type="text" 
                        name="lastname" 
                        className="form-control" 
                        placeholder="Last name" 
                        onChange={this.handleInputChanges} 
                        value={this.state.lastname}/>
                    <input type="text" 
                        name="phoneNumber" 
                        className="form-control" 
                        placeholder="Phone number" 
                        onChange={this.handleInputChanges} 
                        value={this.state.phoneNumber}/>
                    <div onChange={this.handleInputChanges}>
                        <input type="radio"
                            value="coach"
                            name="role"/> Coach
                        <input type="radio"
                            value="trainee"
                            name="role"
                            checked/> Trainee
                    </div>
                    <button type="submit">Registration</button>
                </form>          
            </div>
        )
    }
}

export default WithSportService()(Registration)