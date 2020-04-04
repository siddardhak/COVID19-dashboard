import React, { Component } from 'react';
import axios from 'axios';
import {
    isBrowser,
    isMobileOnly
  } from "react-device-detect";
import { LineChart } from 'react-chartkick';
import 'chart.js';
import './Timeline.css';


class TimeLine extends Component{
    state={
        data:[]
    }

    componentDidMount(){
        axios.get('https://corona.lmao.ninja/v2/historical/all').then(response=>{
            const timelinedata = response.data.cases;
            this.setState({
                data:timelinedata
            })
        })
    }

    render(){
        if(isBrowser){
        return(
            <div className="timeline">
                <h2>Historical Data</h2>
               <div className="linechart">
                <LineChart data={this.state.data} width="800px" height="500px"  label="Cases" xtitle="Dates" ytitle="Cases" stacked={true}  legend={true} download={true}/>
                </div>
            </div>
            );
    }
    else if(isMobileOnly){
        return(
            <div className="timeline">
                <h2>Historical Data</h2>
               <div>
                <LineChart data={this.state.data} width="350px" height="400px"  label="Cases" xtitle="Dates" ytitle="Cases" stacked={true}  legend={true} download={true}/>
                </div>
            </div>
        );
    }
}
}
export default TimeLine;