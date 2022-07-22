import React, { Component } from 'react';
import '../App.css';
import Moment from 'moment';

class CompareProps extends Component {

  // initialize array of properties
  state = {
    propEntry: '',
    propsToCompare: [],
    isAddState: 'false'
  }

  // call fetch method after app loads
  componentDidMount() {
  }

  // fetch list of property from database (at localhost:4000)
  compareProps = _ => {
    //fetch('http://productdb-env.us-east-2.elasticbeanstalk.com/products')
    fetch('http://localhost:4000/serviceProviderView')
    // convert response to json
    .then(response => response.json())
    // change the state to update with getEntries
    .then(response => this.setState({ bednightEntries: response.data }))
    //catch any errors
    .catch(err => console.error(err))
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

  handleValidation() {
    let propEntry = this.state.propEntry;
    let errors = {};
    let formIsValid = true;



    if(!propEntry || propEntry === undefined){
      formIsValid = false;
      errors["propertyName"] = "Cannot be empty";
    }

    this.setState({errors: errors});
    return formIsValid;
  }

  addToCompare = _ => {
    const { propsToCompare, propEntry } = this.state;
    var newStateArray = this.state.propsToCompare.slice()

    if (propsToCompare.length === 3) {
      alert("Limit has been reached.")
      this.setState({propEntry: ''})
    }
    else if(this.handleValidation()){
      newStateArray.push(propEntry)
      this.setState({propsToCompare: newStateArray})
      this.setState({propEntry: ''})
    } else {
      alert("Form has errors.")
    }
  }



  // create html element for each property
  renderProp = (propertyName) =>

  <p>{propertyName}</p>
  //<td><button id={entry_id} onClick={this.deleteClicked}>X</button></td>


  // render the list of properties
  render() {
    const { propEntry, propsToCompare } = this.state;

    console.log(propsToCompare)

    return (
      <div className="Module">

      <h2 fontSize='40px'>Compare Properties</h2>

      <div>
      <input className="dataEntry" placeholder="Property Name"
      value = {propEntry}
      onChange={e => this.setState({propEntry: e.target.value})}
      />
      <button className="addButton" onClick={this.addToCompare}>Add to Compare</button>
      </div>

      <div>
      <h2><u>Properties Selected</u></h2>
      {propsToCompare.map(this.renderProp)}
      </div>

      </div>
    );
  }
}

export default CompareProps;
