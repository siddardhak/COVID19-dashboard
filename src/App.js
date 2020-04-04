import React,{Component} from 'react';
import './App.css';
import axios from 'axios';
import AllCases from './Components/allcases';
import DisplayTable from './Components/displayTable';
import TimeLine from './Components/TimeLine';
import DisplayMap from './Components/DisplayMap';


class App extends Component {
  state = {
    responsedata:[],
    totalcases:[
      {cases:'',active:'',recovered:'',deaths:''}
    ]
  }

  componentDidMount(){
      axios.get('https://corona.lmao.ninja/countries').then(response=>{
        this.setState({responsedata:response.data})
      })
      axios.get('https://corona.lmao.ninja/all').then(response=>{
        const totaldata = response.data;
        this.setState({
          totalcases:[
            {cases:totaldata.cases,active:totaldata.active,recovered:totaldata.recovered,deaths:totaldata.deaths}
          ]
        })
      })
  }
  render(){
  return (
    <div className="App">
    <h1>Covid19 TRACKER</h1>
    <AllCases totalcases={this.state.totalcases[0].cases} activecases = {this.state.totalcases[0].active} recoveredcases = {this.state.totalcases[0].recovered} deaths={this.state.totalcases[0].deaths}/>
    <DisplayMap responses={this.state.responsedata} />
    <TimeLine/>
    <DisplayTable response={this.state.responsedata}/>
    </div>
  );
}
}

export default App;
