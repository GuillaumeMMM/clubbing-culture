import React, { Component } from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import * as d3 from 'd3';
// import backImg from '../../../assets/images/globalmaphelpback.png';

class GlobalMapHelp extends Component {

    state = {
        currentPage: 0,
    }

    render() {
        return (
            <div className="global-map-help-container">
                <div className="quit-icon" onClick={() => this.props.HelpStore.handleGlobalMapQuitHelp()}>
                    <svg width="40" height="40" className="circle-svg">
                        <circle className="outer" cx="20" cy="20" r="15" />
                    </svg>
                    <ClearIcon></ClearIcon>
                </div>
                <div className="global-map-help-pages">
                    {(this.state.currentPage + 1) + ' / 2'}
                </div>
                <div className="global-map-help-header">
                    <h2 className="title">How to Read ?</h2>
                </div>
                <div className="global-map-help-content">
                    <div className="left-part" style={{left: this.state.currentPage === 0 ? '0px' : '-2000px', opacity: this.state.currentPage === 0 ? 1 : 0}}>
                        <div onClick={() => this.setState({currentPage: 1})} className="left-svg-container" id="left-help-svg-container" style={{ width: '100px', height: '100px' }}></div>
                        <p>On the map, each city with clubbing data available has been represented by a waving circle.</p>
                        <p>Click or tap on the city you want to explore.</p>
                    </div>
                    <div className="right-part" style={{left: this.state.currentPage === 1 ? '0px' : '-2000px', opacity: this.state.currentPage === 1 ? 1 : 0}}>
                        <p>Each color is binded to a music genre (ex: Yellow for Disco or Pink for House). After chosing a city you will see its music genres summary.</p>
                        <div className="right-svg-container" id="right-help-svg-container" style={{ width: '100%', height: '60%' }}></div>
                        <p>The central spot is the most popular genre listened to in the city. The surrounding spots are the 5 next most popular genres. Click or tap a genre to have details about it.</p>
                    </div>
                </div>
                <div className="global-map-help-footer" >
                    <div className="back" style={{opacity: this.state.currentPage === 1 ? 1 : 0, pointerEvents: this.state.currentPage === 1 ? 'all' : 'none'}} onClick={() => this.state.currentPage === 1 ? this.setState({ currentPage: 0 }) : null}>
                        <div className="back-icon" >
                            <svg width="40" height="40" className="circle-svg">
                                <circle className="outer" cx="20" cy="20" r="15" />
                            </svg>
                            <ArrowBackIcon></ArrowBackIcon>
                        </div>
                        <div className="back-text">{'Back'}</div>
                    </div>
                    <div className="next" onClick={() => this.state.currentPage === 0 ? this.setState({currentPage: 1}) : this.props.HelpStore.handleGlobalMapQuitHelp()}>
                        <div className="next-text">{this.state.currentPage === 1 ? 'I Got It' : 'Next'}</div>
                        <div className="next-icon" >
                            <svg width="40" height="40" className="circle-svg">
                                <circle className="outer" cx="20" cy="20" r="15" />
                            </svg>
                            <ArrowForwardIcon></ArrowForwardIcon>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        const widthL = document.getElementById("left-help-svg-container").clientWidth;
        const heightL = document.getElementById("left-help-svg-container").clientHeight;

        const widthR = document.getElementById("right-help-svg-container").clientWidth;
        const heightR = document.getElementById("right-help-svg-container").clientHeight;
        this.setState({ widthL: widthL, heightL: heightL, widthR: widthR, heightR: heightR }, this.initGraph);
    }

    initGraph = () => {
        const { widthL, heightL, widthR, heightR } = this.state;

        const svgL = d3.select("#left-help-svg-container")
            .append('svg')
            .attr('viewBox', () => {
                return widthL < heightL ? '0 0 100 ' + (100 * heightL / widthL) : '0 0 ' + (100 * widthL / heightL) + ' 100';
            })
            .attr('class', 'svg-content');

        const mainGroupL = svgL.append('g').attr('transform', 'translate(' + this.relativeWidthL(50) + ', ' + this.relativeHeightL(50) + ')');

        let color = '#FFBF00';


        const waveCircle = mainGroupL.append('circle')
            .attr('cx', 0)
            .attr('class', 'wave-circle')
            .style('pointer-events', 'none')
            .attr('cy', 0)
            .attr('r', 10)
            .attr('fill', 'none')
            .attr('stroke-width', 2)
            .attr('stroke', color);

        mainGroupL.append('circle')
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('r', 12)
            .attr('stroke', 'transparent')
            .attr('stroke-width', 50)
            // .attr('clip-path', 'url(#clipPath-city)')
            .attr('fill', color).style('cursor', 'pointer');

        mainGroupL.append('circle').attr('class', 'around-circle')
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('r', 12)
            .attr('stroke', 'white')
            .attr('stroke-width', 2)
            // .attr('clip-path', 'url(#clipPath-city)')
            .attr('fill', 'none');

        const animateWaveCircle = function (element) {
            element.transition().duration(1100).ease(d3.easePolyOut).attr('r', 30).attr('opacity', 0).on('end', function () {
                element.attr('r', 10).attr('opacity', 1);
                animateWaveCircle(element);
            });
        }

        animateWaveCircle(waveCircle);

        this.addGlowEffect(mainGroupL, '10');





        const svgR = d3.select("#right-help-svg-container")
            .append('svg')
            .attr('viewBox', () => {
                return widthR < heightR ? '0 0 100 ' + (100 * heightR / widthR) : '0 0 ' + (100 * widthR / heightR) + ' 100';
            })
            .attr('class', 'svg-content');

        const mainGroupR = svgR.append('g');

        // mainGroupR.append('rect').attr('x', 0).attr('y', 0).attr('width', this.relativeWidthR(100)).attr('height', this.relativeHeightR(100)).attr('fill', 'orange');

        const bubblesGroup = mainGroupR.append('g').attr('transform', 'translate(' + this.relativeWidthR(70) + ', ' + this.relativeHeightR(50) + ')');

        const aroundBubblesGroups = bubblesGroup.selectAll('.bubble-circle')
        .data([
            {name: 'Techno', count: 800, color: '#FFC502'},
            {name: 'Soul', count: 700, color: '#FFCF2E'},
            {name: 'Minimal', count: 650, color: '#FFD854'},
            {name: 'Acid House', count: 600, color: '#FFE17C'},
            {name: 'Grime', count: 500, color: '#FFEDAE'},
            {name: 'Disco', count: 300, color: '#FFF8E0'},
        ]).enter()
            .append('g').attr('class', (d, i) => 'bubble-circle bubble-circle-' + i)
            // .on('mouseover', (data, j) => {
            //     bubblesGroup.selectAll('.bubble-circle').filter(function(elm){ return !this.classList.contains('bubble-circle-' + j)} ).select('circle')
            //     .transition().duration(500)
            //     .attr('r', 0);

            //     legendGroup.selectAll('.ratio-text').filter(function(elm){ return !this.classList.contains('ratio-text-' + j)} )
            //     .transition().duration(500)
            //     .attr('opacity', 0);

            //     legendGroup.selectAll('.ratio-text').filter(function(elm){ return this.classList.contains('ratio-text-' + j)} )
            //     .transition().duration(500)
            //     .attr('opacity', 1);
            // })
            // .on('mouseout', (data, j) => {
            //     bubblesGroup.selectAll('.bubble-circle').filter(function(elm){ return !this.classList.contains('bubble-circle-' + j)} ).select('circle')
            //     .transition().duration(500)
            //     .attr('r', d => Math.sqrt(d.count) / 2);

            //     legendGroup.selectAll('.ratio-text').transition().duration(500).attr('opacity', 1);
            // })
            .style('cursor', 'pointer');

            aroundBubblesGroups.append('path')
            .attr('d', (d, i) => 'M 0 0 L ' + (20 + Math.sqrt(d.count) / 2) * Math.cos(i * Math.PI / 3) + ' ' + (20 + Math.sqrt(d.count) / 2) * Math.sin(i * Math.PI / 3))
            .attr('stroke-width', 0)
            .attr('stroke', d => d.color)
            .transition().duration(2000).attr('stroke-width', 4);

        aroundBubblesGroups.append('circle')
            .attr('cx', (d, i) => (20 + Math.sqrt(d.count) / 2) * Math.cos(i * Math.PI / 3))
            .attr('cy', (d, i) => (20 + Math.sqrt(d.count) / 2) * Math.sin(i * Math.PI / 3))
            .attr('r', d => Math.sqrt(d.count) / 2)
            .attr('fill', (d, i) => {
                this.createRadialGradient(svgR, [d.color, '#FFAA00'], i);
                return 'url(#radialGradient-help-' + i + ')';
            });

        const centreBubble = bubblesGroup.append('circle')
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('r', Math.sqrt(900) / 2)
            .attr('fill', '#FFAA00')
            .style('cursor', 'pointer')
            // .on('mouseover', () => {
            //     bubblesGroup.selectAll('.bubble-circle').select('circle')
            //     .transition().duration(500)
            //     .attr('r', 0);

            //     legendGroup.selectAll('.ratio-text')
            //     .transition().duration(500).attr('opacity', 0)
            // })
            // .on('mouseout', () => {
            //     bubblesGroup.selectAll('.bubble-circle').select('circle')
            //     .transition().duration(500)
            //     .attr('r', d => Math.sqrt(d.count) / 2);

            //     legendGroup.selectAll('.ratio-text')
            //     .transition().duration(500).attr('opacity', 1);
            // });

            this.addGooeyEffect(bubblesGroup, '2');

            mainGroupR.append('path')
                .attr('fill', 'none')
                .attr('stroke', 'white')
                .attr('stroke-width', 1)
                .attr('d', 'M ' + this.relativeWidthR(70) + ' ' + this.relativeHeightR(50)
                + ' L ' + this.relativeWidthR(50) + ' ' + this.relativeHeightR(30) + ' '
                + ' L ' + this.relativeWidthR(35) + ' ' + this.relativeHeightR(30) + ' '
                )
            mainGroupR.append('path')
                .attr('fill', 'none')
                .attr('stroke', 'white')
                .attr('stroke-width', 1)
                .attr('d', 'M ' + this.relativeWidthR(35) + ' ' + this.relativeHeightR(35)
                + ' L ' + this.relativeWidthR(35) + ' ' + this.relativeHeightR(25) + ' '
                )

            mainGroupR.append('circle').attr('cx', this.relativeWidthR(70)).attr('cy', this.relativeHeightR(50)).attr('r', 2).attr('fill', 'white');

            mainGroupR.append('path')
                .attr('fill', 'none')
                .attr('stroke', 'white')
                .attr('stroke-width', 1)
                .attr('d', 'M ' + (this.relativeWidthR(70) + (20 + Math.sqrt(600) / 2) * Math.cos(3 * Math.PI / 3)) + ' ' + (this.relativeHeightR(50) + (20 + Math.sqrt(600) / 2) * Math.sin(3 * Math.PI / 3))
                + ' L ' + this.relativeWidthR(40) + ' ' + this.relativeHeightR(60) + ' '
                + ' L ' + this.relativeWidthR(35) + ' ' + this.relativeHeightR(60) + ' '
                )

            mainGroupR.append('circle')
                .attr('cx', this.relativeWidthR(70) + (20 + Math.sqrt(600) / 2) * Math.cos(3 * Math.PI / 3))
                .attr('cy', this.relativeHeightR(50) + (20 + Math.sqrt(600) / 2) * Math.sin(3 * Math.PI / 3))
                .attr('r', 2).attr('fill', 'white');

            mainGroupR.append('path')
                .attr('fill', 'none')
                .attr('stroke', 'white')
                .attr('stroke-width', 1)
                .attr('d', 'M ' + (this.relativeWidthR(70) + (20 + Math.sqrt(650) / 2) * Math.cos(2 * Math.PI / 3)) + ' ' + (this.relativeHeightR(50) + (20 + Math.sqrt(650) / 2) * Math.sin(2 * Math.PI / 3))
                + ' L ' + this.relativeWidthR(40) + ' ' + this.relativeHeightR(60) + ' '
                )

            mainGroupR.append('circle')
                .attr('cx', this.relativeWidthR(70) + (20 + Math.sqrt(650) / 2) * Math.cos(2 * Math.PI / 3))
                .attr('cy', this.relativeHeightR(50) + (20 + Math.sqrt(650) / 2) * Math.sin(2 * Math.PI / 3))
                .attr('r', 2).attr('fill', 'white');

            mainGroupR.append('path')
                .attr('fill', 'none')
                .attr('stroke', 'white')
                .attr('stroke-width', 1)
                .attr('d', 'M ' + this.relativeWidthR(35) + ' ' + this.relativeHeightR(65)
                + ' L ' + this.relativeWidthR(35) + ' ' + this.relativeHeightR(55) + ' '
                )

            mainGroupR.append('text')
                .attr('x', this.relativeWidthR(33))
                .attr('y', this.relativeHeightR(30))
                .attr('fill', 'white')
                .attr('font-size', '7px')
                .text('Primary genre')
                .attr('text-anchor', 'end')
                .attr('alignment-baseline', 'middle');

            mainGroupR.append('text')
                .attr('x', this.relativeWidthR(33))
                .attr('y', this.relativeHeightR(60))
                .attr('fill', 'white')
                .attr('font-size', '7px')
                .text('Secondary genres')
                .attr('text-anchor', 'end')
                .attr('alignment-baseline', 'middle');


        this.setState({ mainGroupL: mainGroupL, mainGroupR: mainGroupR })
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

}

export default GlobalMapHelp;