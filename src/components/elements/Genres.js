import React, { Component } from 'react';
import RegularButton from './RegularButton';
import GenreTree from './GenreTree';
import GenreMaps from './GenreMaps';
import GenreTreeGooey from './GenreTreeGooey';
import GenreTrees from './GenreTrees';
import GenresTreeHelp from './helps/GenresTreeHelp';
import { inject, observer } from "mobx-react";
import Separator from './Separator';
import Back from './Back';
import Footer from './Footer';
import Loader from './Loader';

@observer
class Genres extends Component {
    render() {
        // console.log(this.props.DataStore.genresDetails)
        return (
            <div className="genres-container" id="genres-container">
                <div className="genres-header">
                    <h1 className="genres-header-title">
                        Genres
                    </h1>
                    <p className="genres-header-text">
                        
                    </p>
                </div>
                <div className="genres-content">
                    {this.props.HelpStore.genresTreeHelpOpen ? 
                            <GenresTreeHelp HelpStore={this.props.HelpStore} DataStore={this.props.DataStore}></GenresTreeHelp> : null
                    }
                    <Separator></Separator>
                    {/* <GenreTree 
                        DataStore={this.props.DataStore}
                        genresDetails={this.props.DataStore.genresDetails}
                        setActiveGenre={this.props.DataStore.setActiveGenre}
                        currentGenreInTree={this.props.DataStore.currentGenreInTree}
                        isActiveGenreInTree={this.props.DataStore.isActiveGenreInTree}
                    ></GenreTree> */}
                    {/* <GenreTreeGooey 
                        DataStore={this.props.DataStore}
                        genresDetails={this.props.DataStore.genresDetails}
                        setActiveGenre={this.props.DataStore.setActiveGenre}
                        currentGenreInTree={this.props.DataStore.currentGenreInTree}
                        isActiveGenreInTree={this.props.DataStore.isActiveGenreInTree}
                    ></GenreTreeGooey> */}
                    <GenreTrees
                        DataStore={this.props.DataStore}
                        genresDetails={this.props.DataStore.genresDetails}
                        setActiveGenre={this.props.DataStore.setActiveGenre}
                        currentGenreInTree={this.props.DataStore.currentGenreInTree}
                        isActiveGenreInTree={this.props.DataStore.isActiveGenreInTree}
                    ></GenreTrees>
                    <GenreMaps
                        DataStore={this.props.DataStore}
                        HelpStore={this.props.HelpStore}
                    ></GenreMaps>
                    {this.props.HelpStore.cityLoading ? <Loader ></Loader> : null}
                </div>
                {/* <Back text={'Back to top'} direction='top' elmId='home-container'></Back> */}
                {/* <RegularButton text="Click Me!" id="genres-1" colors={['#EC148C', '#ED1258', '#E512ED']}></RegularButton>
                <RegularButton text="Click Me 2!" id="genres-2" colors={['#093F9B', '#096D9B', '#7575B7']}></RegularButton> */}
                <Footer></Footer>
            </div>
        );
    }

    componentDidMount() {
        this.props.setLoading(false);
    }
}

export default Genres;