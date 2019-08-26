import React, { Component } from 'react';
// import GenreSideInfos from './GenreSideInfos';
import * as d3 from 'd3';
import { inject, observer } from "mobx-react";

@observer
class GenreTreeGooey extends Component {

    // state = {
    //     sideGenreOpen: true
    // }

    render() {
        console.log(this.props.DataStore.currentGenreInTree) // A LAISSER POUR L'OBSERVER
        return (
            <div className="genre-tree-gooey-container">
                <div className="genre-tree" id={"genre-tree-gooey-chart-" + this.props.id} style={{ width: '50vw', height: '50vw' }}>
                </div>
            </div>
        );
    }

    componentDidMount() {
        const width = document.getElementById("genre-tree-gooey-chart-" + this.props.id).clientWidth;
        const height = document.getElementById("genre-tree-gooey-chart-" + this.props.id).clientHeight;

        this.setState({ width: width, height: height }, this.init)
        
        // document.querySelector('.genre-side-infos-container').style.right = '0px';
    }

    init = () => {
        const { width, height } = this.state;

        const svg = d3.select('#genre-tree-gooey-chart-' + this.props.id)
            .append('svg')
            .attr('viewBox', () =>{
                return width < height ? '0 0 100 ' + (100 * height / width) : '0 0 ' + (100 * width / height) + ' 100';
            })
            .attr('class', 'svg-content').style('pointer-events', 'none');


        const mainGroup = svg.append('g').attr('class', 'main-group').style('pointer-events', 'auto');

        const glowyMovingCircleGroup = mainGroup.append('g');

        const mainGenreGroup = mainGroup.append('g');

        const subGenresOverlayGroup = mainGroup.append('g');

        glowyMovingCircleGroup.append('circle')
            .attr('class', 'moving-circle under-moving-circle')
            .attr('cx', this.relativeWidth(50))
            .attr('cy', this.relativeHeight(50))
            .attr('r', this.relativeWidth(10))
            .attr('fill', this.props.DataStore.getColorFromGenre(this.formatName(this.props.genre.name).toLowerCase()).col1)
            .style('pointer-events', 'none');

        mainGenreGroup.append('circle')
            .attr('class', 'moving-circle upper-moving-circle')
            .attr('cx', this.relativeWidth(50))
            .attr('cy', this.relativeHeight(50))
            .attr('r', this.relativeWidth(10))
            .attr('fill', this.props.DataStore.getColorFromGenre(this.formatName(this.props.genre.name).toLowerCase()).col1)
            .style('pointer-events', 'none');

        mainGenreGroup.append('circle').attr('class', 'main-circle')
            .attr('cx', this.relativeWidth(50))
            .attr('cy', this.relativeHeight(50))
            .attr('r', this.relativeWidth(10))
            .attr('fill', this.props.DataStore.getColorFromGenre(this.formatName(this.props.genre.name).toLowerCase()).col1)
            .style('cursor', 'pointer')
            .on('mouseover', () => {
                if (this.props.genre.name !== this.props.DataStore.currentGenreInTree) {
                    this.appendLegendTextMain(this.state.legendGroup);
                }
            })
            .on('mouseout', () => {
                if (this.props.genre.name !== this.props.DataStore.currentGenreInTree) {
                    this.removeLegendTextMain(this.state.legendGroup);
                }
            })
            .on('click', () => {
                this.props.DataStore.setActiveGenre(this.props.genre.name);
                this.props.handleOpenSideInfo(true);
            });

        const subgenresRects = mainGenreGroup.selectAll('.subgenre-circle')
            .data(this.props.genre.subGenres).enter()
            .append('circle').attr('class', 'subgenre-circle')
            .attr('cx', (d, i) => {
                let angle = i * 2 * Math.PI / this.props.genre.subGenres.length;
                return this.relativeWidth(50) + this.relativeWidth(25) * Math.cos(angle)
            })
            .attr('cy', (d, i) => {
                let angle = i * 2 * Math.PI / this.props.genre.subGenres.length;
                return this.relativeHeight(50) + this.relativeWidth(25) * Math.sin(angle)
            })
            .attr('r', this.relativeWidth(5))
            .attr('fill', d => this.props.DataStore.getColorFromGenre(this.formatName(d.name).toLowerCase()).col1)
            .on('mouseenter', (d, i) => {
                let angle = i * 2 * Math.PI / this.props.genre.subGenres.length;
                mainGroup.selectAll('.moving-circle').transition().duration(600)
                .attr('cx', this.relativeWidth(50) + this.relativeWidth(25) * Math.cos(angle))
                .attr('cy', this.relativeHeight(50) + this.relativeWidth(25) * Math.sin(angle))
                .attr('fill', this.props.DataStore.getColorFromGenre(this.formatName(d.name).toLowerCase()).col1)
                .attr('r', this.relativeWidth(5));

                if (this.props.genre.subGenres && this.props.genre.subGenres.length > 0) {
                    if (this.props.genre.subGenres[i].name !== this.props.DataStore.currentGenreInTree) {
                        this.appendLegendText(d, i, this.state.legendGroup);
                    }
                }
            })
            .on('mouseout', (d, i) => {
                mainGroup.selectAll('.moving-circle').transition().duration(600)
                .attr('cx', this.relativeWidth(50)).attr('cy', this.relativeHeight(50))
                .attr('fill', this.props.DataStore.getColorFromGenre(this.formatName(this.props.genre.name).toLowerCase()).col1)
                .attr('r', this.relativeWidth(10));

                if (this.props.genre.subGenres && this.props.genre.subGenres.length > 0) {
                    if (this.props.genre.subGenres[i].name !== this.props.DataStore.currentGenreInTree) {
                        this.removeLegendText(d, i, this.state.legendGroup);
                    }
                }
            })
            .style('cursor', 'pointer')
            .on('click', (d) => {
                this.props.DataStore.setActiveGenre(d.name);
                this.props.handleOpenSideInfo(true);
            });

            const subGenresOverlayCircles = subGenresOverlayGroup.selectAll('.subgenre-circle-overlay')
            .data(this.props.genre.subGenres).enter()
            .append('circle').attr('class', 'subgenre-circle-overlay')
            .attr('cx', (d, i) => {
                let angle = i * 2 * Math.PI / this.props.genre.subGenres.length;
                return this.relativeWidth(50) + this.relativeWidth(25) * Math.cos(angle)
            })
            .attr('cy', (d, i) => {
                let angle = i * 2 * Math.PI / this.props.genre.subGenres.length;
                return this.relativeHeight(50) + this.relativeWidth(25) * Math.sin(angle)
            })
            .attr('r', this.relativeWidth(5))
            .attr('fill', d => this.props.DataStore.getColorFromGenre(this.formatName(d.name).toLowerCase()).col1)
            .on('mouseenter', (d, i) => {
                let angle = i * 2 * Math.PI / this.props.genre.subGenres.length;
                mainGroup.selectAll('.moving-circle').transition().duration(600)
                .attr('cx', this.relativeWidth(50) + this.relativeWidth(25) * Math.cos(angle))
                .attr('cy', this.relativeHeight(50) + this.relativeWidth(25) * Math.sin(angle))
                .attr('fill', this.props.DataStore.getColorFromGenre(this.formatName(d.name).toLowerCase()).col1)
                .attr('r', this.relativeWidth(5));

                if (this.props.genre.subGenres && this.props.genre.subGenres.length > 0) {
                    if (this.props.genre.subGenres[i].name !== this.props.DataStore.currentGenreInTree) {
                        this.appendLegendText(d, i, this.state.legendGroup);
                    }
                }
            })
            .on('mouseout', (d, i) => {
                mainGroup.selectAll('.moving-circle').transition().duration(600)
                .attr('cx', this.relativeWidth(50)).attr('cy', this.relativeHeight(50))
                .attr('fill', this.props.DataStore.getColorFromGenre(this.formatName(this.props.genre.name).toLowerCase()).col1)
                .attr('r', this.relativeWidth(10));

                if (this.props.genre.subGenres && this.props.genre.subGenres.length > 0) {
                    if (this.props.genre.subGenres[i].name !== this.props.DataStore.currentGenreInTree) {
                        this.removeLegendText(d, i, this.state.legendGroup);
                    }
                }
            })
            .style('cursor', 'pointer')
            .on('click', (d) => {
                this.props.DataStore.setActiveGenre(d.name);
                this.props.handleOpenSideInfo(true);
            });

        this.addGlowEffect(glowyMovingCircleGroup, '2.5');

        if (this.props.animations === 'on') {
            this.addGooeyEffect(mainGenreGroup, '2.5');
        }

        this.appendLegend(mainGroup);
    }

    appendLegend = (mainGroup) => {

        const legendGroup = mainGroup.append('g').attr('class', 'legend-group');

        legendGroup.append('text')
            .attr('x', this.relativeWidth(50))
            .attr('y', this.relativeHeight(50))
            .attr('fill', 'white')
            .text(this.props.genre.name.toUpperCase())
            .style('text-anchor', 'middle')
            .style('dominant-baseline', 'middle')
            .style('font-size', '2px')
            .style('pointer-events', 'none');

        if (this.props.genre.name === this.props.DataStore.currentGenreInTree) {
            this.appendLegendTextMain(legendGroup);
            this.activateMainGenre(legendGroup);
        }
        if (this.props.genre.subGenres && this.props.genre.subGenres.length > 0) {
            this.props.genre.subGenres.forEach((subGenre, i) => {
                if (subGenre.name === this.props.DataStore.currentGenreInTree) {
                    this.appendLegendText(subGenre, i, legendGroup);
                    this.activateSmallGenre(subGenre, i, legendGroup);
                }
            });
        }


        this.setState({ mainGroup: mainGroup, legendGroup: legendGroup });
    }

    appendLegendTextMain = (legendGroup) => {
            legendGroup.selectAll('.small-circle-text')
            .data(this.props.genre.subGenres).enter()
            .append('text').attr('class', 'small-circle-text')
            .attr('x', (d, i) => {
                let angle = i * 2 * Math.PI / this.props.genre.subGenres.length;
                return this.relativeWidth(50) + this.relativeWidth(25) * Math.cos(angle)
            })
            .attr('y', (d, i) => {
                let angle = i * 2 * Math.PI / this.props.genre.subGenres.length;
                return this.relativeHeight(50) + this.relativeWidth(25) * Math.sin(angle)
            })
            .attr('fill', 'white')
            .text(d => d.short ? d.short : '')
            .style('text-anchor', 'middle')
            .style('dominant-baseline', 'middle')
            .style('font-size', '2px')
            .style('pointer-events', 'none')
            .attr('opacity', 0).transition().duration(300)
            .attr('opacity', 1);
    
            const getPathDataTop = () => {
                var r = this.relativeWidth(10) * 1.1;
                return 'm' + (this.relativeWidth(50) - r) + ',' + this.relativeHeight(50) + ' ' +
                'a' + r + ',' + r + ' 0 0 1 ' + (2*r) + ',0';
            }
    
            const getPathDataBottom = () => {
                var r = this.relativeWidth(10) * 1.1;
                return 'm' + (this.relativeWidth(50) - r) + ',' + this.relativeHeight(50) + ' ' +
                'a' + r + ',' + r + ' 0 0 0 ' + (2*r) + ',0';
            }
    
            const textAroundMainCircle = legendGroup.append('g').attr('class', 'main-circle-text-around');
    
            textAroundMainCircle.append('defs')
            .append('path')
            .attr('d', getPathDataTop)
            .attr('id', 'curvedTextPathTop');
    
            textAroundMainCircle.append('defs')
            .append('path')
            .attr('d', getPathDataBottom)
            .attr('id', 'curvedTextPathBottom');
    
            textAroundMainCircle.append('text')
            .append('textPath')
            .attr('startOffset', '50%')
            .attr('xlink:href', '#curvedTextPathTop')
            .text(this.props.genre.name.length >= 8 ? this.props.genre.name.toUpperCase() + ' - ' + this.props.genre.name.toUpperCase() : this.props.genre.name.toUpperCase() + ' - ' + this.props.genre.name.toUpperCase() + ' - ' + this.props.genre.name.toUpperCase())
            .attr('fill', 'white')
            .style('text-anchor', 'middle')
            .style('dominant-baseline', 'baseline')
            .style('font-size', '2px')
            .attr('opacity', 0).transition().duration(300).attr('opacity', 1);
    
            textAroundMainCircle.append('text')
            .append('textPath')
            .attr('startOffset', '50%')
            .attr('xlink:href', '#curvedTextPathBottom')
            .text(this.props.genre.name.length >= 8 ? this.props.genre.name.toUpperCase() + ' - ' + this.props.genre.name.toUpperCase() : this.props.genre.name.toUpperCase() + ' - ' + this.props.genre.name.toUpperCase() + ' - ' + this.props.genre.name.toUpperCase())
            .attr('fill', 'white')
            .style('text-anchor', 'middle')
            .style('dominant-baseline', 'hanging')
            .style('font-size', '2px')
            .attr('opacity', 0).transition().duration(300).attr('opacity', 1);
    
            textAroundMainCircle.append('circle')
            .attr('cx', this.relativeWidth(50) - this.relativeWidth(10) - 1.8)
            .attr('cy', this.relativeHeight(50))
            .attr('r', 0.4).attr('fill', 'white')
            .attr('opacity', 0).transition().duration(300).attr('opacity', 1);
            textAroundMainCircle.append('circle')
            .attr('cx', this.relativeWidth(50) + this.relativeWidth(10) + 1.8)
            .attr('cy', this.relativeHeight(50))
            .attr('r', 0.4).attr('fill', 'white')
            .attr('opacity', 0).transition().duration(300).attr('opacity', 1);
    }

    appendLegendText = (appendData, index, legendGroup) => {
        // console.log('append data', appendData, index, this.props.genre.subGenres.length, this.props.id)
        let angle = index * 2 * Math.PI / this.props.genre.subGenres.length;
        var getPathDataTop = () => {
            var r = this.relativeWidth(5) * 1.2;
            return 'm' + (this.relativeWidth(50) + this.relativeWidth(25) * Math.cos(angle) - r) + ',' + (this.relativeWidth(50) + this.relativeWidth(25) * Math.sin(angle)) + ' ' +
            'a' + r + ',' + r + ' 0 0 1 ' + (2*r) + ',0';
        }

        var getPathDataBottom = () => {
            var r = this.relativeWidth(5) * 1.2;
            return 'm' + (this.relativeWidth(50) + this.relativeWidth(25) * Math.cos(angle) - r) + ',' + (this.relativeWidth(50) + this.relativeWidth(25) * Math.sin(angle)) + ' ' +
            'a' + r + ',' + r + ' 0 0 0 ' + (2*r) + ',0';
        }

        const textAroundSmallCircle = legendGroup.append('g').attr('class', 'text-around-circle text-around-circle-' + index);

        textAroundSmallCircle.append('defs')
        .append('path')
        .attr('d', getPathDataTop)
        .attr('id', 'curvedTextPathTop-' + index + '-' + this.props.id);

        textAroundSmallCircle.append('defs')
        .append('path')
        .attr('d', getPathDataBottom)
        .attr('id', 'curvedTextPathBottom-' + index + '-' + this.props.id);

        textAroundSmallCircle.append('text')
        .append('textPath')
        .attr('startOffset', '50%')
        .attr('xlink:href', '#curvedTextPathTop-' + index + '-' + this.props.id)
        .text(appendData.name.toUpperCase())
        .attr('fill', 'white')
        .style('text-anchor', 'middle')
        .style('dominant-baseline', 'baseline')
        .style('font-size', '1.8px')
        .attr('opacity', 0).transition().duration(300).attr('opacity', 1);

        // if (appendData.name.length < 15) {
            textAroundSmallCircle.append('text')
            .append('textPath')
            .attr('startOffset', '50%')
            .attr('xlink:href', '#curvedTextPathBottom-' + index + '-' + this.props.id)
            .text(appendData.name.toUpperCase())
            .attr('fill', d => appendData.name.length < 15 ? 'white' : 'transparent')
            .style('text-anchor', 'middle')
            .style('dominant-baseline', 'hanging')
            .style('font-size', '1.8px')
            .attr('opacity', 0).transition().duration(300).attr('opacity', 1);
        // }
    }

    activateMainGenre = (legendGroup) => {
            function rotate(){
                let group = legendGroup.select('.main-circle-text-around');
                if (group.node()) {
                    group.transition()
                    .duration(20000).ease(d3.easeLinear)
                    .attrTween("transform", tween).on('end', rotate);
                    var me = group.node()
                    var x1 = me.getBBox().x + me.getBBox().width/2;//the center x about which you want to rotate
                    var y1 = me.getBBox().y + me.getBBox().height/2;//the center y about which you want to rotate
                    function tween(d, i, a) {
                        return d3.interpolateString(`rotate(0, ${x1}, ${y1})`, `rotate(360, ${x1}, ${y1})`);
                    }
                }
            }
            
            rotate();
    }

    activateSmallGenre = (d, i, legendGroup) => {
        function rotate(){
            let group = legendGroup.select('.text-around-circle-' + i);
            if (group.node()) {
                group.transition()
                .duration(20000).ease(d3.easeLinear)
                .attrTween("transform", tween).on('end', rotate);
                var me = group.node()
                var x1 = me.getBBox().x + me.getBBox().width/2;//the center x about which you want to rotate
                var y1 = me.getBBox().y + me.getBBox().height/2;//the center y about which you want to rotate
                function tween(d, i, a) {
                    return d3.interpolateString(`rotate(0, ${x1}, ${y1})`, `rotate(360, ${x1}, ${y1})`);
                }
            }
        }

        legendGroup.select('.text-around-circle-' + i).append('circle')
            .attr('cx', (d) => {
                let angle = i * 2 * Math.PI / this.props.genre.subGenres.length;
                return this.relativeWidth(50) + this.relativeWidth(25) * Math.cos(angle)
            })
            .attr('cy', (d) => {
                let angle = i * 2 * Math.PI / this.props.genre.subGenres.length;
                return this.relativeHeight(50) + this.relativeWidth(25) * Math.sin(angle)
            })
            .attr('r', 0.5)
            .attr('fill', 'white')
            .attr('opacity', 0.5)
            .style('pointer-events', 'none');

        rotate();     
    }

    removeLegendText = (data, i, legendGroup) => {
        // console.log(data)
        legendGroup.select('.text-around-circle-' + i).remove();
    }

    removeLegendTextMain = (legendGroup) => {
        // console.log(data)
        legendGroup.select('.main-circle-text-around').remove();
        legendGroup.selectAll('.small-circle-text').remove();
    }

    componentDidUpdate(prevProps) {
        // console.log({prevProps}, this.props);
        if (this.state.legendGroup) {
            if (this.props.DataStore.currentGenreInTree !== this.props.genre.name) {
                this.removeLegendTextMain(this.state.legendGroup);
            } else {
                this.activateMainGenre(this.state.legendGroup);
            }

            if (this.props.genre.subGenres && this.props.genre.subGenres.length > 0) {
                this.props.genre.subGenres.forEach((subGenre, i) => {
                    if (subGenre.name === this.props.DataStore.currentGenreInTree) {
                        this.activateSmallGenre(subGenre, i, this.state.legendGroup);
                    } else {
                        this.removeLegendText(subGenre, i, this.state.legendGroup)
                    }
                });
            }
        }
        // this.updateLinks();
    }

        //  Takes a % ang returns the right height
        relativeHeight = (height) => {
            return this.state.width < this.state.height ? height * this.state.height / this.state.width : height;
        }
    
        //  Takes a % ang returns the right width
        relativeWidth = (width) => {
            return this.state.width < this.state.height ? width : width * this.state.width / this.state.height;
        }

        formatName = (name) => {
            return name.split("'").join('_').split(' ').join('_');
        }
    
        formatGenre = (name) => {
            return name.split('&').join('').split('/').join('');
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

        addGooeyEffect = (container, intensity) => {
            const defs = container.append('defs');
            const filter = defs.append('filter').attr('id', 'gooey-global-gooeytree-' + this.props.id);
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
    
            container.style("filter", "url(#gooey-global-gooeytree-" + this.props.id + ")");
        }

        addGlowEffect = (container, intensity) => {
                //Container for the gradients
                var defs = container.append("defs");

                var filter = defs.append("filter").attr('x', -0.5).attr('width', 2).attr('y', -0.5).attr('height', 2)
                    .attr("id", "glow-moving-circle-" + this.props.id);
        
                filter.append("feGaussianBlur")
                    .attr("class", "blur")
                    .attr("stdDeviation", intensity)
                    .attr("result", "coloredBlur");
        
                var feMerge = filter.append("feMerge");
                feMerge.append("feMergeNode")
                    .attr("in", "coloredBlur");
                feMerge.append("feMergeNode")
                    .attr("in", "SourceGraphic");
        
            container.style('filter', 'url(#glow-moving-circle-' + this.props.id + ')');
        }
}

export default GenreTreeGooey;