import React, { Component } from 'react';
import * as d3 from 'd3';
// import { parisLimits } from '../assets/data/paris-contour';
import * as L from 'leaflet';

class GenreMap extends Component {
    render() {
        return (
            <div className="genre-map-container" id={"genre-map-chart-" + this.props.id} style={{ width: this.props.dimensions.width, height: this.props.dimensions.height }}>
                
            </div>
        );
    }

    componentDidMount() {
        const width = document.getElementById("genre-map-chart-" + this.props.id).clientWidth;
        const height = document.getElementById("genre-map-chart-" + this.props.id).clientHeight;

        //  DEFINE MAP AND SET MAP ZOOM PRECISION
        const mymap = L.map("genre-map-chart-" + this.props.id, {
            zoomSnap: 0.2,
        });

        //  DRAW MAP
        mymap.setView(this.props.initialPosition, this.props.zoomLevel - 0.4);
        L.tileLayer('https://api.mapbox.com/styles/v1/guillaumemmm/cjzcndxi605lk1cmrfqz82pe0/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ3VpbGxhdW1lbW1tIiwiYSI6ImNqeGgydDBvYzB3YjYzdmxpMXVodWxqM3gifQ.sIm22fQjZ-B4yY72oKxSyQ', {
            attribution: '',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoiZ3VpbGxhdW1lbW1tIiwiYSI6ImNqeGgydDBvYzB3YjYzdmxpMXVodWxqM3gifQ.sIm22fQjZ-B4yY72oKxSyQ'
        }).addTo(mymap);

        mymap.scrollWheelZoom.disable();
        mymap.zoomControl.disable();
        mymap.touchZoom.disable();
        mymap.doubleClickZoom.disable();
        mymap.boxZoom.disable();
        mymap.keyboard.disable();
        mymap.dragging.disable();

        this.setState({ width: width, height: height, mymap: mymap }, this.init)
    }

    init = () => {
        const { width, height } = this.state;
        const data = this.props.data;

        //  DEFINE LAYER INSIDE LEAFLET MAP WHERE D3 IS USED
        const svgLayer = L.svg();
        svgLayer.addTo(this.state.mymap);

        //  DEFINE LAYER GROUP AS MAIN GROUP
        const mainGroup = d3.select('#genre-map-chart-' + this.props.id).select('svg').select('g').attr('class', 'main-group');

        const clipPath = d3.select('#genre-map-chart-' + this.props.id).append('svg').append('defs').append('clipPath').attr('id', 'map-clip-path-' + this.props.id);

        let radius = this.state.width / 2;

        const getXYFromRadiusAngle = (radiusTmp, angle) => {
            return [radiusTmp + radiusTmp * Math.cos(angle), radiusTmp + radiusTmp * Math.sin(angle)];
        }

        var lineGenerator = d3.line()
	        .curve(d3.curveBasisClosed);

        var points = [
            getXYFromRadiusAngle(1 * radius, 0),
            getXYFromRadiusAngle(1 * radius, Math.PI / 4),
            getXYFromRadiusAngle(1 * radius, Math.PI / 2),
            getXYFromRadiusAngle(1 * radius, 3 * Math.PI / 4),
            getXYFromRadiusAngle(1 * radius, Math.PI),
            getXYFromRadiusAngle(1 * radius, 5 * Math.PI / 4),
            getXYFromRadiusAngle(1 * radius, 3 * Math.PI / 2),
            getXYFromRadiusAngle(1 * radius, 7 * Math.PI / 4),
        ];

        var pathData = lineGenerator(points);

        mainGroup.append('path').attr('d', pathData).attr('class', 'path-color').attr('fill', 'none').attr('stroke', this.props.DataStore.getColorFromGenre(this.props.genres[0].split(' ').join('_').toLowerCase()).col1).attr('stroke-width', 2);

        clipPath.append('path')
            .attr('d', pathData);

        d3.select('#genre-map-chart-' + this.props.id).style('clip-path', 'url(#map-clip-path-' + this.props.id + ')');

        // //  DEFINE CITY LIMITATIONS
        // const cityLimitsFormatted = this.props.limits.map(coord => new L.LatLng(coord[1], coord[0]));
        // var lineFunction = d3.line().curve(d3.curveBasisClosed)
        //     .x(d => { return this.state.mymap.latLngToLayerPoint(d).x })
        //     .y(d => { return this.state.mymap.latLngToLayerPoint(d).y });

        // // console.log({cityLimitsFormatted})

        // //  DRAW CITY LIMITATIONS
        // mainGroup.append("path")
        //     .datum(cityLimitsFormatted)
        //     .attr("class", "city-line")
        //     .attr('fill', 'none')
        //     .attr('clip-path', 'url(#main-cicrle-clipPath)')
        //     .style('stroke', 'white')
        //     .style('stroke-width', 1)
        //     .style('pointer-events', 'none')
        //     .attr("d", lineFunction);

        var defs = mainGroup.append("defs");

        var filter = defs.append("filter")
            .attr("id", "genre-map-glow");

        filter.append("feGaussianBlur")
            .attr("class", "blur")
            .attr("stdDeviation", "4.5")
            .attr("result", "coloredBlur");

        var feMerge = filter.append("feMerge");
        feMerge.append("feMergeNode")
            .attr("in", "coloredBlur");
        feMerge.append("feMergeNode")
            .attr("in", "SourceGraphic");

        //  DEFINE ZONES GROUP
        const zoneGroup = mainGroup
            .append('g').attr('class', 'zone-group')
            .style("filter", "url(#genre-map-glow)");

        //  INIT THE GENRES ZONES
        this.initGraph(zoneGroup, data);

        this.setState({ mainGroup: mainGroup });
    }

    initGraph = (zoneGroup, data) => {

        const that = this;
        const genreGroups = [];
        // console.log('init', this.props.genres, this.props.sumup)
        let orderedGenres = [];
        this.props.sumup.forEach(genreSumupTmp => {
            this.props.genres.forEach(genre => {
                if (genre === genreSumupTmp.name) {
                    orderedGenres.push(genre);
                }
            });
        });
        orderedGenres.forEach(genre => {
            // console.log('draw layer', genre)

            let genreGroup = zoneGroup.append('g').attr('opacity', 0.8);

            genreGroup.selectAll('.club-circle')
                .data(data).enter()
                .append('circle').attr('class', 'club-circle')
                .attr('cx', d => {
                    let coord = new L.LatLng(d.position.lat, d.position.lon);
                    return this.state.mymap.latLngToLayerPoint(coord).x;
                })
                .attr('cy', d => {
                    let coord = new L.LatLng(d.position.lat, d.position.lon);
                    return this.state.mymap.latLngToLayerPoint(coord).y;
                })
                .attr('fill', this.props.DataStore.getColorFromGenre(genre.split(' ').join('_').toLowerCase()).col1)
                .attr('r', 0)
                .on('mouseover', function (d) {
                    genreGroups.forEach(genreGroupTmp => {
                        genreGroupTmp.attr('opacity', 0.2);
                    })
                    genreGroup.attr('opacity', 1);
                    d3.select(this).attr('fill', that.props.DataStore.getColorFromGenre(genre.split(' ').join('_').toLowerCase()).col2);
                    zoneGroup.select('.club-text-group-' + that.formatName(d.clubName)).attr('opacity', 1);
                })
                .on('mouseout', function (d) {
                    genreGroups.forEach(genreGroupTmp => {
                        genreGroupTmp.attr('opacity', 0.8);
                    });
                    d3.select(this).attr('fill', that.props.DataStore.getColorFromGenre(genre.split(' ').join('_').toLowerCase()).col1);
                    zoneGroup.select('.club-text-group-' + that.formatName(d.clubName)).attr('opacity', 0);
                })
                .style('cursor', 'pointer')
                .transition().duration(1000)
                .attr('r', (d) => {
                    let clubgenresData = d.data.filter(genreTmp => genreTmp.name === genre);
                    let clubGenresLength = 0;
                    d.data.forEach(genreTmp => clubGenresLength += genreTmp.count);
                    let clubEventsLength = this.props.clubs.filter(clubTmp => clubTmp.name === d.clubName)[0].data.length;
                    return clubgenresData.length > 0 ? 6 * Math.sqrt(clubgenresData[0].count / Math.PI) : 0;
                });

            this.addGooeyEffect(genreGroup, '3.5');
            genreGroups.push(genreGroup);
        });

        const legendGroup = zoneGroup.append('g');

        const textGroups = legendGroup.selectAll('.club-text-group')
            .data(data).enter()
            .append('g')
            .attr('class', d => 'club-text-group club-text-group-' + this.formatName(d.clubName))
            .attr('opacity', 0)
            .attr('transform', d => {
                let coord = new L.LatLng(d.position.lat, d.position.lon);
                return 'translate(' + this.state.mymap.latLngToLayerPoint(coord).x + ', ' + this.state.mymap.latLngToLayerPoint(coord).y + ')'
            });

        //  APPEND THE TEMPORARY TEXT
        textGroups.append('text')
            .attr('class', 'club-name')
            .attr('x', 0)
            .attr('y', -18)
            .attr('fill', 'white')
            .style('font-size', '12px')
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'middle')
            .style('pointer-events', 'none')
            .text(d => d.clubName);

        //  APPEND THE TEXT BACKGROUND BASED ON THE TEXT LENGTH
        textGroups.append('rect')
            .attr('class', 'club-name-bg')
            .attr('x', function (d) {
                return - 5 - d3.select(this.parentNode).select('.club-name').node().getBBox().width / 2;
            })
            .attr('y', function (d) {
                return - 18 - 3 - d3.select(this.parentNode).select('.club-name').node().getBBox().height / 2;
            })
            .attr('width', function (d) {
                return d3.select(this.parentNode).select('.club-name').node().getBBox().width + 10;
            })
            .attr('height', function (d) {
                return d3.select(this.parentNode).select('.club-name').node().getBBox().height + 3;
            })
            .attr('rx', '0.3px')
            .attr('ry', '0.3px')
            .attr('stroke', 'white')
            .attr('stroke-width', 1)
            .attr('fill-opacity', 0.8)
            .style('pointer-events', 'none')
            // .attr('fill', 'red');
            .attr('fill', '#041821');

        textGroups.selectAll('.club-name').remove();

        //  APPEND THE TEXT ITSELF
        textGroups.append('text')
            .attr('class', 'club-name')
            .attr('x', 0)
            .attr('y', -18)
            .attr('fill', 'white')
            .style('font-size', '12px')
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'middle')
            .style('pointer-events', 'none')
            .text(d => d.clubName);

    }


    addGooeyEffect = (container, intensity) => {
        const defs = container.append('defs');
        const filter = defs.append('filter').attr('id', 'gooey');
        const blur = filter.append('feGaussianBlur')
            .attr('in', 'SourceGraphic')
            .attr('class', 'gooey-blur')
            .attr('stdDeviation', intensity)
            .attr('result', 'blur');
        filter.append('feColorMatrix')
            .attr('in', 'blur')
            .attr('mode', 'matrix')
            .attr('values', '1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7')
            .attr('result', 'gooey');
        filter.append('feComposite')
            .attr('in', 'SourceGraphic')
            .attr('in2', 'gooey')
            .attr('operator', 'atop');

        container.style("filter", "url(#gooey)");
    }

    componentDidUpdate(prevProps) {
        // console.log({prevProps}, this.props);
        d3.select('#genre-map-chart-' + this.props.id).select('.zone-group').selectAll('g').remove();

        d3.select('#genre-map-chart-' + this.props.id).select('.path-color').attr('stroke', this.props.DataStore.getColorFromGenre(this.props.genres[0].split(' ').join('_').toLowerCase()).col1)

        this.initGraph(d3.select('#genre-map-chart-' + this.props.id).select('.zone-group'), this.props.data)
    }

    formatName = (name) => {
        return name.split("'").join('_').split(' ').join('_').split('/').join('').split(':').join('').split('&').join('');
    }

    formatGenre = (name) => {
        return name.split('&').join('').split('/').join('');
    }
}

export default GenreMap;