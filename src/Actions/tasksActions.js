import Axios from "axios";
import {
  TASK_ADD_FAILED,
  TASK_ADD_SUCCESS, TASKS_FETCH_SUCCESS,TASK_REMOVE_SUCCESS,TASK_REMOVE_FAILED, HOST_URL
} from "../Constants";

export function addTask(courseId, name, file) {
  return async (dispatch) => {
    try {

      let response = await Axios.post(HOST_URL +"/tasks", {
        file: file,
        courseId: courseId,
        name: name
      });
      if (response.data.success === true) {
        return dispatch({ type: TASK_ADD_SUCCESS, payload: response });
      }
      return dispatch({ type: TASK_ADD_FAILED, payload: response });
    } catch (e) {
      dispatch({ type: TASK_ADD_FAILED, payload: e });
    }
  };
}

export function addTaskSolution(courseId, file) {
  return async (dispatch) => {
    try {

      let response = await Axios.post(HOST_URL +"/tasks/solution", {
        filesolutions: file,
        courseId: courseId,
      });
      if (response.data.success === true) {
        return dispatch({ type: TASK_ADD_SUCCESS, payload: response });
      }
      return dispatch({ type: TASK_ADD_FAILED, payload: response });
    } catch (e) {
      dispatch({ type: TASK_ADD_FAILED, payload: e });
    }
  };
}

export function removeTask(id) {
  return (dispatch) => {
    Axios.delete(HOST_URL +"/tasks/"+id)
      .then(function (response) {
        if (response.data.success === true) {
          return dispatch({ type: TASK_REMOVE_SUCCESS, payload: response });
        }
        return dispatch({ type: TASK_REMOVE_FAILED, payload: response });
      })
      .catch(function (error) {
        dispatch({ type: TASK_REMOVE_FAILED, payload: error });
      });
  };
}

export function getTasksList(courseId) {
  return (dispatch) => {
    Axios.get(HOST_URL +"/tasks/" + courseId)
      .then(function (response) {
        return dispatch({ type: TASKS_FETCH_SUCCESS, payload: response.data.tasks });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}
