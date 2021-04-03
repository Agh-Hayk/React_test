const defaultState = {
  task:[],
  addTaskSuccess:false,
  deleteTaskSuccess:false
}

export default function reduser(state=defaultState, action){
    switch(action.type){

      case 'GET_TASKS':{
        return{
          ...state,
          task:action.task
        };
      } 

      case 'ADD_TASK':{
        const tasks = [...state.task, action.task]
        return{
          ...state,
          task:tasks,
          addTaskSuccess:true
        };
      }

      case 'ADDING_TASK':{
        return{
          ...state,
          addTaskSuccess:false
        };
      }

      case 'DELETE_TASK':{
        const newTask = state.task.filter((task) => action.taskId !== task._id)
        return{
          ...state,
          task:newTask
        };
      }

      case 'DELETE_TASKS':{
        const newTasks = state.task.filter((task) => {
          if (action.taskIds.has(task._id)) {
              return false
          }
          return true
        })
        return{
          ...state,
          task:newTasks,
          deleteTaskSuccess:true
        };
      }

      default: return state

    }
  }