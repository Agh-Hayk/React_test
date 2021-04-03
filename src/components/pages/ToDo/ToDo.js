import React, { Component } from 'react'
import style from './ToDo.module.css'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Task from '../../Task/Task'
import NewTask from '../../NewTask/NewTask'
import Confirm from '../../Confirm'
import EditTask from '../../EditTask'
import { connect } from 'react-redux'
import {getTasks, deleteTask, deleteTasks} from '../../../store/actions'

class ToDo extends Component {

    state = {
        // task: [],
        checkArr: new Set(),
        showConfirm: false,
        openNewTaskModal: false,
        editTask: null
    };

    componentDidMount() {
        this.props.getTasks()
    }

    componentDidUpdate(prevProps) {
        if(!prevProps.addTaskSuccess && this.props.addTaskSuccess){
            this.setState({
                openNewTaskModal:false 
            })
            return
        }

        if(!prevProps.deleteTaskSuccess && this.props.deleteTaskSuccess){
            this.setState({
                checkArr: new Set(),
                showConfirm: false,
            })
            return
        }
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
        const {checkArr} = this.state;
        this.props.deleteTasks(checkArr);
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

    handleEdit = (editTask) => {
        this.setState({
            editTask
        })
    }

    handleSaveTask = (editedTask) => {

        fetch(`http://localhost:3001/task/${editedTask._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editedTask)
        })
            .then(async (response) => {

                const res = await response.json()


                if (response.status >= 400 && response.status < 600) {
                    if (res.error) {
                        throw res.error;
                    } else {
                        throw new Error('Something went wrong!')
                    }
                }

                const tasks = this.state.task
                const foundIndex = tasks.findIndex((task) => task._id === editedTask._id)
                tasks[foundIndex] = editedTask

                this.setState({
                    task: tasks,
                    editTask: null
                })

            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        const { checkArr, showConfirm, openNewTaskModal, editTask } = this.state;
        const { task } = this.props
        const item = task.map((item, index) => {
            return (
                <Col key={item._id} xs={12} sm={6} md={4} lg={3} xl={3}>
                    <Task
                        data={item}
                        itemToggle={this.item_checked}
                        onDelete={this.props.deleteTask}
                        disabled={!!checkArr.size}
                        selected={checkArr.has(item._id)}
                        onEdit={this.handleEdit}
                    />
                </Col>
            )
        })
        return (
            <div className={style.ToDo}>
                <Container>
                    <Row className="d-flex justify-content-center">
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
                    />
                }
                {
                    editTask &&
                    <EditTask
                        data={editTask}
                        onClose={() => { this.handleEdit(null) }}
                        onSave={this.handleSaveTask}
                    />
                }


            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        task: state.task,
        addTaskSuccess: state.addTaskSuccess,
        deleteTaskSuccess:state.deleteTaskSuccess
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         getTasks: () => {

//             request('http://localhost:3001/task')
//             .then((task)=>{
//                 dispatch({ type: 'GET_TASKS', task: task })
//             })
//         }
//     }
// }

const mapDispatchToProps = {
    getTasks,
    deleteTask,
    deleteTasks
}
export default connect(mapStateToProps, mapDispatchToProps)(ToDo)

