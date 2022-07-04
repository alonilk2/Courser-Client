import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTasksList, removeTask } from "../Actions/tasksActions"


export default function useTasks(courseId) {
    const tasks = useSelector(state => state.course.tasks)
    const added = useSelector(state => state.course.added)

    const dispatch = useDispatch()

    const initialize = () => {
        dispatch(getTasksList(courseId))    
    }

    const remove = async (id) => {
        await dispatch(removeTask(id))
    }

    useEffect(()=>{
        initialize()
    }, [])

    useEffect(()=>{
        initialize()
    }, [added])

    return {
        list: tasks,
        remove: remove,
        refresh: initialize
    }
}