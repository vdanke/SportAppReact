import React, {Component} from 'react'
import WithSportService from '../hoc'

class Gyms extends Component {
    render() {
        return (
            <div></div>
        )
    }
}

export default WithSportService()(Gyms)