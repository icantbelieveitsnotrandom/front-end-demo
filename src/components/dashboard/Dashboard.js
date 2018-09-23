// prefilled data option also
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
  card: {
    marginTop: 10,
    paddingLeft: 20,
    width: 450,
    display: 'inline-block',
    marginLeft: 20,
    float: 'left',
  },
  multiline: {
    marginLeft: 10,
  },
  multiArrayDiv: {
    width: 230
  },
  resultsDiv: {
    margin: 30
  },
  button: {
    marginTop: 20,
    marginLeft: 10,
    height: 20,
  }
});



class Dashboard extends Component {

  state = {
    arrayType: '',
    singleArray: '',
    singleResults: '',
    singleIndex: '',
    submitted: false,
    endResult: '',
    arrayCount: [0],
    multiResults: '',
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    if(event.target.name.includes('multiArray')) {

      let multiResults = '';

      for(let i = 0; i < this.state.arrayCount.length; i ++) {
        multiResults += String.fromCharCode(97 + i) +  ': \n'
      }

      this.setState({multiResults}, ()=> console.log(this.state));
    }
  };

  singleSubmit = (e) => {
    e.preventDefault();
    this.setState({ submitted: true });


    let endResult = randomize({
      type: 'single',
      array: this.state.singleArray.split('\n').map(element => {
        try {
          return JSON.parse(element);
        } catch (err) {
          return element
        }
      }),
      index: this.convertToObject(this.state.singleIndex.split('\n')),
      results: this.convertToObject(this.state.singleResults.split('\n')),
    })

    this.setState({ endResult }, () => { console.log(this.state.endResult) })
  };

  multiSubmit = (e) => {
    e.preventDefault();
    this.setState({ submitted: true });

    console.log(this.state);
    let obj = {}
    console.log(Object.keys(this.state).filter(element => element.includes('multiArray')).map((element, i) => obj[String.fromCharCode(97 + i)] = this.state[element].split('\n')))
    console.log(obj);

    let endResult =  randomize({
      type: 'multi',
      arrays: obj,
      results: this.convertToObject(this.state.multiResults.split('\n'))
    })

    this.setState({ endResult }, () => { console.log(this.state.endResult) })
  }

  convertToObject = (array) => {
    let obj = {};
    for (let i = 0; i < array.length; i++) {
      let key = array[i].replace(/\s/g, ''
      ).split(':')[0]

      let value = array[i].replace(/\s/g, ''
      ).split(':')[1]

      try {
        value = JSON.parse(array[i].replace(/\s/g, ''
        ).split(':')[1])
      } catch (err) {
        //do nothing
      }

      obj[key] = value
    }

    return obj
  }

  addArray = () => {
    this.setState({ arrayCount: [...this.state.arrayCount, this.state.arrayCount.length] });
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

          {/* single array code */}

          {this.state.arrayType === 'single' &&
            <TextField
              className={classes.multiline}
              name="singleArray"
              label="Array Content"
              multiline
              rowsMax="4"
              value={this.state.singleArray}
              onChange={this.handleChange}
              margin="normal"
              helperText="enter an element, and then hit enter"
              variant="filled"
            />
          }

          {this.state.arrayType === 'single' &&
            <TextField
              className={classes.multiline}
              name="singleIndex"
              label="Index"
              multiline
              rowsMax="4"
              value={this.state.singleIndex}
              onChange={this.handleChange}
              margin="normal"
              helperText="a: [<start Index>, <end Index>]"
              variant="filled"
              placeholder="a: [0,4]"
            />
          }

          {this.state.arrayType === 'single' &&
            <TextField
              className={classes.multiline}
              name="singleResults"
              label="singleResults"
              multiline
              rowsMax="4"
              value={this.state.singleResults}
              onChange={this.handleChange}
              margin="normal"
              helperText="a: <item count>"
              variant="filled"
              placeholder="a: 2"
            />
          }
          {/* multi array code */}
          {this.state.arrayType === 'multi' && <div className={classes.multiArrayDiv}>
            {this.state.arrayCount.map(index => {
              return <TextField
                key={index}
                className={classes.multiline}
                name={`multiArray${index}`}
                label="Array Content"
                multiline
                rowsMax="4"
                value={this.state[`multiArray${index}`]}
                onChange={this.handleChange}
                margin="normal"
                helperText="enter an element, and then hit enter"
                variant="filled"
                placeholder="dogs"
              />
            })}
            {this.state.arrayType === 'multi' && <Button onClick={this.addArray} variant='contained' size='small' color="primary" className={classes.button}>Add Array</Button>}
          </div>}

          {this.state.arrayType === 'multi' &&
            <TextField
              className={classes.multiline}
              name="multiResults"
              label="multiResults"
              multiline
              rowsMax="4"
              value={this.state.multiResults}
              onChange={this.handleChange}
              margin="normal"
              helperText="a: <item count>"
              variant="filled"
              placeholder="a: 2"
            />
          }

        </form>

        <br />
        {this.state.arrayType === 'single' && <Button onClick={this.singleSubmit} size='small' variant="contained" color="primary">
          Submit
      </Button>}
        {this.state.arrayType === 'multi' && <Button onClick={this.multiSubmit} size='small' variant="contained" color="primary">
          Submit
      </Button>}
        <br />
        <br />
        <div>
          {this.state.arrayType === 'single' && <Card className={classes.card}>
            <Typography color="textSecondary">input</Typography>
            <pre>{`
        import randomize from 'weighted-randomizer';

        
        randomize({
            type: 'single',
            array: [${this.state.singleArray.split('\n').map(element => {
                try {
                  JSON.parse(element)
                  return element
                } catch (err) {
                  return '\'' + element + '\'';
                }
              })}],
            index: {
                ${this.state.singleIndex.split('\n').map((index, i) => {
                if (i > 0) return `\n                ` + index
                return index
              })}
            },
            results: {
                ${this.state.singleResults.split('\n').map((index, i) => {
                if (i > 0) return `\n                ` + index
                return index
              })}
            }
        })
        `}</pre>
          </Card>}
          {this.state.submitted && this.state.arrayType === 'single' && <Card className={classes.card}>
            <Typography color="textSecondary">output</Typography>
            <div className={classes.resultsDiv}>
              {`[${this.state.endResult.map(element => {
                try {
                  JSON.parse(element)
                  return element
                } catch (err) {
                  return '\'' + element + '\'';
                }
              })}]`}
            </div>
          </Card>}
          {this.state.arrayType === 'multi' && <Card className={classes.card}>
            <Typography color="textSecondary">input</Typography>
            <pre>{`
        import randomize from 'weighted-randomizer';

        
        randomize({
            type: 'multi',
            arrays:  {${Object.keys(this.state).filter(element => element.includes('multiArray')).map((element, i) => {
                let array = this.state[element].split('\n').map(element => {
                  try {
                    JSON.parse(element)
                    return element
                  } catch (err) {
                    return '\'' + element + '\'';
                  }
                })
                return '\n                ' + String.fromCharCode(97 + i) + ': [' + array + ']'
              })}
            },
            results: {
                ${this.state.multiResults.split('\n').map((index, i) => {
                if (i > 0) return `\n                ` + index
                return index
              })}
            }
        })
        `}</pre>
          </Card>}
          {this.state.submitted && this.state.arrayType === 'multi' && <Card className={classes.card}>
            <Typography color="textSecondary">output</Typography>
            <div className={classes.resultsDiv}>
              {`[${this.state.endResult.map(element => {
                try {
                  JSON.parse(element)
                  return element
                } catch (err) {
                  return '\'' + element + '\'';
                }
              })}]`}
            </div>
          </Card>}
        </div>
      </Fragment>
    );
  }
}




const dispatchStateToProps = state => ({ state });

export default connect(dispatchStateToProps, null)(withStyles(styles)(Dashboard))
