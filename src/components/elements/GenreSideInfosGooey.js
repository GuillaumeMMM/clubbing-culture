import React, { Component } from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import * as d3 from 'd3';

class GenreSideInfosGooey extends Component {
    render() {
        console.log('render')
        return (
            <div className="genre-side-infos-gooey-container">
                <div className="genre-side-infos-title">
                    {this.props.name}
                </div>
                <div className="genre-side-infos-content">
                {/* <div className="genre-side-infos-video-container">
                    <iframe width="100%" height="auto" className="genre-side-video" src={this.props.details.video.url}></iframe>
                </div> */}
                    <div className="genre-side-infos-details">{this.props.details.details}</div>
                    <div className="genre-side-infos-link">Listen to some {this.props.details.name} here : <a href={this.props.details.video.url} target="_blank" rel="noopener noreferrer">{this.props.details.video.title}</a></div>
                </div>
                <div className="quit-icon" onClick={this.props.setActiveGenre.bind(this, '')}>
                        <svg width="40" height="40" className="circle-svg">
                            <circle className="outer" cx="20" cy="20" r="15"/>
                        </svg>
                        <ClearIcon></ClearIcon>
                </div>
                <div className="genre-side-infos-background" id={"side-infos-gooey-" + this.props.id} style={{ width: '100%', height: '100%' }}>

                </div>
            </div>
        );
    }

    componentDidMount() {
        setTimeout(() => {
            if (getComputedStyle(document.querySelector('.genre-side-infos-gooey-container')).left === "-1000px") {
                document.querySelector('.genre-side-infos-gooey-container').style.left = 0;
            } else {
                document.querySelector('.genre-side-infos-gooey-container').style.right = 0;
            }
        }, 10);

        const width = document.getElementById("side-infos-gooey-" + this.props.id).clientWidth;
        const height = document.getElementById("side-infos-gooey-" + this.props.id).clientHeight;
        this.setState({ width: width, height: height }, this.initGraph);
    }

    initGraph = () => {
        const { width, height } = this.state;

        const svg = d3.select("#side-infos-gooey-" + this.props.id)
            .append('svg')
            .attr('viewBox', () => {
                return width < height ? '0 0 100 ' + (100 * height / width) : '0 0 ' + (100 * width / height) + ' 100';
            })
            .attr('class', 'svg-content');

        const mainGroup = svg.append('g')
            .attr('transform', 'translate(' + this.relativeWidth(0) + ', ' + this.relativeHeight(0) + ')');
        // mainGroup.append('rect')
        //     .attr('x', this.relativeWidth(0))
        //     .attr('y', this.relativeHeight(0))
        //     .attr('width', this.relativeWidth(100))
        //     .attr('height', this.relativeHeight(100))
        //     .attr('fill', 'red');

        let color1 = this.props.DataStore.getColorFromGenre(this.formatName(this.props.name).toLowerCase()).col1;

        const gooeyGroup = mainGroup.append('g');

        const gooeyGroupMoving = mainGroup.append('g').attr('opacity', 0.3);

        // gooeyGroup.append('rect')
        //     .attr('x', this.relativeWidth(0))
        //     .attr('y', this.relativeHeight(0))
        //     .attr('width', this.relativeWidth(100))
        //     .attr('height', this.relativeHeight(20))
        //     .attr('fill', color1);

            gooeyGroup.append('circle')
            .attr('cx', this.relativeWidth(10))
            .attr('cy', this.relativeHeight(0))
            .attr('r', this.relativeHeight(80))
            .attr('fill', color1);

            gooeyGroup.append('rect')
            .attr('x', this.relativeWidth(0))
            .attr('y', this.relativeHeight(0))
            .attr('width', this.relativeWidth(10))
            .attr('height', this.relativeHeight(80))
            .attr('fill', color1);

            gooeyGroup.append('circle')
            .attr('cx', this.relativeWidth(60))
            .attr('cy', this.relativeHeight(0))
            .attr('r', this.relativeHeight(80))
            .attr('fill', color1);

            gooeyGroup.append('rect')
            .attr('x', this.relativeWidth(60))
            .attr('y', this.relativeHeight(0))
            .attr('width', this.relativeWidth(50))
            .attr('height', this.relativeHeight(80))
            .attr('fill', color1);

            // nonGooeyGroup.append('circle')
            // .attr('cx', this.relativeWidth(100))
            // .attr('cy', this.relativeHeight(0))
            // .attr('r', this.relativeHeight(40))
            // .attr('fill', '#ED1258');

            const clipPathDefs = mainGroup.append('defs');

            const clipPath = clipPathDefs.append('clipPath').attr('id', 'genre-side-infos-gooey-clipPath');

            clipPath.append('rect').attr('x', this.relativeWidth(60)).attr('y', this.relativeHeight(0)).attr('width', this.relativeWidth(50)).attr('height', this.relativeHeight(80));

            clipPath.append('rect').attr('x', this.relativeWidth(0)).attr('y', this.relativeHeight(0)).attr('width', this.relativeWidth(10)).attr('height', this.relativeHeight(80));

            clipPath.append('circle').attr('cx', this.relativeWidth(60)).attr('cy', this.relativeHeight(0)).attr('r', this.relativeHeight(80));

            clipPath.append('circle').attr('cx', this.relativeWidth(10)).attr('cy', this.relativeHeight(0)).attr('r', this.relativeHeight(80));

            let movingColor1 = this.props.DataStore.getColorFromGenre(this.formatName(this.props.DataStore.getSimilarGenre(this.props.name)).toLowerCase()).col1;

            let movingColor2 = this.props.DataStore.getColorFromGenre(this.formatName(this.props.DataStore.getSimilarGenre(this.props.name)).toLowerCase()).col1;

            let movingColor3 = this.props.DataStore.getColorFromGenre(this.formatName(this.props.DataStore.getSimilarGenre(this.props.name)).toLowerCase()).col1;

            // gooeyGroupMoving.append('rect').attr('x', 0).attr('y', 0).attr('width', this.relativeWidth(100)).attr('height', this.relativeHeight(100)).attr('fill', color1).attr('clip-path', 'url(#genre-side-infos-gooey-clipPath)');

            const movingCircle1 = gooeyGroupMoving.append('circle').attr('id', 'moving-circle-1').attr('class', 'moving-circle')
            .attr('cx', this.relativeWidth(50))
            .attr('cy', this.relativeHeight(10))
            .attr('r', this.relativeHeight(80))
            // .attr('opacity', 0.5)
            .attr('fill', movingColor1).attr('clip-path', 'url(#genre-side-infos-gooey-clipPath)');

            const movingCircle2 = gooeyGroupMoving.append('circle').attr('id', 'moving-circle-2').attr('class', 'moving-circle')
            .attr('cx', this.relativeWidth(70))
            .attr('cy', this.relativeHeight(10))
            .attr('r', this.relativeHeight(50))
            // .attr('opacity', 0.5)
            .attr('fill', movingColor2).attr('clip-path', 'url(#genre-side-infos-gooey-clipPath)');

            const movingCircle3 = gooeyGroupMoving.append('circle').attr('id', 'moving-circle-3').attr('class', 'moving-circle')
            .attr('cx', this.relativeWidth(10))
            .attr('cy', this.relativeHeight(10))
            .attr('r', this.relativeHeight(40))
            // .attr('opacity', 0.5)
            .attr('fill', movingColor3).attr('clip-path', 'url(#genre-side-infos-gooey-clipPath)');

            const animateCircle = (circle) => {
                circle.transition().delay(3000 * Math.random()).duration(20000).attr('cx', this.relativeWidth(Math.random() * 100)).attr('cy', this.relativeHeight(Math.random() * 100)).on('end', () => animateCircle(circle));
            }

            animateCircle(movingCircle1);
            animateCircle(movingCircle2);
            animateCircle(movingCircle3);

            this.addGlowEffect(gooeyGroup, '5.5');

            this.addGooeyEffect(gooeyGroupMoving, '2.5');


        this.setState({ mainGroup: mainGroup, gooeyGroup: gooeyGroup, gooeyGroupMoving: gooeyGroupMoving })
    }

    //  Takes a % ang returns the right height
    relativeHeight = (height) => {
        return this.state.width < this.state.height ? height * this.state.height / this.state.width : height;
    }
    
    //  Takes a % ang returns the right width
    relativeWidth = (width) => {
        return this.state.width < this.state.height ? width : width * this.state.width / this.state.height;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.name !== this.props.name) {
            this.state.gooeyGroup.selectAll('circle').transition().duration(400).attr('fill', this.props.DataStore.getColorFromGenre(this.formatName(this.props.name).toLowerCase()).col1);
            this.state.gooeyGroup.selectAll('rect').transition().duration(400).attr('fill', this.props.DataStore.getColorFromGenre(this.formatName(this.props.name).toLowerCase()).col1);

            let movingColor1 = this.props.DataStore.getColorFromGenre(this.formatName(this.props.DataStore.getSimilarGenre(this.props.name)).toLowerCase()).col1;

            let movingColor2 = this.props.DataStore.getColorFromGenre(this.formatName(this.props.DataStore.getSimilarGenre(this.props.name)).toLowerCase()).col1;

            let movingColor3 = this.props.DataStore.getColorFromGenre(this.formatName(this.props.DataStore.getSimilarGenre(this.props.name)).toLowerCase()).col1;

            this.state.gooeyGroupMoving.select('#moving-circle-1').attr('fill', movingColor1);
            this.state.gooeyGroupMoving.select('#moving-circle-2').attr('fill', movingColor2);
            this.state.gooeyGroupMoving.select('#moving-circle-3').attr('fill', movingColor3);
        }
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
            .attr('values', '1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 8 -7')
            .attr('result', 'gooey');

        container.style("filter", "url(#gooey)");
    }

    formatName = (name) => {
        return name.split("'").join('_').split(' ').join('_');
    }

    formatGenre = (name) => {
        return name.split('&').join('').split('/').join('');
    }

    addGlowEffect = (container, intensity) => {
        //Container for the gradients
        var defs = container.append("defs");

        var filter = defs.append("filter").attr('x', -2).attr('width', 4).attr('y', -2).attr('height', 4)
            .attr("id", "glow-moving-circle");

        filter.append("feGaussianBlur")
            .attr("class", "blur")
            .attr("stdDeviation", intensity)
            .attr("result", "coloredBlur");

        var feMerge = filter.append("feMerge");
        feMerge.append("feMergeNode")
            .attr("in", "coloredBlur");
        feMerge.append("feMergeNode")
            .attr("in", "SourceGraphic");

    container.style('filter', 'url(#glow-moving-circle)');
}
}

export default GenreSideInfosGooey;