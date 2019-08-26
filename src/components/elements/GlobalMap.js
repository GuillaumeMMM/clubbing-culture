import React, { Component } from 'react';
import * as d3 from 'd3';
import * as L from 'leaflet';
import CitySideInfos from './CitySideInfos';
import GenreSideInfos from './GenreSideInfos';

class GlobalMap extends Component {

    state = {
        activeCityName: '',
        activeGenreName: '',
    }

    render() {
        // console.log('RENDER GLOBAL MAP');
        return (
            <div className="global-map-container">
                <div className="graph-container" id={"global-chart-" + this.props.id} style={{ width: '100vw', height: '80vh' }}>
                </div>
                {this.state.activeCityName !== '' ? 
                    <CitySideInfos
                        id={1212}
                        DataStore={this.props.DataStore}
                        city={this.props.DataStore.citiesGenresSumup.filter(city => city.name === this.state.activeCityName)[0]}
                        data={this.props.DataStore.citiesGenresSumup.filter(city => city.name === this.state.activeCityName)[0].sumupData.slice(0, 7)}
                        getColorFromGenre={this.props.DataStore.getColorFromGenre}
                        total={this.props.DataStore.citiesGenresSumup.filter(city => city.name === this.state.activeCityName)[0].total}
                        resetActiveCity={this.resetActiveCity}
                        setActiveGenre={this.setActiveGenre}
                    ></CitySideInfos>
                    : null
                }
                {this.state.activeGenreName !== '' ? 
                    <GenreSideInfos
                        id={1213}
                        setActiveGenre={this.setActiveGenre}
                        name={this.state.activeGenreName}
                        details={this.props.DataStore.getGenreDetailsFromName(this.state.activeGenreName)}
                    ></GenreSideInfos>
                    : null
                }
            </div>
        );
    }

    componentDidMount() {
        const width = document.getElementById("global-chart-" + this.props.id).clientWidth;
        const height = document.getElementById("global-chart-" + this.props.id).clientHeight;

        //  DEFINE MAP AND SET MAP ZOOM PRECISION
        const mymap = L.map("global-chart-" + this.props.id, {
            zoomSnap: 0.2,
        });

        let zoomLevel = 5.5;
        setTimeout(() => {
            //  DRAW MAP
            mymap.setView([47.8606697, 2.3385351], zoomLevel - 0.4);
            L.tileLayer('https://api.mapbox.com/styles/v1/guillaumemmm/cjxsdo41e1z051cogg4whht1w/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ3VpbGxhdW1lbW1tIiwiYSI6ImNqeGgydDBvYzB3YjYzdmxpMXVodWxqM3gifQ.sIm22fQjZ-B4yY72oKxSyQ', {
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

            this.setState({ width: width, height: height, mymap: mymap }, this.init);
        }, 1000);
    }

    init = () => {
        const data = JSON.parse(JSON.stringify(this.props.DataStore.citiesGenresSumup));

        //  DEFINE LAYER INSIDE LEAFLET MAP WHERE D3 IS USED
        const svgLayer = L.svg();
        svgLayer.addTo(this.state.mymap);

        d3.select('#global-chart-' + this.props.id).select('svg').attr('pointer-events', 'auto')

        //  DEFINE LAYER GROUP AS MAIN GROUP
        const mainGroup = d3.select('#global-chart-' + this.props.id).select('svg').select('g').attr('class', 'main-group');

        //  DEFINE ZONES GROUP
        const zoneGroup = mainGroup
            .append('g')
        // .style("filter", "url(#glow)");

        //  TRIGGER ZOOM ON MAP UPDATE
        this.state.mymap.on('zoom', this.update);

        //  INIT THE GENRES ZONES
        this.initGraph(zoneGroup, data);

        this.setState({ mainGroup: mainGroup });
    }

    initGraph = (zoneGroup, data) => {
        // console.log('INIT GLOBAL MAP')
        // console.log(JSON.parse(JSON.stringify(data)));
        data.map(city => city.sumupData = city.sumupData.slice(0, 7));
        // console.log(JSON.parse(JSON.stringify(data)));

        //Container for the gradients
        var defs = zoneGroup.append("defs");

        var filter = defs.append("filter").attr('x', -50).attr('width', 100).attr('y', -50).attr('height', 100)
            .attr("id", "glow");

        filter.append("feGaussianBlur")
            .attr("class", "blur")
            .attr("stdDeviation", "10.5")
            .attr("result", "coloredBlur");

        var feMerge = filter.append("feMerge");
        feMerge.append("feMergeNode")
            .attr("in", "coloredBlur");
        feMerge.append("feMergeNode")
            .attr("in", "SourceGraphic");

        //  FOR EACH CITY ADD A GROUP
        const that = this;
        let cityGroups = zoneGroup.selectAll('.city-group')
            .data(data).enter()
            .append('g').attr('class', 'group-main-city').attr('filter', 'url(#glow)')
            .attr('transform', d => {
                let coord = new L.LatLng(d.position.lat, d.position.lon);
                return 'translate(' + this.state.mymap.latLngToLayerPoint(coord).x + ',' + this.state.mymap.latLngToLayerPoint(coord).y + ')';
            })
            .append('g')
            .attr('class', d => 'city-group city-group-' + d.name)
            .style('cursor', 'pointer')
            .on('mouseover', function() {
                // console.log('on')
                d3.select(this).selectAll('.around-circle').transition().duration(400)
                    .attr('cx', (d, i) => (10 + Math.sqrt(d.count) / 3.5) * Math.cos(i * Math.PI / 3))
                    .attr('cy', (d, i) => (10 + Math.sqrt(d.count) / 3.5) * Math.sin(i * Math.PI / 3))

                d3.select(this.parentNode).selectAll('.wave-circle').attr('cx', 1000);

                d3.select(this.parentNode).select('.circle-border').transition().duration(400).attr('opacity',0);
            })
            .on('mouseout', function() {
                // console.log('out')
                d3.select(this).selectAll('.around-circle').transition().duration(400)
                    .attr('cx', 0)
                    .attr('cy', 0);

                    d3.select(this.parentNode).selectAll('.wave-circle').attr('cx', 0).attr('r', 0);

                    d3.select(this.parentNode).select('.circle-border').transition().duration(400).attr('opacity',1);
            })
            .on('click', function(d) {
                that.setState({activeCityName: ''}, () => {
                    that.setState({activeCityName: d.name});
                });
            });

        cityGroups.selectAll('.around-circle')
            .data(d => d.sumupData.length > 0 ? d.sumupData.slice(1, 7) : []).enter()
            .append('circle')
            .attr('class', 'around-circle')
            // .attr('clip-path', 'url(#clipPath-city)')
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('r', d => Math.sqrt(d.count) / 3.5)
            .attr('fill', (d, i) => this.props.DataStore.getColorFromGenre(this.formatName(this.formatGenre(d.name)).toLowerCase()).col1);


        cityGroups.append('circle')
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('r', 10)
            .attr('stroke', 'transparent')
            .attr('stroke-width', 50)
            // .attr('clip-path', 'url(#clipPath-city)')
            .attr('fill', d => d.sumupData[0] ? this.props.DataStore.getColorFromGenre(this.formatName(this.formatGenre(d.sumupData[0].name)).toLowerCase()).col1 : 'transparent');

        const waveCircles = d3.selectAll('.group-main-city').append('circle')
            .attr('cx', 0)
            .attr('class', 'wave-circle')
            .style('pointer-events', 'none')
            .attr('cy', 0)
            .attr('r', 10)
            .attr('fill', 'none')
            .attr('stroke-width', 2)
            .attr('stroke', d => d.sumupData[0] ? this.props.DataStore.getColorFromGenre(this.formatName(this.formatGenre(d.sumupData[0].name)).toLowerCase()).col1 : 'transparent');

            d3.selectAll('.group-main-city').append('circle')
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('r', 10)
            .attr('class', 'circle-border')
            .style('pointer-events', 'none')
            .attr('fill', 'none')
            .attr('stroke', 'white')
            .attr('stroke-width', 1)

        const animateWaveCircle = function(element) {
            element.transition().duration(1100).ease(d3.easePolyOut).attr('r', 20).attr('opacity', 0).on('end', function(){
                element.attr('r', 10).attr('opacity', 1);
                animateWaveCircle(element);
            });
        }

        animateWaveCircle(waveCircles);

        data.forEach(city => {
            this.addGooeyEffect(d3.select('.city-group-' + city.name), '2.5')
        });

        this.setState({ zoneGroup: zoneGroup });
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

    update = () => {
        // console.log('update GLOBAL MAP')

        //  UPDATE THE CLUBS CIRCLES
        this.state.zoneGroup.selectAll('.group-main-city')
            .attr('transform', d => {
                let coord = new L.LatLng(d.position.lat, d.position.lon);
                return 'translate(' + this.state.mymap.latLngToLayerPoint(coord).x + ',' + this.state.mymap.latLngToLayerPoint(coord).y + ')';
            });
    }

    resetActiveCity = () => {
        document.querySelector('.city-side-infos-container').style.right = '-1000px';
        if (document.querySelector('.genre-side-infos-container')) {
            document.querySelector('.genre-side-infos-container').style.left = '-1000px';
        }
        setTimeout(() => {
            this.setState({activeCityName: '', activeGenreName: ''});
        }, 500);
    }

    setActiveGenre = (genre) => {
        // console.log('set active genre')
        if (genre === '') {
            document.querySelector('.genre-side-infos-container').style.left = '-1000px';
            setTimeout(() => {
                this.setState({activeGenreName: genre});
            }, 500);
        } else {
            this.setState({activeGenreName: genre});
        }
    }
}

export default GlobalMap;