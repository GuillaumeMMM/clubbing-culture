import React, { Component } from 'react';
import GenreTreeGooey from './GenreTreeGooey';
import GenreSideInfosGooey from './GenreSideInfosGooey';

import BrowserDetection from 'react-browser-detection';

const browserGenreTreeGooeyHandler = (idTmp, genreTmp, DataStoreTmp, handleOpenSideInfoTmp) => {

    return {
        firefox: () => <GenreTreeGooey id={idTmp} genre = {genreTmp} DataStore={DataStoreTmp} 
handleOpenSideInfo={handleOpenSideInfoTmp} animations='off'></GenreTreeGooey>,
        ie: () => <GenreTreeGooey id={idTmp} genre = {genreTmp} DataStore={DataStoreTmp} 
        handleOpenSideInfo={handleOpenSideInfoTmp} animations='off'></GenreTreeGooey>,
        edge: () => <GenreTreeGooey id={idTmp} genre = {genreTmp} DataStore={DataStoreTmp} 
        handleOpenSideInfo={handleOpenSideInfoTmp} animations='off'></GenreTreeGooey>,
        'android-chrome': () => <GenreTreeGooey id={idTmp} genre = {genreTmp} DataStore={DataStoreTmp} 
        handleOpenSideInfo={handleOpenSideInfoTmp} animations='off'></GenreTreeGooey>,
        default: (browser) => <GenreTreeGooey id={idTmp} genre = {genreTmp} DataStore={DataStoreTmp} 
        handleOpenSideInfo={handleOpenSideInfoTmp} animations='on'></GenreTreeGooey>,
    }
}


class GenreTrees extends Component {

    state = {
        sideGenreOpen: false,
    }

    render() {
        return (
            <div className="genre-trees-container" id="genre-trees-container">
                {this.props.genresDetails.map((genre, i) => <div className={'genre-tree-gooey genre-tree-gooey-' + i} key={i}>
                    <BrowserDetection>{ browserGenreTreeGooeyHandler(i, genre, this.props.DataStore, this.handleOpenSideInfo) }</BrowserDetection></div>)}
                {this.state.sideGenreOpen ? 
                    <GenreSideInfosGooey
                        id={12134}
                        DataStore={this.props.DataStore}
                        setActiveGenre={() => this.setState({sideGenreOpen: false})}
                        name={this.props.DataStore.currentGenreInTree}
                        details={this.props.DataStore.getGenreDetailsFromName(this.props.DataStore.currentGenreInTree)}
                    ></GenreSideInfosGooey>
                    : null
                }
            </div>
        );
    }

    handleOpenSideInfo = (shouldopen) => {
        if (shouldopen) {
            this.setState({sideGenreOpen: true});
        } else {
            this.setState({sideGenreOpen: false});
        }
    }
}

export default GenreTrees;