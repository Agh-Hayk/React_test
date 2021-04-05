import request from '../helpers/request'
import * as actionTypes from './actionType'

export function getTasks(){
    return (dispatch)=>{
        dispatch({ type: actionTypes.PENDING})
        
        request('http://localhost:3001/task')
        .then((task)=>{
        dispatch({ type: actionTypes.GET_TASKS, task: task })
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
    }

}

export function deleteTask(taskId){
    return function(dispatch){
        dispatch({ type: actionTypes.PENDING})

        request(`http://localhost:3001/task/${taskId}`, 'DELETE')
        .then(()=>{
            dispatch({ type: actionTypes.DELETE_TASK, taskId})
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
    }
} 

export function editTask(data){
    return function(dispatch){
        dispatch({ type: actionTypes.PENDING})

        request(`http://localhost:3001/task/${data._id}`, 'PUT', data)
        .then((editedTask)=>{
            dispatch({ type: actionTypes.EDIT_TASK, editedTask})
        })
    }
} 