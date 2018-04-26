import React from 'react';

const RevertButton = (props) => {
    return (
        <button type="button" className="btn btn-primary"
        onClick={props.onClick}>Reset!</button>
    )};

export default RevertButton;