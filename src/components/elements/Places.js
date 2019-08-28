import React, { Component } from 'react';
import GlobalMap from './GlobalMap';
import GlobalMapHelp from './helps/GlobalMapHelp';
import { inject, observer } from "mobx-react";
import Footer from './Footer';

@observer
class Places extends Component {
    render() {
        return (
            <div className="places-container" id="genres-container">
            <div className="places-header">
                <h1 className="places-header-title">
                    Cities
                </h1>
                <p className="places-header-text">
                    
                </p>
            </div>
            <div className="places-content">
                    <GlobalMap
                        id={'global-map-1'}
                        DataStore={this.props.DataStore}
                    ></GlobalMap>
                    {this.props.HelpStore.globalMapHelpOpen ? 
                        <GlobalMapHelp HelpStore={this.props.HelpStore}></GlobalMapHelp> : null
                    }
                    <div className="open-help-icon" onClick={() => this.props.HelpStore.handleGlobalMapOpenHelp()}>
                        <svg width="40" height="40" className="circle-svg">
                            <circle className="outer" cx="20" cy="20" r="15" />
                        </svg>
                        ?
                    </div>
            </div>
            {/* <Footer></Footer> */}
            {/* <RegularButton text="Click Me!" id="genres-1" colors={['#EC148C', '#ED1258', '#E512ED']}></RegularButton>
            <RegularButton text="Click Me 2!" id="genres-2" colors={['#093F9B', '#096D9B', '#7575B7']}></RegularButton> */}
        </div>
        );
    }

    componentDidMount() {
        this.props.setLoading(false);
    }
}

export default Places;