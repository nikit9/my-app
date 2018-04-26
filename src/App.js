import React, { Component } from 'react';
import CurrencyTable from './currencyTable';
import SearchBar from './searchBar';
// import _ from 'lodash';
import RevertButton from './revertButton';
import logo from './logo.svg';
import './App.css';
import './bootstrap.min.css';

const API_KEY = '7312269b011ac267b5d9663c4a479c24';
const endpoint = 'latest';

class App extends Component {

    constructor(props){
        super(props);

        this.initialData = [];

        this.state={
            shownCountries: [],
            initialCountries: [],
            allData: [],
            shownData:[],
            // initialData:[],
            value:'',
        }
    }

    componentDidMount(){
        this.setState({shownCountries: ['EUR', 'ILS', 'USD', 'GBP', 'AUD']});
        this.setState({initialCountries: ['EUR', 'ILS', 'USD', 'GBP', 'AUD']});

        // localStorage.setItem('shownC', JSON.stringify(this.shownCountries));
        const cachedCountries = localStorage.getItem('shownC');
        if (!cachedCountries)
            localStorage.setItem('shownC', JSON.stringify(this.state.shownCountries));
        else
            this.setState({shownCountries: JSON.parse(cachedCountries)});

        fetch(`http://data.fixer.io/api/${endpoint}?access_key=${API_KEY}`)
            .then(results => {
                return results.json();
            })
            .then(result => {
                let rates = result.rates;
                let shownData = [];
                // let initialData = [];
                let allData = [];
                let i = 0;
                let j = 0;
                let k = 0;

                //check for saved data in local storage:
                Object.keys(rates).forEach(key => {
                    if (this.state.shownCountries.indexOf(key) > -1){
                        shownData[j] = {rate: key, value: rates[key], button: "btn btn-danger red"};
                        j++;
                    }
                    if (this.state.initialCountries.indexOf(key) > -1){
                        this.initialData[k] = {rate: key, value: rates[key], button: "btn btn-danger red"};
                        k++;
                    }
                    allData[i] = {rate: key, value: rates[key], button: "btn btn-danger red"};
                    i++;
                })

                this.setState({allData: allData, shownData: shownData});
            })
    }

    findValue(rate){
        for (let i=0; i<this.state.allData.length; i++){
            if (this.state.allData[i].rate === rate)
                return this.state.allData[i].value;
        }
    }

    handleChangeValue = value => {
        let newRateObj = {rate: value, value: this.findValue(value), button: "btn btn-danger red"};
        this.setState({
            shownData: this.state.shownData.concat([newRateObj])
        });
        this.state.shownCountries.concat([value]);
        localStorage.setItem('shownC', JSON.stringify(this.state.shownCountries));
    }

    handleRevertClick = () => {
        console.log(this.initialData);
        localStorage.setItem('shownC', JSON.stringify(this.state.initialCountries));
            this.setState({shownData: this.initialData});
        console.log(this.initialData);
    };

    saveToLocalStorage(data) {
        localStorage.setItem('shownC', JSON.stringify(this.getShownCList(data)));
    }

    getShownCList(data){
        let shownC = [];
        for (let i=0;i<data.length;i++){
            shownC.push(data[i].rate);
        }
        // console.log(shownC);
        return shownC;
    }


    render() {
        console.log("initialData is:");
        console.log(this.initialData);
        if (this.initialData.length===0)
            return 'loading...';
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
                                saveToLS= {(data) => {
                                    this.saveToLocalStorage(data)}}/>
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
