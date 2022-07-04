import Axios from 'axios';
import Cookie from 'js-cookie';
import { USER_SIGNIN_ATTEMPT, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAILED,
         USER_SIGNUP_ATTEMPT, USER_SIGNUP_SUCCESS, USER_SIGNUP_FAILED,
         USER_SIGNOUT_SUCCESS} from '../Constants/userConst';
import { history } from '../history';
import { HOST_URL } from '../Constants'
function signin(email, password) {
    return dispatch => {
        dispatch({type: USER_SIGNIN_ATTEMPT, payload: {}});
        Axios.post(HOST_URL + "/signin", {
            email: email,
            password: password
        })
        .then(function(response) { 
            if(response.data.success === true){
                dispatch({type: USER_SIGNIN_SUCCESS, payload: response.data.user});
                Cookie.set('userInstance', JSON.stringify(response.data.user));
                history.push('/');
            }
            else {
                dispatch({type: USER_SIGNIN_FAILED, payload: 0});
            }
        })
        .catch(function(error) {
            dispatch({type: USER_SIGNIN_FAILED, payload: error});
        });
    };

}

const signup = (email, password, firstname, lastname, ID) => async (dispatch) => {
    dispatch({type: USER_SIGNUP_ATTEMPT, payload: {}});
    try{
        const user = await Axios.post(HOST_URL + "/signup",{
            "email": email,
            "password": password,
            "firstname": firstname,
            "lastname": lastname,
            "ID": ID
        });
        if(user.data.success){
            dispatch({type: USER_SIGNUP_SUCCESS, payload: user});
            history.push('/');
        }
        else {
            if(user.data.error === 0)
                dispatch({type: USER_SIGNUP_FAILED, payload: 0});
            else if(user.data.error === 1)
                dispatch({type: USER_SIGNUP_FAILED, payload: 1});
        }
    }
    catch (err) {
        dispatch({type: USER_SIGNUP_FAILED, payload: err});
    }
}

const signout = () => (dispatch) => {
    Cookie.remove('userInstance');
    dispatch({type: USER_SIGNOUT_SUCCESS});
}

export {signin, signup, signout};