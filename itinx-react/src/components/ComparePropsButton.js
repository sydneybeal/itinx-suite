import React from 'react';
import '../App.css';

const ComparePropsButton = props => {
    return <button className="hpButton" onClick={props.goToCompare}>Compare Properties</button>
}

export default ComparePropsButton;
