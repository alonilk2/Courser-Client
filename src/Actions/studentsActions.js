import Axios from "axios";
import {
  STUDENT_ADD_FAILED,
  STUDENT_REMOVE_FAILED,
  STUDENT_REMOVE_SUCCESS,
  STUDENT_ADD_SUCCESS,
  STUDENTS_FETCH_SUCCESS,
  HOST_URL,
} from "../Constants";

export function addStudent(studentId, name, courseId) {
  return (dispatch) => {
    Axios.post(HOST_URL + "/student", {
      id: studentId,
      name: name,
      courseId: courseId,
    })
      .then(function (response) {
        if (response.data.success === true) {
          return dispatch({ type: STUDENT_ADD_SUCCESS, payload: response });
        }
        return dispatch({ type: STUDENT_ADD_FAILED, payload: response });
      })
      .catch(function (error) {
        dispatch({ type: STUDENT_ADD_FAILED, payload: error });
      });
  };
}

export function removeStudent(id) {
  return (dispatch) => {
    Axios.delete(HOST_URL + "/student/" + id)
      .then(function (response) {
        if (response.data.success === true) {
          return dispatch({ type: STUDENT_REMOVE_SUCCESS, payload: response });
        }
        return dispatch({ type: STUDENT_REMOVE_FAILED, payload: response });
      })
      .catch(function (error) {
        dispatch({ type: STUDENT_REMOVE_FAILED, payload: error });
      });
  };
}

export function getStudentsList(courseId) {
  return (dispatch) => {
    Axios.get(HOST_URL + "/student/" + courseId)
      .then(function (response) {
        return dispatch({
          type: STUDENTS_FETCH_SUCCESS,
          payload: response.data.students,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}
