import React from 'react';
import '../App.css';

import AllPropertiesButton from './AllPropertiesButton.js';
import HomeButton from './HomeButton.js';
import TrackerButton from './TrackerButton.js';
import ReportButton from './ReportButton.js';
import ComparePropsButton from './ComparePropsButton.js';

const MenuBar = props => {
  return(
    <div>
    <h1 className="header" fontSize='40px'>ItinX</h1>
    <HomeButton goToHome={props.goToHome} />
    <AllPropertiesButton goToProperties={props.goToProperties} />
    <ComparePropsButton goToCompare={props.goToCompare} />
    <TrackerButton goToTracker={props.goToTracker} />
    <ReportButton goToReport={props.goToReport} />
    </div>
  );
}

export default MenuBar;
