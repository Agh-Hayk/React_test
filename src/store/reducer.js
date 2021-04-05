import * as actionTypes from './actionType'

const defaultState = {
  task:[],
  addTaskSuccess:false,
  deleteTaskSuccess:false,
  editTaskSuccess:false,
  loading:false
}

export default function reduser(state=defaultState, action){
    switch(action.type){

      case actionTypes.PENDING:{
        return{
          ...state,
          loading:true,
          addTaskSuccess:false,
          deleteTaskSuccess:false,
          editTaskSuccess:false
        };
      } 

      case actionTypes.GET_TASKS:{
        return{
          ...state,
          task:action.task,
          loading:false
        };
      } 

      case actionTypes.ADD_TASK:{
        const tasks = [...state.task, action.task]
        return{
          ...state,
          task:tasks,
          addTaskSuccess:true,
          loading:false
        };
      } 

      case actionTypes.DELETE_TASK:{
        const newTask = state.task.filter((task) => action.taskId !== task._id)
        return{
          ...state,
          task:newTask,
          loading:false
        };
      }

      case actionTypes.DELETE_TASKS:{
        const newTasks = state.task.filter((task) => {
          if (action.taskIds.has(task._id)) {
              return false
          }
          return true
        })
        return{
          ...state,
          task:newTasks,
          deleteTaskSuccess:true,
          loading:false
        };
      }

      case actionTypes.EDIT_TASK:{
        const tasks = [...state.task]
        const foundIndex = tasks.findIndex((task) => task._id === action.editedTask._id)
        tasks[foundIndex] = action.editedTask

        return{
          ...state,
          task:tasks,
          editTaskSuccess:true,
          loading:false
        };
      }

      default: return state

    }
  }