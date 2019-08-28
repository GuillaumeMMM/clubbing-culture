import React, { Component } from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import GenreMap from '../GenreMap';
import CityClub from '../CityClub';
import * as d3 from 'd3';
// import backImg from '../../../assets/images/globalmaphelpback.png';

class CityClubHelp extends Component {

    state = {
        currentPage: 0,
        clubsActiveGenres: ['House', 'Techno', 'Disco']
    }

    render() {
        return (
            <div className="city-club-help-container" id="city-club-help-container">
                <div className="city-club-help-header">
                    <h2 className="title">How to Read ?</h2>
                </div>
                <div className="city-club-help-pages">
                    {(this.state.currentPage + 1) + ' / 2'}
                </div>
                <div className="city-club-help-content">
                    <div className="left-part" style={{ left: this.state.currentPage === 0 ? '10%' : '-2000px', opacity: this.state.currentPage === 0 ? 1 : 0 }}>
                        {/* <div className="left-svg-container" id="genre-tree-left-help-svg-container" style={{ width: '300px', height: '170px' }}></div> */}
                        <CityClub
                            club={this.props.DataStore.citiesGenresSumup[0].clubsData[1]}
                            id={'help-club'}
                            DataStore={this.props.DataStore}
                            clubsActiveGenres={this.state.clubsActiveGenres}
                            dimensions={{width: '100%', height: '100%'}}
                        ></CityClub>
                        <p>This colorful rectangle represents the nightclub Badaboum over the year 2018. Each line of the rectangle matches with an event in that club. The line itself is subdivided into different colors, each one matching with one of the musical genres of the event that day.</p>
                        <p>Click or tap on one of the lines to see the details of the event (Name, line-up and music genres).</p>
                    </div>
                    <div className="right-part" style={{ pointerEvents: this.state.currentPage === 1 ? 'all' : 'none', opacity: this.state.currentPage === 1 ? 1 : 0 }}>
                        <p>You can also toggle the avaliable genres and filter the ones you prefer.</p>
                        <div className="filters">
                            <span onClick={() => this.toggleGenre('House')} style={{backgroundColor: this.state.clubsActiveGenres.indexOf('House') !== -1 ? '#EC148C' : 'transparent'}}>House</span>
                            <span onClick={() => this.toggleGenre('Techno')} style={{backgroundColor: this.state.clubsActiveGenres.indexOf('Techno') !== -1 ? '#093F9B' : 'transparent'}}>Techno</span>
                            <span onClick={() => this.toggleGenre('Disco')} style={{backgroundColor: this.state.clubsActiveGenres.indexOf('Disco') !== -1 ? '#FFBF00' : 'transparent'}}>Disco</span>
                        </div>
                        <CityClub
                            club={this.props.DataStore.citiesGenresSumup[0].clubsData[1]}
                            id={'help-club-2'}
                            DataStore={this.props.DataStore}
                            clubsActiveGenres={this.state.clubsActiveGenres}
                            dimensions={{width: '100%', height: '100%'}}
                        ></CityClub>
                        <p>This way you can compare the importance of each music genre in {this.props.cityName} nightclubs.</p>
                    </div>
                </div>
                <div className="city-club-help-footer">
                    <div className="back" style={{ opacity: this.state.currentPage === 1 ? 1 : 0, pointerEvents: this.state.currentPage === 1 ? 'all' : 'none' }} onClick={() => this.state.currentPage === 1 ? this.setState({ currentPage: 0 }) : null}>
                        <div className="back-icon" >
                            <svg width="40" height="40" className="circle-svg">
                                <circle className="outer" cx="20" cy="20" r="15" />
                            </svg>
                            <ArrowBackIcon></ArrowBackIcon>
                        </div>
                        <div className="back-text">Back</div>
                    </div>
                    <div className="next" onClick={() => this.state.currentPage === 0 ? this.setState({ currentPage: 1 }) : this.goDownButton()}>
                        <div className="next-text" >{this.state.currentPage === 0 ? 'Next' : 'I Got It! '}</div>
                        <div className="next-icon"  >
                            <svg width="40" height="40" className="circle-svg">
                                <circle className="outer" cx="20" cy="20" r="15" />
                            </svg>
                            {this.state.currentPage === 0 ? 
                                <ArrowForwardIcon></ArrowForwardIcon> : 
                                <ArrowDownwardIcon></ArrowDownwardIcon>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    toggleGenre = (genre) => {
        if (this.state.clubsActiveGenres.indexOf(genre) === -1) {
            let newActiveGenres = JSON.parse(JSON.stringify(this.state.clubsActiveGenres));
            newActiveGenres.push(genre);
            this.setState({clubsActiveGenres: newActiveGenres});
        } else {
            let newActiveGenres = JSON.parse(JSON.stringify(this.state.clubsActiveGenres));
            newActiveGenres.splice(this.state.clubsActiveGenres.indexOf(genre), 1);
            this.setState({clubsActiveGenres: newActiveGenres});
        }
    }

    goDownButton = () => {
        document.getElementById('city-clubs-filters-container').scrollIntoView({behavior: 'smooth'});
    }

}

export default CityClubHelp;