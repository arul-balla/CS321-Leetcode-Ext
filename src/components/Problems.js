import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
const styles = ({
  root: {
    maxWidth: 500,
    alignSelf: 'center'
  },
});

class BusinessCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      problems: [],
      open: false
    }
  }

  componentDidMount() {
    axios.get('/users').then(res => {
      this.setState({
        users: res.data.users
      });
      return this.state.users;
    }).then(data => {
        data.forEach(user => {
            axios.get(`/getproblem/${user}`).then(res => {
                return res.data;
              }).then(data => {
                  this.setState({
                      problems: [...this.state.problems, {handle: user, data: data}]
                  });
                  console.log(this.state.problems)
              })
              .catch(err => {
                  console.log(err.response);
              })
        })
    })
    .catch(err => {
      console.log(err)
    })
  }

  getProblems(user){
    axios.get(`/getproblem/${user}`).then(res => {
        return res.data;
      }).catch(err => {
          console.log(err.response);
      })
  }

  render() {
    const classes = this.props;
    return (
      <h1></h1>
    );
  }
}

export default withStyles(styles)(BusinessCard);