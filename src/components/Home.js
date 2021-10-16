import React, { Component } from 'react';
import Problems from './Problems';
import { withStyles } from '@material-ui/core/styles';



const styles = ({
    img: {
        width: '100%',
        opacity: '0.84',
    },
    imageText: {
        position: 'absolute',
        top: '10%',
        left: '2%',
        color: 'rgb(96,94,94)',
        fontWeight: 'normal',
        fontSize: '50px',
        textAlign: 'left', fontFamily: [
            'PT Sans',
            'sans-serif',
        ].join(',')
    }
})

class Home extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div style = {{paddingTop: '5%'}}>
                <Problems/>
            </div>
        );
    }
}

export default Home;