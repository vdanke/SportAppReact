import React, {Component} from 'react'
import WithSportService from '../hoc'
import {Card, CardText, CardBody,
    CardTitle, CardSubtitle, Row, Col } from 'reactstrap'

class Post extends Component {
    render() {
        const {item} = this.props
        return (
            <div>
                <Row>
                    <Col sm="3">
                        <Card>
                            <CardBody>
                                <CardTitle tag="h5">{item.topic}</CardTitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted">{item.author}</CardSubtitle>
                            </CardBody>
                            {/* <UncontrolledCarousel className="image__list-item" autoPlay={false} items={imagesForRender} /> */}
                            <CardBody>
                                <CardText>{item.text}</CardText>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>   
            </div>
        )
    }
}

export default WithSportService()(Post)