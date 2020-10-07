import axios from 'axios';
import * as constants from './constants';
import {baseUrl} from '../../../util';
export const setOldpwdAction = (value)=>{
    return {
        type:constants.OLD_PWD,
        value
    }
}
export const pwdStrongAction = ()=>{
    return {
        type:constants.PWD_STRONG
    }
}
export const pwdWeakAction = ()=>{
    return {
        type:constants.PWD_WEAK
    }
}
export const handleFocusAction = ()=>{
    return {
        type:constants.EMPTY_ERRMSG
    }
}
export const setNewpwdAction = (value)=>{
    return {
        type:constants.NEW_PWD,
        value
    }
}
export const setRNewpwdAction = (value)=>{
    return {
        type:constants.RNEW_PWD,
        value
    }
}
export const setIsSuccAction = ()=>{
    return {
        type:constants.SET_ISSUCC
    }
}
export const handleSelectAction = (value)=>{
    return {
        type: constants.HANDLE_SELECT_ACTION,
        value
    }
}
export const changePwdAction = (obj)=>{
    return (dispatch)=>{
        axios.post(`${baseUrl}users/changePassword/`,obj).then((res)=>{
            const result = res.data;
            if(result.code === 0){
                sessionStorage.setItem('holdAlert',true)
                let action = {
                    type:constants.CHANGE_SUCC,
                    msg:result.msg
                }
                dispatch(action)
            }
            if(result.code === 1){
                let action = {
                    type:constants.CHANGE_FAIL,
                    msg:result.msg
                }
                dispatch(action)
            }
        })

    }
}
export const notMatchAction = ()=>{
    return {
        type:constants.NOT_MATCH
    }
}
export const getUserInfoAction = (email)=>{
    return (dispatch)=>{
        axios.get(`${baseUrl}users/getUserAddress/${email}`).then((res)=>{
            const result= res.data
            const action = {
                type:constants.USER_ADDRESS,
                result
            }
            dispatch(action)
        })
    }
}
export const delAddressRequestAction = (RN)=>{
    return {
        type :constants.DEL_ADDRESS_REQUEST,
        RN
    }
}
export const delAddressAction = (RN)=>{
    return (dispatch)=>{
        axios.delete(`${baseUrl}users/delUserAddress/${RN}`).then((res)=>{
            const action = {
                type:constants.DEL_USER_ADDRESS,
                RN
            }
            dispatch(action)
        })
    }
} 