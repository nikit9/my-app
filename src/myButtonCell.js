import React, { Component } from 'react';
const {Cell} = require('fixed-data-table-2');

class MyButtonCell extends Component {
    render() {
        const {rowIndex, field, rowRate, data, ...props} = this.props;
        const button = data[rowIndex][field];
        const rate=data[rowIndex][rowRate];

        return (
            <Cell {...props}>
                <button type="button" className={button}
                onClick={() => {
                    // console.log(rate);
                    this.onClickHandler(rate);
                }}>
                    Remove Me</button>
            </Cell>
        );
    }

    onClickHandler = (rate) => {
        this.props.onClick(rate);
    }
}

export default MyButtonCell;