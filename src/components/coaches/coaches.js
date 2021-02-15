import React, {Component} from 'react'
import WithSportService from '../hoc'

class Coaches extends Component {
    render() {
        return (
            <div></div>
        )
    }
}

export default WithSportService()(Coaches)