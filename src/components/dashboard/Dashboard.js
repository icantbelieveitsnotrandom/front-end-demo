import React, { Component, Fragment } from 'react';
import Select from '@material-ui/core/Select';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

import { ArrayContentToolTip, ArrayTypeToolTip, ArrayIndexToolTip, ArrayResultsToolTip, MArrayIndexToolTip, SubmitToolTip, InputToolTip, OutputToolTip, MArrayContentToolTip } from './Tooltips.js';
import randomize from '@icantbelieveitsnotrandom/weighted-randomizer';

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
  },
  form: {
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
  card: {
    marginTop: 10,
    paddingLeft: 20,
    width: 450,
    display: 'inline-block',
    marginLeft: 20,
    float: 'left',
  },
  textField: {
    marginLeft: 20,
  },
  multiArrayDiv: {
    width: 230,
  },
  resultsDiv: {
    margin: 30,
  },
  button: {
    marginLeft: 30,
    marginTop: 20,
    height: 20,
  },
  addarraybutton: {
    marginLeft: 30,
    marginTop: 20,
  },
  multisubmitbutton: {
    marginLeft: 70,
    marginTop: 20,
  },
  radius: {
    borderRadius: 25,
  },
  tooltipButton: {
    marginTop: 10,
  },
});



class Dashboard extends Component {

  state = {
    arrayType: 'single',
    singleArray: '',
    singleResults: '',
    singleIndex: '',
    submitted: false,
    endResult: [],
    arrayCount: [0],
    multiResults: '',
    errors: {
      singleArray: false,
      singleResults: false,
      singleIndex: false,
    },
    tooltips: true,
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    if (event.target.name.includes('multiArray')) {

      let multiResults = '';

      for (let i = 0; i < this.state.arrayCount.length; i++) {
        multiResults += String.fromCharCode(97 + i) + ': \n';
      }

      this.setState({ multiResults });
    }
  };

  singleSubmit = async (e) => {
    e.preventDefault();
    if (!this.state.singleArray || !this.state.singleResults || !this.state.singleIndex) {

      if (!this.state.singleArray) {
        await this.setState({ errors: { ...this.state.errors, singleArray: true } });
      } else {
        await this.setState({ errors: { ...this.state.errors, singleArray: false } });
      }
      if (!this.state.singleResults) {
        await this.setState({ errors: { ...this.state.errors, singleResults: true } });
      } else {
        await this.setState({ errors: { ...this.state.errors, singleResults: false } });
      }
      if (!this.state.singleIndex) {
        await this.setState({ errors: { ...this.state.errors, singleIndex: true } });
      } else {
        await this.setState({ errors: { ...this.state.errors, singleIndex: false } });
      }
    } else {

      await this.setState({ submitted: true, errors: { singleArray: false, singleIndex: false, singleResults: false } });


      let endResult = randomize({
        type: 'single',
        array: this.state.singleArray.split('\n').map(element => {
          try {
            return JSON.parse(element);
          } catch (err) {
            return element;
          }
        }),
        index: this.convertToObject(this.state.singleIndex.split('\n')),
        results: this.convertToObject(this.state.singleResults.split('\n')),
      });

      this.setState({ endResult });
    }
  };

  multiSubmit = (e) => {
    e.preventDefault();

    this.setState({ submitted: true });

    let obj = {};

    Object.keys(this.state).filter(element => element.includes('multiArray')).map((element, i) => obj[String.fromCharCode(97 + i)] = this.state[element].split('\n'));


    let endResult = randomize({
      type: 'multi',
      arrays: obj,
      results: this.convertToObject(this.state.multiResults.split('\n')),
    });

    this.setState({ endResult });
  }


  convertToObject = (array) => {
    let obj = {};
    for (let i = 0; i < array.length; i++) {
      let key = array[i].replace(/\s/g, ''
      ).split(':')[0];

      let value = array[i].replace(/\s/g, ''
      ).split(':')[1];

      try {
        value = JSON.parse(array[i].replace(/\s/g, ''
        ).split(':')[1]);
      } catch (err) {
        //do nothing
      }

      obj[key] = value;
    }

    return obj;
  }

  addArray = () => {
    this.setState({ arrayCount: [...this.state.arrayCount, this.state.arrayCount.length] });
  }

  toggleTooltip = () => {
    this.setState({ tooltips: !this.state.tooltips });
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        className={classes.root}>
        <Grid item><Typography variant='display2' className={classes.title}>Weighted Randomizer</Typography></Grid>

        <form className={classes.form}>
          <Tooltip disableHoverListener={!this.state.tooltips} disableFocusListener disableTouchListener TransitionComponent={Zoom} title={<ArrayTypeToolTip />} placement="bottom">
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
          </Tooltip>

          {/* single array code */}

          {this.state.arrayType === 'single' &&
            <Fragment>

              <Tooltip disableHoverListener={!this.state.tooltips} disableFocusListener disableTouchListener TransitionComponent={Zoom} title={<ArrayContentToolTip />} placement="bottom">
                <TextField
                  className={classes.textField}
                  name="singleArray"
                  placeholder="Array Content"
                  label="Array Content"
                  multiline
                  rowsMax="4"
                  value={this.state.singleArray}
                  onChange={this.handleChange}
                  margin="normal"
                  helperText="enter an element, and then hit enter"
                  variant="outlined"
                  error={this.state.errors.singleArray}
                />
              </Tooltip>

              <Tooltip disableHoverListener={!this.state.tooltips} disableFocusListener disableTouchListener TransitionComponent={Zoom} title={<ArrayIndexToolTip />} placement="bottom">
                <TextField
                  className={classes.textField}
                  name="singleIndex"
                  label="Index"
                  multiline
                  rowsMax="4"
                  value={this.state.singleIndex}
                  onChange={this.handleChange}
                  margin="normal"
                  helperText="a: [<start Index>, <end Index>]"
                  variant="outlined"
                  placeholder="a: [0,4]"
                  error={this.state.errors.singleIndex}
                />
              </Tooltip>

              <Tooltip disableHoverListener={!this.state.tooltips} disableFocusListener disableTouchListener TransitionComponent={Zoom} title={<ArrayResultsToolTip />} placement="bottom">
                <TextField
                  className={classes.textField}
                  name="singleResults"
                  label="singleResults"
                  multiline
                  rowsMax="4"
                  value={this.state.singleResults}
                  onChange={this.handleChange}
                  margin="normal"
                  helperText="a: <item count>"
                  variant="outlined"
                  placeholder="a: 2"
                  error={this.state.errors.singleResults}
                />
              </Tooltip>
            </Fragment>
          }


          {this.state.arrayType === 'multi' &&
            <Fragment>
              <div className={classes.multiArrayDiv}>
                {this.state.arrayCount.map(index => {
                  return (
                    <Tooltip key={index} disableHoverListener={!this.state.tooltips} disableFocusListener disableTouchListener TransitionComponent={Zoom} title={<MArrayContentToolTip />} placement="bottom">
                      <TextField
                        key={index}
                        className={classes.textField}
                        name={`multiArray${index}`}
                        label="Array Content"
                        multiline
                        rowsMax="4"
                        value={this.state[`multiArray${index}`]}
                        onChange={this.handleChange}
                        margin="normal"
                        helperText="enter an element, and then hit enter"
                        variant="outlined"
                        placeholder="dogs"
                      />
                    </Tooltip>
                  );
                })}

                {this.state.arrayType === 'multi' && <Button className={classes.addarraybutton} onClick={this.addArray} variant='contained' size='small' color="primary" >Add Array</Button>}

                {this.state.arrayType === 'multi' &&
                  <Tooltip disableHoverListener={!this.state.tooltips} disableFocusListener disableTouchListener TransitionComponent={Zoom} title={<SubmitToolTip />} placement="bottom">

                    <Button className={classes.button} onClick={this.multiSubmit} size='small' variant="contained" color="primary">
                      Submit
                    </Button>
                  </Tooltip>}
              </div>
              <Tooltip disableHoverListener={!this.state.tooltips} disableFocusListener disableTouchListener TransitionComponent={Zoom} title={<MArrayIndexToolTip />} placement="bottom">

                <TextField
                  className={classes.textField}
                  name="multiResults"
                  label="multiResults"
                  multiline
                  rowsMax="4"
                  value={this.state.multiResults}
                  onChange={this.handleChange}
                  margin="normal"
                  helperText="a: <item count>"
                  variant="outlined"
                  placeholder="a: 2"
                />
              </Tooltip>
            </Fragment>

          }

        </form>

        <br />
        {this.state.arrayType === 'single' &&
          <Tooltip disableHoverListener={!this.state.tooltips} disableFocusListener disableTouchListener TransitionComponent={Zoom} title={<SubmitToolTip />} placement="bottom">

            <Button onClick={this.singleSubmit} size='small' variant="contained" color="primary">
              Submit
            </Button>
          </ Tooltip>

        }

        <br />
        <br />

        {/* RESULTS */}

        <div>

          {this.state.arrayType === 'single' &&
            <Tooltip disableHoverListener={!this.state.tooltips} disableFocusListener disableTouchListener TransitionComponent={Zoom} title={<InputToolTip />} placement="right">
              <Card className={[classes.card, classes.radius].join(' ')}>
                <Typography color="textSecondary">input</Typography>
                <pre>{`
        import randomize from 'weighted-randomizer';

        
        randomize({
            type: 'single',
            array: [${this.state.singleArray.split('\n').map(element => {
                    try {
                      JSON.parse(element);
                      return element;
                    } catch (err) {
                      return '\'' + element + '\'';
                    }
                  })}],
            index: {
                ${this.state.singleIndex.split('\n').map((index, i) => {
                    if (i > 0) return `\n                ` + index;
                    return index;
                  })}
            },
            results: {
                ${this.state.singleResults.split('\n').map((index, i) => {
                    if (i > 0) return `\n                ` + index;
                    return index;
                  })}
            }
        })
        `}</pre>
              </Card>
            </Tooltip>}

          {this.state.submitted && this.state.arrayType === 'single' &&
            <Tooltip disableHoverListener={!this.state.tooltips} disableFocusListener disableTouchListener TransitionComponent={Zoom} title={<OutputToolTip />} placement="right">

              <Card className={classes.card}>
                <Typography color="textSecondary">output</Typography>
                <div className={classes.resultsDiv}>
                  {`[${this.state.endResult.map(element => {
                    try {
                      JSON.parse(element);
                      return element;
                    } catch (err) {
                      return '\'' + element + '\'';
                    }
                  })}]`}
                </div>
              </Card>
            </Tooltip>}


          {this.state.arrayType === 'multi' &&
            <Tooltip disableHoverListener={!this.state.tooltips} disableFocusListener disableTouchListener TransitionComponent={Zoom} title={<InputToolTip />} placement="right">
              <Card className={classes.card}>
                <Typography color="textSecondary">input</Typography>
                <pre>{`
        import randomize from 'weighted-randomizer';

        
        randomize({
            type: 'multi',
            arrays:  {${Object.keys(this.state).filter(element => element.includes('multiArray')).map((element, i) => {
                    let array = this.state[element].split('\n').map(element => {
                      try {
                        JSON.parse(element);
                        return element;
                      } catch (err) {
                        return '\'' + element + '\'';
                      }
                    });
                    return '\n                ' + String.fromCharCode(97 + i) + ': [' + array + ']';
                  })}
            },
            results: {
                ${this.state.multiResults.split('\n').map((index, i) => {
                    if (i > 0) return `\n                ` + index;
                    return index;
                  })}
            }
        })
        `}</pre>
              </Card>
            </Tooltip>}


          {this.state.submitted && this.state.arrayType === 'multi' &&
            <Tooltip disableHoverListener={!this.state.tooltips} disableFocusListener disableTouchListener TransitionComponent={Zoom} title={<OutputToolTip />} placement="right">
              <Card className={classes.card}>
                <Typography color="textSecondary">output</Typography>
                <div className={classes.resultsDiv}>
                  {`[${this.state.endResult.map(element => {
                    try {
                      JSON.parse(element);
                      return element;
                    } catch (err) {
                      return '\'' + element + '\'';
                    }
                  })}]`}
                </div>
              </Card>
            </Tooltip>}
        </div>
        {!this.state.tooltips &&
          <Tooltip disableFocusListener disableTouchListener TransitionComponent={Zoom} title={`enabling tool tips will allow you to see instructions/examples when you hover over an element on screen.`} placement="bottom">

            <Button size='small' variant='contained' className={classes.tooltipButton} onClick={this.toggleTooltip}>Enable Tool Tips</Button>
          </Tooltip>
        }
        {this.state.tooltips && <Button size='small' variant='outlined' className={classes.tooltipButton} onClick={this.toggleTooltip}>Disable Tool Tips</Button>}
        {this.state.tooltips && <Typography variant='caption'>*Hover over each form element to see the tooltip*</Typography>}
      </Grid>
    );
  }
}




const dispatchStateToProps = state => ({ state });

export default connect(dispatchStateToProps, null)(withStyles(styles)(Dashboard));