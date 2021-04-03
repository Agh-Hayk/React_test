import React, { Component } from 'react'
// import style from './newTask.module.css'
import PropTypes from 'prop-types'
import {Modal, Button, FormControl} from 'react-bootstrap'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {formatDate} from '../../helpers/utils'
import { connect } from 'react-redux'
import {addLi} from '../../store/actions'

class NewTask extends Component {

    state = {
        title: '',
        description: '',
        date:new Date()
    }

    handleInp = (event) => {
        const {name, value} = event.target
        this.setState({
            [name]: value
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

        const {date} = this.state;
        const newTask = {
            title,
            description,
            date:formatDate(date.toISOString())
        }

        this.props.addLi(newTask) 
    }

    handleInpDate = (value) => {
        this.setState({ 
            date:value || new Date()
        })
    }

    render() {
        const { onClose } = this.props

        return (

            <Modal
            show={true}
            onHide={onClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                   Add new Task
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormControl   
                    onChange={this.handleInp}
                    name='title'
                    onKeyPress={this.handleKeyEnter}
                    type="text"
                    placeholder="Title"
                    className="mb-3"
                />
                <FormControl
                    as="textarea" 
                    rows={4} 
                    placeholder="Description"
                    onChange={this.handleInp}
                    name='description'
                />
                <DatePicker
                    selected={this.state.date}
                    name="date"
                    minDate={new Date()}
                    onChange={this.handleInpDate}

                />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.handleSubmit} variant="success">Add</Button>
                <Button onClick={onClose}>Cancel</Button>
            </Modal.Footer>
        </Modal>
        )
    }
}

NewTask.propTypes = {
    onClose:PropTypes.func.isRequired
}

const mapDispatchToProps = {
    addLi    
}
export default connect(null, mapDispatchToProps)(NewTask)