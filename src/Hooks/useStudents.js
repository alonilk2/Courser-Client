import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getStudentsList, removeStudent } from "../Actions/studentsActions"


export default function useStudents(courseId) {
    const studentList = useSelector(state => state.course.students)
    const added = useSelector(state => state.course.added)
    const deleted = useSelector(state => state.course.deletedStudent)
    const dispatch = useDispatch()

    const initialize = () => {
        dispatch(getStudentsList(courseId))    
    }

    const remove = async (id) => {
        await dispatch(removeStudent(id))
    }

    useEffect(()=>{
        initialize()
    }, [])

    useEffect(()=>{
        initialize()
    }, [added, deleted])
    
    return {
        list: studentList,
        remove: remove
    }
}