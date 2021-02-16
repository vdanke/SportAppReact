import React, {Component} from 'react'
import WithSportService from '../hoc'
import {connect} from 'react-redux'
import {ListGroupItem, ListGroup} from 'reactstrap'
import Coach from '../coach-item'

class Coaches extends Component {
    
    state = {
        coaches: []
    }

    componentDidMount() {
        const {coachService} = this.props
        const {token} = this.props

        coachService.fetchAllCoaches("/api/v1/coaches", {"Authorization":token})
            .then(res => res.json())
            .then(res => {
                this.setState({
                    coaches: res
                })
            })
    }

    render() {
        const {coaches} = this.state

        const renderTraineeList = coaches.map(item => {
            return (
                <ListGroupItem key={item.id}>
                        <Coach item={item}/>
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

export default WithSportService()(connect(mapStateToProps)(Coaches))