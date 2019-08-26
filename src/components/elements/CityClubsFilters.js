import React, { Component } from 'react';
import RegularButton from './RegularButton';

class CityClubsFilters extends Component {

    render() {

        return (
            <div className="city-clubs-filters-container" id="city-clubs-filters-container">
                <div className="toggle-options">
                    <span style={{backgroundColor: (this.props.activeGenres.length === this.props.genres.length) ? 'white' : 'transparent', color: (this.props.activeGenres.length === this.props.genres.length) ? 'black' : 'white'}} onClick={() => this.props.toggleAll()}>Toggle All</span>
                    <span style={{backgroundColor: (this.props.activeGenres.length === 0) ? 'white' : 'transparent', color: (this.props.activeGenres.length === 0) ? 'black' : 'white'}} onClick={() => this.props.toggleNone()}>Toggle None</span>
                </div>
                <div className="all-genres">
                    {this.props.genres.map((genre, i) => 
                            <span 
                                key={i} 
                                className="genre" 
                                style={{backgroundColor: (this.props.activeGenres.indexOf(genre) !== -1) ? this.props.DataStore.getColorFromGenre(this.formatName(genre).toLowerCase()).col1 : 'transparent'}}
                                onClick={() => this.props.toggleGenre(genre)}
                            >{genre}</span>
                    )}
                </div>
                <div className="apply-filters" onClick={() => this.props.applyFilters()}>
                    <RegularButton id={'city-clubs-filter'} colors={['#093F9B', '#01B8AA']} text={'Apply Filters'}></RegularButton>
                </div>
            </div>
        );
    }

    formatName = (name) => {
        return name.split("'").join('_').split(' ').join('_');
    }
}

export default CityClubsFilters;