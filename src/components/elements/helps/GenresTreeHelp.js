import React, { Component } from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import GenreMap from '../GenreMap';
import * as d3 from 'd3';
// import backImg from '../../../assets/images/globalmaphelpback.png';

class GenresTreeHelp extends Component {

    state = {
        currentPage: 0,
    }

    render() {
        return (
            <div className="genres-tree-help-container">
                <div className="genres-tree-help-header">
                    <h2 className="title">How to Read ?</h2>
                </div>
                <div className="genres-tree-help-pages">
                        {(this.state.currentPage + 1) + ' / 2'}
                </div>
                <div className="genres-tree-help-content">
                    <div className="left-part" style={{ left: this.state.currentPage === 0 ? '0px' : '-2000px', opacity: this.state.currentPage === 0 ? 1 : 0 }}>
                        <div className="left-svg-container" id="genre-tree-left-help-svg-container" style={{ width: '300px', height: '170px' }} onClick={() => this.setState({ currentPage: 1 })}></div>
                        <p>Each music genre is represented with a circle matching the color of the genre.</p>
                        <p>Around the principal genres are gravitating the circles of subgenres. Click or tap a circle to get details about this genre.</p>
                    </div>
                    <div className="right-part" style={{ left: this.state.currentPage === 1 ? '0px' : '-2000px', opacity: this.state.currentPage === 1 ? 1 : 0 }}>
                        <ArrowDownwardIcon></ArrowDownwardIcon>
                        <p>If you scroll down to the bottom of the page, you will see how the selected genre is spread in the European cities.</p>
                        {/* <div className="right-svg-container" id="genre-tree-right-help-svg-container" style={{ width: '100%', height: '60%' }}></div> */}
                        <div className="map-container">
                            <GenreMap
                                id='genre-help-map-2'
                                dimensions={{width: '150px', height:'150px'}}
                                DataStore={this.props.DataStore}
                                initialPosition = {[51.509865, -0.118092]}
                                clubs = {this.props.DataStore.citiesGenresSumup[1].clubsData}
                                data = {this.props.DataStore.clubsStats[1].stats}
                                limits = {this.props.DataStore.cityLimits[1].limits}
                                sumup = {this.props.DataStore.citiesGenresSumup[1].sumupData}
                                genres={['Disco']}
                                zoomLevel={10.5}
                            ></GenreMap>
                            <GenreMap
                                id='genre-help-map-1'
                                dimensions={{width: '150px', height:'150px'}}
                                DataStore={this.props.DataStore}
                                initialPosition = {[48.8606697, 2.3385351]}
                                clubs = {this.props.DataStore.citiesGenresSumup[0].clubsData}
                                data = {this.props.DataStore.clubsStats[0].stats}
                                limits = {this.props.DataStore.cityLimits[0].limits}
                                sumup = {this.props.DataStore.citiesGenresSumup[0].sumupData}
                                genres={['Disco']}
                                zoomLevel={11.2}
                            ></GenreMap>
                        </div>
                    </div>
                </div>
                <div className="genres-tree-help-footer">
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

    componentDidMount() {
        const widthL = document.getElementById("genre-tree-left-help-svg-container").clientWidth;
        const heightL = document.getElementById("genre-tree-left-help-svg-container").clientHeight;

        // const widthR = document.getElementById("genre-tree-right-help-svg-container").clientWidth;
        // const heightR = document.getElementById("genre-tree-right-help-svg-container").clientHeight;
        this.setState({ widthL: widthL, heightL: heightL}, this.initGraph);
    }

    initGraph = () => {
        const { widthL, heightL, widthR, heightR } = this.state;

        const svgL = d3.select("#genre-tree-left-help-svg-container")
            .append('svg')
            .attr('viewBox', () => {
                return widthL < heightL ? '0 0 100 ' + (100 * heightL / widthL) : '0 0 ' + (100 * widthL / heightL) + ' 100';
            })
            .attr('class', 'svg-content');

        const mainGroupL = svgL.append('g');

        let color = '#FFBF00';

        const mainGenreGroup = mainGroupL.append('g');

        mainGenreGroup.append('circle').attr('class', 'main-circle')
            .attr('cx', this.relativeWidthL(50))
            .attr('cy', this.relativeHeightL(50))
            .attr('r', this.relativeHeightL(30))
            .attr('fill', color)
            .style('cursor', 'pointer')
            // .on('mouseover', () => {
            //     if (this.props.genre.name !== this.props.DataStore.currentGenreInTree) {
            //         this.appendLegendTextMain(this.state.legendGroup);
            //     }
            // })
            // .on('mouseout', () => {
            //     if (this.props.genre.name !== this.props.DataStore.currentGenreInTree) {
            //         this.removeLegendTextMain(this.state.legendGroup);
            //     }
            // });

        const legendGroup = mainGroupL.append('g').attr('class', 'legend-group');

        legendGroup.append('text')
            .attr('x', this.relativeWidthL(50))
            .attr('y', this.relativeHeightL(50))
            .attr('fill', 'white')
            .text('DISCO')
            .style('text-anchor', 'middle')
            .style('dominant-baseline', 'middle')
            .style('font-size', '7px')
            .style('pointer-events', 'none');

            const getPathDataTopHelp = () => {
                var r = this.relativeHeightL(30) * 1.1;
                return 'm' + (this.relativeWidthL(50) - r) + ',' + this.relativeHeightL(50) + ' ' +
                'a' + r + ',' + r + ' 0 0 1 ' + (2*r) + ',0';
            }
    
            const getPathDataBottomHelp = () => {
                var r = this.relativeHeightL(30) * 1.1;
                return 'm' + (this.relativeWidthL(50) - r) + ',' + this.relativeHeightL(50) + ' ' +
                'a' + r + ',' + r + ' 0 0 0 ' + (2*r) + ',0';
            }
    
            const textAroundMainCircle = legendGroup.append('g').attr('class', 'main-circle-text-around');
    
            textAroundMainCircle.append('defs')
            .append('path')
            .attr('d', getPathDataTopHelp)
            .attr('id', 'help-curvedTextPathTop');
    
            textAroundMainCircle.append('defs')
            .append('path')
            .attr('d', getPathDataBottomHelp)
            .attr('id', 'help-curvedTextPathBottom');
    
            textAroundMainCircle.append('text')
            .append('textPath')
            .attr('startOffset', '50%')
            .attr('xlink:href', '#help-curvedTextPathTop')
            .text('DISCO - DISCO - DISCO')
            .attr('fill', 'white')
            .style('text-anchor', 'middle')
            .style('dominant-baseline', 'baseline')
            .style('font-size', '7px')
            .attr('opacity', 0).transition().duration(300).attr('opacity', 1);
    
            textAroundMainCircle.append('text')
            .append('textPath')
            .attr('startOffset', '50%')
            .attr('xlink:href', '#help-curvedTextPathBottom')
            .text('DISCO - DISCO - DISCO')
            .attr('fill', 'white')
            .style('text-anchor', 'middle')
            .style('dominant-baseline', 'hanging')
            .style('font-size', '7px')
            .attr('opacity', 0).transition().duration(300).attr('opacity', 1);
    
            textAroundMainCircle.append('circle')
            .attr('cx', this.relativeWidthL(50) - this.relativeHeightL(30) - 5)
            .attr('cy', this.relativeHeightL(50))
            .attr('r', 2).attr('fill', 'white')
            .attr('opacity', 0).transition().duration(300).attr('opacity', 1);
            textAroundMainCircle.append('circle')
            .attr('cx', this.relativeWidthL(50) + this.relativeHeightL(30) + 5)
            .attr('cy', this.relativeHeightL(50))
            .attr('r', 2).attr('fill', 'white')
            .attr('opacity', 0).transition().duration(300).attr('opacity', 1);

        this.addGlowEffect(mainGroupL, '3')


        // const svgR = d3.select("#genre-tree-right-help-svg-container")
        //     .append('svg')
        //     .attr('viewBox', () => {
        //         return widthR < heightR ? '0 0 100 ' + (100 * heightR / widthR) : '0 0 ' + (100 * widthR / heightR) + ' 100';
        //     })
        //     .attr('class', 'svg-content');

        // const mainGroupR = svgR.append('g');


        this.setState({ mainGroupL: mainGroupL})
    }

    //  Takes a % ang returns the right height
    relativeHeightL = (height) => {
        return this.state.widthL < this.state.heightL ? height * this.state.heightL / this.state.widthL : height;
    }

    //  Takes a % ang returns the right width
    relativeWidthL = (width) => {
        return this.state.widthL < this.state.heightL ? width : width * this.state.widthL / this.state.heightL;
    }

    //  Takes a % ang returns the right height
    relativeHeightR = (height) => {
        return this.state.widthR < this.state.heightR ? height * this.state.heightR / this.state.widthR : height;
    }

    //  Takes a % ang returns the right width
    relativeWidthR = (width) => {
        return this.state.widthR < this.state.heightR ? width : width * this.state.widthR / this.state.heightR;
    }

    addGlowEffect = (container, intensity) => {
        //Container for the gradients
        var defs = container.append("defs");

        var filter = defs.append("filter").attr('x', -5).attr('width', 10).attr('y', -5).attr('height', 10)
            .attr("id", "glow-help-left-circle");

        filter.append("feGaussianBlur")
            .attr("class", "blur")
            .attr("stdDeviation", intensity)
            .attr("result", "coloredBlur");

        var feMerge = filter.append("feMerge");
        feMerge.append("feMergeNode")
            .attr("in", "coloredBlur");
        feMerge.append("feMergeNode")
            .attr("in", "SourceGraphic");

        container.style('filter', 'url(#glow-help-left-circle)');
    }

    createRadialGradient = (svg, colors, id) => {
        var svgDefs = svg.append('defs');
        var mainGradient = svgDefs.append('radialGradient')
            .attr('id', 'radialGradient-help-' + id);
        mainGradient.append('stop')
            .attr('offset', '95%')
            .attr('stop-color', colors[0]);

        mainGradient.append('stop')
            .attr('offset', '200%')
            .attr('stop-color', colors[0])
            .attr('stop-opacity', 1);
    }

    addGooeyEffect = (container, intensity) => {
        const defs = container.append('defs');
        const filter = defs.append('filter').attr('id', 'gooey-help-global-map');
        filter.append('feGaussianBlur')
            .attr('in', 'SourceGraphic')
            .attr('class', 'gooey-blur')
            .attr('stdDeviation', intensity)
            .attr('result', 'blur');
        filter.append('feColorMatrix')
            .attr('in', 'blur')
            .attr('mode', 'matrix')
            .attr('values', '1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7')
            .attr('result', 'gooey');

        container.style("filter", "url(#gooey-help-global-map)");
    }


    goDownButton = () => {
        document.getElementById('genre-trees-container').scrollIntoView({behavior: 'smooth', block: 'start',
        inline: 'nearest'});
    }

}

export default GenresTreeHelp;