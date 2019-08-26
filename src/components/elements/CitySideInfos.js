import React, { Component } from 'react';
import GlobalMapStatsBubbles from './GlobalMapStatsBubbles';
import ClearIcon from '@material-ui/icons/Clear';

class CitySideInfos extends Component {
    render() {
        return (
            <div className="city-side-infos-container">
                <h2 className="city-side-infos-title">{this.props.city.name}
                    <div className="quit-icon" onClick={this.props.resetActiveCity}>
                        <svg width="40" height="40" className="circle-svg">
                            <circle className="outer" cx="20" cy="20" r="15"/>
                        </svg>
                        <ClearIcon></ClearIcon>
                    </div>
                </h2>
                <p className="city-side-infos-subtitle">{this.props.DataStore.citiesInfos.filter(city => city.name === this.props.city.name)[0].globalMapSubtitle}</p>
                <GlobalMapStatsBubbles
                    id={this.props.id} 
                    data={this.props.data} 
                    getColorFromGenre={this.props.getColorFromGenre} 
                    total={this.props.total}
                    setActiveGenre={this.props.setActiveGenre}
                ></GlobalMapStatsBubbles>
                <div className="city-side-infos-content">
                {this.props.DataStore.citiesInfos.filter(city => city.name === this.props.city.name)[0].globalMapText}
                </div>
            </div>
        );
    }

    componentDidMount() {
        document.querySelector('.city-side-infos-container').style.right = 0;
    }
}

export default CitySideInfos;