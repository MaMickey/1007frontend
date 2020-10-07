import React, { Component, Fragment } from 'react';
import {withRouter,Link} from 'react-router-dom';
import { faTrash, faEdit, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from 'react-loader-spinner';
import  Alert from '../../../common/alert';
class account extends Component {
    render() {
        const {oldPwd,newPwd,RnewPwd,notmatch,isSucc,msg, userInfo,delAddressReq,delRN} = this.props;
        // let userTempInfo = Object.assign({},userInfo)
        let userTempInfo = userInfo.slice()
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
            <div className="card mt-2">
            <div className="card-header">
                <h6 className="card-title">Manage your address</h6>
            </div>
            <div className="card-body">
                <div className="row">
            {
                userTempInfo.map((item,index)=>(  
                  <div className="card col-12 col-lg-4 col-md-6 mt-2" key={item.RN}> 
                  <div className="card-body" >
                  {
                      item.AddressType ==='P'? <strong className="d-inline-block col-10">Post To Address{index}</strong>: <strong className="d-inline-block col-10">Register Address</strong>
                  }
                  <div className="col-12">
                    <div>Name: {item.FirstName} {item.LastName}</div>
                  </div> 
                  <div className="col-lg-12 d-md-none d-lg-block d-none">
                    <div>Contact number: {item.ContactNumber}</div>
                  </div> 
                  <div className="col-12 col-md-12  d-lg-none d-block d-md-block">
                    <div>Contact number:</div>
                    <div>{item.ContactNumber}</div>
                  </div> 
                  <div className="col-lg-12 d-md-none d-lg-block d-none">
                    <div>Post to address: {item.Address1},  {item.City}, {item.State}, {item.Postcode}, Australia {item.Address2?'('+ item.Address2 + ')':null}</div>
                  </div> 
                  
                  <div className="col-md-12 col-12 d-md-block d-lg-none d-block">
                    <div>Post to address:</div>
                    <div>{item.Address1},  {item.City}, {item.State}, {item.Postcode}, Australia {item.Address2?'('+ item.Address2 + ')':null}</div>
                  </div> 
                  <div className="col-12 mt-1">
                  <Link to={`/editAddress/edit${item.RN}`}>
                  <button className="btn btn-primary" ><FontAwesomeIcon icon={faEdit} /></button>
                  </Link>
                  {
                      item.AddressType ==='P'?<Fragment>
                          {
                              delAddressReq===true&&delRN===item.RN?<div className="ml-2 del-loader"><Loader
                              type="Bars"
                              color="#5499c7"
                              height={35}
                              width={32}
                              timeout={500}
                            /></div>:<button className="btn btn-light ml-2" onClick={this.handleDelClick.bind(this,item.RN)} ><FontAwesomeIcon icon={faTrash} /></button>
                          }
                          </Fragment>
                      :null
                  }
                  
                  </div>
                  </div>
                  </div>
                )
                )
            }
            </div>
            </div>
                 <div className="col-12">
                        <Link to='/editAddress/addnew'>
                        <button className="btn btn-primary btn-block mb-4"> Add new address</button>
                        </Link>
                       </div>
                </div>
            </Fragment>
        );
    }
    componentDidUpdate(){
        if(this.props.isSucc === true){
            sessionStorage.setItem('isLogin','false')
            sessionStorage.removeItem('userInfo')
            // this.props.history.push('/login');
        }
    }
    componentWillUnmount(){
        sessionStorage.removeItem('holdAlert')
    }
    handleAlertClick =()=>{
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
    handleDelClick=(RN)=>{
        this.props.handleDelClick(RN);
    }
}

export default withRouter(account);