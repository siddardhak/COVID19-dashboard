import React from 'react';
import './Acases.css';
import {isBrowser,isMobileOnly} from 'react-device-detect'

const allcases = props =>{
    if(isBrowser){
    return(
        <div>
            <table className="totaldata">
                <thead>
                    <tr>
                        <th style={{color:'Red'}}>Total Cases</th>
                        <th style={{color:'Blue'}}>Active Cases</th>
                        <th style={{color:'Green'}}>Recovered</th>
                        <th style={{color:'Grey'}}>Deaths</th>
                    </tr>
                </thead>
                <tbody>
                <tr><td style={{color:'#CC3300'}}>{props.totalcases}</td><td style={{color:'#3366FF'}}>{props.activecases}</td><td style={{color:'#33CC00'}}>{props.recoveredcases}</td><td style={{color:'#888888'}}>{props.deaths}</td></tr></tbody>
            </table>
        </div>
    );
    }
    else if(isMobileOnly){
        return(
            <div>
            <table className="totaldata" cellPadding="5">
            <tbody>

                        <tr><th style={{color:'Red', fontSize:23}}>Total Cases</th></tr><tr><td style={{color:'#CC3300'}}>{props.totalcases}</td></tr>
                        <tr><th style={{color:'Blue',fontSize:23}}>Active Cases</th></tr><tr><td style={{color:'#3366FF'}}>{props.activecases}</td></tr>
                        <tr><th style={{color:'Green',fontSize:23}}>Recovered</th></tr><tr><td style={{color:'#33CC00'}}>{props.recoveredcases}</td></tr>
                        <tr><th style={{color:'Grey',fontSize:23}}>Deaths</th></tr><tr><td style={{color:'#888888'}}>{props.deaths}</td></tr>
                </tbody>
            </table>
        </div>
        );
    }
}
export default allcases;