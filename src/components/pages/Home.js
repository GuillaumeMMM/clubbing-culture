import React, { Component, Suspense } from 'react';
import HomeDesign from '../elements/HomeDesign';
import HomeButton from '../elements/HomeButton';
import Genres from '../elements/Genres';
import Places from '../elements/Places';

import BrowserDetection from 'react-browser-detection';
import smoothscroll from 'smoothscroll-polyfill';
import { inject, observer } from "mobx-react";
import Loader from '../elements/Loader';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Footer from '../elements/Footer';

const browserHomeDesignHandler = {
    firefox: () => <HomeDesign colors={['#FFBF00', '#093F9B', '#EC148C']} dimensions={{width: '50vw', height: '65vh'}} animations='off'></HomeDesign>,
    ie: () => <HomeDesign colors={['#FFBF00', '#093F9B', '#EC148C']} dimensions={{width: '50vw', height: '65vh'}} animations='off'></HomeDesign>,
    edge: () => <HomeDesign colors={['#FFBF00', '#093F9B', '#EC148C']} dimensions={{width: '50vw', height: '65vh'}} animations='off'></HomeDesign>,
    'android-chrome': () => <HomeDesign colors={['#FFBF00', '#093F9B', '#EC148C']} dimensions={{width: '50vw', height: '65vh'}} animations='off'></HomeDesign>,
    default: (browser) => <HomeDesign colors={['#FFBF00', '#093F9B', '#EC148C']} dimensions={{width: '50vw', height: '65vh'}} animations='on'></HomeDesign>,
};

const browserHomeButtonHandler = (id, title, text, colors) => {
    return {
        firefox: () => <HomeButton id={id} title={title} text={text} colors={colors} animations='off'></HomeButton>,
        ie: () => <HomeButton id={id} title={title} text={text} colors={colors} animations='off'></HomeButton>,
        edge: () => <HomeButton id={id} title={title} text={text} colors={colors} animations='off'></HomeButton>,
        'android-chrome': () => <HomeButton id={id} title={title} text={text} colors={colors} animations='off'></HomeButton>,
        default: (browser) => <HomeButton id={id} title={title} text={text} colors={colors} animations='on'></HomeButton>,
    }
}

@inject('DataStore')
@inject('HelpStore')
@observer
class Home extends Component {

    state = {
        selectedButton: '',
        loading: false,
    }

    render() {
        return (
            <React.Fragment>
                <div className="home-container" id="home-container">
                    <div className="home-top-part">
                        <div className="home-design">
                        <BrowserDetection>{ browserHomeDesignHandler }</BrowserDetection>
                        </div>
                        <div className="home-main">
                            <div className="home-header">
                                <h1 className="home-title">
                                    CLUBBING FEELS
                                </h1>
                                <p>A data exploration of clubbing culture.</p>
                            </div>
                            <p className="home-text">
                            The purpose of this website is to investigate the repartition of music genres in nightclubs of Western Europe. For now, the focus is made on the clubs of Amsterdam, Barcelona, Berlin, London and Paris. You will be able to find different visualizations designs showing the musical diversity of the clubbing culture. <br></br><br></br>You can start by choosing to explore the cities or the musical genres. This website is thought as an exploratory environment, and if you are interested in going deeper into the data, don’t miss the city-specific pages : 
                            {this.props.DataStore.citiesInfos.map((city, i) => {
                                if (i < this.props.DataStore.citiesInfos.length - 1) {
                                    return <span key={i}><Link to={'./city/' + city.name}> {city.name}, </Link></span>
                                } else {
                                    return <span key={i}>and <Link to={'./city/' + city.name}> {city.name}.</Link></span>
                                }
                            })}
                        </p>
                        </div>
                    </div>
                    <div className="home-bottom-part">
                    <div className="home-button-box" onClick={this.setSelectedButton.bind(this, 'places')}>
                            <BrowserDetection>
                                { browserHomeButtonHandler('home-button-2', "Cities", 'Explore globally how people consume music in Western Europe nightclubs.', ['#093F9B', '#096D9B', '#7575B7']) }
                            </BrowserDetection>
                        </div>
                        <div className="home-button-box" onClick={this.setSelectedButton.bind(this, 'genres')}>
                            <BrowserDetection>
                                { browserHomeButtonHandler('home-button-1', "Genres", 'Explore all the genres and see which cities listen to your favourite kind of music.', ['#EC148C', '#ED1258', '#E512ED']) }
                            </BrowserDetection>
                        </div>
                    </div>
                </div>
                <div id="home-content">
                    {this.state.selectedButton === 'genres' ? <Genres HelpStore={this.props.HelpStore} DataStore={this.props.DataStore} style={{height: '0vh'}} setLoading={this.setLoading}></Genres> : null}

                    {this.state.selectedButton === 'places' ? <Places HelpStore={this.props.HelpStore} DataStore={this.props.DataStore} style={{height: '0vh'}} setLoading={this.setLoading}></Places> : null}

                    {this.state.loading ? <Loader type="absolute"></Loader> : null}
                </div>
                <Footer></Footer>
            </React.Fragment>
        );
    }

    setSelectedButton = (value) => {
        smoothscroll.polyfill();


        document.getElementById('home-content').style.minHeight = '100vh';
        document.getElementById('home-content').scrollIntoView({behavior: 'smooth', block: 'start',
        inline: 'nearest'});
        if (value !== this.state.selectedButton) {
            this.setState({ loading: true });
            setTimeout(() => {
                this.setState({ selectedButton: value });
            }, 1000);
        }
    }

    setLoading = (value) => {
        this.setState({loading: value});
    }
}

export default Home;