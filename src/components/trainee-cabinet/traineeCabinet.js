import React, {Component} from 'react'
import WithSportService from '../hoc'
import {connect} from 'react-redux'

class TraineeCabinet extends Component {

    state = {
        username: '',
        firstname: '',
        lastname: '',
        height: undefined,
        weight: undefined,
        purpose: '',
        phoneNumber: ''
    }

    componentDidMount() {
        const {traineeService, token} = this.props

        traineeService.fetchTraineeCabinet("/api/v1/trainees/cabinet", {"Authorization":token, "Content-Type":"application/json"})
            .then(res => res.json())
            .then(res => {
                this.setState({
                    username: res.username,
                    firstname: res.firstname,
                    lastname: res.lastname,
                    height: res.height === null ? undefined : res.height,
                    purpose: res.purpose === null ? undefined : res.purpose,
                    weight: res.weight === null ? '' : res.weight,
                    phoneNumber: res.phoneNumber === null ? '' : res.phoneNumber
                })
            })
    }

    handleSubmit = (event) => {
        event.preventDefault()

        const {traineeService, token} = this.props

        const {firstname, lastname, height, weight, purpose, phoneNumber} = this.state

        let updateRequest = {
            firstname: firstname,
            lastname: lastname
        }

        if (height) {
            updateRequest = {
                ...updateRequest,
                height: Number.parseInt(height)
            }
        }
        if (weight) {
            updateRequest = {
                ...updateRequest,
                weight: Number.parseInt(weight)
            }
        }
        if (purpose.length > 0) {
            updateRequest = {
                ...updateRequest,
                purpose: purpose
            }
        }
        if (phoneNumber.length > 0) {
            updateRequest = {
                ...updateRequest,
                phoneNumber: phoneNumber
        }

        console.log(updateRequest)

        traineeService.updateTrainee("/api/v1/trainees", {"Authorization":token, "Content-Type":"application/json"}, updateRequest)
                .then(res => res.json())
                .then(res => {
                    this.setState({
                        username: res.username,
                        firstname: res.firstname,
                        lastname: res.lastname,
                        height: res.height === null ? undefined : res.height,
                        weight: res.weight === null ? undefined : res.weight,
                        purpose: res.purpose === null ? '' : res.purpose,
                        phoneNumber: res.phoneNumber === null ? '' : res.phoneNumber
                    })
                })
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

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="email" 
                        name="username" 
                        className="form-control" 
                        placeholder={this.state.username}
                        onChange={this.handleInputChanges} 
                        value={this.state.username}/>
                     <input type="text" 
                        name="firstname" 
                        className="form-control" 
                        placeholder={this.state.firstname}
                        onChange={this.handleInputChanges} 
                        value={this.state.firstname}/>
                    <input type="text" 
                        name="lastname" 
                        className="form-control" 
                        placeholder={this.state.lastname} 
                        onChange={this.handleInputChanges} 
                        value={this.state.lastname}/>
                    <input type="text" 
                        name="phoneNumber" 
                        className="form-control" 
                        placeholder={this.state.phoneNumber === "" || this.state.phoneNumber === null ? "Phone number" : this.state.phoneNumber} 
                        onChange={this.handleInputChanges} 
                        value={this.state.phoneNumber}/>
                    <input type="text" 
                        name="purpose" 
                        className="form-control" 
                        placeholder={this.state.purpose === "" || this.state.purpose === null ? "Purpose" : this.state.purpose} 
                        onChange={this.handleInputChanges} 
                        value={this.state.purpose}/>
                    <input type="number" 
                        name="height" 
                        className="form-control" 
                        placeholder={!this.state.height ? "Height" : this.state.height} 
                        onChange={this.handleInputChanges} 
                        value={this.state.height}/>
                    <input type="number" 
                        name="weight" 
                        className="form-control" 
                        placeholder={!this.state.weight ? "Weight" : this.state.weight} 
                        onChange={this.handleInputChanges} 
                        value={this.state.weight}/>
                    <button type="submit">Update profile</button>
                </form>          
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.token
    }
}

export default WithSportService()(connect(mapStateToProps)(TraineeCabinet))