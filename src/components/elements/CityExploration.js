import React, { Component } from 'react';

import CityExplorationFilters from './CityExplorationFilters.js';
import CityExplorationMap from './CityExplorationMap.js';
import CityClubs from './CityClubs.js';
import { inject, observer } from "mobx-react";

@observer
class CityExploration extends Component {

    state={
        highlightedGenre: ''
    }

    render() {
        return (
            <div className="city-exploration-container">
                <div className="city-exploration-header">
                    <h2 className="city-exploration-title">Explore {this.props.cityName} music genres</h2>
                    {/* <p className="city-exploration-subtitle">Explore the data subtitle</p> */}
                </div>
                <div className="city-exploration-content">
                <CityExplorationMap
                        id={101}
                        DataStore={this.props.DataStore} 
                        // activeHeatmapData = {DataStore.activeHeatmapData} 
                        getColorFromGenre = {this.props.DataStore.getColorFromGenre}
                        // avaliableGenres={JSON.parse(JSON.stringify(DataStore.avaliableGenres))} 
                        // clubsStats={JSON.parse(JSON.stringify(DataStore.clubsStats2))}
                        initialPosition = {this.props.DataStore.citiesInfos.filter(city => city.name === this.props.cityName)[0].initialPosition}
                        clubs = {this.props.DataStore.citiesGenresSumup.filter(city => city.name === this.props.cityName)[0].clubsData}
                        data = {this.props.DataStore.clubsStats.filter(city => city.name === this.props.cityName)[0].stats}
                        limits = {this.props.DataStore.cityLimits.filter(city => city.name === this.props.cityName)[0].limits}
                        sumup = {this.props.DataStore.citiesGenresSumup.filter(city => city.name === this.props.cityName)[0].sumupData}
                        genres={this.props.DataStore.activeGenresInMap}
                        activeClub={this.props.DataStore.activeClubInMap}
                        initialZoomLevel={this.props.DataStore.citiesInfos.filter(city => city.name === this.props.cityName)[0].zoomLevel}
                        circleSizeMode={'normal'} // or 'real'
                        highlightedGenre={this.state.highlightedGenre}
                        updateHiglightedGenre={this.updateHiglightedGenre}
                        avaliableGenres={this.props.DataStore.genresNames}
                    ></CityExplorationMap>
                    <CityExplorationFilters
                        DataStore={this.props.DataStore}
                        genres={this.props.DataStore.activeGenresInMap}
                        highlightedGenre={this.state.highlightedGenre}
                        updateHiglightedGenre={this.updateHiglightedGenre}
                        avaliableGenres={this.props.DataStore.genresNames}
                        handleAvaliableGenresInMap={this.props.DataStore.handleAvaliableGenresInMap}
                        cityName = {this.props.cityName}
                    ></CityExplorationFilters>
                </div>
                <CityClubs 
                    clubs = {this.props.DataStore.citiesGenresSumup.filter(city => city.name === this.props.cityName)[0].clubsData}
                    DataStore={this.props.DataStore}
                    HelpStore={this.props.HelpStore}
                    cityName={this.props.cityName}
                ></CityClubs>
            </div>
        );
    }

    updateHiglightedGenre = (genreName) => {
        this.setState({highlightedGenre: genreName})
    }
}

export default CityExploration;