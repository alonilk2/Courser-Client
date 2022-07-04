import { useSelector } from "react-redux";
import Cookie from "js-cookie";
import { useEffect } from "react";
import { USER_SIGNIN_SUCCESS } from "../Constants/userConst";
import { useDispatch } from "react-redux";

export default function useUser() {
    const user = useSelector(state=>state.user?.user)
    const dispatch = useDispatch()
    
    const initializeUserInstance = () => {
        let user = Cookie.get('userInstance');
        if(user) {
            user = JSON.parse(user)
            dispatch({type: USER_SIGNIN_SUCCESS, payload: user})
        }
    }

    
    useEffect(()=>{
        initializeUserInstance();
    }, [])


    return user
    
}