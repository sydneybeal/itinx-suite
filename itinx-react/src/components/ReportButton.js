import React from 'react';
import '../App.css';

const ReportButton = props => {
    return <button className="hpButton" onClick={props.goToReport}>Service Provider Report</button>
}

export default ReportButton;
