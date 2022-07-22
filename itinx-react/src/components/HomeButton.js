import React from 'react';
import '../App.css';

const HomeButton = props => {
    return <button className="hpButton" onClick={props.goToHome}>Home</button>
}

export default HomeButton;
