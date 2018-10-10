import { combineReducers } from "redux";

export function reducers (state = {}, action) {
  switch(action.type) {
    case 'GET_TASKS' : {
      return Object.assign({}, state, {
        tasks: action.data
      });
    }
    case 'SHOW_TASK' : {
      return Object.assign({}, state, {
        task: action.data
      });
    }
    case 'DELETE_TASK' : {
      var filtered = state.tasks.filter(function(value, index, arr){
        return value.id != action.data;
      });
      return Object.assign({}, state, {
        tasks: filtered
      });
    }
    case 'DELETE_TASKS' : {
      var filtered = state.tasks.filter(function(value, index, arr){
        return !action.data.includes(value.id);
      });
      return Object.assign({}, state, {
        tasks: filtered
      });
    }
    default: return state;
  }
}