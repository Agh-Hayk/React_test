import request from '../helpers/request'
import * as actionTypes from './actionType'

export function getTasks(){
    return (dispatch)=>{
        dispatch({ type: actionTypes.PENDING})
        
        request('http://localhost:3001/task')
        .then((task)=>{
        dispatch({ type: actionTypes.GET_TASKS, task: task })
        }) 
        .catch((error) => {
            console.log(error)
            dispatch({ type: actionTypes.ERROR, error:error.message})
        })
    }
}

export function addLi(newTask){

    return (dispatch)=>{
        dispatch({ type: actionTypes.PENDING})

        request('http://localhost:3001/task', 'POST', newTask)
        .then((task)=>{
        dispatch({ type: actionTypes.ADD_TASK, task })
        })
        .catch((error) => {
            console.log(error)
            dispatch({ type: actionTypes.ERROR, error:error.message})
        })
    }

}

export function deleteTask(taskId){
    return function(dispatch){
        dispatch({ type: actionTypes.PENDING})

        request(`http://localhost:3001/task/${taskId}`, 'DELETE')
        .then(()=>{
            dispatch({ type: actionTypes.DELETE_TASK, taskId})
        })
        .catch((error) => {
            console.log(error)
            dispatch({ type: actionTypes.ERROR, error:error.message})
        })
    }
} 

export function deleteTasks(taskIds){
    return function(dispatch){
        dispatch({ type: actionTypes.PENDING})

        request(`http://localhost:3001/task`, 'PATCH', {
            tasks:taskIds
        })
        .then(()=>{
            dispatch({ type: actionTypes.DELETE_TASKS, taskIds})
        })
        .catch((error) => {
            console.log(error)
            dispatch({ type: actionTypes.ERROR, error:error.message})
        })
    }
} 

export function editTask(data){
    return function(dispatch){
        dispatch({ type: actionTypes.PENDING})

        request(`http://localhost:3001/task/${data._id}`, 'PUT', data)
        .then((editedTask)=>{
            dispatch({ type: actionTypes.EDIT_TASK, editedTask})
        })
        .catch((error) => {
            console.log(error)
            dispatch({ type: actionTypes.ERROR, error:error.message})
        })
    }
} 