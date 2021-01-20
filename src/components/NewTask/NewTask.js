import React, { Component } from 'react'
import idGenerator from '../../helpers/idGenerator'
import style from './newTask.module.css'
import PropTypes from 'prop-types'

class NewTask extends Component {

    state = {
        title: '',
        description: ''
    }

    handleInp = (e) => {
        this.setState({
            title: e.target.value
        })
    }


    handleKeyEnter = (e) => {
        if (e.key === "Enter") {
            this.handleSubmit()
        }
    }

    handleSubmit = () => {
        const title = this.state.title.trim()
        const description = this.state.description.trim()

        if (!title) { return }
        const newTask = {
            _id: idGenerator(),
            title,
            description
        }

        this.props.onAdd(newTask)
        this.setState({
            title: '',
            description: ''
        })
    }

    render() {

        const { title } = this.state
        const { disabled } = this.props

        return (
            <div className={style.searchItem}>
                <input
                    onChange={this.handleInp}
                    onKeyDown={this.handleKeyEnter}
                    disabled={disabled}
                    type="text"
                    placeholder="text"
                    value={title}
                />
                <button className={style.search_btn} onClick={this.handleSubmit} disabled={disabled}>ok</button>
            </div>
        )
    }
}

NewTask.propTypes = {
    disabled: PropTypes.bool.isRequired,
    onAdd: PropTypes.func.isRequired
}

export default NewTask