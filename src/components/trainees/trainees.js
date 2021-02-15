import React, {Component} from 'react'
import WithSportService from '../hoc'
import {ListGroupItem, ListGroup} from 'reactstrap'
import Trainee from '../trainee-item'
import {connect} from "react-redux"


class Trainees extends Component {

    state = {
        trainees: []
    }

    componentDidMount() {
        const {traineeService} = this.props
        const {token} = this.props

        traineeService.fetchAllTrainees("/api/v1/trainees", {"Authorization":token})
            .then(res => res.json())
            .then(res => {
                this.setState({
                    trainees: res
                })
            })
    }

    render() {
        const {trainees} = this.state

        const renderTraineeList = trainees.map(item => {
            return (
                <ListGroupItem key={item.id}>
                        <Trainee item={item}/>
                </ListGroupItem>
            )
        })

        return (
            <div>
                <ListGroup>
                    {renderTraineeList}
                </ListGroup>
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

export default WithSportService()(connect(mapStateToProps)(Trainees))