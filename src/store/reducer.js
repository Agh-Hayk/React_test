import * as actionTypes from './actionType'

const defaultState = {
  task:[],
  addTaskSuccess:false,
  deleteTaskSuccess:false,
  editTaskSuccess:false,
  loading:false,
  successMassage:null,
  errorMassage:null
}

export default function reduser(state=defaultState, action){
    switch(action.type){

      case actionTypes.PENDING:{
        return{
          ...state,
          loading:true,
          addTaskSuccess:false,
          deleteTaskSuccess:false,
          editTaskSuccess:false,
          successMassage:null,
          errorMassage:null
        };
      } 

      case actionTypes.ERROR:{
        return{
          ...state,
          loading:false,
          errorMassage:action.error
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
          loading:false,
          successMassage:'Task create successfully!!!'
        };
      } 

      case actionTypes.DELETE_TASK:{
        const newTask = state.task.filter((task) => action.taskId !== task._id)
        return{
          ...state,
          task:newTask,
          loading:false,
          successMassage:'Task deleted successfully!!!'
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
          loading:false,
          successMassage:'Tasks deleted successfully!!!'
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
          loading:false,
          successMassage:'Task edited successfully!!!'
        };
      }

      default: return state

    }
  }