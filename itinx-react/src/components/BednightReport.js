import React, { Component } from 'react';
import '../App.css';
import Moment from 'moment';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class BedNightReport extends Component {

  constructor(props) {
    super(props);
    this.state = {
      reportData: {
        propertyName: '',
        porftolio: '',
        rep: '',
        startDate: '',
        endDate: '',
        consultant: ''
      },
      selectedCategory: '',
      reportEntries: []
    };
  }

  // call fetch method after app loads
  componentDidMount() {
    //this.getEntries()
  }



  handleValidation() {
    let reportData = this.state.reportData;
    let selectedCategory = this.state.selectedCategory;
    let errors = {};
    let formIsValid = true;

    if(selectedCategory === "Property" && !reportData["propertyName"]){
      formIsValid = false;
      errors["propertyName"] = "Cannot be empty";
    }

    if(selectedCategory === "Portfolio" && !reportData["portfolio"]){
      formIsValid = false;
      errors["portfolio"] = "Cannot be empty";
    }

    if(selectedCategory === "Rep" && !reportData["rep"]){
      formIsValid = false;
      errors["rep"] = "Cannot be empty";
    }

    if(selectedCategory === "Consultant" && !reportData["consultant"]){
      formIsValid = false;
      errors["consultant"] = "Cannot be empty";
    }

    this.setState({errors: errors});
    return formIsValid;
  }




  // fetch list of property from database (at localhost:4000)
  pullReport = _ => {

    const {reportData} = this.state;
    //fetch('http://productdb-env.us-east-2.elasticbeanstalk.com/products')
    const fetchString = `propertyName=${reportData.propertyName}&portfolio=${reportData.portfolio}&rep=${reportData.rep}&startDate=${reportData.startDate}&endDate=${reportData.endDate}&consultant=${reportData.consultant}`

    if(this.handleValidation()){
      fetch(`http://localhost:4000/serviceProviderView/report?${fetchString}`)
      // convert response to json
      .then(response => response.json())
      // change the state to update with getEntries
      .then(response => this.setState({ reportEntries: response.data }))
      //catch any errors
      .catch(err => console.error(err))
    } else {
      alert("Form has errors.")
    }
    //this.setState({...reportData: ''})
  }

  triggerEmptyState = () => {
    this.setState({reportData: '', selectedCategory: '', reportEntries: ''})
  }

  handleStartChange = (e) => {
      const { reportData } = this.state
      this.setState({reportData: { ...reportData, startDateRaw: e, startDate: Moment(e).format('YYYY-MM-DD')}})
  }

  handleEndChange = (e) => {
      const { reportData } = this.state
      this.setState({reportData: { ...reportData, endDateRaw: e, endDate: Moment(e).format('YYYY-MM-DD')}})
  }
  // create html element for each property
  renderEntry = ({entry_id, propertyName, portfolio, rep, primaryTraveler, numPax, dateIn, dateOut, bednights, consultant}) =>

  <tr key={entry_id}>
  <td>{propertyName}</td>
  <td>{portfolio}</td>
  <td>{rep}</td>
  <td>{primaryTraveler}</td>
  <td>{numPax}</td>
  <td>{Moment(dateIn).format('DD MMM YYYY')}</td>
  <td>{Moment(dateOut).format('DD MMM YYYY')}</td>
  <td>{bednights}</td>
  <td>{consultant}</td>

  </tr>


  //<td><button id={entry_id} onClick={this.deleteClicked}>X</button></td>
  //

  // render the list of properties
  render() {
    const { reportData, selectedCategory, reportEntries } = this.state;
    let totalCount;

    console.log(this.state.reportData)
    //
    // if (this.state.reportData === undefined) {
    //   totalCount = "undef"
    // } else {
    //   totalCount = reportData.count
    // }


    if (this.state.reportData === undefined) {
      totalCount = "#"
    } else {
      totalCount = reportData.length
    }

    return (
      <div className="Module">

      <h2 fontSize='40px'>Service Provider Report</h2>

      <div>
      <div className="dropdown">
      <button className="dropbtn">Report Type: <b>{this.state.selectedCategory}</b></button>
      <div className="dropdown-content">
      <button className="dropbtn" value="Property"
      onClick={e => this.setState({selectedCategory: e.target.value})}>Property</button>
      <button className="dropbtn" value="Portfolio"
      onClick={e => this.setState({selectedCategory: e.target.value})}>Portfolio</button>
      <button className="dropbtn" value="Rep"
      onClick={e => this.setState({selectedCategory: e.target.value})}>Rep</button>
      <button className="dropbtn" value="Consultant"
      onClick={e => this.setState({selectedCategory: e.target.value})}>Consultant</button>
      </div>
      </div>

      {(selectedCategory === "Property") &&
      <input className="dataEntry" placeholder="Property Name"
      value = {reportData.propertyName}
      onChange={e => this.setState({reportData: { ...reportData, propertyName: e.target.value}})}
      />
    }

    {(selectedCategory === "Portfolio") &&
    <input className="dataEntry" placeholder="Portfolio"
    value = {reportData.portfolio}
    onChange={e => this.setState({reportData: { ...reportData, portfolio: e.target.value}})}
    />
  }

  {(selectedCategory === "Rep") &&
  <input className="dataEntry" placeholder="Rep"
  value = {reportData.rep}
  onChange={e => this.setState({reportData: { ...reportData, rep: e.target.value}})}
  />
}

{(selectedCategory === "Consultant") &&
<input className="dataEntry" placeholder="Consultant"
value = {reportData.consultant}
onChange={e => this.setState({reportData: { ...reportData, consultant: e.target.value}})}
/>
}

<DatePicker
className="dataEntry"
dateFormat="MMM dd, yyyy"
selected={this.state.reportData.startDateRaw}
selectsStart
placeholderText="Start date"
startDate={this.state.reportData.startDateRaw}
endDate={this.state.reportData.endDateRaw}
onChange={this.handleStartChange}
/>

<DatePicker
className="dataEntry"
dateFormat="MMM dd, yyyy"
selected={this.state.reportData.endDateRaw}
selectsEnd
placeholderText="End date"
startDate={this.state.reportData.startDateRaw}
endDate={this.state.reportData.endDateRaw}
onChange={this.handleEndChange}
/>

<button className="addButton" onClick={this.pullReport}>Report</button>
<button className="addButton" onClick={this.triggerEmptyState}>Clear</button>

</div>

<p> Total bookings: {totalCount} </p>

<p> Total bed nights: ## </p>

<table className="Table">
<thead>
<tr>
<th> Property </th>
<th> Portfolio </th>
<th> Rep </th>
<th> Primary Traveler </th>
<th> Number of Pax </th>
<th> Date In </th>
<th> Date Out </th>
<th> Bednights </th>
<th> Consultant </th>
</tr>
</thead>
{this.state.reportEntries !== undefined && this.state.reportEntries !== '' &&
  <tbody>
  {reportEntries.map(this.renderEntry)}
  </tbody>}
  </table>


  </div>
);
}
}

export default BedNightReport;
