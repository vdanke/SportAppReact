import React, {Component} from 'react'
import WithSportService from '../hoc'
import Post from '../post-item'
import {ListGroupItem, ListGroup} from 'reactstrap'

class Posts extends Component {

    state = {
        posts: []
    }

    componentDidMount() {
        const {postService, category} = this.props

        postService.fetchAllPosts(`/api/v1/posts/${category}`)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    posts: res
                })
            })
    }

    render() {
        const {posts} = this.state

        const renderTraineeList = posts.map(item => {
            return (
                <ListGroupItem key={item.id}>
                        <Post item={item}/>
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

export default WithSportService()(Posts)