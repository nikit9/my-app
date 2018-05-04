import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import * as moment from 'moment';

class DateBar extends Component {

    constructor(props){
        super(props);
        this.state={
            date: ''
        };
    }

    componentDidMount() {
        let initialDate = new Date();
        let day = initialDate.getDate();
        if (day<10)
            day = '0'+day;
        let month = initialDate.getMonth()+1;
        if (month<10)
            month = '0'+month;
        let year = initialDate.getFullYear();
        let presentedDate = day+'-'+month+'-'+year;
        this.setState({date: presentedDate});
    }

    render() {
        return (
            <div className="barContainer row-lg-4">
                <h4>Currency by Date:</h4>
                <div className="datePicker">
                    <DatePicker
                        value={this.state.date}
                        onChange={date => {
                            this.onDateChange(date)
                        }}>
                    </DatePicker>
                </div>
            </div>
        );
    }

    onDateChange(date){
        let formattedDate = moment(date).format('YYYY-MM-DD');
        let presentedFormattedDate = moment(date).format('DD-MM-YYYY');
        this.setState({ date: presentedFormattedDate });

        this.props.onChangeValue(formattedDate);
    }
}

export default DateBar;