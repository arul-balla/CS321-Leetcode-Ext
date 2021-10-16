import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
const styles = ({
  root: {
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
                      problems: [...this.state.problems, data]
                  });
              })
              .catch(err => {
                  console.log(err);
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
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="center"
        spacing = {5}
        xs = {12}
        style={{ paddingTop: '3%' }}
      >
        {this.state.problems !== undefined &&
          this.state.problems.map((user) => {
            return (
              <Grid item>
                {
                  user.length > 0 &&
                    <Card>
                      <CardContent>
                      {user.length > 0 && <h1>{user[0].userHandle}</h1>}
                      {user.length > 0 && user.map(problem => {
                        return (
                        <Grid
                          container
                          direction = "row"
                          alignItems = "left"
                          justify = "left"
                          spacing = {5}
                        >
                          <Grid item>
                            <Typography variant="body2" color="textSecondary" component="p">
                            {problem.title}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography variant="body2" color="textSecondary" component="p">
                              {problem.time} minutes
                            </Typography>
                          </Grid>
                        </Grid>
                        );
                      })}
                      </CardContent>
                    </Card>
                }
            </Grid>);
          })
          }
      </Grid>
    );
  }
}

export default withStyles(styles)(BusinessCard);