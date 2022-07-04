import {
  COURSE_ADD_SUCCESS,
  COURSE_FETCH_SUCCESS, COURSE_REMOVE_SUCCESS, GRADES_FETCH_SUCCESS,
  GRADE_ADD_SUCCESS, GRADE_REMOVE_SUCCESS, STUDENTS_FETCH_SUCCESS,
  STUDENT_ADD_SUCCESS, STUDENT_REMOVE_SUCCESS, TASKS_FETCH_SUCCESS,
  TASK_ADD_SUCCESS, TASK_REMOVE_SUCCESS
} from "../Constants";

function courseReducer(state = { deleted: false }, action) {
  switch (action.type) {
    case COURSE_FETCH_SUCCESS: {
      return {
        courses: action.payload,
        students: state?.students,
        grades: state?.grades,
        tasks: state?.tasks,
        added: false
      };
    }
    case COURSE_ADD_SUCCESS: {
      return {
        courses: state?.courses,
        students: state?.students,
        grades: state?.grades,
        tasks: state?.tasks,
        added: true,
      };
    }
    case STUDENTS_FETCH_SUCCESS: {
      return {
        grades: state?.grades,
        students: action.payload,
        courses: state?.courses,
        tasks: state?.tasks,
        added: false
      };
    }
    case STUDENT_ADD_SUCCESS: {
      return {
        courses: state?.courses,
        students: state?.students,
        grades: state?.grades,
        tasks: state?.tasks,
        added: true,
      };
    }
    case GRADE_ADD_SUCCESS: {
      return {
        courses: state?.courses,
        students: state?.students,
        grades: state?.grades,
        tasks: state?.tasks,
        added: true,
      };
    }
    case GRADES_FETCH_SUCCESS: {
      return {
        grades: action.payload,
        students: state?.students,
        courses: state?.courses,
        tasks: state?.tasks,
        added: false
      };
    }
    case TASKS_FETCH_SUCCESS: {
      return {
        courses: state?.courses,
        students: state?.students,
        grades: state?.grades,
        tasks: action.payload,
        added: false
      };
    }
    case COURSE_REMOVE_SUCCESS: {
      return {
        courses: state?.courses,
        students: state?.students,
        grades: state?.grades,
        tasks: state?.tasks,
        deleted: true,
        added: false
      };
    }
    case TASK_ADD_SUCCESS: {
      return {
        courses: state?.courses,
        students: state?.students,
        grades: state?.grades,
        tasks: state?.tasks,
        added: true,
      };
    }
    case TASK_REMOVE_SUCCESS: {
      return {
        courses: state?.courses,
        students: state?.students,
        grades: state?.grades,
        tasks: state?.tasks,
        deletedTask: true,
        added: false
      };
    }
    case STUDENT_REMOVE_SUCCESS: {
      return {
        courses: state?.courses,
        students: state?.students,
        grades: state?.grades,
        tasks: state?.tasks,
        deletedStudent: true,
        added: false
      };
    }
    case GRADE_REMOVE_SUCCESS: {
      return {
        courses: state?.courses,
        students: state?.students,
        grades: state?.grades,
        tasks: state?.tasks,
        deletedGrade: true,
        added: false
      };
    }
    default:
      return state;
  }
}
export { courseReducer };

