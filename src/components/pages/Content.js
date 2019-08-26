import React, { Component } from 'react';
import Home from './Home';
import City from './City';
import About from './About';
import NotFound from './NotFound';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
class Content extends Component {
    render() {
        return (
            <div className="content-container">
                <Router>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/city/:name" component={City} />
                        <Route path="/about" component={About} />
                        <Route path="*" exact={true} component={NotFound} />
                    </Switch>
                </Router>
                {/* <Home DataStore={this.props.DataStore} HelpStore={this.props.HelpStore}></Home> */}
                {/* <City DataStore={this.props.DataStore}></City> */}
            </div>
        );
    }
}

export default Content;