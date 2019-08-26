import React, { Component } from 'react';
import ClearIcon from '@material-ui/icons/Clear';

class GenreSideInfos extends Component {
    render() {
        console.log('render')
        return (
            <div className="genre-side-infos-container">
                <div className="genre-side-infos-title">
                    {this.props.name}
                    <div className="quit-icon" onClick={this.props.setActiveGenre.bind(this, '')}>
                        <svg width="40" height="40" className="circle-svg">
                            <circle className="outer" cx="20" cy="20" r="15"/>
                        </svg>
                        <ClearIcon></ClearIcon>
                    </div>
                </div>
                <div className="genre-side-infos-content">
                    {this.props.details.details}
                </div>
                <iframe width="100%" height="auto" className="genre-side-video" src={this.props.details.video.url}></iframe>
            </div>
        );
    }

    componentDidMount() {
        setTimeout(() => {
            if (getComputedStyle(document.querySelector('.genre-side-infos-container')).left === "-1000px") {
                document.querySelector('.genre-side-infos-container').style.left = 0;
            } else {
                document.querySelector('.genre-side-infos-container').style.right = 0;
            }
        }, 10);
        
    }
}

export default GenreSideInfos;