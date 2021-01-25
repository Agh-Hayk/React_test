import React, { Component } from 'react'
import style from './task.module.css'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import {Button} from 'react-bootstrap'

class Task extends Component {

    handleChange = () => {
        const { data, itemToggle } = this.props
        itemToggle(data._id)
    }

    render() {
        const item = this.props.data
        const { disabled, onDelete, selected } = this.props
        return (
            <div className={`${style.new_item} ${selected ? style.selected : ""}`}>
                <input
                    type="checkbox"
                    className={style.item_checkbox}
                    onChange={this.handleChange}
                    checked={selected}
                />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <Button
                    className="m-1"
                    variant='warning'
                    disabled={disabled}
                    onClick={() => onDelete(item._id)}
                >
                <FontAwesomeIcon icon={faEdit} />
                </Button>
                <Button
                    className="m-1"
                    variant='danger'
                    disabled={disabled}
                    onClick={() => onDelete(item._id)}
                >
                <FontAwesomeIcon icon={faTrash} />
                </Button>
            </div>
        )
    }
}

Task.propTypes = {
    data: PropTypes.object.isRequired,
    itemToggle: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    selected: PropTypes.bool.isRequired
}


export default Task