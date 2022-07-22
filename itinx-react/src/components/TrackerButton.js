import React from 'react';
import '../App.css';

const TrackerButton = props => {
    return <button className="hpButton" onClick={props.goToTracker}>Service Providers</button>
}

export default TrackerButton;
