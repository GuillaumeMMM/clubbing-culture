import React, { Component } from 'react';
import GenreSideInfos from './GenreSideInfos';
import * as d3 from 'd3';
import { inject, observer } from "mobx-react";

@observer
class GenreTree extends Component {

    state = {
        sideGenreOpen: true
    }

    render() {
        return (
            <div className="genre-tree-container">
                <div className="genre-tree">
                    {this.props.genresDetails.map((genre, genreIndex) =>
                        <div className="genre-tree-element" key={genreIndex} >
                            <div 
                                className={"genre-tree-parent " + (this.isActiveGenreInTree(genre.name) ? 'active selected' : '')}
                                onClick={() => {
                                    this.props.DataStore.setActiveGenre(genre.name);
                                    this.setState({sideGenreOpen: true});
                                }} 
                                style={this.isActiveGenreInTree(genre.name) ? {background: 'linear-gradient(45deg,' + this.props.DataStore.getColorFromGenre(genre.name.toLowerCase().split(' ').join('_')).col1 + ', ' + this.props.DataStore.getColorFromGenre(genre.name.toLowerCase().split(' ').join('_')).col2 + ' 200%)', color: this.props.DataStore.getColorFromGenre(genre.name.toLowerCase().split(' ').join('_')).col3} : null}
                                id={genreIndex}
                            >{genre.name}</div>
                            {genre.subGenres && genre.subGenres.length > 0 ?
                                <div className="genre-tree-children">{genre.subGenres.map((subGenre, subGenreIndex) =>
                                    <div 
                                        className={"genre-tree-child " + (this.isActiveGenreInTree(subGenre.name) ? 'active' : '') + (this.isActiveGenreInTree(subGenre.name) && (!this.isActiveGenreInTree(subGenre.name)) ? 'selected' : '')} 
                                        key={subGenreIndex} 
                                        onClick={() => {
                                            this.props.setActiveGenre(subGenre.name);
                                            this.setState({sideGenreOpen: true});
                                        }} 
                                        style={this.isActiveGenreInTree(genre.name) || this.isActiveGenreInTree(subGenre.name) ? {background: 'linear-gradient(45deg,' + this.props.DataStore.getColorFromGenre(subGenre.name.toLowerCase().split(' ').join('_')).col1 + ', ' + this.props.DataStore.getColorFromGenre(subGenre.name.toLowerCase().split(' ').join('_')).col2 + ' 200%)', color: this.props.DataStore.getColorFromGenre(subGenre.name.toLowerCase().split(' ').join('_')).col3} : null}
                                        id={genreIndex + '-' + subGenreIndex}
                                    >{subGenre.name}</div>
                                )}</div>
                                : null}
                        </div>
                    )}
                </div>
                {this.state.sideGenreOpen ? 
                    <GenreSideInfos
                        id={12134}
                        setActiveGenre={() => this.setState({sideGenreOpen: false})}
                        name={this.props.DataStore.currentGenreInTree}
                        details={this.props.DataStore.getGenreDetailsFromName(this.props.DataStore.currentGenreInTree)}
                    ></GenreSideInfos>
                    : null
                }
                {/* <GenreDetails getActiveGenre={this.getActiveGenre}></GenreDetails> */}
            </div>
        );
    }

    componentDidMount() {
        const genresElements = document.querySelectorAll('.genre-tree-element');
        if (genresElements && genresElements.length > 0) {
            for (let i = 0; i < genresElements.length; i++) {
                const subGenresElements = genresElements[i].querySelectorAll('.genre-tree-child');
                if (subGenresElements && subGenresElements.length > 0) {

                    let svg = d3.select(genresElements[i])
                        .append('svg').attr('width', genresElements[i].clientWidth).attr('height', genresElements[i].clientHeight)
                        .attr('id', 'svg-' + i)
                        .style('position', 'absolute')
                        .style('left', 0)
                        .style('top', 0);
            
                    const parentBoundingBox = genresElements[i].querySelector('.genre-tree-parent').getBoundingClientRect();
                    const childrenElements = genresElements[i].querySelectorAll('.genre-tree-child');
                    const firstChildBoundingBox = childrenElements[0].getBoundingClientRect();
                    const lastChildBoundingBox = childrenElements[childrenElements.length - 1].getBoundingClientRect();
                    
                    //  DRAW LINE FROM TOP GENRE TO MIDDLE -> FIRST CHILD
                    svg.append('rect').attr('x', parentBoundingBox.width + parentBoundingBox.x).attr('y', parentBoundingBox.height / 2).attr('width', (firstChildBoundingBox.x - parentBoundingBox.width - parentBoundingBox.x) / 2).attr('height', 4).attr('class', 'horizontal-rect-to-middle-' + i).attr('fill',d => {
                        return this.isActiveGenreInTree(this.props.genresDetails[i].name) ? this.props.DataStore.getColorFromGenre(this.props.genresDetails[i].name.toLowerCase().split(' ').join('_')).col1 : 'white'
                    });

                    //  DRAW VERTICAL
                    svg.append('rect').attr('x', parentBoundingBox.width + parentBoundingBox.x + (firstChildBoundingBox.x - parentBoundingBox.x - parentBoundingBox.width) / 2).attr('y', parentBoundingBox.height / 2).attr('width', 4).attr('height', lastChildBoundingBox.y - parentBoundingBox.y).attr('class', 'vertical-rect-' + i)
                    .attr('fill', d => {
                        return this.isActiveGenreInTree(this.props.genresDetails[i].name) ? this.props.DataStore.getColorFromGenre(this.props.genresDetails[i].name.toLowerCase().split(' ').join('_')).col1 : 'white'
                    });

                    //  DRAW OTHER HORIZONTAL
                    for (let j = 0; j < subGenresElements.length; j++) {
                        svg.append('rect')
                            .attr('x', parentBoundingBox.width + parentBoundingBox.x + (firstChildBoundingBox.x - parentBoundingBox.width - parentBoundingBox.x) / 2)
                            .attr('y', parentBoundingBox.height / 2 + subGenresElements[j].getBoundingClientRect().y - parentBoundingBox.y)
                            .attr('width', (firstChildBoundingBox.x - parentBoundingBox.width - parentBoundingBox.x) / 2)
                            .attr('height', 4)
                            .attr('class', 'horizontal-rect-' + i + '-' + j)
                            .attr('fill', d => {
                                let colLeft = 'white';
                                let colRight = 'white';
                                if (this.isActiveGenreInTree(this.props.genresDetails[i].name) && this.isActiveGenreInTree(this.props.genresDetails[i].subGenres[j].name)) {
                                    colLeft = this.props.DataStore.getColorFromGenre(this.props.genresDetails[i].name.toLowerCase().split(' ').join('_')).col1;
                                    colRight = this.props.DataStore.getColorFromGenre(this.props.genresDetails[i].subGenres[j].name.toLowerCase().split(' ').join('_')).col1;
                                }
                                if (!this.isActiveGenreInTree(this.props.genresDetails[i].name) && this.isActiveGenreInTree(this.props.genresDetails[i].subGenres[j].name)) {
                                    colRight = this.props.DataStore.getColorFromGenre(this.props.genresDetails[i].subGenres[j].name.toLowerCase().split(' ').join('_')).col1;
                                }
                                this.createLinearGradient(svg, [colLeft, colRight], i + '-' + j);
                                
                                return 'url(#linearGradient-' + i + '-' + j + ')';
                            });
                    }
                }
            }
        }

        document.querySelector('.genre-side-infos-container').style.right = '0px';
    }

    componentDidUpdate(prevProps) {
        console.log({prevProps}, this.props)
        this.updateLinks();
    }

    updateLinks = () => {

    const genresElements = document.querySelectorAll('.genre-tree-element');
        if (genresElements && genresElements.length > 0) {
            for (let i = 0; i < genresElements.length; i++) {
                const subGenresElements = genresElements[i].querySelectorAll('.genre-tree-child');
                if (subGenresElements && subGenresElements.length > 0) {
            
                    const parentBoundingBox = genresElements[i].querySelector('.genre-tree-parent').getBoundingClientRect();
                    const childrenElements = genresElements[i].querySelectorAll('.genre-tree-child');
                    const firstChildBoundingBox = childrenElements[0].getBoundingClientRect();
                    const lastChildBoundingBox = childrenElements[childrenElements.length - 1].getBoundingClientRect();
                    
                    const svg = d3.select('#svg-' + i);

                    //  UPDATE LINE FROM TOP GENRE TO MIDDLE -> FIRST CHILD
                    svg.select('.horizontal-rect-to-middle-' + i).transition().duration(400).attr('fill',d => {
                        return this.isActiveGenreInTree(this.props.genresDetails[i].name) ? this.props.DataStore.getColorFromGenre(this.props.genresDetails[i].name.toLowerCase().split(' ').join('_')).col1 : 'white'
                    });

                    //  UPDATE VERTICAL
                    svg.select('.vertical-rect-' + i).transition().duration(400).attr('fill', d => {
                        return this.isActiveGenreInTree(this.props.genresDetails[i].name) ? this.props.DataStore.getColorFromGenre(this.props.genresDetails[i].name.toLowerCase().split(' ').join('_')).col1 : 'white'
                    });

                    //  DRAW OTHER HORIZONTAL
                    for (let j = 0; j < subGenresElements.length; j++) {
                        svg.select('.horizontal-rect-' + i + '-' + j)
                        .transition().duration(400).attr('fill', d => {
                                let colLeft = 'white';
                                let colRight = 'white';
                                if (this.isActiveGenreInTree(this.props.genresDetails[i].name) && this.isActiveGenreInTree(this.props.genresDetails[i].subGenres[j].name)) {
                                    colLeft = this.props.DataStore.getColorFromGenre(this.props.genresDetails[i].name.toLowerCase().split(' ').join('_')).col1;
                                    colRight = this.props.DataStore.getColorFromGenre(this.props.genresDetails[i].subGenres[j].name.toLowerCase().split(' ').join('_')).col1;
                                }
                                if (!this.isActiveGenreInTree(this.props.genresDetails[i].name) && this.isActiveGenreInTree(this.props.genresDetails[i].subGenres[j].name)) {
                                    colRight = this.props.DataStore.getColorFromGenre(this.props.genresDetails[i].subGenres[j].name.toLowerCase().split(' ').join('_')).col1;
                                }

                                this.updateLinearGradient(i + '-' + j, [colLeft, colRight]);
                                
                                return 'url(#linearGradient-' + i + '-' + j + ')';
                            });
                    }
                }
            }
        }
    }

    // getActiveGenre = () => {
    //     let activeGenre = {};
    //     this.props.genresDetails.forEach((genre, i) => {
    //         if (genre.active) {
    //             activeGenre = genre;
    //         } else {
    //             if (genre.subGenres && genre.subGenres.length > 0) {
    //                 genre.subGenres.forEach(subGenre => {
    //                     if (subGenre.active) {
    //                         activeGenre = subGenre;
    //                     }
    //                 });
    //             }
    //         }
    //     });
    //     return activeGenre;
    // }

    isActiveGenreInTree = (genreName) => {
        return this.props.DataStore.activeGenresInTree.indexOf(genreName) !== -1;
    }

    createLinearGradient = (svg, colors, id) => {
        var svgDefs = svg.append('defs');
        var mainGradient = svgDefs.append('linearGradient')
            .attr('id', 'linearGradient-' + id);
        for (let k = 0; k < colors.length; k++) {
            mainGradient.append('stop')
            .attr('offset', k / (colors.length - 1))
            .attr('stop-color', colors[k]);
        }
    }

    updateLinearGradient = (id, colors) => {
        d3.select('#linearGradient-' + id).selectAll('stop').transition().duration(400)
            .attr('offset', (d, k) => k / (colors.length - 1))
            .attr('stop-color', (d, k) => colors[k]);
    }
}

export default GenreTree;