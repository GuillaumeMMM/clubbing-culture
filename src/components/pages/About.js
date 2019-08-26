import React, { Component } from 'react';
import Back from '../elements/Back';
import Footer from '../elements/Footer';

class About extends Component {
    render() {
        return (
            <div className="about-container">
                <Back direction="left" text={'Back to home'}></Back>
                <div className="about-header">
                    <h1>About</h1>
                </div>
                <div className="about-content">
                    <p>Hi 🙋🏻‍♂️, I’m <a href="https://guillaumemeigniez.me" target="_blank" rel="noopener noreferrer">Guillaume Meigniez</a>, I’m a front-end and freelance visualization developer and designer. I’m both interested in the clubbing culture and its relationships to urbanism and gentrification. Even though this application is mainly exploratory, I tried to include some explanations of what I discovered when investigating myself the data.</p>
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
}

export default About;