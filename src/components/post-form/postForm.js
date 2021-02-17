import React, {Component} from 'react'
import WithSportService from '../hoc'
import {connect} from 'react-redux'

class PostForm extends Component {

    state = {
        topic: '',
        text: ''
    }

    handleInputChanges = (event) => {
        const target = event.target
        const inputName = target.name
        const inputValue = target.value

        this.setState({
            [inputName]: inputValue
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()

        const {topic, text} = this.state
        const {postService, token} = this.props

        if (topic.length === 0 || text.length === 0) {
            return
        }
        
        postService.addPost("/api/v1/posts", {
            "Content-Type":"application/json",
            "Authorization":token
        }, {
            topic: topic,
            text: text
        }).then(res => res.json())
        .then(res => {
            this.setState({
                topic: '',
                text: ''
            })
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" 
                        name="topic" 
                        className="form-control" 
                        placeholder="Topic"
                        onChange={this.handleInputChanges} 
                        value={this.state.topic}/>
                    <input type="text" 
                        name="text" 
                        className="form-control" 
                        placeholder="Text" 
                        onChange={this.handleInputChanges} 
                        value={this.state.text}
                        />
                    <button type="submit">Add post</button>
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

export default WithSportService()(connect(mapStateToProps)(PostForm))