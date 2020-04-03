import React, { Component } from 'react';
import { VectorMap } from "react-jvectormap";
import _ from 'lodash';
import axios from 'axios';
import './Displaymap.css';
import {getName} from 'country-list';


class DisplayMap extends Component{

    state={
        responsesata:[
            {cases:'',active:'',recovered:'',deaths:''}
        ],
        countryName:null
    }
    handleHover = (event,label,code) =>{
        console.log(code)
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
    componentDidUpdate(){

       
    }
    shouldComponentUpdate(nextProps, nextState) {
        return this.state.countryName !== nextState.countryName;
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
              alert(countryCode)
          };
        return(
            <div className="worldmap">
                <p><span className="box"><p style={{fontSize:15, color:'#F40D10'}}>Confirmed:</p> <p style={{fontSize:15, color:'#F40D10'}}>{this.state.responsesata[0].cases}</p></span><span class="box1"><p style={{fontSize:15, color:'#2D11F3'}}>Active:</p> <p style={{fontSize:15, color:'#2D11F3'}}>{this.state.responsesata[0].active}</p></span> <span class="box2"><p style={{fontSize:15, color:'#197C07'}}>Recovered:</p> <p style={{fontSize:15, color:'#197C07'}}>{this.state.responsesata[0].recovered}</p></span><span class="box3"><p style={{fontSize:15, color:'#666666'}}>Deaths:</p> <p style={{fontSize:15, color:'#666666'}}>{this.state.responsesata[0].deaths}</p></span></p>
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
                    scale: ["#146804", "#ff0000"], //your color game's here
                    normalizeFunction: "polynomial"
                  }
                ]
              }}
            />
          </div>
        );
    }
}
export default DisplayMap;