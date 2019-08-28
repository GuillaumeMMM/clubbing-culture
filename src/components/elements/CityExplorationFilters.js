import React, { Component } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const useStyles = makeStyles(theme => ({
    select: {
        backgroundColor: 'white',
        color: 'black',
        margin: '10px',
        padding: '0 5px'
    },
    item: {
        marginTop: '0px',
        marginBottom: '0px',
    }
  }));

export default function CityExplorationFilters(props) {
    const formatName = (name) => {
        return name.split("'").join('_').split(' ').join('_').split('/').join('').split(':').join('').split('&').join('');
    }

    const goDownButton = () => {
        document.getElementById('scroll-title-target').scrollIntoView({behavior: 'smooth'});
    }
// class CityExplorationFilters extends Component {
    const classes = useStyles();
        return (
            <div className="city-exploration-filters-container">
                <p>Here you are free to explore the map of the clubs of {props.cityName}. The current displayed genres are : </p> 
                <div className="displayed-genres">
                    {props.genres.map((genre, i) => 
                        <span 
                            key={i}
                            className="genre"
                            style={{backgroundColor: props.DataStore.getColorFromGenre(formatName(genre).toLowerCase()).col1}}
                            // className={'genre-name ' + (props.highlightedGenre === genre ? 'active' : '')}
                            // onMouseOver={props.updateHiglightedGenre.bind(this, genre)}
                            // onMouseOut={props.updateHiglightedGenre.bind(this, '')}
                        >{genre}</span>
                    )} 
                </div>
                <p>Tap or hover on the map to better see each genre and to see the clubs names.</p>
                <p>You can also add or remove genres here : </p>
                <div className="form-container">
                    <FormControl>
                        <Select
                        multiple
                        value={props.genres}
                        onChange={props.handleAvaliableGenresInMap}
                        input={<Input id="select-multiple" />}
                        renderValue={() => 'Add Genres'}
                        className={classes.select}
                        >
                        <MenuItem disabled value="" className={classes.item}>
                            <em>Genres</em>
                        </MenuItem>
                        {props.avaliableGenres.map((genre, i) => (
                            <MenuItem className={classes.item} key={i} value={genre}>
                            {genre}
                            </MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                    <div className="clubs-link" onClick={() => goDownButton()}>
                        <div className="link-content">
                            <div className="clubs-text" >Explore the clubs!</div>
                            <div className="clubs-icon"  >
                                <svg width="40" height="40" className="circle-svg">
                                    <circle className="outer" cx="20" cy="20" r="15" />
                                </svg>
                                <ArrowDownwardIcon></ArrowDownwardIcon>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
}

// export default CityExplorationFilters;