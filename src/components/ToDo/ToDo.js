import React, { Component } from 'react'
import style from './ToDo.module.css'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Task from '../Task/Task'
import NewTask from '../NewTask/NewTask'
import Confirm from '../Confirm'

class ToDo extends Component {

    state = {
        task: [],
        chechArr: new Set(),
        showConfirm:false
    };


    addLi = (newTask) => {

        const task = [...this.state.task, newTask]
        this.setState({
            task,
        })
    }
    deleteTask = (taskId) => {
        const newTask = this.state.task.filter((task) => taskId !== task._id)
        this.setState({
            task: newTask
        })
    }
    item_checked = (taskId) => {
        const newArr = new Set(this.state.chechArr)
        if (newArr.has(taskId)) {
            newArr.delete(taskId)
        } else {
            newArr.add(taskId)
        }
        this.setState({
            chechArr: newArr
        })
    }

    removeSelected = () => {
        const { chechArr } = this.state
        const task = [...this.state.task]
        const newTasks = task.filter((task) => {
            if (chechArr.has(task._id)) {
                return false
            }
            return true
        })

        this.setState({
            task: newTasks,
            chechArr: new Set(),
            showConfirm:false
        })
    }

    toggleConfirm = () => {
        this.setState({
            showConfirm:!this.state.showConfirm
        })
    }

    render() {
        const { task, chechArr, showConfirm } = this.state;
        const item = task.map((item, index) => {
            return (
                <Col key={item._id} xs={12} sm={6} md={4} lg={3} xl={3}>
                    <Task
                        data={item}
                        itemToggle={this.item_checked}
                        onDelete={this.deleteTask}
                        disabled={!!chechArr.size}
                    />
                </Col>
            )
        })
        return (
            <div className={style.ToDo}>
                <Container>
                    <Row className="justify-content-center mb-3">
                        <Col xs={12} lg={6} xl={6}>
                            <NewTask
                                disabled={!!chechArr.size}
                                onAdd={this.addLi}
                            />
                        </Col>
                    </Row>
                    <Row>
                        {item}
                    </Row>
                    <Row>
                        <Button
                            variant="danger"
                            onClick={this.toggleConfirm}
                            disabled={!chechArr.size}>
                            Delete selected
                        </Button>
                    </Row>
                </Container>
                {showConfirm && <Confirm 
                    onClose = {this.toggleConfirm}
                    onConfirm = {this.removeSelected}
                    count = {chechArr.size}
                />}
            </div>
        )
    }
}

export default ToDo

