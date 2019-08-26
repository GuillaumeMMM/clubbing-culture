import React, { Component } from 'react';
import CityStory from '../elements/CityStory';
import CityExploration from '../elements/CityExploration';
import { inject, observer } from "mobx-react";
import Back from '../elements/Back';
import Footer from '../elements/Footer';
import Loader from '../elements/Loader';

@inject('DataStore')
@inject('HelpStore')
@observer
class City extends Component {
    
    render() {

        const { name } = this.props.match.params;
        console.log('name', name)
        
        return (
            <div className="city-container" id="city-container">
                <Back text={'Back to the home page'} direction='left'></Back>
                <h1>{name}</h1>
                <CityStory DataStore={this.props.DataStore} cityName={name}></CityStory>
                <CityExploration DataStore={this.props.DataStore} HelpStore={this.props.HelpStore} cityName={name}></CityExploration>
                <Footer></Footer>
            </div>
        );
    }

    componentDidMount() {
        document.getElementById('city-container').scrollIntoView();
    }
}

export default City;