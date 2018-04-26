import React, { Component } from 'react';

class SearchBar extends Component {

    constructor(props){
        super(props);
        this.allData = this.props.allData;
        this.state={ value: '' };
    }

    render() {
        return (
            <div className="searchBarContainer row-lg-4">
                <h4>Add a currency!</h4>
                <div className="selectSearchBar">
                    <select className="form-control" value="yes"
                            style={{width: '100%'}}
                            onChange={event => {
                                this.onSearchChange(event.target.value)
                            }}>
                        <option key="first" value=""> </option>
                        {this.allData.map(item => {
                            return <option key={item.rate} value={item.rate}>{item.rate}</option>
                        })
                        }
                    </select>
                </div>
            </div>
        );
    }

    onSearchChange(value){
        this.setState({value});
        this.props.onChangeValue(value);
    }
}

export default SearchBar;