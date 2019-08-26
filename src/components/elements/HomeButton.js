import React, { Component } from 'react';
import * as d3 from 'd3';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

class HomeButton extends Component {
    render() {
        return (
            <div className="home-button-container">
                <div className="home-button-background-container" id={"home-button-background-" + this.props.id} style={{ width: '100%', height: '100%' }}>

                </div>
                <h2 className='home-button-title'>
                    {this.props.title}
                </h2>
                <p className='home-button-text'>
                    {this.props.text}
                </p>
                <div className="home-button-arrow">
                    <svg width="40" height="40" className="circle-svg">
                        <circle className="outer" cx="20" cy="20" r="15"/>
                    </svg>
                    <ArrowDownwardIcon></ArrowDownwardIcon>
                </div>
            </div>
        );
    }

    componentDidMount() {
        const width = document.getElementById("home-button-background-" + this.props.id).clientWidth;
        const height = document.getElementById("home-button-background-" + this.props.id).clientHeight;
        this.setState({ width: width, height: height }, this.initGraph);

        window.addEventListener("resize", this.redraw);
    }

    initGraph = () => {
        const { width, height } = this.state;

        const svg = d3.select("#home-button-background-" + this.props.id)
            .append('svg')
            .attr('viewBox', () => {
                return width < height ? '0 0 100 ' + (100 * height / width) : '0 0 ' + (100 * width / height) + ' 100';
            })
            .attr('class', 'svg-content')
            .on('mouseover', this.mouseoverCard)
            .on('mouseout', this.mouseoutCard);

        const mainGroup = svg.append('g')
            .attr('transform', 'translate(' + this.relativeWidth(0) + ', ' + this.relativeHeight(0) + ')');

        const filter = mainGroup.append("defs")
            .append("filter")
            .attr("id", "home-buttom-blur-" + this.props.id).attr('x', -5).attr('y', -5).attr('height', 10).attr('width', 10);
        filter.append('feGaussianBlur').attr('in', 'SourceGraphic').attr('stdDeviation', 20);

        mainGroup.append('rect')
            .attr('x', this.relativeWidth(0))
            .attr('y', this.relativeHeight(0))
            .attr('width', this.relativeWidth(100))
            .attr('height', this.relativeHeight(100))
            .attr('fill', this.props.colors[0]);

        const circlesGroup = mainGroup.append('g');

        if (this.props.animations === 'on') {
            circlesGroup.style('filter', 'url(#home-buttom-blur-' + this.props.id + ')');   
        }


        circlesGroup.append('circle')
            .attr('id', 'circle-2')
            .attr('cx', this.relativeWidth(0))
            .attr('cy', this.relativeHeight(0))
            .attr('r', 100)
            .attr('fill', this.props.colors[1]);


        circlesGroup.append('circle')
            .attr('id', 'circle-1')
            .attr('cx', this.relativeWidth(80))
            .attr('cy', this.relativeHeight(70))
            .attr('r', 50)
            .attr('fill', this.props.colors[2]);


        this.setState({ mainGroup: mainGroup })
    }

    redraw = () => {
        let width = document.getElementById("home-button-background-" + this.props.id).clientWidth;
        let height = document.getElementById("home-button-background-" + this.props.id).clientHeight;
        this.setState({ width: width, height: height }, () => {
            d3.select("#home-button-background-" + this.props.id)
            .select('svg')
            .attr('viewBox', () => {
                return width < height ? '0 0 100 ' + (100 * height / width) : '0 0 ' + (100 * width / height) + ' 100';
            })

            this.state.mainGroup.select('rect')
                .attr('x', this.relativeWidth(0))
                .attr('y', this.relativeHeight(0))
                .attr('width', this.relativeWidth(100))
                .attr('height', this.relativeHeight(100));
        });
    }

    //  Takes a % ang returns the right height
    relativeHeight = (height) => {
        return this.state.width < this.state.height ? height * this.state.height / this.state.width : height;
    }

    //  Takes a % ang returns the right width
    relativeWidth = (width) => {
        return this.state.width < this.state.height ? width : width * this.state.width / this.state.height;
    }

    mouseoverCard = () => {
        this.state.mainGroup.selectAll('circle').transition().duration(400).ease(d3.easeLinear)
            .attr('cx', this.relativeWidth(50))
            .attr('cy', this.relativeHeight(95));
    }

    mouseoutCard = () => {
        this.state.mainGroup.select('#circle-1').transition().duration(400).ease(d3.easeLinear)
            .attr('cx', this.relativeWidth(80))
            .attr('cy', this.relativeHeight(70));

        this.state.mainGroup.select('#circle-2').transition().duration(400).ease(d3.easeLinear)
            .attr('cx', this.relativeWidth(0))
            .attr('cy', this.relativeHeight(0));
    }

}

export default HomeButton;