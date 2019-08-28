import React, { Component } from 'react';
import CityClubsFilters from './CityClubsFilters';
import CityClub from './CityClub';
import CityClubHelp from './helps/CityClubHelp';
import Separator from './Separator';

class CityClubs extends Component {

    state = {
        filterAllGenres: JSON.parse(JSON.stringify(this.props.DataStore.genresNames)),
        filterAllGenresCategories: JSON.parse(JSON.stringify(this.props.DataStore.genresCategories)),
        filterActiveGenres: JSON.parse(JSON.stringify(this.props.DataStore.genresNames)),
        clubsActiveGenres: JSON.parse(JSON.stringify(this.props.DataStore.genresNames))
    }

    render() {
        return (
            <div className="city-clubs-container" id="city-clubs-container">
                <Separator></Separator>
                <h2 id="scroll-title-target">Explore the main {this.props.cityName} Clubs</h2>
                <CityClubHelp HelpStore={this.props.HelpStore} DataStore={this.props.DataStore} cityName={this.props.cityName}></CityClubHelp>
                {/* <Separator></Separator> */}
                <CityClubsFilters 
                    genresCategories={this.state.filterAllGenresCategories}
                    genres={this.state.filterAllGenres}
                    activeGenres={this.state.filterActiveGenres}
                    DataStore={this.props.DataStore}
                    toggleGenre={this.toggleFilterGenre}
                    toggleAll={this.toggleFilterAll}
                    toggleNone={this.toggleFilterNone}
                    applyFilters={this.applyFilters}
                ></CityClubsFilters>
                <div className="city-clubs">
                    {this.props.clubs.map((club, i) => {
                        club.data = club.data.filter(event => event.genresObjects && event.genresObjects.length > 0);
                        if (club.data.length > 25) {
                            return (<CityClub 
                                        club={club} 
                                        key={i} 
                                        id={i}
                                        DataStore={this.props.DataStore}
                                        clubsActiveGenres={this.state.clubsActiveGenres}
                                        dimensions={{width: '100%', height: '100%'}}
                                    ></CityClub>)
                        } else {
                            return null;
                        }
                    })}
                </div>
            </div>
        );
    }

    // componentDidUpdate(prevProps) {
    //     console.log(prevProps, this.props);
        
    // }

    toggleFilterGenre = (genre) => {
        let filterActiveGenresTmp = JSON.parse(JSON.stringify(this.state.filterActiveGenres));
        if (this.state.filterActiveGenres.indexOf(genre) !== -1) {
            filterActiveGenresTmp.splice(this.state.filterActiveGenres.indexOf(genre), 1);
            this.setState({filterActiveGenres: filterActiveGenresTmp, clubsActiveGenres: filterActiveGenresTmp});
        } else {
            filterActiveGenresTmp.push(genre);
            this.setState({filterActiveGenres: filterActiveGenresTmp, clubsActiveGenres: filterActiveGenresTmp});
        }
    }

    toggleFilterAll = () => {
        this.setState({filterActiveGenres: this.state.filterAllGenres, clubsActiveGenres: this.state.filterAllGenres});
    }

    toggleFilterNone = () => {
        this.setState({filterActiveGenres: [], clubsActiveGenres: []});
    }

    // applyFilters = () => {
    //     this.setState({clubsActiveGenres: this.state.filterActiveGenres})
    // }
}

export default CityClubs;