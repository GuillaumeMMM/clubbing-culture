import React, { Component } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    select: {
        backgroundColor: 'white',
        color: 'black',
        margin: '10px'
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

// class CityExplorationFilters extends Component {
    const classes = useStyles();
        return (
            <div className="city-exploration-filters-container">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur iaculis lorem id massa accumsan blandit. Sed varius sit amet ipsum et ullamcorper. Sed vehicula diam nec nulla tincidunt, id interdum sem consequat.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur iaculis lorem id massa accumsan blandit. Sed varius sit amet ipsum et ullamcorper. Sed vehicula diam nec nulla tincidunt, id interdum sem consequat.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur iaculis lorem id massa accumsan blandit. {props.genres.map((genre, i) => 
                    <span 
                        key={i}
                        style={{backgroundColor: props.DataStore.getColorFromGenre(formatName(genre).toLowerCase()).col1}}
                        // className={'genre-name ' + (props.highlightedGenre === genre ? 'active' : '')}
                        // onMouseOver={props.updateHiglightedGenre.bind(this, genre)}
                        // onMouseOut={props.updateHiglightedGenre.bind(this, '')}
                    >{genre}</span>
                )} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur iaculis lorem id massa accumsan blandit.</p>
                <div className="form-container">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur iaculis lorem id massa accumsan blandit.</p>
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
                </div>
            </div>
        );
}

// export default CityExplorationFilters;