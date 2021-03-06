import React, { Component, Fragment } from "react";
import { Link,withRouter } from "react-router-dom";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../style.css";
import "../../../css/ui.css";
import "../../../css/responsive.css";
import "../../../css/bootstrap.css";

var Settime = null;
var timer = null;
class Details extends Component {
  render() {
    const {
      CustomLabel,
      BLOBData,
      WebTitle,
      priceType,
      WebDetails,
      CATSub,
      CATPrimary,
      Stock,
      estimateStock
    } = this.props.data;
    // const TempWebDetails = WebDetails
    let NewWebDetails1 = WebDetails
    let NewWebDetails = NewWebDetails1.replace('?','')
    // const NewWebDetails = TempWebDetails.replaceAll('?', ' ');
    const { quantity,outStock } = this.props;
    return (
      <Fragment>
      <div className="card col-xl-2 col-lg-3 col-md-4 col-8 addSuccess" id="addsuccess" >
      <div className="no-gutters successRow1">
          <span className="img-wrap mr-3 col-5">
            <img src={BLOBData} alt='' className="border img-sm cartSmall" />
        </span>
        <span className="col-6"><span className="title SuccessTitle">{WebTitle}</span></span>
        <span className='col-5' />
        <span className="SuccessQuantity col-6">Quantity: x{quantity}</span>
        <div>
      </div>
    </div>
    <div className="no-gutters successRow2">
      <div className="col-sm-12">Added Successfully!</div>
    </div>
  </div>
      <div className="card detailWrap">
        <div className="row no-gutters">
          <div className="col-sm-6 border-right">
              <img src={BLOBData} className="productImg" alt="product" />
          </div>
          <div className="col-sm-6">
            <div className="content-body">
              <h3 className="title">{WebTitle}</h3>
              <dl className="row">
                <dt className="col-sm-3">Custom Label:</dt>
                <dd className="col-sm-9">{CustomLabel}</dd>

                <dt className="col-sm-3">Dept:</dt>
                <dd className="col-sm-9">{CATPrimary}-{CATSub}</dd>

                <dt className="col-sm-3">Price:</dt>
                {
                  this.props.data[`${priceType}`] === 0||Stock<estimateStock?<dd className="col-sm-9"><strong>AU${this.props.data.eBayPrice}</strong></dd>:<dd className="col-sm-9"><strong>AU${this.props.data[`${priceType}`]}</strong></dd>
                }
                <dt className="col-sm-3">Stock:</dt>
                {
                  Stock > 10&&priceType==='eBayPrice' ? <dd className="col-sm-9 detailStock">More than 10 left</dd>:<dd className="col-sm-9 detailStock">{Stock} left</dd>
                }
              </dl>
              <hr />
              <div className="form-row">
                <div className="form-group flex-grow-0">
                  <label>Quantity</label>
                  <div className="input-group mb-3 input-spinner">
                    <div className="input-group-prepend">
                      <button
                        className="btn btn-light"
                        type="button"
                        id="button-plus"
                        onClick={this.handleAddClick}
                      >
                        +
                      </button>
                    </div>
                    <input
                      type="text" inputMode='numeric'
                      className="form-control detailInputQuantity"
                      value={quantity}
                      onChange={this.handleChange}
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-light"
                        type="button"
                        id="button-minus-detail"
                        onClick={this.handleMinusClick}
                      >
                        -
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <button className="btn  btn-outline-primary" id='buynow' onClick={this.handleClick.bind(this,'buy')}>
                Buy now
              </button>
              <button className="btn btn-primary ml-3" id='addcart' onClick={this.handleClick.bind(this,'cart')}>
                <span className="text" >Add to cart</span>
                <FontAwesomeIcon icon={faShoppingCart} className="addCartIcon ml-1"/>
              </button>
              {
                outStock?
                //   document.getElementById('buynow').disabled=true,
                //  document.getElementById('addcart').disabled=true,
                <span className="outStockHint ml-2">Failed to add!</span>
                :null
                // outStock?<span>Stock not enough!</span>:null
              }
            </div>
          </div>
        </div>
        <div className="descriptionWrapper">
          <h6 className="ml-4">Description:</h6>
          <div className="Dcontainer">
          {
            (NewWebDetails[0] === "\'" && NewWebDetails[-0] === "\'")||(NewWebDetails[0] === "\"" && NewWebDetails[-0] === "\"")?
            <div className="" dangerouslySetInnerHTML={{ __html:NewWebDetails.replace('?', ' ').slice(1,-1)}}/>:
            <div className="" dangerouslySetInnerHTML={{ __html:NewWebDetails.replace('?', ' ')}}/>
          }
          </div>
        </div>
        {/* {WebDetails?null:
        <div className="detailImgs">
            {
                this.getDetailImgs().length >0? this.getDetailImgs().map((item,index)=>{
                     return(
                      <img className="detailImgInfo" src={item} alt="" key={index}/>
                     )
                 }):null
              }
        </div>} */}
      </div>
      </Fragment>
    );
  }
  componentWillUnmount(){
    clearTimeout(this.timer)
}
  handleAddClick = ()=>{
    const {Stock} = this.props.data;
    const {quantity} = this.props;
    if(quantity<Stock){
      this.props.handleAddClick();
    }
    document.getElementById('buynow').disabled = false;
    document.getElementById('addcart').disabled = false;
    document.getElementById('button-minus-detail').disabled = false;
  }
  handleMinusClick = ()=>{
    this.props.handleMinusClick();
  }
  handleClick = (from) => {
    const { quantity, data } = this.props;
    const {Stock} = data
    this.props.handleClick(quantity, data);
    if(quantity<=Stock&&quantity!==0){
      document.getElementById('addsuccess').style.display = "block"
      let element = document.getElementById('addsuccess')
      Settime=()=>setTimeout(()=>{element.style.display ="none"},1000)
      this.timer=Settime()
      if(from === 'buy'){
        this.props.history.push('/cart')
      }
    }
    
  };
  handleChange = (e) => {
    const quantity = e.target.value;
    this.props.handleChange(parseInt(quantity))
    if (quantity === ''){
      this.props.handleChange(0);
    }
    if(quantity > 0){
    this.props.handleChange(parseInt(quantity));
    document.getElementById('buynow').disabled = false;
    document.getElementById('addcart').disabled = false;
    document.getElementById('button-minus-detail').disabled = false;
    }else{
      document.getElementById('buynow').disabled = true;
      document.getElementById('addcart').disabled = true;
      document.getElementById('button-minus-detail').disabled = true;
    }
  };
  getDetailImgs() {
    const { CustomLabel } = this.props.data;
    let baseUrl = `https://xinsports.com.au/images/webpics/${CustomLabel}/`;
    let ImgArr = [];
    let http = new XMLHttpRequest();
    for (let i = 1; i <= 8; i++) {
      http.open("GET", baseUrl + i + ".jpg", true);
      if (http.status !== 404) {
        ImgArr.push(baseUrl + i + ".jpg");
      }
    }
    return ImgArr;
  }
}
export default withRouter(Details);
