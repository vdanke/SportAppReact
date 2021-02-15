import React, {Component} from 'react'
import WithSportService from '../hoc'
import {Card, CardText, CardBody,
    CardTitle, CardSubtitle, Row, Col } from 'reactstrap'

class Trainee extends Component {
    render() {
        const {item} = this.props

        return (
            <Row>
                <Col sm="3">
                    <Card>
                        <CardBody>
                            <CardTitle tag="h5">{item.firstname + " " + item.lastname}</CardTitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">{item.age}</CardSubtitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">{item.purpose}</CardSubtitle>
                        </CardBody>
                        {/* <UncontrolledCarousel className="image__list-item" autoPlay={false} items={imagesForRender} /> */}
                        <CardBody>
                            <CardText>{item.weight}</CardText>
                            <CardText>{item.height}</CardText>
                            <CardText>{item.purpose}</CardText>
                        </CardBody>
                    </Card>
                </Col>
            </Row>    
        )
    }
}

export default WithSportService()(Trainee)