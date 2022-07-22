import React, { Component } from 'react';
import '../App.css';
import Moment from 'moment';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class BedNightTracker extends Component {

  // initialize array of properties
  state = {
    bednightEntries: [],
    entryToAdd: {
      propertyName: '',
      primaryTraveler: '',
      numPax: '',
      dateIn: '',
      dateOut: '',
      consultant: ''
    },
    lookupData: {
      portfolio: '',
      rep: ''
    },
    searchEntry: '',
    isEmptyState: true,
    isAddState: false,
    isSearchState: false
  }

  // call fetch method after app loads
  componentDidMount() {
    this.getEntries()
  }

  triggerEmptyState = () => {
    this.setState({
      ...this.state,
      isEmptyState: true,
      isAddState: false,
      isSearchState: false
    })
  }

  triggerAddState = () => {
    this.setState({
      ...this.state,
      isEmptyState: false,
      isAddState: true,
      isSearchState: false
    })
  }

  triggerSearchState = () => {
    this.setState({
      ...this.state,
      isEmptyState: false,
      isAddState: false,
      isSearchState: true
    })
  }


  // fetch list of property from database (at localhost:4000)
  getEntries = _ => {
    //fetch('http://productdb-env.us-east-2.elasticbeanstalk.com/products')
    fetch('http://localhost:4000/serviceProviderView')
    // convert response to json
    .then(response => response.json())
    // change the state to update with getEntries
    .then(response => this.setState({ bednightEntries: response.data }))
    //catch any errors
    .catch(err => console.error(err))
  }

  searchEntries = e => {
    const term = e.target.value
    this.setState({searchEntry: term})
    console.log(this.state.searchEntry)

    if (term === '') {
      this.getEntries()
    } else {
      fetch(`http://localhost:4000/serviceProviderView/search?searchTerm=${term}`)
        // convert response to json
        .then(response => response.json())
        // change the state to update with getProperties
        .then(response => this.setState({ bednightEntries: response.data }))
        //catch any errors
        .catch(err => console.error(err))
    }
  }

  handleValidation() {
    let entryToAdd = this.state.entryToAdd;
    let errors = {};
    let formIsValid = true;

    if(!entryToAdd["propertyName"]){
      formIsValid = false;
      errors["propertyName"] = "Cannot be empty";
    }

    if(!entryToAdd["primaryTraveler"]){
      formIsValid = false;
      errors["primaryTraveler"] = "Cannot be empty";
    }

    if(!entryToAdd["numPax"]){
      formIsValid = false;
      errors["numPax"] = "Cannot be empty";
    }

    if(!entryToAdd["dateIn"]){
      formIsValid = false;
      errors["dateIn"] = "Cannot be empty";
    }

    if(!entryToAdd["dateOut"]){
      formIsValid = false;
      errors["dateOut"] = "Cannot be empty";
    }

    if(!entryToAdd["consultant"]){
      formIsValid = false;
      errors["consultant"] = "Cannot be empty";
    }

    this.setState({errors: errors});
    return formIsValid;
  }

  addEntry = _ => {
    const {entryToAdd} = this.state;
    const fetchString = `propertyName=${entryToAdd.propertyName}&primaryTraveler=${entryToAdd.primaryTraveler}&numPax=${entryToAdd.numPax}&dateIn=${entryToAdd.dateIn}&dateOut=${entryToAdd.dateOut}&consultant=${entryToAdd.consultant}`
    //fetch(`http://productdb-env.us-east-2.elasticbeanstalk.com/products/add?name=${productToAdd.name}&price=${productToAdd.price}`)

    if(this.handleValidation()){
      fetch(`http://localhost:4000/bednightEntries/add?${fetchString}`)
      .then(this.getEntries)
      .catch(err => console.error(err))
      this.setState({entryToAdd: ''})
      this.setState({isAddState: false})
    } else {
      alert("Form has errors.")
    }


  }

  // deleteClicked = (e) => {
  //   const id = e.target.id
  //   console.log('Incoming id ' + id)
  //   this.setState({ propertyIdToRemove: id})
  //   //this.deleteProduct()
  //   //fetch(`http://productdb-env.us-east-2.elasticbeanstalk.com/products/remove?product_id=${id}`)
  //   fetch(`http://localhost:4000/properties/remove?product_id=${id}`)
  //     .then(this.getProperties)
  //     .catch(err => console.error(err))
  // }

  setProperty = (propertyName) => {
    const { entryToAdd } = this.state;
    this.setState({entryToAdd: { ...entryToAdd, propertyName: propertyName}})
    const fetchString = `propertyName=${propertyName}`

    fetch(`http://localhost:4000/bednightEntries/getPortfolioRep?${fetchString}`)
    .then((response) => response.json())
    .then((json) => this.setState({ lookupData: json.data }))
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


  // render the list of properties
  render() {
    const { bednightEntries, entryToAdd, lookupData, searchEntry, isAddState, isEmptyState, isSearchState  } = this.state;
    let prflo, repr;

    console.log(entryToAdd)
    console.log(lookupData)

    if (this.state.lookupData === undefined) {
      prflo = "undef"
      repr = "undef"
    } else {
      prflo = lookupData.portfolio
      repr = lookupData.rep
    }



    return (
      <div className="Module">

      <h2 fontSize='40px'>Service Providers
      {isEmptyState &&
        <div>
        <button className="popupbtn"
        onClick={this.triggerAddState}>Add New</button>
        <button className="popupbtn"
        onClick={this.triggerSearchState}>Search</button>
        </div>}
      </h2>

      {isAddState &&
      <div className="popup">
      <input className="dataEntry" placeholder="Property Name"
      value = {entryToAdd.propertyName}
      onChange={e => this.setProperty(e.target.value)}
      />
      <p className="dbLookupField" placeholder="Portfolio-test">{prflo}</p>
      <p className="dbLookupField" placeholder="Rep-test">{repr}</p>
      <input className="dataEntry" placeholder="Primary Traveler"
      value = {entryToAdd.primaryTraveler}
      onChange={e => this.setState({entryToAdd: { ...entryToAdd, primaryTraveler: e.target.value}})}
      />
      <input className="dataEntry" placeholder="# of pax"
      value = {entryToAdd.numPax}
      onChange={e => this.setState({entryToAdd: { ...entryToAdd, numPax: e.target.value}})}
      />

      <DatePicker
      className="dataEntry"
      dateFormat="MMM dd, yyyy"
      selected={this.state.entryToAdd.inDateRaw}
      selectsStart
      placeholderText="Date In"
      startDate={this.state.entryToAdd.inDateRaw}
      endDate={this.state.entryToAdd.endDateRaw}
      onChange={e => this.setState({entryToAdd: { ...entryToAdd, inDateRaw: e, dateIn: Moment(e).format('YYYY-MM-DD')}})}
      />

      <DatePicker
      className="dataEntry"
      dateFormat="MMM dd, yyyy"
      selected={this.state.entryToAdd.outDateRaw}
      selectsEnd
      placeholderText="Date Out"
      startDate={this.state.entryToAdd.inDateRaw}
      endDate={this.state.entryToAdd.outDateRaw}
      onChange={e => this.setState({entryToAdd: { ...entryToAdd, outDateRaw: e, dateOut: Moment(e).format('YYYY-MM-DD')}})}
      />
      <input className="dataEntry" placeholder="Consultant"
      value = {entryToAdd.consultant}
      onChange={e => this.setState({entryToAdd: { ...entryToAdd, consultant: e.target.value}})}
      />
      <button className="addButton" onClick={this.addEntry}>Add Entry</button>
      <button className="addButton" onClick={this.triggerEmptyState}>Cancel</button>
      </div>
    }

    {isSearchState &&
      <div>
      <input className="dataEntry" placeholder="Property Name"
      value={searchEntry}
      onChange={this.searchEntries}
      />
      <button className="addButton" onClick={this.triggerEmptyState}>Cancel</button>
      </div>
    }

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
    <tbody>
    {bednightEntries.map(this.renderEntry)}
    </tbody>
    </table>


    </div>
  );
}
}

export default BedNightTracker;
