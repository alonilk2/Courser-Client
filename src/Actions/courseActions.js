import Axios from "axios";
import { history } from "../history";
import {
  COURSE_ADD_FAILED,
  COURSE_ADD_SUCCESS,
  COURSE_REMOVE_FAILED,
  COURSE_REMOVE_SUCCESS,
  COURSE_FETCH_SUCCESS,
  HOST_URL,
} from "../Constants";

export function getCourseList(teacher) {
  return (dispatch) => {
    Axios.get(HOST_URL + "/course/" + teacher)
      .then(function (response) {
        return dispatch({
          type: COURSE_FETCH_SUCCESS,
          payload: response.data.course,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}

export function addCourse(name, teacher) {
  return (dispatch) => {
    Axios.post(HOST_URL + "/course", {
      name: name,
      teacher: teacher,
    })
      .then(function (response) {
        if (response.data.success === true) {
          return dispatch({ type: COURSE_ADD_SUCCESS, payload: response });
        }
        return dispatch({ type: COURSE_ADD_FAILED, payload: response });
      })
      .catch(function (error) {
        dispatch({ type: COURSE_ADD_FAILED, payload: error });
      });
  };
}

export function removeCourse(id) {
  return (dispatch) => {
    Axios.delete(HOST_URL + "/course/" + id)
      .then(function (response) {
        if (response.data.success === true) {
          return dispatch({ type: COURSE_REMOVE_SUCCESS, payload: response });
        }
        return dispatch({ type: COURSE_REMOVE_FAILED, payload: response });
      })
      .catch(function (error) {
        dispatch({ type: COURSE_REMOVE_FAILED, payload: error });
      });
  };
}
