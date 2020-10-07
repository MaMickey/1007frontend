import React, { Component } from 'react';
import './style.css'
class index extends Component {

    render() {
        const {productAmount,page} = this.props;
        const pageNum = Math.ceil(productAmount / 20);
        let pageArr = []
        for(let i=0;i<pageNum;i++){
            pageArr.push(1)
        }
        return (
            <div className="pagination-wrapper m-2">
                <div className="pagination">
                <span className="pagination-title"> 
                {page<pageNum? (<span>Showing {20*page} of {productAmount}</span>): (<span>Showing {productAmount} of {productAmount}</span>)}
                </span>
                    <a  onClick={this.handlePreClick}>&laquo;</a>
                    {
                        pageArr.map((item,index)=>{
                         return index === page-1?(<a key={index} className='active'
                            onClick={this.handlePageClick.bind(this,index+1)}>{index+1}</a>):(<a key={index} 
                                onClick={this.handlePageClick.bind(this,index+1)}>{index+1}</a>)
                        })
                    }
                    <a  onClick={this.handleForwardClick}>&raquo;</a>
                </div>
            </div>
        );
    }
    handlePageClick = (index)=>{
        this.props.handlePageClick(index)    
    }
    handlePreClick = ()=>{
        const {page} = this.props
        if(page>1){
            this.props.handlePageClick(parseInt(this.props.page)-1) 
        } 
    }
    handleForwardClick = ()=>{
        const {page,productAmount} = this.props
        const pageNum = Math.ceil(productAmount / 20);
        if(pageNum>page){
            this.props.handlePageClick(parseInt(page)+1) 
        }
    }
}

export default index;