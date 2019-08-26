import React, { Component } from 'react';
import GenreMap from './GenreMap.js';
import { inject, observer } from "mobx-react";
import RegularButton from './RegularButton.js';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

@observer
class GenreMaps extends Component {

    render() {
        console.log(JSON.parse(JSON.stringify(this.props.DataStore.activeGenresInTree)));
        console.log(JSON.parse(JSON.stringify(this.props.DataStore.citiesGenresSumup)));
        
        return (
            <div className="genre-maps-container">
                <h2 className="genre-maps-title">
                Who would even want to listen to {this.props.DataStore.activeGenresInTree[0]} ?
                </h2>
                <div className="genre-maps">
                    {/* <GenreMap
                        id='genre-map-1'
                        DataStore={this.props.DataStore}
                        initialPosition = {[48.8606697, 2.3385351]}
                        clubs = {this.props.DataStore.citiesGenresSumup[0].clubsData}
                        data = {this.props.DataStore.clubsStats[0].stats}
                        limits = {this.props.DataStore.cityLimits[0].limits}
                        sumup = {this.props.DataStore.citiesGenresSumup[0].sumupData}
                        genres={this.props.DataStore.activeGenresInTree}
                        zoomLevel={11}
                    ></GenreMap> */}
                    {this.props.DataStore.citiesInfos.map((city, i) => 
                        <div className="genre-map" key={i}>
                            <GenreMap
                                id={'genre-map-' + city.name}
                                dimensions={{width: '300px', height:'300px'}}
                                DataStore={this.props.DataStore}
                                initialPosition = {city.initialPosition}
                                clubs = {this.props.DataStore.citiesGenresSumup.filter(cityTmp => cityTmp.name === city.name)[0].clubsData}
                                data = {this.props.DataStore.clubsStats.filter(cityTmp => cityTmp.name === city.name)[0].stats}
                                limits = {this.props.DataStore.cityLimits.filter(cityTmp => cityTmp.name === city.name)[0].limits}
                                sumup = {this.props.DataStore.citiesGenresSumup.filter(cityTmp => cityTmp.name === city.name)[0].sumupData}
                                genres={this.props.DataStore.activeGenresInTree}
                                zoomLevel={city.zoomLevel}
                            ></GenreMap>
                            <Link to={'/city/' + city.name}>
                                <RegularButton id={'genre-map-link-' + i} colors={[this.props.DataStore.getColorFromGenre(this.formatName(this.props.DataStore.activeGenresInTree[0]).toLowerCase()).col1, this.props.DataStore.getColorFromGenre(this.formatName(this.props.DataStore.activeGenresInTree[0]).toLowerCase()).col2,'orange']} text={'Explore ' + city.name}></RegularButton>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        );
    }


    formatName = (name) => {
        return name.split("'").join('_').split(' ').join('_');
    }
}

export default GenreMaps;