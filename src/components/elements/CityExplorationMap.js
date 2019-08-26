import React, { Component } from 'react';
import * as d3 from 'd3';
// import { parisLimits } from '../assets/data/paris-contour';
import * as L from 'leaflet';

class CityExplorationMap extends Component {
    render() {
        return (
            <div className="city-exploration-map-container" id={"city-exploration-" + this.props.id} style={{ width: '50vw', height: '50vw' }}>
            </div>
        );
    }

    componentDidMount() {
        const width = document.getElementById("city-exploration-" + this.props.id).clientWidth;
        const height = document.getElementById("city-exploration-" + this.props.id).clientHeight;

        // console.log('PROPS', JSON.parse(JSON.stringify(this.props)));

        //  DEFINE MAP AND SET MAP ZOOM PRECISION
        const mymap = L.map("city-exploration-" + this.props.id, {
            zoomSnap: 0.2,
        });

        //  DRAW MAP
        mymap.setView(this.props.initialPosition, this.props.initialZoomLevel - 0.4);
        L.tileLayer('https://api.mapbox.com/styles/v1/guillaumemmm/cjxsdo41e1z051cogg4whht1w/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ3VpbGxhdW1lbW1tIiwiYSI6ImNqeGgydDBvYzB3YjYzdmxpMXVodWxqM3gifQ.sIm22fQjZ-B4yY72oKxSyQ', {
            attribution: '',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoiZ3VpbGxhdW1lbW1tIiwiYSI6ImNqeGgydDBvYzB3YjYzdmxpMXVodWxqM3gifQ.sIm22fQjZ-B4yY72oKxSyQ'
        }).addTo(mymap);

        this.setState({ width: width, height: height, mymap: mymap }, this.init)
    }

    init = () => {
        const { width, height } = this.state;
        const data = this.props.data;

        //  DEFINE LAYER INSIDE LEAFLET MAP WHERE D3 IS USED
        const svgLayer = L.svg();
        svgLayer.addTo(this.state.mymap);

        //  DEFINE LAYER GROUP AS MAIN GROUP
        const mainGroup = d3.select('#city-exploration-' + this.props.id).select('svg').select('g').attr('class', 'main-group');

        //  DEFINE ZONES GROUP
        const zoneGroup = mainGroup
            .append('g')
        // .style("filter", "url(#glow)");

        //  DEFINE CITY LIMITATIONS
        const parisLimitsFormatted = this.props.limits.map(coord => new L.LatLng(coord[1], coord[0]));
        var lineFunction = d3.line().curve(d3.curveBasisClosed)
            .x(d => { return this.state.mymap.latLngToLayerPoint(d).x })
            .y(d => { return this.state.mymap.latLngToLayerPoint(d).y });

        //  DRAW CITY LIMITATIONS
        mainGroup.append("path")
            .datum(parisLimitsFormatted)
            .attr("class", "city-line")
            .attr('fill', 'none')
            .attr('clip-path', 'url(#main-cicrle-clipPath)')
            .style('stroke', 'white')
            .style('stroke-width', 1)
            .style('pointer-events', 'none')
            .attr("d", lineFunction);

        //  TRIGGER ZOOM ON MAP UPDATE
        this.state.mymap.on('zoom', this.update);

        //  INIT THE GENRES ZONES
        this.initGraph(zoneGroup, data);

        this.setState({ mainGroup: mainGroup });
    }

    initGraph = (zoneGroup, data) => {
        const that = this;
        const genreGroups = [];

        let orderedGenres = [];
        this.props.sumup.forEach(genreSumupTmp => {
            this.props.avaliableGenres.forEach(genre => {
                if (genre === genreSumupTmp.name) {
                    orderedGenres.push(genre);
                }
            });
        });
        orderedGenres.forEach(genre => {
            let genreGroup = zoneGroup.append('g').attr('opacity', this.props.genres.indexOf(genre) !== -1 ? 0.8 : 0).style('pointer-events', this.props.genres.indexOf(genre) !== -1 ? 'all' : 'none').attr('class', 'genre-group').data([genre]);

            genreGroup.selectAll('.club-circle')
            .data(data).enter()
            .append('circle').attr('class',d => 'club-circle club-circle-' + this.formatName(d.clubName))
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
            .on('mouseover', (d) => {
                console.log('mouseover', this.state.genreGroups)
                this.state.genreGroups.forEach(genreGroupTmp => {
                    if (this.props.genres.indexOf(genreGroupTmp.name) !== -1) {
                        // console.log(JSON.parse(JSON.stringify(genreGroupTmp.name)))
                        if (genreGroupTmp.name === this.props.highlightedGenre) {
                            genreGroupTmp.element.attr('opacity', 1);
                        } else {
                            genreGroupTmp.element.attr('opacity', 0.2);
                        }
                    }
                })
                genreGroup.attr('opacity', 1);

                zoneGroup.select('.club-text-group-' + this.formatName(d.clubName)).attr('opacity', 1);

                // this.props.updateHiglightedGenre(genre);
            })
            .on('mouseout', (d) => {
                if (this.props.activeClub !== d.clubName) {
                    this.state.genreGroups.forEach(genreGroupTmp => {
                        if (this.props.genres.indexOf(genreGroupTmp.name) !== -1) {
                            genreGroupTmp.element.attr('opacity', 0.8);
                        }
                    });

                    zoneGroup.select('.club-text-group-' + this.formatName(d.clubName)).attr('opacity', 0);

                    // this.props.updateHiglightedGenre('');
                }
            })
            .on('click', (d) => {
                this.props.DataStore.setActiveClub(d.clubName);
                // this.highlightClub(this.state.zoneGroup, d.clubName);
            })
            .style('cursor', 'pointer')
            .transition().duration(1000)
            .attr('r', (d) => {
                let clubgenresData = d.data.filter(genreTmp => genreTmp.name === genre);
                let clubGenresLength = 0;
                d.data.forEach(genreTmp => clubGenresLength += genreTmp.count);
                let clubEventsLength = this.props.clubs.filter(clubTmp => clubTmp.name === d.clubName)[0].data.length;
                return this.props.circleSizeMode === 'normal' ? clubgenresData.length > 0 ? 6 * Math.sqrt(clubgenresData[0].count / (Math.PI)) : 0 : clubgenresData.length > 0 ? 100 * Math.sqrt(clubgenresData[0].count / (Math.PI * clubEventsLength)) : 0;
            });

            this.addGooeyEffect(genreGroup, '3.5');
            genreGroups.push({name: genre, element: genreGroup});
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

        if (this.props.activeClub) {
            this.highlightClub(zoneGroup, this.props.activeClub);
        }

        console.log(genreGroups)
        this.setState({ zoneGroup: zoneGroup, genreGroups: genreGroups });
    }

    highlightClub = (zoneGroup, clubName) => {
        zoneGroup.select('.club-text-group-' + this.formatName(clubName))
        .attr('opacity', 1);
        const that = this;
        zoneGroup.selectAll('.club-circle-' + this.formatName(clubName)).each( function(d, i)
     {
            let genre = d3.select(this.parentNode).data()[0];
            d3.select(this).attr('fill', that.props.DataStore.getColorFromGenre(genre.split(' ').join('_').toLowerCase()).col2)
        })
    }

    unHighlightClub = (zoneGroup, clubName) => {
        zoneGroup.select('.club-text-group-' + this.formatName(clubName))
        .attr('opacity', 0);
        const that = this;
        zoneGroup.selectAll('.club-circle-' + this.formatName(clubName)).each( function(d, i)
     {
            let genre = d3.select(this.parentNode).data()[0];
            d3.select(this).attr('fill', that.props.DataStore.getColorFromGenre(genre.split(' ').join('_').toLowerCase()).col1)
        })
    }

    update = () => {
        console.log('update')
        //  UPDATE CITY LINE
        var newLineFunction = d3.line().curve(d3.curveBasisClosed)
            .x(d => { return this.state.mymap.latLngToLayerPoint(d).x })
            .y(d => { return this.state.mymap.latLngToLayerPoint(d).y });
        this.state.mainGroup.select('.city-line').attr("d", newLineFunction);

        //  UPDATE THE CLUBS CIRCLES
        this.state.zoneGroup.selectAll('.club-circle')
            .attr('cx', d => {
                let coord = new L.LatLng(d.position.lat, d.position.lon);
                return this.state.mymap.latLngToLayerPoint(coord).x;
            })
            .attr('cy', d => {
                let coord = new L.LatLng(d.position.lat, d.position.lon);
                return this.state.mymap.latLngToLayerPoint(coord).y;
            });

        //  UPDATE THE CLUBS TEXT
        this.state.zoneGroup.selectAll('.club-text-group')
            .attr('transform', d => {
                let coord = new L.LatLng(d.position.lat, d.position.lon);
                return 'translate(' + this.state.mymap.latLngToLayerPoint(coord).x + ', ' + this.state.mymap.latLngToLayerPoint(coord).y + ')'
            });
    }

    updateData = (type, data) => {
        console.log('updateData', type);
        switch (type) {
            case 'clubs': {
                //  FILTER CLUBS GENRES WITH RELEVENT COUNT OF EVENTS
                let relevantData = JSON.parse(JSON.stringify(data));
                data.forEach((club, i) => {
                    let filtered = club.data.filter(genre => genre.count > 5)
                    relevantData[i].data = filtered.sort((a, b) => a.count > b.count ? -1 : 1);
                });

                //  DISPLAY THE CLUB TEXT AND CIRCLE
                this.state.clubsGroup.selectAll('.club-text-group').data(relevantData)
                    .attr('opacity', d => { return d.highlighted ? 1 : 0 });
            }; break;
            case 'genres': if (this.state.zoneGroup) {
                const that = this;
                //  DISPLAY THE CLUB TEXT AND CIRCLE
                this.state.zoneGroup.selectAll('.genre-group')
                // .transition().duration(300)
                    .attr('opacity', d => {
                        let genreTmp = data.filter(genre => genre.name === d.genre)[0];
                        // console.log({genreTmp})
                        return genreTmp.toggle ? 1 : 0.3;
                    })

                this.state.zoneGroup.selectAll('.places-group-genres')
                    .transition().duration(1000)
                    .attr('r', function (d) {
                        let genreName = d3.select(this.parentNode).attr('class').split('genre-group-')[1];
                        let isActive = data.filter(genre => that.formatName(genre.name) === genreName)[0].displayed;
                        return isActive ? 6 * Math.sqrt(d.count / Math.PI) : 0;
                    });
            }; break;
            default: console.log('default');
        }
    }

    componentDidUpdate(prevProps) {
        console.log({ prevProps }, this.props);
        if (this.props.activeClub !== prevProps.activeClub) {
            this.unHighlightClub(this.state.zoneGroup, prevProps.activeClub);
            this.highlightClub(this.state.zoneGroup, this.props.activeClub);
        }

        // if (this.props.highlightedGenre !== prevProps.highlightedGenre) {
        //     console.log('highlighted changed')
        //     if (this.props.highlightedGenre !== '') {
        //         this.state.genreGroups.forEach(genreGroupTmp => {
        //             if (this.props.genres.indexOf(genreGroupTmp.name) !== -1) {
        //                 if (genreGroupTmp.name === this.props.highlightedGenre) {
        //                     genreGroupTmp.element.attr('opacity', 1);
        //                 } else {
        //                     genreGroupTmp.element.attr('opacity', 0.2);
        //                 }
        //             }
        //         });
        //     } else {
        //         this.state.genreGroups.forEach(genreGroupTmp => {
        //             if (this.props.genres.indexOf(genreGroupTmp.name) !== -1) {
        //                 genreGroupTmp.element.attr('opacity', 0.8);
        //             }
        //         });
        //     }
        // }

        if (this.props.genres.length !== prevProps.genres.length) {
            this.state.genreGroups.forEach(genreGroupTmp => {
                if (this.props.genres.indexOf(genreGroupTmp.name) !== -1) {
                    genreGroupTmp.element.attr('opacity', 0.8).style('pointer-events', 'all');
                } else {
                    genreGroupTmp.element.attr('opacity', 0).style('pointer-events', 'none');
                }
            });
        }
    }

    formatName = (name) => {
        return name.split("'").join('_').split(' ').join('_').split('/').join('').split(':').join('').split('&').join('');
    }

    formatGenre = (name) => {
        return name.split('&').join('').split('/').join('');
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
}

export default CityExplorationMap;