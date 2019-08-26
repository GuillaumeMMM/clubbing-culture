import React, { Component } from 'react';
import * as d3 from 'd3';

class GlobalMapStatsBubbles extends Component {

    state = {
        width: 0,
        height: 0
    }

    render() {
        return (
           <div className="global-map-stats-bubbles-container" id={"global-map-stats-bubbles-chart-" + this.props.id} style={{ width: '100%', height: '40vh' }}>

           </div>
        );
    }

    componentDidMount() {
        const width = document.getElementById('global-map-stats-bubbles-chart-' + this.props.id).clientWidth;
        const height = document.getElementById('global-map-stats-bubbles-chart-' + this.props.id).clientHeight;
        this.setState({width: width, height: height}, this.initGraph)
    }

    initGraph = () => {
        const { width, height } = this.state;

        const margin = {top: this.relativeHeight(10), bottom: this.relativeHeight(10), left: this.relativeWidth(2), right: this.relativeWidth(30)}

        const svg = d3.select('#global-map-stats-bubbles-chart-' + this.props.id)
            .append('svg')
            .attr('viewBox', () =>{
                return width < height ? '0 0 100 ' + (100 * height / width) : '0 0 ' + (100 * width / height) + ' 100';
            })
            .attr('class', 'svg-content');

        const mainGroup = svg.append('g')
            .attr('transform', 'translate(' + this.relativeWidth(50) + ', ' + this.relativeHeight(50) + ')');
            // console.log(JSON.parse(JSON.stringify(this.props.data)));

        const bubblesGroup = mainGroup.append('g');

        const legendGroup = mainGroup.append('g').attr('class', 'legend-group');

        const aroundBubblesGroups = bubblesGroup.selectAll('bubble-circle')
        .data(this.props.data.slice(1, this.props.data.length)).enter()
            .append('g').attr('class', (d, i) => 'bubble-circle bubble-circle-' + i)
            .on('mouseover', (data, j) => {
                bubblesGroup.selectAll('.bubble-circle').filter(function(elm){ return !this.classList.contains('bubble-circle-' + j)} ).select('circle')
                .transition().duration(500)
                .attr('r', 0);

                legendGroup.selectAll('.ratio-text').filter(function(elm){ return !this.classList.contains('ratio-text-' + j)} )
                .transition().duration(500)
                .attr('opacity', 0);

                legendGroup.selectAll('.ratio-text').filter(function(elm){ return this.classList.contains('ratio-text-' + j)} )
                .transition().duration(500)
                .attr('opacity', 1);
            })
            .on('mouseout', (data, j) => {
                bubblesGroup.selectAll('.bubble-circle').filter(function(elm){ return !this.classList.contains('bubble-circle-' + j)} ).select('circle')
                .transition().duration(500)
                .attr('r', d => 8 * Math.sqrt(100 * (d.count / this.props.total)) / 2);

                legendGroup.selectAll('.ratio-text').transition().duration(500).attr('opacity', 1);
            })
            .on('click', d => this.props.setActiveGenre(d.name))
            .style('cursor', 'pointer');

        aroundBubblesGroups.append('circle')
            .attr('cx', (d, i) => (20 + Math.sqrt(d.count) / 2) * Math.cos(i * Math.PI / 3))
            .attr('cy', (d, i) => (20 + Math.sqrt(d.count) / 2) * Math.sin(i * Math.PI / 3))
            .attr('r', d => 8 * Math.sqrt(100 * (d.count / this.props.total)) / 2)
            .attr('fill', (d, i) => {
                this.createRadialGradient(svg, [this.props.getColorFromGenre(this.formatName(this.formatGenre(d.name)).toLowerCase()).col1, this.props.getColorFromGenre(this.formatName(this.formatGenre(d.name)).toLowerCase()).col2], i);
                return 'url(#radialGradient-' + i + ')';
            });

        aroundBubblesGroups.append('path')
            .attr('d', (d, i) => 'M 0 0 L ' + (20 + Math.sqrt(d.count) / 2) * Math.cos(i * Math.PI / 3) + ' ' + (20 + Math.sqrt(d.count) / 2) * Math.sin(i * Math.PI / 3))
            .attr('stroke-width', 0)
            .attr('stroke', d => this.props.getColorFromGenre(this.formatName(this.formatGenre(d.name)).toLowerCase()).col1)
            .transition().duration(2000).attr('stroke-width', 4);

        const legendGroups = legendGroup.selectAll('legend-element-group')
            .data(this.props.data.slice(1, this.props.data.length)).enter()
            .append('g')
            .attr('class', (d, i) => 'legend-group-' + i)
            .attr('transform', (d, i) => 'translate(' + (34 + Math.sqrt(d.count) / 2) * Math.cos(i * Math.PI / 3) + ', ' + (34 + Math.sqrt(d.count) / 2) * Math.sin(i * Math.PI / 3) + ')')
            .on('mouseover', function(data, j) {
                bubblesGroup.selectAll('.bubble-circle').filter(function(elm){ return !this.classList.contains('bubble-circle-' + j)} ).select('circle')
                .transition().duration(500)
                .attr('r', 0);

                legendGroup.selectAll('.ratio-text').filter(function(elm){ return !this.classList.contains('ratio-text-' + j)} )
                .transition().duration(500)
                .attr('opacity', 0);
            })
            .on('mouseout', (data, j) => {
                bubblesGroup.selectAll('.bubble-circle').filter(function(elm){ return !this.classList.contains('bubble-circle-' + j)} ).select('circle')
                .transition().duration(500)
                .attr('r', d => 8 * Math.sqrt(100 * (d.count / this.props.total)) / 2);

                legendGroup.selectAll('.ratio-text')
                .transition().duration(500)
                .attr('opacity', 1);
            })
            .on('click', d => this.props.setActiveGenre(d.name))
            .style('cursor', 'pointer');

        legendGroups.append('text')
            .attr('x', 0)
            .attr('y', 0)
            .text(d => d.name)
            .attr('class', 'temporary-text')
            .style('font-size', '6px')
            .attr('alignment-baseline', 'mathematical')
            .attr('text-anchor', (d, i) => (i < 2 || i === 5) ? 'start' : 'end')
            .style('fill', 'white');
            // .attr('opacity', 0);

        legendGroups.append('clipPath').attr('id', (d, i) => 'text-clipPath-bubble-' + i)
            .append('rect')
            .attr('x', function(d, i) {
                return (i < 2 || i === 5) ? -2 :  - d3.select(this.parentNode.parentNode).select('.temporary-text').node().getBBox().width - 2;
            })
            .attr('y', function(d) {
                return - d3.select(this.parentNode.parentNode).select('.temporary-text').node().getBBox().height / 2 - 0.6;
            })
            .attr('width', 0)
            .attr('height', function(d) {
                return d3.select(this.parentNode.parentNode).select('.temporary-text').node().getBBox().height + 2;
            })
            .transition().delay(700).duration(500)
            .attr('width', function(d) {
                return d3.select(this.parentNode.parentNode).select('.temporary-text').node().getBBox().width + 4;
            });

        const legendRects = legendGroups.append('rect')
            .attr('x', function(d, i) {
                return (i < 2 || i === 5) ? -2 :  - d3.select(this.parentNode).select('.temporary-text').node().getBBox().width - 2;
            })
            .attr('y', function(d) {
                return - d3.select(this.parentNode).select('.temporary-text').node().getBBox().height / 2 - 0.6;
            })
            .attr('width', 0)
            .attr('height', function(d) {
                return d3.select(this.parentNode).select('.temporary-text').node().getBBox().height + 2;
            })
            .attr('rx', 0.5).attr('ry', 0.5)
            .attr('fill', d => this.props.getColorFromGenre(this.formatName(this.formatGenre(d.name)).toLowerCase()).col1).style('stroke', 'white').attr('stroke-width', 0.5);
            
        legendRects.transition().delay(500).duration(500)
            .attr('width', function(d) {
                return d3.select(this.parentNode).select('.temporary-text').node().getBBox().width + 4;
            })

        legendGroups.selectAll('.temporary-text').remove();

        legendGroups.append('text')
            .attr('x', 0)
            .attr('y', 0)
            .attr('clip-path', (d, i) => 'url(#text-clipPath-bubble-' + i + ')')
            .text(d => d.name)
            .style('font-size', '6px')
            .attr('alignment-baseline', 'mathematical')
            .attr('text-anchor', (d, i) => (i < 2 || i === 5) ? 'start' : 'end')
            .style('fill', 'white');

        const centralText = legendGroup.append('g').attr('class', 'central-text');

                
        centralText.append('clipPath').attr('id', 'central-text-bubble-clipPath')
            .append('rect')
            .attr('x', - Math.sqrt(this.props.data[0].count) / 2)
            .attr('y', - Math.sqrt(this.props.data[0].count) / 2)
            .attr('width', 0)
            .attr('height', Math.sqrt(this.props.data[0].count))
            .transition().delay(500).duration(1000)
            .attr('width', Math.sqrt(this.props.data[0].count))

        centralText.append('text')
            .attr('x', 0)
            .attr('y', 0)
            .text(this.props.data[0].name)
            .attr('clip-path', 'url(#central-text-bubble-clipPath)')
            .style('font-size', '5px')
            .attr('alignment-baseline', 'central')
            .attr('text-anchor', 'middle')
            .style('fill', 'white')
            .style('pointer-events', 'none');

        legendGroup.selectAll('.ratio-text')
        .data(this.props.data.slice(1, this.props.data.length)).enter()
            .append('text')
            .attr('x', (d, i) => (20 + Math.sqrt(d.count) / 2) * Math.cos(i * Math.PI / 3))
            .attr('y', (d, i) => (20 + Math.sqrt(d.count) / 2) * Math.sin(i * Math.PI / 3))
            .text(d => Math.round(100 * (d.count / this.props.total)) + '%')
            .attr('class', (d, i) => 'ratio-text ratio-text-' + i)
            .style('font-size', '5px')
            .attr('alignment-baseline', 'middle')
            .attr('text-anchor', 'middle')
            .style('fill', 'white')
            .style('pointer-events', 'none');

        const centreBubble = bubblesGroup.append('circle')
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('r', Math.sqrt(this.props.data[0].count) / 2)
            .attr('fill', this.props.getColorFromGenre(this.formatName(this.formatGenre(this.props.data[0].name)).toLowerCase()).col1)
            .style('cursor', 'pointer')
            .on('mouseover', () => {
                bubblesGroup.selectAll('.bubble-circle').select('circle')
                .transition().duration(500)
                .attr('r', 0);

                legendGroup.selectAll('.ratio-text')
                .transition().duration(500).attr('opacity', 0)
            })
            .on('mouseout', () => {
                bubblesGroup.selectAll('.bubble-circle').select('circle')
                .transition().duration(500)
                .attr('r', d => Math.sqrt(d.count) / 2);

                legendGroup.selectAll('.ratio-text')
                .transition().duration(500).attr('opacity', 1);
            })
            .on('click', this.props.setActiveGenre.bind(this, this.props.data[0].name));

        this.addGooeyEffect(bubblesGroup, '2');
        
        this.setState({mainGroup: mainGroup})
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

    addGooeyEffect = (container, intensity) => {
        const defs = container.append('defs');
        const filter = defs.append('filter').attr('id', 'gooey');
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

        container.style("filter", "url(#gooey)");
    }

    createRadialGradient = (svg, colors, id) => {
        var svgDefs = svg.append('defs');
        var mainGradient = svgDefs.append('radialGradient')
            .attr('id', 'radialGradient-' + id);
        mainGradient.append('stop')
            .attr('offset', '95%')
            .attr('stop-color', colors[0]);

        mainGradient.append('stop')
            .attr('offset', '200%')
            .attr('stop-color', colors[0])
            .attr('stop-opacity', 1);
    }

}

export default GlobalMapStatsBubbles;