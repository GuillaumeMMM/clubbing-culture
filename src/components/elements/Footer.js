import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Footer extends Component {
    render() {
        return (
            <div className="footer-container">
                <div className="left-part"><a target="_blank" rel="noopener noreferrer" href="http://www.guillaumemeigniez.me">Guillaume Meigniez</a> - 2019</div>
                <div className="right-part">
                    <Link to={'/about'}>About</Link>
                </div>
            </div>
        );
    }
}

export default Footer;