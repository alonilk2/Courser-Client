import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getGradesList } from "../Actions/gradesActions"
import { removeGrade } from "../Actions/gradesActions"

export default function useGrades(courseId) {
    const grades = useSelector(state => state.course.grades)
    const added = useSelector(state => state.course.added)
    const deleted = useSelector(state => state.course.deletedGrade)

    const dispatch = useDispatch()

    const initialize = () => {
        dispatch(getGradesList(courseId))    
    }

    const remove = async (id) => {
        await dispatch(removeGrade(id))
    }

    useEffect(()=>{
        initialize()
    }, [])

    useEffect(()=>{
        initialize()
    }, [added, deleted])

    return {list: grades, remove: remove}
}