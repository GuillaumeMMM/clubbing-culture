import React, { Component } from 'react';
import Back from '../elements/Back';
import Footer from '../elements/Footer';

class NotFound extends Component {
    render() {
        return (
            <div className="not-found-container">
                <Back direction='left' text={'Back to home'}></Back>
                <div className="not-found-content">
                    <h2>PAGE NOT FOUND</h2>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}

export default NotFound;