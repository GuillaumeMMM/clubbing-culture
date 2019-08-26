import React, { Component } from 'react';

class Loader extends Component {

    render() {
        return (
            <div className={"loader-container " + (this.props.type === 'fixed' ? 'loader-container-fixed' : '')}>
                <div className="title">loading</div>
            </div>
        );
    }
}

export default Loader;