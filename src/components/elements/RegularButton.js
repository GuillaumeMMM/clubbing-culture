import React, { Component } from 'react';
import * as d3 from 'd3';

class RegularButton extends Component {
    render() {
        return (
            <div className="regular-button-container" id={"regular-button-" + this.props.id}>
                <div className="regular-button-content" id={"regular-button-content-" + this.props.id} style={{ width: '100%', height: '100%' }}>

                </div>
                <div className="regular-button-text">
                    {this.props.text}
                </div>
            </div>
        );
    }

    componentDidMount() {

        const width = document.getElementById("regular-button-content-" + this.props.id).clientWidth;
        const height = document.getElementById("regular-button-content-" + this.props.id).clientHeight;
        this.setState({ width: width, height: height }, this.initGraph);
    }

    initGraph = () => {
        const { width, height } = this.state;

        const svg = d3.select("#regular-button-content-" + this.props.id)
            .append('svg')
            .attr('viewBox', () => {
                return width < height ? '0 0 100 ' + (100 * height / width) : '0 0 ' + (100 * width / height) + ' 100';
            })
            .attr('class', 'svg-content');

        const that = this;
        const mainGroup = svg.append('g')
            .attr('transform', 'translate(' + this.relativeWidth(0) + ', ' + this.relativeHeight(0) + ')')
            .on('mouseover', function() {
                d3.select(this).select('.circle-left').transition().ease(d3.easeLinear).duration(300)
                    // .attr('cx', that.relativeWidth(100));
                    .attr('r', that.relativeWidth(100));
                d3.select(this).select('.circle-right').transition().ease(d3.easeLinear).duration(300)
                    // .attr('cx', that.relativeWidth(0));
                    .attr('r', that.relativeWidth(100));
            })
            .on('mouseout', function() {
                d3.select(this).select('.circle-left').transition().ease(d3.easeLinear).duration(300)
                // .attr('cx', that.relativeWidth(0));
                .attr('r', 70);
                d3.select(this).select('.circle-right').transition().ease(d3.easeLinear).duration(300)
                // .attr('cx', that.relativeWidth(100));
                .attr('r', 70);
            });

        mainGroup.append('rect').attr('class', 'background-rect')
            .attr('x', this.relativeWidth(0))
            .attr('y', this.relativeHeight(0))
            .attr('width', this.relativeWidth(100))
            .attr('height', this.relativeHeight(100))
            .attr('fill', this.props.colors[0]);


        const filter = mainGroup.append("defs")
            .append("filter")
            .attr("id", "regular-buttom-blur-" + this.props.id).attr('x', '-100%').attr('y', '-100%').attr('height', '300%').attr('width', '300%');
        filter.append('feGaussianBlur').attr('in', 'SourceGraphic').attr('stdDeviation', 40);

        const circleGroup = mainGroup.append('g').style('filter', 'url(#regular-buttom-blur-' + this.props.id + ')');

        circleGroup.append('circle')
            .attr('class', 'circle-left')
            .attr('cx', this.relativeWidth(0))
            .attr('cy', this.relativeHeight(100) / 2)
            .attr('r', 70)
            .attr('fill', this.props.colors[2])
            .attr('opacity', 0.5);

        circleGroup.append('circle')
            .attr('class', 'circle-right')
            .attr('cx', this.relativeWidth(100))
            .attr('cy', this.relativeHeight(100) / 2)
            .attr('r', 70)
            .attr('fill', this.props.colors[1])
            .attr('opacity', 0.5);


        this.setState({ mainGroup: mainGroup, circleGroup: circleGroup })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.colors[0] !== this.props.colors[0] || prevProps.colors[1] !== this.props.colors[1]) {
            this.state.mainGroup.select('.background-rect').attr('fill', this.props.colors[0]);
            this.state.circleGroup.select('.left-circle').attr('fill', this.props.colors[2]);
            this.state.circleGroup.select('.right-circle').attr('fill', this.props.colors[1]);
        }
    }

    //  Takes a % ang returns the right height
    relativeHeight = (height) => {
        return this.state.width < this.state.height ? height * this.state.height / this.state.width : height;
    }

    //  Takes a % ang returns the right width
    relativeWidth = (width) => {
        return this.state.width < this.state.height ? width : width * this.state.width / this.state.height;
    }
}

export default RegularButton;