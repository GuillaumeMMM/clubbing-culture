import React, { Component } from 'react';
import Back from '../elements/Back';
import Footer from '../elements/Footer';
import HomeDesign from '../elements/HomeDesign';

import BrowserDetection from 'react-browser-detection';

const browserHomeDesignHandler = {
    firefox: () => <HomeDesign colors={['#FFBF00', '#093F9B', '#EC148C']} dimensions={{width: '100vw', height: '50vh'}} animations='off'></HomeDesign>,
    ie: () => <HomeDesign colors={['#FFBF00', '#093F9B', '#EC148C']} dimensions={{width: '100vw', height: '50vh'}} animations='off'></HomeDesign>,
    edge: () => <HomeDesign colors={['#FFBF00', '#093F9B', '#EC148C']} dimensions={{width: '100vw', height: '50vh'}} animations='off'></HomeDesign>,
    'android-chrome': () => <HomeDesign colors={['#FFBF00', '#093F9B', '#EC148C']} dimensions={{width: '100vw', height: '50vh'}} animations='off'></HomeDesign>,
    default: (browser) => <HomeDesign colors={['#FFBF00', '#E18081', '#FF6919']} dimensions={{width: '100vw', height: '50vh'}} animations='on'></HomeDesign>,
};

class About extends Component {

    render() {
        return (
            <div className="about-container" id="about-container">
                <Back direction="left" text={'Back to home'}></Back>
                <div className="about-design">
                    <BrowserDetection>{ browserHomeDesignHandler }</BrowserDetection>
                </div>
                <div className="about-header">
                    <h1>About</h1>
                </div>
                <div className="about-content">
                    <p>Hi 🙋🏻‍♂️, I’m <a href="https://guillaumemeigniez.me" target="_blank" rel="noopener noreferrer">Guillaume Meigniez</a>, I’m a freelance front-end visualization developer and designer. I’m both interested in the clubbing culture and its relationships to urbanism and gentrification. Even though this application is mainly exploratory, I tried to include some explanations of what I discovered when investigating myself the data.</p>
                    <p>This website is also an exercise. The data designs that have been chosen may not be the most efficient ones. What I tried to do is to bring interest through originality by including more sketching and less coding. As I “designed” the data I wanted, I have tried to get a more design-driven approach.</p>
                    <p>The nightclubs events have been found on Resident Advisor, and the genres were gathered on Spotify or Discogs. For now there are only 5 cities that have been added, but my goal is to integrate lots of others, and not only in Western Europe.</p>
                    <p>I’m always looking to improve my dataviz design as well as my UX skills, please <a href="mailto:guillaume.meigniez@gmail.com" target="_blank" rel="noopener noreferrer">contact me</a> if you have any suggestions.</p>
                    <p>Thanks a lot to <a href="https://marcoucou.com" target="_blank" rel="noopener noreferrer">Marc Sirisak</a> for helping me with the data gathering.</p>
                    <p>Technical : ReactJS, D3.js, Leaflet, Mobx</p>
                </div>
                <Footer></Footer>
            </div>
        );
    }

    componentDidMount = () => {
        document.getElementById('about-container').scrollIntoView();
    }
}

export default About;