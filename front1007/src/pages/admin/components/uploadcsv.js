import React, { Component, Fragment } from 'react';
import CSVReader from 'react-csv-reader';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { actionCreator } from "../store";
class uploadcsv extends Component {
    render() {
        const {webOn,fileName} = this.props
        let tempFileName = []
        for(let i=0;i<fileName.length;i++){
            if(tempFileName.length===0){
                tempFileName.push(fileName[i])
            }  
            else{
                for(let j in tempFileName){   
                    if(j!==fileName[i]){
                        tempFileName.push(fileName[i])
                    }
                }
            }    
        }
        const papaparseOptions = {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            transformHeader: header =>
              header
                .toLowerCase()
                .replace(/\W/g, '_')
          }
        return (
            <Fragment>
            <div className='uploadCsvWrapper'>
            <CSVReader
            cssClass="csv-reader-input"
            label="click choose file to upload mydeal CSV file"
            onFileLoaded={this.handleForce}
            onError={this.handleDarkSideForce}
            parserOptions={papaparseOptions}
            inputId="ObiWan"
            inputStyle={{color: 'red'}}
            />
            {
                fileName.length === tempFileName.length?<button onClick={this.handleClick}>Confirm Upload</button>:<Fragment><button onClick={this.handleClick} disabled>Confirm Upload</button><p style={{color:'red'}}>Please refresh this page, you need to upload file with different fileName.</p></Fragment>
            }
            {
                webOn?webOn:null
            }
            </div>
            </Fragment>
        )
      }
      handleForce = (data,fileInfo)=>{
        this.props.setdataAction(data,fileInfo.name);
        console.log('aa',data)
      }
      handleClick = ()=>{
        const {csvData} = this.props;
        this.props.webOnAction(csvData)
      }
}
const mapStateToProps = (state)=>{
    return {
        webOn:state.adminReducer.webOn,
        csvData:state.adminReducer.csvData,
        fileName:state.adminReducer.fileName
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        setdataAction:bindActionCreators(actionCreator.setdataAction,dispatch),
        webOnAction:bindActionCreators(actionCreator.webOnAction,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(uploadcsv);