import React, { Component } from 'react';
import Problems from './Problems';
import AuthContext from './AuthContext';
import Profile from './Profile';


class Home extends Component {
    static contexType = AuthContext;
    render() {
        return (
            <div style = {{paddingTop: '5%'}}>
                <AuthContext.Consumer>
                    {({ loggedIn }) => (
                        loggedIn ? (<Profile/>):(null)
                    )}
                </AuthContext.Consumer>
                <Problems/>
            </div>
        );
    }
}

export default Home;