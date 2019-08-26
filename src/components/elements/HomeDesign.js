import React, { Component } from 'react';
import * as d3 from 'd3';

class HomeDesign extends Component {

    state = {
        width: 0,
        height: 0,
    }

    render() {
        return (
           <div className="home-design-container" id={"home-design-chart-" + this.props.id} style={{ width: '50vw', height: '65vh' }}>
               
           </div>
        );
    }

    componentDidMount() {
        const width = document.getElementById("home-design-chart-" + this.props.id).clientWidth;
        const height = document.getElementById("home-design-chart-" + this.props.id).clientHeight;
        this.setState({width: width, height: height}, this.initGraph)
    }

    initGraph = () => {
        const { width, height} = this.state;

        const svg = d3.select("#home-design-chart-" + this.props.id)
            .append('svg')
            .attr('viewBox', () =>{
                return width < height ? '0 0 100 ' + (100 * height / width) : '0 0 ' + (100 * width / height) + ' 100';
            })
            .attr('class', 'svg-content');

        const mainGroup = svg.append('g')
            .attr('transform', 'translate(' + this.relativeWidth(0) + ', ' + this.relativeHeight(0) + ')');

        // mainGroup.append('rect')
        //     .attr('x', this.relativeWidth(20))
        //     .attr('y', this.relativeHeight(20))
        //     .attr('width', this.relativeWidth(60))
        //     .attr('height', this.relativeHeight(60))
        //     .attr('fill', '#F9F9F9');

        const blobsGroup = mainGroup.append('g').attr('class', 'blobs-group');

        for (let i = 0; i < 4; i++) {
            let blob = blobsGroup.append('circle')
            .attr('cx', d => {
                let rand = this.relativeWidth(Math.random() * 100);
                let finalRand = Math.max(Math.min(rand, this.relativeWidth(100) - 7), 7);
                return finalRand;
            })
            .attr('cy', d => {
                let rand = this.relativeHeight(Math.random() * 100);
                let finalRand = Math.max(Math.min(rand, this.relativeHeight(100) -7), 7);
                return finalRand;
            })
                .attr('class', 'small-circle')
                .attr('r', 5)
                .attr('fill', this.props.colors[0])

            if (this.props.animations === 'on') {
                this.animateSmall(blob);
            }
        }

        for (let i = 0; i < 3; i++) {
            let blob = blobsGroup.append('circle')
            .attr('cx', d => {
                let rand = this.relativeWidth(Math.random() * 100);
                let finalRand = Math.max(Math.min(rand, this.relativeWidth(100) - 12), 12);
                return finalRand;
            })
            .attr('cy', d => {
                let rand = this.relativeHeight(Math.random() * 100);
                let finalRand = Math.max(Math.min(rand, this.relativeHeight(100) -12), 12);
                return finalRand;
            })
                .attr('class', 'medium-circle')
                .attr('r', 10)
                .attr('fill', this.props.colors[1])

                if (this.props.animations === 'on') {
                    this.animateMedium(blob);
                }
        }

        for (let i = 0; i < 2; i++) {
            let blob = blobsGroup.append('circle')
                .attr('cx', d => {
                    let rand = this.relativeWidth(Math.random() * 100);
                    let finalRand = Math.max(Math.min(rand, this.relativeWidth(100) - 17), 17);
                    return finalRand;
                })
                .attr('cy', d => {
                    let rand = this.relativeHeight(Math.random() * 100);
                    let finalRand = Math.max(Math.min(rand, this.relativeHeight(100) - 17), 17);
                    return finalRand;
                })
                .attr('class', 'big-circle')
                .attr('r', 15)
                .attr('fill', this.props.colors[2]);
            
                if (this.props.animations === 'on') {
                    this.animateBig(blob);
                }
        }

        this.addGooeyEffect(blobsGroup, '2.5');
        
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

    addGooeyEffect = (container, intensity) => {
        const defs = container.append('defs');
        const filter = defs.append('filter').attr('id', 'gooey-home-design').attr('width', 5).attr('height', 5).attr('x', -2.5).attr('y', -2.5);
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

        container.style("filter", "url(#gooey-home-design)");
    }

    animateSmall = (blob) => {
        blob.transition().duration(10000).delay(Math.random() * 1000)
            .attr('cx', d => {
                let rand = this.relativeWidth(Math.random() * 100);
                let finalRand = Math.max(Math.min(rand, this.relativeWidth(100) - 7), 7);
                return finalRand;
            })
            .attr('cy', d => {
                let rand = this.relativeHeight(Math.random() * 100);
                let finalRand = Math.max(Math.min(rand, this.relativeHeight(100) - 7), 7);
                return finalRand;
            })
            .on('end', () => this.animateSmall(blob))
    }

    animateBig = (blob) => {
        blob.transition().duration(20000).delay(Math.random() * 5000)
            .attr('cx', d => {
                let rand = this.relativeWidth(Math.random() * 100);
                let finalRand = Math.max(Math.min(rand, this.relativeWidth(100) - 17), 17);
                return finalRand;
            })
            .attr('cy', d => {
                let rand = this.relativeHeight(Math.random() * 100);
                let finalRand = Math.max(Math.min(rand, this.relativeHeight(100) - 17), 17);
                return finalRand;
            })
            .on('end', () => this.animateBig(blob))
    }

    animateMedium = (blob) => {
        blob.transition().duration(15000).delay(Math.random() * 2000)
            .attr('cx', d => {
                let rand = this.relativeWidth(Math.random() * 100);
                let finalRand = Math.max(Math.min(rand, this.relativeWidth(100) - 12), 12);
                return finalRand;
            })
            .attr('cy', d => {
                let rand = this.relativeHeight(Math.random() * 100);
                let finalRand = Math.max(Math.min(rand, this.relativeHeight(100) - 12), 12);
                return finalRand;
            })
            .on('end', () => this.animateMedium(blob))
    }

}

export default HomeDesign;