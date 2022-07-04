import Axios from "axios";
import {
  GRADE_ADD_FAILED,
  GRADE_ADD_SUCCESS,
  GRADES_FETCH_SUCCESS,
  GRADE_REMOVE_FAILED,
  GRADE_REMOVE_SUCCESS,
  HOST_URL,
} from "../Constants";

export function addGrade(courseId, studentId, grade) {
  return (dispatch) => {
    Axios.post(HOST_URL + "/grade", {
      courseId: courseId,
      id: studentId,
      grade: grade,
    })
      .then(function (response) {
        if (response.data.success === true) {
          return dispatch({ type: GRADE_ADD_SUCCESS, payload: response });
        }
        return dispatch({ type: GRADE_ADD_FAILED, payload: response });
      })
      .catch(function (error) {
        dispatch({ type: GRADE_ADD_FAILED, payload: error });
      });
  };
}

export function removeGrade(id) {
  return (dispatch) => {
    Axios.delete(HOST_URL + "/grade/" + id)
      .then(function (response) {
        if (response.data.success === true) {
          return dispatch({ type: GRADE_REMOVE_SUCCESS, payload: response });
        }
        return dispatch({ type: GRADE_REMOVE_FAILED, payload: response });
      })
      .catch(function (error) {
        dispatch({ type: GRADE_REMOVE_FAILED, payload: error });
      });
  };
}

export function getGradesList(courseId) {
  return (dispatch) => {
    Axios.get(HOST_URL + "/grade/" + courseId)
      .then(function (response) {
        return dispatch({
          type: GRADES_FETCH_SUCCESS,
          payload: response.data.grades,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}
