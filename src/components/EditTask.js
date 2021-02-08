import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Modal, Button, FormControl} from 'react-bootstrap'

class EditTask extends Component {

    constructor(props){
        super(props)
        this.state = {
            ...props.data
        }
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

        this.props.onSave({
            title,
            description,
            _id:this.state._id
        })
    }

    render() {
        const { onClose } = this.props
        const {title, description} =  this.state

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
                   Edit Task
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
                    value={title}
                />
                <FormControl
                    as="textarea" 
                    rows={4} 
                    placeholder="Description"
                    onChange={this.handleInp}
                    name='description'
                    value={description}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.handleSubmit} variant="success">Save</Button>
                <Button onClick={onClose}>Cancel</Button>
            </Modal.Footer>
        </Modal>
        )
    }
}

EditTask.propTypes = {
    data: PropTypes.object.isRequired,
    onClose:PropTypes.func.isRequired,
    onSave:PropTypes.func.isRequired
}

export default EditTask