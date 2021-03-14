import React, { Component } from 'react'
import style from './ToDo.module.css'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Task from '../../Task/Task'
import NewTask from '../../NewTask/NewTask'
import Confirm from '../../Confirm'
import EditTask from '../../EditTask'

class ToDo extends Component {

    state = {
        task: [],
        checkArr: new Set(),
        showConfirm: false,
        openNewTaskModal:false,
        editTask:null
    };

    componentDidMount(){
        fetch('http://localhost:3001/task', {
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(async (response)=>{
    
            const res = await response.json()

            
            if(response.status>=400 && response.status<600){
                if(res.error){
                    throw res.error;
                }else{
                    throw new Error('Something went wrong!')
                }
            }

            this.setState({
                task:res
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    addLi = (newTask) => {
        fetch('http://localhost:3001/task', {
            method:'POST',
            body:JSON.stringify(newTask),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(async (response)=>{
    
            const res = await response.json()

            
            if(response.status>=400 && response.status<600){
                if(res.error){
                    throw res.error;
                }else{
                    throw new Error('Something went wrong!')
                }
            }

            const tasks = [...this.state.task, res]
            this.setState({
                task:tasks,
                openNewTaskModal:false
            })
        })
        .catch((error)=>{
            console.log(error)
        })
       
       
    }
    deleteTask = (taskId) => {

        fetch(`http://localhost:3001/task/${taskId}`, {
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(async (response)=>{
    
            const res = await response.json()

            
            if(response.status>=400 && response.status<600){
                if(res.error){
                    throw res.error;
                }else{
                    throw new Error('Something went wrong!')
                }
            }

            const newTask = this.state.task.filter((task) => taskId !== task._id)
            this.setState({
                task: newTask 
            })
         
        })
        .catch((error)=>{
            console.log(error)
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
        const {task, checkArr } = this.state;
        const body = {
            tasks:[...checkArr]
        }


        fetch(`http://localhost:3001/task`, {
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(body)
        })
        .then(async (response)=>{
    
            const res = await response.json()

            
            if(response.status>=400 && response.status<600){
                if(res.error){
                    throw res.error;
                }else{
                    throw new Error('Something went wrong!')
                }
            }

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
         
        })
        .catch((error)=>{
            console.log(error)
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

    handleEdit = (editTask) =>{
       this.setState({
           editTask
       })
    }

    handleSaveTask = (editedTask) => {

        fetch(`http://localhost:3001/task/${editedTask._id}`, {
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(editedTask)
        })
        .then(async (response)=>{
    
            const res = await response.json()

            
            if(response.status>=400 && response.status<600){
                if(res.error){
                    throw res.error;
                }else{
                    throw new Error('Something went wrong!')
                }
            }

            const tasks = this.state.task
            const foundIndex = tasks.findIndex((task) => task._id === editedTask._id)
            tasks[foundIndex] = editedTask
    
            this.setState({
                task:tasks,
                editTask:null
            })
         
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    
    render() {
        const { task, checkArr, showConfirm, openNewTaskModal, editTask } = this.state;
        const item = task.map((item, index) => {
            return (
                <Col key={item._id} xs={12} sm={6} md={4} lg={3} xl={3}>
                    <Task
                        data={item}
                        itemToggle={this.item_checked}
                        onDelete={this.deleteTask}
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
                    onAdd={this.addLi}
                    />
                }
                {
                    editTask && 
                    <EditTask
                        data = {editTask}
                        onClose = {()=>{this.handleEdit(null)}}
                        onSave = {this.handleSaveTask}
                    />
                }
                

            </div>
        )
    }
}

export default ToDo

