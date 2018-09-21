
import React, { Component, Fragment } from 'react';
import Select from '@material-ui/core/Select';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import randomize from 'imeanireallycantbelieveitsnotrandom';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});



class Dashboard extends Component {
  
  state = { 
    arrayType: '',
    multiline: '',
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    let arr = this.state.multiline.split('\n')
    console.log(arr);
  }

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <form className={classes.root}>
          <FormControl className={classes.formControl}>
            <InputLabel>Array Type</InputLabel>
            <Select
              value={this.state.arrayType}
              onChange={this.handleChange}
              inputProps={{
                name: 'arrayType',
                id: 'array-type',
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value='single'>Single</MenuItem>
              <MenuItem value='multi'>Multi</MenuItem>

            </Select>
          </FormControl>
          {this.state.arrayType === 'single' && <TextField
          
          id="filled-multiline-flexible"
          name="multiline"
          label="Multiline"
          multiline
          rowsMax="4"
          value={this.state.multiline}
          onChange={this.handleChange}
          margin="normal"
          helperText="enter an element, and then hit enter"
          variant="filled"
        />}
        </form>
        {this.state.arrayType === 'multi' && <p>multi</p>}
        {this.state.arrayType === 'single' && <p>single</p>}
        <br />
        <Button onClick={this.onSubmit} size='small' variant="contained" color="primary" className={classes.button}>
          Submit
      </Button>
      </Fragment>
    );
  }
}




const dispatchStateToProps = state => ({ state });

export default connect(dispatchStateToProps, null)(withStyles(styles)(Dashboard))
