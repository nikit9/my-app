import React, { Component } from 'react';
import {Cell} from 'fixed-data-table-2';

class MyButtonCell extends Component {
    render() {
        const {rowIndex, field, rowRate, data, ...props} = this.props;
        const button = data[rowIndex][field];
        const rate=data[rowIndex][rowRate];

        return (
            <Cell {...props}>
                <button type="button" className={button}
                onClick={() => {
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