import React, { Component, Fragment } from 'react';
import {withRouter,Link} from 'react-router-dom';
import Loader from 'react-loader-spinner';
import  Alert from '../../../common/alert';

class changepwd extends Component {
    render() {
        const {oldPwd,newPwd,RnewPwd,notmatch,msg} = this.props;
        return (
            <Fragment>
                {
                JSON.parse(sessionStorage.getItem('holdAlert'))===true?<Alert handleAlertClick={this.handleAlertClick} alertmsg='Reset password successfully!' btn='Login again'/>:null
                }
            <div className="card mt-2" id="accountpwd">
            <div className="card-header">
            <h6 className="card-title">Change password</h6>
            </div>
            <div className="card-body">
                    <div className="form-group">
                        <label>Current password</label>
                        <input className="form-control" type="password"  name="Oldpassword" value={oldPwd} onChange={this.handleChange} required/>
                        {
                          msg !==''? <div className="form-text AccHint">{msg}</div>:null
                        }
                    </div>  
                    <div className="form-group">
                        <label>New password</label>
                        <input className="form-control" type="password" name="Newpassword"  value={newPwd} onChange={this.handleChange} onBlur={this.props.handleBlur}  required/>
                        {this.props.pwd_strong?null:<div className="form-text AccHint">Password must have at least 8 characters with numbers and letters!</div>}
                    </div> 
                    <div className="form-group">
                        <label>Confirm new password</label>
                        <input className="form-control" type="password" name="RNewpassword"  value={RnewPwd} onFocus={this.handleFocus} onChange={this.handleChange} required/>
                        {
                            notmatch?<div className="form-text AccHint">Password doesn't match!</div>:null
                        }
                    </div> 
                    <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block" onClick={this.handleClick}> Change Password  </button>
                     </div> 
                </div>
            </div>
            </Fragment>
        );
    }
    componentWillUnmount(){
        sessionStorage.removeItem('holdAlert')
    }
    handleAlertClick =()=>{
        sessionStorage.setItem('isLogin', false)
        this.props.history.push('/login')
    }
    handleFocus = ()=>{
        this.props.handleFocus()
    }
    handleChange = (e) =>{
        this.props.handleInputChange(e);
    }
    handleClick=()=>{
        this.props.handleClick();
    }
}
export default withRouter(changepwd);