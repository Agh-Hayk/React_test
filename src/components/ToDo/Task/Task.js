import React, { Component } from 'react'
import style from './task.module.css'

class Task extends Component {

    state = {
        selected: false
    }

    handleChange = () => {
        const { data, itemToggle } = this.props
        itemToggle(data._id)
        this.setState({
            selected: !this.state.selected
        })
    }

    render() {
        const item = this.props.data
        const { disabled, onDelete } = this.props
        const { selected } = this.state
        return (
            <div className={`${style.new_item} ${selected ? style.selected : ""}`}>
                <input type="checkbox" className={style.item_checkbox} onChange={this.handleChange} />
                <h3>{item.title}</h3>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed, porro?</p>
                <button className={style.spanRed} disabled={disabled} onClick={() => onDelete(item._id)}>x</button>
            </div>
        )
    }
}

export default Task