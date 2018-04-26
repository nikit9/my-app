import React, { Component } from 'react';
import MyTextCell from './myTextCell';
import MyButtonCell from './myButtonCell';
import _ from "lodash";

const {Table, Column, Cell} = require('fixed-data-table-2');

class CurrencyTable extends Component {
    constructor(props) {
        super(props);
        this.data = this.props.data;
        // console.log("in currencyTable");
        // console.log(this.props.data);

        this.state = {
            myTableData: props.data,
        };
    }

    componentWillReceiveProps(props) {
        this.setState({ myTableData: props.data });
    }

    render() {
        return (
            <div className="col">
                <div className="col-lg-6 currencyTableMain">
                    <Table
                        rowsCount={this.state.myTableData.length}
                        rowHeight={50}
                        headerHeight={50}
                        width={600}
                        maxHeight={400}>
                        <Column
                            header={<Cell>Coin</Cell>}
                            cell={
                                <MyTextCell
                                    data = {this.state.myTableData}
                                    field="rate"
                                />
                            }
                            width={200}
                        />
                        <Column
                            header={<Cell>Value</Cell>}
                            cell={
                                <MyTextCell
                                    data = {this.state.myTableData}
                                    field="value"
                                />
                            }
                            width={200}
                        />
                        <Column
                            header={<Cell/>}
                            cell={
                                <MyButtonCell
                                    data={this.state.myTableData}
                                    field="button"
                                    rowRate="rate"
                                    onClick={(rate) =>
                                        {this.onRemoveClick(rate)}}/>
                            }
                            width={200}
                            />
                    </Table>
                </div>
            </div>
        );
    }

    onRemoveClick(rate){
        const newShownData = this.state.myTableData;
        let index = _.findIndex(newShownData, {rate: rate});
        if (index>-1)
            newShownData.splice(index, 1);
        this.setState({myTableData: newShownData});
        this.props.saveToLS(this.state.myTableData);
    }
}

export default CurrencyTable;