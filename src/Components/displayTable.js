import React from 'react';
import './displayTable.css';
import {
    isBrowser,
    isMobileOnly
  } from "react-device-detect";

const displayTable = props =>{
   const newdata = props.response.map((country)=>{
   return <tr className="rowclassname" key={country.country}><td className="country">{country.country}</td><td>{country.cases}</td><td>{country.active}</td><td>{country.critical}</td><td>{country.recovered}</td><td>{country.deaths}</td><td>{country.casesPerOneMillion}</td><td>{country.deathsPerOneMillion}</td></tr>
    })
    const mobiledata = props.response.map((country)=>{
        return <tr className="rowclassname" key={country.country}><td className="country">{country.country}</td><td>{country.cases}</td><td>{country.active}</td><td>{country.recovered}</td><td>{country.deaths}</td><td>{country.casesPerOneMillion}</td></tr>
    })

    if(isBrowser){
    return(
        <React.Fragment>
        <div>
            <table className="tableclass" cellPadding='5' id='countryData'>
                <thead>
                    <tr className='heading'>
                        <th>Country</th>
                        <th>Total Cases</th>
                        <th>Active Cases</th>
                        <th>Critical Cases</th>
                        <th>Recovered</th>
                        <th>Deaths</th>
                        <th>Cases per Million</th>
                        <th>Deaths per Million</th>
                    </tr>
                </thead>
                <tbody>
                        {newdata}
                </tbody>
            </table>
        </div>
        </React.Fragment>
    );
    }
    else if(isMobileOnly){
        return(
            <React.Fragment>
            <div>
                <table className="tableclassmobile" cellPadding='0' id='countryData'>
                    <thead>
                        <tr className='heading'>
                            <th>Country</th>
                            <th>Total Cases</th>
                            <th>Active Cases</th>
                            <th>Recovered</th>
                            <th>Deaths</th>
                            <th>Cases per Million</th>
                        </tr>
                    </thead>
                    <tbody>
                            {mobiledata}
                    </tbody>
                </table>
            </div>
            </React.Fragment>
        );
    }
}
export default displayTable;