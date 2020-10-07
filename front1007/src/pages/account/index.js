import React, { Component } from 'react';
import {connect} from 'react-redux';
// import Account from './components/account';
import Changepwd from './components/changepwd';
import ManageAddress from './components/manageAddress';
import {bindActionCreators} from 'redux';
import './style.css'
import { actionCreator, accountReducer } from './store';
import md5 from 'md5';
import {withRouter,Link} from 'react-router-dom';
import { faEnvelope, faUnlockAlt, faHome, faCrown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


class index extends Component {
    render() {
        const accountLabel= [
            "Change password",
            "Change Email",
            "Manage address",
            "VIP progress",
          ];
          const fontpic = [
           faUnlockAlt,
           faEnvelope,
           faHome,
           faCrown
          ];

        const {oldPwd,newPwd,RnewPwd,notmatch,msg,isSucc,pwd_strong,userInfo,delAddressReq,delRN, selectedEntry, add_succ} = this.props;
        console.log('yyy', selectedEntry, add_succ)
        return (
            <div className="AccountWrapper">
             <div className="row">
          {accountLabel.map((label, index) => {
            return (
              <div className="col-md-3 col-lg-3 col-6 d-lg-block d-md-block" key={index}>
                <div className="card-product-grid mb-3">
                <div className="entry" onClick={this.handleSelect.bind(this,label)}>
                    <div className="fontpic">
                        <FontAwesomeIcon icon={fontpic[index]} />
                    </div>
                    <div className="info-wrap text-center">
                        {label}
                    </div>
                </div>
                </div>
              </div>
            );
          })}
        </div>
          {selectedEntry==='Change password' || JSON.parse(sessionStorage.getItem('holdAlert'))===true?
            <Changepwd 
                handleInputChange={this.handleInputChange}
                handleBlur = {this.handleBlur}
                pwd_strong ={pwd_strong}
                oldPwd={oldPwd}
                newPwd={newPwd}
                RnewPwd={RnewPwd}
                msg={msg}
                isSucc={isSucc}
                handleFocus= {this.handleFocus}
                handleClick ={this.handleClick}
                notmatch={notmatch}
                />:null}
                {selectedEntry==='Manage address'?
                <ManageAddress 
                userInfo={userInfo}
                handleDelClick={this.handleDelClick}
                delAddressReq={delAddressReq}
                delRN={delRN}
                />:null}
            </div>
        );
    }
    componentDidMount(){
        let email = ''
        if(JSON.parse(sessionStorage.getItem('userInfo'))){
            email = JSON.parse(sessionStorage.getItem('userInfo'))[0].Email
          }
        else{
            email = '0'
        }
        this.props.getUserInfoAction(email)
    }
    componentWillUnmount(){
        this.props.setIsSuccAction()
        sessionStorage.removeItem('holdAlert')
    }
    handleDelClick=(RN)=>{
        this.props.delAddressRequestAction(RN)
        setTimeout(()=>{
            this.props.delAddressAction(RN)
        },500)
        
    }
    handleSelect = (value) =>{
        this.props.handleSelectAction(value)
    }
    handleBlur = ()=>{ 
        const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.{8,})");
        if(strongRegex.test(this.props.newPwd) !== true && this.props.newPwd !==""){
            this.props.pwdStrongAction()
        }else{
            this.props.pwdWeakAction()
        }
    }
    handleClick = ()=>{
        const {oldPwd,newPwd,RnewPwd} = this.props;
        let email = JSON.parse(sessionStorage.getItem('userInfo'))[0].Email
        const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.{8,})");
        if(RnewPwd === newPwd && strongRegex.test(newPwd) === true){
            let opassword = md5(oldPwd)
            let npassword = md5(newPwd)
            let tempObj = {
                oldpwd:opassword,
                newpwd:npassword,
                email:email
            }
            this.props.changePwdAction(tempObj)
        }else if(strongRegex.test(newPwd) !== true && this.props.newPwd !==""){
            this.props.pwdStrongAction()
        }
        else if(strongRegex.test(newPwd) === true && this.props.newPwd !==""){
            this.props.notMatchAction()
        }
    }
    handleFocus = ()=>{
        this.props.handleFocusAction()
    }
    handleInputChange = (e)=>{
        const value = e.target.value;
        const name = e.target.name;
        switch(name){
            case 'Oldpassword':
                this.props.setOldpwdAction(value)
                break
            case 'Newpassword':
                this.props.setNewpwdAction(value)
                break
            case 'RNewpassword':
                this.props.setRNewpwdAction(value)
                break
            default:
                break
        }  
    }
}
const mapStateToProps =(state)=>{
    return {
        oldPwd:state.accountReducer.oldPwd,
        newPwd:state.accountReducer.newPwd,
        RnewPwd:state.accountReducer.RnewPwd,
        notmatch:state.accountReducer.notmatch,
        msg:state.accountReducer.msg,
        isSucc:state.accountReducer.isSucc,
        pwd_strong:state.accountReducer.pwd_strong,
        userInfo:state.accountReducer.userInfo,
        delAddressReq:state.accountReducer.delAddressReq,
        delRN:state.accountReducer.delRN,
        selectedEntry:state.accountReducer.selectedEntry,
        add_succ:state.addressEditReducer.add_succ,
    }
}
const mapDispatchToProps =(dispatch)=>{
    return {
        delAddressRequestAction:bindActionCreators(actionCreator.delAddressRequestAction,dispatch),
        handleFocusAction:bindActionCreators(actionCreator.handleFocusAction,dispatch),
        setIsSuccAction:bindActionCreators(actionCreator.setIsSuccAction,dispatch),
        changePwdAction:bindActionCreators(actionCreator.changePwdAction,dispatch),
        notMatchAction:bindActionCreators(actionCreator.notMatchAction,dispatch),
        setOldpwdAction:bindActionCreators(actionCreator.setOldpwdAction,dispatch),
        setNewpwdAction:bindActionCreators(actionCreator.setNewpwdAction,dispatch),
        setRNewpwdAction:bindActionCreators(actionCreator.setRNewpwdAction,dispatch),
        pwdStrongAction:bindActionCreators(actionCreator.pwdStrongAction,dispatch), 
        pwdWeakAction:bindActionCreators(actionCreator.pwdWeakAction,dispatch), 
        getUserInfoAction:bindActionCreators(actionCreator.getUserInfoAction,dispatch),
        delAddressAction:bindActionCreators(actionCreator.delAddressAction,dispatch),
        handleSelectAction:bindActionCreators(actionCreator.handleSelectAction,dispatch),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(index);