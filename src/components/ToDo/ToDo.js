import React, { Component } from 'react'
import style from './ToDo.module.css'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Task from '../Task/Task'
import NewTask from '../NewTask/NewTask'
import Confirm from '../Confirm'

class ToDo extends Component {

    state = {
        task: [],
        checkArr: new Set(),
        showConfirm: false,
        openNewTaskModal:false
    };


    addLi = (newTask) => {

        const task = [...this.state.task, newTask]
        this.setState({
            task,
            openNewTaskModal:false
        })
    }
    deleteTask = (taskId) => {
        const newTask = this.state.task.filter((task) => taskId !== task._id)
        this.setState({
            task: newTask
        })
    }
    item_checked = (taskId) => {
        const newArr = new Set(this.state.checkArr)
        if (newArr.has(taskId)) {
            newArr.delete(taskId)
        } else {
            newArr.add(taskId)
        }
        this.setState({
            checkArr: newArr
        })
    }

    removeSelected = () => {
        const { checkArr } = this.state
        const task = [...this.state.task]
        const newTasks = task.filter((task) => {
            if (checkArr.has(task._id)) {
                return false
            }
            return true
        })

        this.setState({
            task: newTasks,
            checkArr: new Set(),
            showConfirm: false
        })
    }

    toggleConfirm = () => {
        this.setState({
            showConfirm: !this.state.showConfirm
        })
    }

    selectAll = () => {
        const taskIds = this.state.task.map((task) => task._id)
        this.setState({
            checkArr: new Set(taskIds)
        })
    }

    deSelectAll = () => {
        this.setState({
            checkArr: new Set()
        })
    }

    toggleNewTaskModal = () => {
        this.setState({
            openNewTaskModal: !this.state.openNewTaskModal
        })
    }

    render() {
        const { task, checkArr, showConfirm, openNewTaskModal } = this.state;
        const item = task.map((item, index) => {
            return (
                <Col key={item._id} xs={12} sm={6} md={4} lg={3} xl={3}>
                    <Task
                        data={item}
                        itemToggle={this.item_checked}
                        onDelete={this.deleteTask}
                        disabled={!!checkArr.size}
                        selected={checkArr.has(item._id)}
                    />
                </Col>
            )
        })
        return (
            <div className={style.ToDo}>
                <Container>
                    <Row>
                        <Col className="col-2 d-flex justify-content-center">
                            <Button
                                variant="primary"
                                onClick={this.toggleNewTaskModal}
                            >
                                Add new Task
                           </Button>
                        </Col>
                        <Col className="col-2 d-flex justify-content-center">
                            <Button
                                variant="warning"
                                onClick={this.selectAll}
                            >
                                Select All
                            </Button>
                        </Col>
                        <Col className="col-2 d-flex justify-content-center">
                            <Button
                                variant="warning"
                                onClick={this.deSelectAll}
                            >
                                Deselect All
                            </Button>
                        </Col>
                        <Col className="col-2 d-flex justify-content-center">
                            <Button
                                variant="danger"
                                onClick={this.toggleConfirm}
                                disabled={!checkArr.size}
                            >
                                Delete selected
                            </Button>
                        </Col>
                    </Row>
                    <Row className='mt-5'>
                        {item}
                    </Row>
                </Container>

                {showConfirm && <Confirm
                    onClose={this.toggleConfirm}
                    onConfirm={this.removeSelected}
                    count={checkArr.size}
                />}

                {openNewTaskModal &&
                    <NewTask
                    onClose={this.toggleNewTaskModal}
                    onAdd={this.addLi}
                    />
                }
            </div>
        )
    }
}

export default ToDo

