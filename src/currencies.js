import React, { Component } from 'react';

const API_KEY = '7312269b011ac267b5d9663c4a479c24';
const endpoint = 'latest';

class Currencies extends Component {

    constructor(props){
        super(props);
        this.rates=[];
        this.values=[];
        this.state={
            rates: [],
            values: []
        };
    }

    componentDidMount(){

        fetch(`http://data.fixer.io/api/${endpoint}?access_key=${API_KEY}`)
            .then(results => {
                return results.json();
            }).then(result => {
            let rates = result.rates;
                let i=0;
                Object.keys(rates).forEach(key => {
                    this.rates[i] = key;
                    this.values[i] = rates[key];
                    i++;
                })
            this.setState({rates: this.rates, values: this.values})
            })
    }

    render () {
        // console.log(this.state.rates);
        // console.log(this.state.values);
        return (
            this.state.rates.map(rate => {
                return (
                    <tr>
                        <td>{ rate }</td>
                    </tr>
                )
            })
        )
    }
}

export default Currencies;