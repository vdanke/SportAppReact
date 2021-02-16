import React, {Component} from 'react'
import WithSportService from '../hoc'
import {Card, CardText, CardBody,
    CardTitle, CardSubtitle, Row, Col } from 'reactstrap'

class Coach extends Component {
    render() {
        const {item} = this.props

        return (
            <Row>
                <Col sm="3">
                    <Card>
                        <CardBody>
                            <CardTitle tag="h5">{item.firstname + " " + item.lastname}</CardTitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">{item.username}</CardSubtitle>
                        </CardBody>
                        {/* <UncontrolledCarousel className="image__list-item" autoPlay={false} items={imagesForRender} /> */}
                        <CardBody>
                            <CardText>{item.sportClass}</CardText>
                            <CardText>{item.category}</CardText>
                            <CardText>{item.achievements}</CardText>
                        </CardBody>
                    </Card>
                </Col>
            </Row>    
        )
    }
}

export default WithSportService()(Coach)