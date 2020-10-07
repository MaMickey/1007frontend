import {constants} from './index';
const defaultState = {
  oldPwd:'',
  newPwd:'',
  RnewPwd:'',
  notmatch:false,
  msg:'',
  isSucc:false,
  pwd_strong:true,
  userInfo:[],
  delAddressReq:false,
  delRN:0,
  selectedEntry:''
}


export default (state=defaultState,action)=>{
    if(action.type===constants.DEL_ADDRESS_REQUEST){
        return {...state,delRN:action.RN,delAddressReq:true}
    }
    if(action.type===constants.DEL_USER_ADDRESS){
        return {...state,delRN:0,delAddressReq:false,userInfo:state.userInfo.filter((item,index)=>{
            return item.RN !== action.RN
        })}
    }
    if(action.type === constants.SET_ISSUCC){
        return {...state,isSucc:false,msg:'',oldPwd:'',newPwd:'',RnewPwd:''}
    }
    if(action.type === constants.EMPTY_ERRMSG){
        return {...state,notmatch:false}
    }
    if(action.type === constants.CHANGE_FAIL){
        return {...state,msg:action.msg}
    }
    if(action.type === constants.CHANGE_SUCC){
        return {...state,msg:action.msg,isSucc:true}
    }
    if(action.type === constants.OLD_PWD){
        return {...state,oldPwd:action.value,msg:''}
    }
    if(action.type === constants.NEW_PWD){
        return {...state,newPwd:action.value,msg:''}
    }
    if(action.type === constants.RNEW_PWD){
        return {...state,RnewPwd:action.value,msg:''}
    }
    if(action.type === constants.NOT_MATCH){
        return {...state,notmatch:true,pwd_strong:true}
    }
    if(action.type === constants.PWD_STRONG){
        return {...state,pwd_strong:false}
    }
    if(action.type === constants.PWD_WEAK){
        return {...state,pwd_strong:true}
    }
    if(action.type === constants.USER_ADDRESS){
        return {...state,userInfo:action.result}
    }
    if(action.type === constants.HANDLE_SELECT_ACTION){
        return {...state,selectedEntry:action.value}
    }
    return state;
}