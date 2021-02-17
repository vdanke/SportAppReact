import React, {Component} from 'react'
import WithSportService from '../hoc'
import {connect} from 'react-redux'
import PostForm from '../post-form'

class CoachCabinet extends Component {
    state = {
        username: '',
        firstname: '',
        lastname: '',
        sportClass: '',
        achievements: '',
        category: '',
        phoneNumber: ''
    }

    componentDidMount() {
        const {traineeService, token} = this.props

        traineeService.fetchTraineeCabinet("/api/v1/coaches/cabinet", {"Authorization":token, "Content-Type":"application/json"})
            .then(res => res.json())
            .then(res => {
                this.setState({
                    username: res.username,
                    firstname: res.firstname,
                    lastname: res.lastname,
                    sportClass: res.sportClass === null ? '' : res.sportClass,
                    achievements: res.achievements === null ? '' : res.achievements,
                    category: res.category === null ? '' : res.category,
                    phoneNumber: res.phoneNumber === null ? '' : res.phoneNumber
                })
            })
    }

    handleSubmit = (event) => {
        event.preventDefault()

        const {traineeService, token} = this.props
        
        const {firstname, lastname, sportClass, achievements, category, phoneNumber} = this.state

        let updateRequest = {
            firstname: firstname,
            lastname: lastname
        }

        if (sportClass.length > 0) {
            updateRequest = {
                ...updateRequest,
                sportClass: sportClass
            }
        }
        if (achievements.length > 0) {
            updateRequest = {
                ...updateRequest,
                achievements: achievements
            }
        }
        if (category.length > 0) {
            updateRequest = {
                ...updateRequest,
                category: category
            }
        }
        if (phoneNumber.length > 0) {
            updateRequest = {
                ...updateRequest,
                phoneNumber: phoneNumber
        }

        traineeService.updateTrainee("/api/v1/coaches", {"Authorization":token, "Content-Type":"application/json"}, updateRequest)
                .then(res => res.json())
                .then(res => {
                    this.setState({
                        username: res.username,
                        firstname: res.firstname,
                        lastname: res.lastname,
                        sportClass: res.sportClass === null ? '' : res.sportClass,
                        achievements: res.achievements === null ? '' : res.achievements,
                        category: res.category === null ? '' : res.category,
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
                <PostForm/>
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
                        name="sportClass" 
                        className="form-control" 
                        placeholder={this.state.sportClass === "" ? "Purpose" : this.state.purpose} 
                        onChange={this.handleInputChanges} 
                        value={this.state.sportClass}/>
                    <input type="text" 
                        name="category" 
                        className="form-control" 
                        placeholder={this.state.category === "" ? "Height" : this.state.height} 
                        onChange={this.handleInputChanges} 
                        value={this.state.category}/>
                    <input type="text" 
                        name="achievements" 
                        className="form-control" 
                        placeholder={this.state.achievements === "" ? "Weight" : this.state.weight} 
                        onChange={this.handleInputChanges} 
                        value={this.state.achievements}/>
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

export default WithSportService()(connect(mapStateToProps)(CoachCabinet))