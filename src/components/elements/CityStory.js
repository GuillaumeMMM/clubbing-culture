import React, { Component } from 'react';
import ParisText from './citiestexts/ParisText';
import HomeDesign from './HomeDesign';

import BrowserDetection from 'react-browser-detection';

const browserHomeDesignHandler = {
    firefox: () => <HomeDesign colors={['#3CE8C8', '#98CC74', '#FFCE30']} animations='off'></HomeDesign>,
    ie: () => <HomeDesign colors={['#3CE8C8', '#98CC74', '#FFCE30']} animations='off'></HomeDesign>,
    edge: () => <HomeDesign colors={['#3CE8C8', '#98CC74', '#FFCE30']} animations='off'></HomeDesign>,
    'android-chrome': () => <HomeDesign colors={['#3CE8C8', '#98CC74', '#FFCE30']} animations='off'></HomeDesign>,
    default: (browser) => <HomeDesign colors={['#3CE8C8', '#98CC74', '#FFCE30']} animations='on'></HomeDesign>,
};

class CityStory extends Component {
    render() {
        return (
            <div className="city-story-container">
                <div className="city-story-design">
                    {/* <HomeDesign colors={['#3CE8C8', '#98CC74', '#FFCE30']}></HomeDesign> */}
                    <BrowserDetection>{browserHomeDesignHandler}</BrowserDetection>
                </div>
                <div className="city-story-text">
                    {this.props.DataStore.citiesInfos.filter(city => city.name === this.props.cityName)[0].cityStoryComponent}
                </div>
            </div>
        );
    }
}

export default CityStory;