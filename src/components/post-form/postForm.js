import React, {Component} from 'react'
import WithSportService from '../hoc'
import {connect} from 'react-redux'

class PostForm extends Component {

    state = {
        topic: '',
        text: '',
        categoryId: 0,
        categories: []
    }

    componentDidMount() {
        const {categoryService} = this.props

        categoryService.fetchAllCategories("/api/v1/categories")
            .then(res => res.json())
            .then(res => {
                this.setState({
                    categories: res,
                    categoryId: res[0].id
                })
            })
    }

    handleInputChanges = (event) => {
        const target = event.target
        const inputName = target.name
        const inputValue = target.value

        this.setState({
            [inputName]: inputValue
        })
    }

    handleCategoryIdChanges = (event) => {
        console.log(event.target.value)
        this.setState({
            categoryId: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()

        const {topic, text, categoryId} = this.state
        const {postService, token} = this.props

        if (topic.length === 0 || text.length === 0) {
            return
        }

        if (categoryId === 0) {
            return
        }

        console.log({
            topic: topic,
            text: text,
            categoryId: categoryId
        })
        
        postService.addPost("/api/v1/posts", {
            "Content-Type":"application/json",
            "Authorization":token
        }, {
            topic: topic,
            text: text,
            categoryId: categoryId
        }).then(res => res.json())
        .then(res => {
            this.setState({
                topic: '',
                text: '',
                categoryId: 0
            })
        })
    }

    render() {
        const {categories} = this.state

        const renderCategoryOptions = categories.map(item => {
            return (
                <option key={item.id} value={item.id}>{item.name}</option>
            )
        })  

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
                    <label>
                        Choose category
                        <select value={this.state.categoryId} onChange={this.handleCategoryIdChanges}>
                            {renderCategoryOptions}
                        </select>
                    </label>
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