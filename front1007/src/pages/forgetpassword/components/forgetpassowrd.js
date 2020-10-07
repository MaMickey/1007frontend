import React, { Component, Fragment } from 'react';
import '../style.css';
import "../../../css/ui.css";
import "../../../css/responsive.css";
import "../../../css/bootstrap.css";
import {Link,withRouter} from 'react-router-dom';
import Loader from 'react-loader-spinner';
import Alert from '../../../common/alert';
class forgetpassword extends Component {
    render() {
        const {theEmail, resetPwd, sendEmailClicked,changePwdSucc, emailCode, enterCode, failmessage, failSendEmail} = this.props
        return (
            <div className="forgetpwdWrapper">
                <div className="card">
                    <div className="card-body">
                    <h4 className="card-title mb-4">Reset password</h4>
                        <form>
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Email" name="" 
                                onChange={this.props.handleChange} 
                                value={theEmail} required/>
                                <span className="input-group-append">
                                <button className="btn btn-primary" onClick={this.props.sendEmail}>Send email</button>
                                </span>
                            </div>
                        </form>
                        {failSendEmail?<div className="mt-2 failEmailHint">Failed to send email</div>:null}
                        {sendEmailClicked?
                        <div className="emailLoaderWrap mt-4">
                        <Loader
                            type="ThreeDots"
                            color="#5499c7"
                            height={20}
                            width={60}
                            timeout={9000}
                            className="emailLoader"
                        /></div>:null}
                        {resetPwd?
                        <Fragment>
                        <div className="mt-4 text-muted">An email has been sent to you. Please enter the verification code we sent to your email</div>
                        <form className="verifyCode mt-1">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Verification code" name="" 
                                onChange={this.props.handleCodeChange} 
                                value={enterCode} required/>
                                <span className="input-group-append">
                                <button className="btn btn-primary" onClick={this.props.handleVerifyCode}>Verify</button>
                                </span>
                            </div>
                            {failmessage?<div className="mt-2 failEmailHint">Verification code isn't correct</div>:null}
                        </form>
                        </Fragment>:
                         (failmessage?<div className="mt-2 failEmailHint">Email doesn't exist</div>:null)
                        }
                    </div> 
                    </div>
                    {
                        // changePwdSucc? <Alert alertmsg='your temporary password is LoveXinsports001' btn='Go to change password' handleAlertClick={this.handleAlertClick}/>:null
                        changePwdSucc?
                        <div className='card mt-2'>
                            <div className="card-header">Your temporary password is:  <strong>LoveXinsports001</strong>
                            <p>Please use this temporary passowrd to login again and change to your own password in your account.</p>
                            <button className="btn btn-primary" onClick={this.handleClick}>Login again</button>
                            </div>
                        </div>:null
                    }
                </div>
        );
    }
    handleClick = ()=>{
        this.props.history.push('/login')
    }
}

export default withRouter(forgetpassword);