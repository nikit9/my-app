import React, { Component } from 'react';
const {Cell} = require('fixed-data-table-2');

class MyTextCell extends Component {
    render() {
        const {rowIndex, field, data, ...props} = this.props;
        return (
            <Cell {...props}>
                {data[rowIndex][field]}
            </Cell>
        );
    }
}

export default MyTextCell;