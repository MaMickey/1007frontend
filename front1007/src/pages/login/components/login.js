import React, { Component, Fragment } from "react";
import Vcode from 'react-vcode';
import '../style.css';
import "../../../css/ui.css";
import "../../../css/responsive.css";
import "../../../css/bootstrap.css";
import {Link,withRouter} from 'react-router-dom';
import Alert from '../../../common/alert';
class login extends Component {
  render() {
    const { Email, Password, Verifycode,isLogin,logout,regSucc,PwdOrUsernameWrong,WrongCode } = this.props;

      
    return (
      <Fragment>
      {
            sessionStorage.getItem('isLogin') === 'true'? 
            <Alert handleAlertClick={this.handleAlertClick} alertmsg='Logged in successfully!' btn='Continue shopping'/>
            :null
        }
      <div className="card">
        <div className="card-body">
          <h4 className="card-title mb-4">Sign in</h4>
          <div >
            <div className="form-group">
              <label>Email</label>
              <input
                name="Email"
                className="form-control"
                type="email"
                onChange={this.handleChange} value={Email} required
              />
            </div>
            <div className="form-group">
              <Link className="float-right" to='/forgetpwd'>
                Forgot your password?
              </Link>
              <label>Password</label>
              <input
                className="form-control"
                type="password"
                name="Password" onChange={this.handleChange} value={Password} required
              />
              {PwdOrUsernameWrong?<div className="form-text logHint">Email or password is not correct!</div>:null}
              
            </div>
            <div className="form-group">
            <label>Verification code</label>
            <div className="form-row veriCodeWrapper">
                <Vcode
                    length={5}
                    onChange={this.handleVChange}
                    options={{ codes: ['a', 'b', 'c', 'd', 'e', 'f',
                   '1', '2', '3', '4', '5', '6', '7', '8', '9',] }}
                    className="veriCode form-group col-5"
                />
                <input className="form-control form-group col-3"
                name="Verifycode" onChange={this.handleChange} value={Verifycode} required/>
                {
                  WrongCode?<div className="form-text logHint">The verification code is not correct!</div>:null
                }
                
            </div>    
            </div>
            {/* <div className="form-group">
                <input type="checkbox" value="remember" id="checkbox"></input>
                <label htmlFor="checkbox">
                 <div className="checkText"> Remember </div>   
                </label>
            </div> */}
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block" onClick={this.handleSubmit}>
                Login
              </button>
            </div>
          </div>
        </div>
        <div className="card-footer text-center loginFooter">
          Don't have an account? <Link to='/register'>Sign up</Link>
        </div>
      </div></Fragment>
    )
  }
  handleVChange = (value)=>{
    this.props.handleVChange(value)
  }
  handleSubmit = ()=>{
    this.props.handleSubmit()
  }
  handleChange = (e)=>{
    this.props.handleChange(e)
  }
  handleAlertClick=()=>{
    this.props.history.push('/')
    }
}

export default withRouter(login);
