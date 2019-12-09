import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Card from './Card';

const styles = theme => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
});

class Main extends Component {
  constructor () {
    super()

    this.state = {
      books: []
    }
  }

  async componentWillMount() {
    const response = await fetch('/api/books')
    const resp = await response.json()

    this.setState({
      books: resp.data,
    })
  }

  pushToCard = (id) => {
    this.props.history.push(`/books/${id}`)
  }

  render() {
    const { classes, history } = this.props;

    return (
      <React.Fragment>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
              <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                Books are a party.
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => { history.push('/create'); }}
                    >
                      Add a book
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Typography variant="h3" align="left" color="textSecondary" paragraph>
            My books
          </Typography>
          <Grid container spacing={4}>
            {this.state.books.map(book => (
              <Grid item key={book._id} xs={12} sm={6} md={4}>
                <Card
                  id={book._id}
                  title={book.title}
                  subtitle={book.authorName}
                  pushToCard={this.pushToCard}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Main);