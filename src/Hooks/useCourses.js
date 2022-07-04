import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourseList } from "../Actions/courseActions";
import { removeCourse } from "../Actions/courseActions";
export default function useCourses(userId) {
    const courseList = useSelector(state=>state.course.courses)
    const dispatch = useDispatch()

    const fetchCourseList = () => {
        dispatch(getCourseList(userId))
    }

    const remove = async (id) => {
        await dispatch(removeCourse(id))
    }

    useEffect(()=>{
        fetchCourseList()
    }, [])

    return {
        list: courseList, 
        refresh: fetchCourseList,
        remove: remove
    }
}