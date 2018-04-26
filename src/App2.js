import React, { Component } from 'react';
import CurrencyTable from './currencyTable';
import SearchBar from './searchBar';
import _ from 'lodash';
import RevertButton from './revertButton';
import logo from './logo.svg';
import './App.css';
import './bootstrap.min.css';

const API_KEY = '7312269b011ac267b5d9663c4a479c24';
const endpoint = 'latest';

class App extends Component {

    constructor(props){
        super(props);

        this.allData=[];
        this.initialData=[];
        this.shownData=[];
        this.shownCountries=[];

        this.state={
            allData: [],
            shownData:[],
            initialData:[],
            value:'',
        }
    }

    componentDidMount(){
        this.shownCountries = ['EUR', 'ILS', 'USD', 'GBP', 'AUD'];
        this.initialCountries = ['EUR', 'ILS', 'USD', 'GBP', 'AUD'];

        // localStorage.setItem('shownC', JSON.stringify(this.shownCountries));
        const cachedCountries = localStorage.getItem('shownC');
        console.log(cachedCountries);
        if (!cachedCountries)
            localStorage.setItem('shownC', JSON.stringify(this.shownCountries));
        else
            this.shownCountries = JSON.parse(cachedCountries);

        console.log("at the beginning, shownCountries in storgae is:");
        console.log(localStorage.getItem('showC'));

        fetch(`http://data.fixer.io/api/${endpoint}?access_key=${API_KEY}`)
            .then(results => {
                return results.json();
            })
            .then(result => {
                let rates = result.rates;
                let i = 0;
                let j = 0;
                let k = 0;

                //check for saved data in local storage:
                Object.keys(rates).forEach(key => {
                    if (this.shownCountries.indexOf(key) > -1){
                        this.shownData[j] = {rate: key, value: rates[key], button: "btn btn-danger red"};
                        j++;
                    }
                    if (this.initialCountries.indexOf(key) > -1){
                        this.initialData[k] = {rate: key, value: rates[key], button: "btn btn-danger red"};
                        k++;
                    }
                    this.allData[i] = {rate: key, value: rates[key], button: "btn btn-danger red"};
                    i++;
                })

                this.setState({allData: this.allData, initialData: this.initialData, shownData: this.shownData});
                console.log(this.shownCountries);
            })
    }

    findValue(rate){
        for (let i=0; i<this.allData.length; i++){
            if (this.allData[i].rate === rate)
                return this.allData[i].value;
        }
    }

    handleChangeValue = value => {
        let newRateObj = {rate: value, value: this.findValue(value), button: "btn btn-danger red"};
        this.setState({
            shownData: this.state.shownData.concat([newRateObj])
        });
        this.shownCountries = this.shownCountries.concat([value]);
        localStorage.setItem('shownC', JSON.stringify(this.shownCountries));
        console.log("after adding a value, shownCountries in storgae is:");
        console.log(localStorage.getItem('showC'));
    }

    handleRevertClick = () => {
        let init = this.initialCountries;
        localStorage.setItem('shownC', JSON.stringify(init));
        console.log("after reverting, shownCountries in storgae is:");
        console.log(localStorage.getItem('showC'));
        this.setState((prevState) => {
            console.log("in setState function - prevState.initialData is:");
            console.log(prevState.initialData);
            return {shownData: prevState.initialData}
        });
    };

    handleRemoveClick = (rate) => {
        let newShownData = this.state.shownData;
        let index = _.findIndex(newShownData, {rate: rate});
        if (index>-1)
            newShownData.splice(index, 1);
        this.setState({shownData: newShownData});

        let index2 = this.shownCountries.indexOf(rate);
        if (index2>-1) {
            this.shownCountries.splice(index2, 1);
        }
        localStorage.setItem('shownC', JSON.stringify(this.shownCountries));
        console.log("after removing a value, shownCountries in storgae is:");
        console.log(localStorage.getItem('showC'));
    }


    render() {
        if (this.state.initialData.length===0)
            return 'loading...';
        // console.log("in render...");
        // console.log(this.state.shownData);
        return (
            <div className="headDiv">
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1 className="App-title">Niki's React Currency App</h1>
                    </header>
                </div>
                <div className="mainDiv">
                    <div className="col">
                        <div className="col-lg-6 currencyTableContainer">
                            <CurrencyTable
                                data = { this.state.shownData }
                                onClick= {(rate, value) => {
                                    this.handleRemoveClick(rate, value)}}/>
                        </div>
                        <div className="col-lg-6 searchAndRevertContainer">
                            <div className="row">
                                <div className="row-md-4">
                                    <SearchBar
                                        value={this.state.value}
                                        allData = { this.state.allData }
                                        onChangeValue={this.handleChangeValue}/>
                                </div>
                                <div className="row-md-4 revertButton">
                                    <RevertButton
                                        onClick={this.handleRevertClick}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        );
    }
}

export default App;
