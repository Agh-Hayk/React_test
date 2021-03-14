import React,{Component} from 'react'
import {Button, Container, Row, Col} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import {formatDate} from '../../../helpers/utils'
import EditTask from '../../EditTask'

export default class SingleTask extends Component{

    state={
        task:null,
        openEditModal: false
    }

componentDidMount(){
    const taskId = this.props.match.params.taskId
    fetch(`http://localhost:3001/task/${taskId}`, {
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

    deletetask = () => {
        const taskId = this.state.task._id
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

            this.props.history.push('/')
        })
        .catch((error)=>{
            console.log(error)
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
    
            this.setState({
                task:res,
                openEditModal:false
            })
         
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    toggleEditModal = () => {
        this.setState({
            openEditModal:!this.state.openEditModal
        })
    }

    render(){
        const {task, openEditModal} = this.state
        return(
            <div>
                <Container>
                    <Row className="justify-content-center">
                        <Col 
                        xs={10} 
                        style={{border:'1px solid #ccc', marginTop:50, paddingBottom:40, borderRadius:10}}>
                            {
                                task ?
                                <div className="text-center mt-5">
                                    <h3>{task.title}</h3>
                                    <p><strong>Description: </strong> {task.description}</p>
                                    <p><strong>Date: </strong> {formatDate(task.date)}</p>
                                    <Button
                                        className="m-1"
                                        variant='warning'
                                        onClick={this.toggleEditModal}
                                    >
                                    <FontAwesomeIcon icon={faEdit} />
                                    </Button>
                                    <Button
                                        className="m-1"
                                        variant='danger'
                                        onClick={this.deletetask}
                                    >
                                    <FontAwesomeIcon icon={faTrash} />
                                    </Button>
                                </div> :
                                <p>Task data not exists !</p>
                            }
                        </Col>
                    </Row>
                </Container>
                {
                    openEditModal && 
                    <EditTask
                        data = {task}
                        onClose = {this.toggleEditModal}
                        onSave = {this.handleSaveTask}
                    />
                }
            </div>
        )
    }
}