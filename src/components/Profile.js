import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@mui/material/LinearProgress';

const styles = ({
  button: {
    background: 'gainsboro',
    width: '50%',
  },
  h1: {
    fontWeight: 'normal',
  },
  box: {
    height: '10px',
    width: '900px',
    marginLeft: '17%',
    backgroundImage: 'linear-gradient(to right, black , white)',
  },
  h3: {
    fontWeight: 'normal',
    display: 'inline-block',
    paddingTop: '5px',
    paddingLeft: '30%'
  },
  h32: {
    fontWeight: 'normal',
    display: 'inline-block',
    paddingTop: '5px',
    paddingLeft: '20%',
    textAlign: 'center',
    maxWidth: '400px'
  },
  img: {
    display: 'block',
    paddingTop: '30px',
    width: '200px',
    height: '200px',
    cursor: 'pointer'
  },
  IG: {
    width: "42px",
    height: "42px",
    "&:hover": {
      opacity: '0.7'
    }
  }
})

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      handle: '',
      email: '',
      createdAt: '',
      problems: [],
      categories: {}
    }
  }


  componentDidMount() {
    axios.get('/userInfo', { headers: { 'Authorization': `${localStorage.getItem("FBIdToken")}` } }).then(res => {
      this.setState({
        createdAt: res.data.createdAt,
        email: res.data.email,
        handle: res.data.handle,
      });
      return this.state;
    }).then(data => {
        axios.get(`/getproblem/${data.handle}`).then(res => {
            return res.data;
          }).then(data => {
              this.setState({
                  problems: data
              });
          })
          .catch(err => {
              console.log(err);
          })

          axios.get(`/problemcounts/${this.state.handle}`).then(res => {
            return res.data;
          }).then(data => {
            this.setState({
                categories: data
            })
          })
          .catch(err => {
            console.log(err);
          })
    })
    .catch(err => console.log(err.response))
  }


  render() {
    const { classes } = this.props;
    return (
      <Paper elevation = {16} style = {{margin: '2%', padding: '2%'}}>
          <h1>My Profile</h1>
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="center"
            spacing = {2}
          >
            <Grid item xs = {4}>
                <h1>{this.state.handle}</h1>
                <h2>{this.state.email}</h2>
            </Grid>
            <Grid item xs = {3}>
                {this.state.problems.length > 0 && this.state.problems.map(problem => {
                    return (
                        <div>
                            <h4>{problem.title}</h4>
                            <Typography variant="body2" color="textSecondary" component="p">
                              {problem.time} minutes
                            </Typography>
                        </div>
                    );
                })}
            </Grid>
            <Grid item xs = {5}>
                {Object.keys(this.state.categories).map((key, index) => {
                    return (
                        <div>
                          <p>{key}</p>
                          <LinearProgress variant = "determinate" value = {this.state.categories[key]/this.state.problems.length *100}></LinearProgress>
                        </div>
                      );
                })}
            </Grid>

          </Grid>

      </Paper>
    );
  }
}

export default withStyles(styles)(Profile);