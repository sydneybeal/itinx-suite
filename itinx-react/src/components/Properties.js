import React, { Component } from 'react';
import '../App.css';


class Properties extends Component {

  // initialize array of properties
  state = {
    properties: [],
    propertyToAdd: {
      name: '',
      portfolio: '',
      rep: '',
      city_region: '',
      country: '',
      inclusions: '',
      notes: '',
      type: 'Type:',
      webpage: '',
      airstrip: ''
    },
    propertyIdToRemove: 0,
    searchEntry: '',
    isAddState: false,
    isEmptyState: true,
    isSearchState: false
  }

  // call fetch method after app loads
  componentDidMount() {
    this.getProperties()
  }

  triggerEmptyState = () => {
    this.setState({
      ...this.state,
      isEmptyState: true,
      isAddState: false,
      isSearchState: false
    })
    this.setState({propertyToAdd: {type: 'Type:'}})
    this.getProperties()
  }

  //, {propertyToAdd: {type: 'Type:'}}

  triggerSearchState = () => {
    this.setState({
      ...this.state,
      isEmptyState: false,
      isAddState: false,
      isSearchState: true
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


  // fetch list of property from database (at localhost:4000)
  getProperties = _ => {
    //fetch('http://productdb-env.us-east-2.elasticbeanstalk.com/products')
    fetch('http://localhost:4000/properties')
    // convert response to json
    .then(response => response.json())

    // change the state to update with getProperties
    .then(response => this.setState({ properties: response.data }))

    //catch any errors
    .catch(err => console.error(err))
  }

  handleValidation() {
    let propertyToAdd = this.state.propertyToAdd;
    let errors = {};
    let formIsValid = true;


    if(!propertyToAdd["name"]){
      formIsValid = false;
      errors["name"] = "Property name cannot be empty";
    }

    if(!propertyToAdd["city_region"]){
      formIsValid = false;
      errors["city_region"] = "City cannot be empty";
    }

    if(!propertyToAdd["country"]){
      formIsValid = false;
      errors["country"] = "Country cannot be empty";
    }

    if(!propertyToAdd["type"] || propertyToAdd["type"] === 'Type:'){
      formIsValid = false;
      errors["type"] = "Type cannot be empty";
    }

    this.setState({errors: errors});
    return formIsValid;
  }

  addProperty = _ => {
    const {propertyToAdd} = this.state;
    const fetchString = `name=${propertyToAdd.name}&portfolio=${propertyToAdd.portfolio}&rep=${propertyToAdd.rep}&city_region=${propertyToAdd.city_region}&country=${propertyToAdd.country}&inclusions=${propertyToAdd.inclusions}&notes=${propertyToAdd.notes}&type=${propertyToAdd.type}&webpage=${propertyToAdd.webpage}&airstrip=${propertyToAdd.airstrip}`
    //fetch(`http://productdb-env.us-east-2.elasticbeanstalk.com/products/add?name=${productToAdd.name}&price=${productToAdd.price}`)

    if(this.handleValidation()){
      fetch(`http://localhost:4000/properties/add?${fetchString}`)
      .then(this.getProperties)
      .catch(err => console.error(err))

      this.setState({propertyToAdd: {type: 'Type:'}})
      this.triggerAddState()
    } else {
      alert("Form has errors.")
    }
  }

  searchProperties = e => {
    const term = e.target.value
    this.setState({searchEntry: term})
    console.log(this.state.searchEntry)

    if (term === '') {
      this.getProperties()
    } else {
      fetch(`http://localhost:4000/properties/search?searchTerm=${term}`)
        // convert response to json
        .then(response => response.json())
        // change the state to update with getProperties
        .then(response => this.setState({ properties: response.data }))
        //catch any errors
        .catch(err => console.error(err))
    }
  }

  deleteClicked = (e) => {
    const id = e.target.id
    console.log('Incoming id ' + id)
    this.setState({ propertyIdToRemove: id})
    //this.deleteProduct()
    //fetch(`http://productdb-env.us-east-2.elasticbeanstalk.com/products/remove?product_id=${id}`)
    fetch(`http://localhost:4000/properties/remove?product_id=${id}`)
    .then(this.getProperties)
    .catch(err => console.error(err))
  }

  // create html element for each property
  renderProperty = ({property_id, name, portfolio, rep, city_region, country, inclusions, notes, type, webpage, airstrip}) =>
  <tr key={property_id}>
  <td>{name}</td>
  <td>{portfolio}</td>
  <td>{rep}</td>
  <td>{city_region}</td>
  <td>{country}</td>
  <td>{inclusions}</td>
  <td>{type}</td>
  <td><a href={webpage}>Link</a></td>
  </tr>
  //<td><button id={property_id} onClick={this.deleteClicked}>X</button></td>


  // render the list of properties
  render() {
    const { properties, propertyToAdd, searchEntry, isAddState, isEmptyState, isSearchState } = this.state;

    console.log(this.state)
    return (

      <div className="Module">
      <h2 fontSize='40px'>
        Properties
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
      <div className="dropdown">
      <button className="dropbtn">{propertyToAdd.type}</button>
      <div className="dropdown-content">
      <button className="dropbtn" value="Hotel"
      onClick={e => this.setState({propertyToAdd: { ...propertyToAdd, type: e.target.value}})}>Hotel</button>
      <button className="dropbtn" value="Lodge"
      onClick={e => this.setState({propertyToAdd: { ...propertyToAdd, type: e.target.value}})}>Lodge</button>
      <button className="dropbtn" value="Resort"
      onClick={e => this.setState({propertyToAdd: { ...propertyToAdd, type: e.target.value}})}>Resort</button>
      </div>
      </div>

      <input className="dataEntry" placeholder="Property Name"
      value = {propertyToAdd.name}
      onChange={e => this.setState({propertyToAdd: { ...propertyToAdd, name: e.target.value}})}
      />
      <input className="dataEntry" placeholder="Portfolio"
      value = {propertyToAdd.portfolio}
      onChange={e => this.setState({propertyToAdd: { ...propertyToAdd, portfolio: e.target.value}})}
      />
      <input className="dataEntry" placeholder="Rep"
      value = {propertyToAdd.rep}
      onChange={e => this.setState({propertyToAdd: { ...propertyToAdd, rep: e.target.value}})}
      />
      <input className="dataEntry" placeholder="City/Region"
      value = {propertyToAdd.city_region}
      onChange={e => this.setState({propertyToAdd: { ...propertyToAdd, city_region: e.target.value}})}
      />
      <input className="dataEntry" placeholder="Country"
      value = {propertyToAdd.country}
      onChange={e => this.setState({propertyToAdd: { ...propertyToAdd, country: e.target.value}})}
      />
      <input className="dataEntry" placeholder="Inclusions"
      value = {propertyToAdd.inclusions}
      onChange={e => this.setState({propertyToAdd: { ...propertyToAdd, inclusions: e.target.value}})}
      />
      <input className="dataEntry" placeholder="Notes"
      value = {propertyToAdd.notes}
      onChange={e => this.setState({propertyToAdd: { ...propertyToAdd, notes: e.target.value}})}
      />

      <input className="dataEntry" placeholder="Webpage"
      value = {propertyToAdd.webpage}
      onChange={e => this.setState({propertyToAdd: { ...propertyToAdd, webpage: e.target.value}})}
      />
      <input className="dataEntry" placeholder="Airstrip"
      value = {propertyToAdd.airstrip}
      onChange={e => this.setState({propertyToAdd: { ...propertyToAdd, airstrip: e.target.value}})}
      />
      <button className="addButton" onClick={this.addProperty}>Add property</button>
      <button className="addButton" onClick={this.triggerEmptyState}>Cancel</button>
      </div>
    }

      {isSearchState &&
        <div>
        <input className="dataEntry" placeholder="Property Name"
        value={searchEntry}
        onChange={this.searchProperties}
        />
        <button className="addButton" onClick={this.triggerEmptyState}>Cancel</button>
        </div>
    }

    <table className="Table">
    <thead>
    <tr>
    <th>Name</th>
    <th>Portfolio</th>
    <th>Rep</th>
    <th>City/Region</th>
    <th>Country</th>
    <th>Inclusions</th>
    <th>Type</th>
    <th>Web</th>
    </tr>
    </thead>
    <tbody>
    {properties.map(this.renderProperty)}
    </tbody>
    </table>

    </div>

  );
}
}

export default Properties;
