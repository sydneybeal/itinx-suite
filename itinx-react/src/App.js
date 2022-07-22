import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

import MenuBar from './components/MenuBar.js';
import Properties from './components/Properties.js';
import BedNightTracker from './components/BedNightTracker.js';
import BedNightReport from './components/BednightReport.js';
import CompareProps from './components/CompareProps.js';



class App extends Component {

  // initialize array of properties
  constructor(props) {
    super(props)
    this.state = { isEmptyState: true }
  }

  // call fetch method after app loads
  componentDidMount() {
    // this.renderButtons()
  }

  // create html element for each button
  renderButton = ({content}) =>
  <button onClick={this.goToProperties}>Properties</button>

  triggerAllPropertiesState = () => {
    this.setState({
      ...this.state,
      isEmptyState: false,
      isCompareState: false,
      isTrackerState: false,
      isReportState: false,
      isAllPropertiesState: true
    })
  }

  triggerTrackerState = () => {
    this.setState({
      ...this.state,
      isEmptyState: false,
      isCompareState: false,
      isAllPropertiesState: false,
      isReportState: false,
      isTrackerState: true
    })
  }

  triggerEmptyState = () => {
    this.setState({
      ...this.state,
      isEmptyState: true,
      isCompareState: false,
      isAllPropertiesState: false,
      isReportState: false,
      isTrackerState: false
    })
  }

  triggerReportState = () => {
    this.setState({
      ...this.state,
      isEmptyState: false,
      isCompareState: false,
      isAllPropertiesState: false,
      isTrackerState: false,
      isReportState: true
    })
  }

  triggerCompareState = () => {
    this.setState({
      ...this.state,
      isEmptyState: false,
      isCompareState: true,
      isAllPropertiesState: false,
      isTrackerState: false,
      isReportState: false
    })
  }


  // {this.state.isEmptyState &&
  //   <div>
  //     <AllPropertiesButton goToProperties={this.triggerAllPropertiesState} />
  //     <TrackerButton goToTracker={this.triggerTrackerState} />
  //     <ReportButton goToReport={this.triggerReportState} />
  //   </div>}
  // render the homepage and buttons
  render() {
    return (

      <div className="mainPage">

      <div className="menuBar">
      <MenuBar goToHome={this.triggerEmptyState} goToProperties={this.triggerAllPropertiesState}
      goToTracker={this.triggerTrackerState} goToReport={this.triggerReportState} goToCompare={this.triggerCompareState}/>
      </div>


      {this.state.isAllPropertiesState && <Properties />}

      {this.state.isTrackerState && <BedNightTracker />}

      {this.state.isReportState && <BedNightReport />}

      {this.state.isCompareState && <CompareProps />}

      </div>
    );
  }
}

export default App;
