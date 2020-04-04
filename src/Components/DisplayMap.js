import React, { Component } from 'react';
import { VectorMap } from "react-jvectormap";
import _ from 'lodash';
import axios from 'axios';
import './Displaymap.css';
import {getName} from 'country-list';
import {
  isBrowser,
  isMobileOnly
} from "react-device-detect";

class DisplayMap extends Component{

    state={
        responsesata:[
            {cases:'',active:'',recovered:'',deaths:''}
        ],
        countryName:null
    }
    handleHover = (event,label,code) =>{
        console.log(code)
        label.splice(0,1);
        label.splice(2,1);
        const name = getName(code)
        axios.get('https://corona.lmao.ninja/countries/'+name).then(response=>{
            const countrydata = response.data;
            this.setState({
                responsesata:[
                    {cases:countrydata.cases, active:countrydata.active, recovered: countrydata.recovered, deaths: countrydata.deaths}
                ],
                countryName:name
            })
        })
        
    }  
    render(){
        let result = {};
        const countryInfo = _.map(this.props.responses, function(object) {
            return _.pick(object, ['countryInfo']);
          });
         const addingID = countryInfo.map(element=>{
            return element.countryInfo.iso2;
        });
         const cases = this.props.responses.map((element)=>{
            return element.cases;
          });
        
          addingID.forEach((key, i) => result[key] = cases[i]);
          console.log(result);
          const handleClick = (e, countryCode) => {
          };
        if(isBrowser){
        return(
            <div className="worldmap">
                <h2>World Map Tracker</h2>
                <p><span className="box"><p style={{fontSize:15, color:'#F40D10'}}>Confirmed</p> <p style={{fontSize:15, color:'#F40D10'}}>{this.state.responsesata[0].cases}</p></span><span className="box1"><p style={{fontSize:15, color:'#2D11F3'}}>Active</p> <p style={{fontSize:15, color:'#2D11F3'}}>{this.state.responsesata[0].active}</p></span> <span className="box2"><p style={{fontSize:15, color:'#197C07'}}>Recovered</p> <p style={{fontSize:15, color:'#197C07'}}>{this.state.responsesata[0].recovered}</p></span><span className="box3"><p style={{fontSize:15, color:'#666666'}}>Deaths</p> <p style={{fontSize:15, color:'#666666'}}>{this.state.responsesata[0].deaths}</p></span></p>
                <h3 className="countryname">{this.state.countryName}</h3>
            <VectorMap
              map={"world_mill"}
              backgroundColor="transparent" //change it to ocean blue: #0077be
              zoomOnScroll={false}
              onRegionTipShow={this.handleHover}
              onRegionClick= {handleClick} //gets the country code
              containerClassName="map"
              hoverOpacity= "0.7" // opacity for :hover
	          hoverColor={false}
              regionStyle={{
                initial: {
                  fill: "#e4e4e4",
                  "fill-opacity": 0.9,
                  stroke: "none",
                  "stroke-width": 0,
                  "stroke-opacity": 0
                },
                hover: {
                  "fill-opacity": 0.8,
                  cursor: "pointer",
                },
                selected: {
                  fill: "#2938bc" //color for the clicked country
                },
                selectedHover:{}
              }}
              regionsSelectable={false}
              series={{
                regions: [
                  {
                    values: result, //this is your data
                    scale: ["#F7F5F5","#F78282","#CD0B0B","#830707"], //your color game's here
                    normalizeFunction: "polynomial"
                  }
                ]
              }}
            />
          </div>
        );
    }
    else if(isMobileOnly){
      return(<div>
        <div className="worldmap-mobile">
                <h2>World Map Tracker</h2>
                <p><span className="box-mobile"><p style={{fontSize:10, color:'#F40D10'}}>Confirmed</p> <p style={{fontSize:10, color:'#F40D10'}}>{this.state.responsesata[0].cases}</p></span><span className="box1-mobile"><p style={{fontSize:10, color:'#2D11F3'}}>Active</p> <p style={{fontSize:10, color:'#2D11F3'}}>{this.state.responsesata[0].active}</p></span></p><p> <span className="box2-mobile"><p style={{fontSize:10, color:'#197C07'}}>Recovered</p> <p style={{fontSize:10, color:'#197C07'}}>{this.state.responsesata[0].recovered}</p></span><span className="box3-mobile"><p style={{fontSize:10, color:'#666666'}}>Deaths</p> <p style={{fontSize:10, color:'#666666'}}>{this.state.responsesata[0].deaths}</p></span></p>
                <h3 className="countryname">{this.state.countryName}</h3>
            <VectorMap 
              map={"world_mill"}
              backgroundColor="transparent" //change it to ocean blue: #0077be
              zoomOnScroll={false}
              onRegionTipShow={this.handleHover}
              onRegionClick= {handleClick} //gets the country code
              containerClassName="map"
              hoverOpacity= "0.7" // opacity for :hover
	          hoverColor={false}
              regionStyle={{
                initial: {
                  fill: "#e4e4e4",
                  "fill-opacity": 0.9,
                  stroke: "none",
                  "stroke-width": 0,
                  "stroke-opacity": 0
                },
                hover: {
                  "fill-opacity": 0.8,
                  cursor: "pointer",
                },
                selected: {
                  fill: "#2938bc" //color for the clicked country
                },
                selectedHover:{}
              }}
              regionsSelectable={false}
              series={{
                regions: [
                  {
                    values: result, //this is your data
                    scale: ["#F7F5F5","#F78282","#CD0B0B","#830707"], //your color game's here
                    normalizeFunction: "polynomial"
                  }
                ]
              }}
            />
          </div>
      </div>);
    }
  }
}
export default DisplayMap;