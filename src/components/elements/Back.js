import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

class Back extends Component {
    render() {
        return (
            <div className="back-container" onClick={this.props.elmId ? () => document.getElementById(this.props.elmId).scrollIntoView({behavior: 'smooth', block: 'start',
            inline: 'nearest'}) : null}>
                <Link to={'/'}>
                    <div className="back-icon">
                                <svg width="40" height="40" className="circle-svg">
                                    <circle className="outer" cx="20" cy="20" r="15" />
                                </svg>
                                {(this.props.direction === 'left') ? 
                                    <ArrowBackIcon></ArrowBackIcon> :
                                    <ArrowUpwardIcon></ArrowUpwardIcon>
                                }
                                
                    </div>
                    {this.props.text}
                </Link>
            </div>
        );
    }
}

export default Back;