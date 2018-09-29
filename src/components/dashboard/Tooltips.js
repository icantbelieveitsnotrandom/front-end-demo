import { React } from 'react';
import { withStyles } from '@material-ui/core/styles';
import HelpOutline from '@material-ui/icons/HelpOutline';

const styles = () => ({
  basic: {
    color: 'white',
    width: 300,
    fontSize: 12,
  },
  icon: {
    marginRight: 10,
    justifySelf: 'center',
    marginTop: 0,
  },
  float: {
    display: 'flex',
    height: '100%',
    float: 'left',
  },
  example: {
    marginLeft: 35,
  },
});


export const ArrayTypeToolTip = withStyles(styles)((props) => {
  return (
    <div className={props.classes.basic}>
      <div className={props.classes.float}>
        <p className={props.classes.icon} ><HelpOutline /></p>
      </div>
      <div>
        <p>'Single' utilizes one array, 'Multi' will use one or more arrays.</p>
      </div>
    </div>
  );
});

export const ArrayContentToolTip = withStyles(styles)((props) => {
  return (
    <div className={props.classes.basic}>
      <div className={props.classes.float}>
        <p className={props.classes.icon}><HelpOutline /></p>
      </div>
      <p>Unlike a regular array  where items are delineated by commas, you can just enter in items and hit return/enter.</p>
      <div className={props.classes.example}>
        <p>Example:</p>
        <p>huskies <br /> dachshund <br /> pug <br /> pitbull <br /> corgi</p>
      </div>
    </div>
  );
});

export const ArrayIndexToolTip = withStyles(styles)((props) => {
  return (
    <div className={props.classes.basic}>
      <div className={props.classes.float}>
        <p className={props.classes.icon}><HelpOutline /></p>
      </div>
      <p>Break up the single array into sections.</p>
      <div className={props.classes.example}>
        <p>*NOTE* the end index value cannot exceed the length of the single array.</p>
        <p>Example:</p>
        <p>a: [0,1] <br /> b: [2,2] <br /> c: [2,4]</p>
        <p>Notice that indexes can overlap.</p>
      </div>
    </div>
  );
});


export const ArrayResultsToolTip = withStyles(styles)((props) => {
  return (
    <div className={props.classes.basic}>
      <div className={props.classes.float}>
        <p className={props.classes.icon}><HelpOutline /></p>
      </div>
      <p>This section determines the number of items you want from each index.</p>
      <div className={props.classes.example}>
        <p>*NOTE* the total from this form cannot exceed the length of the single array.</p>
        <p>Example:</p>
        <p>a: 1 <br /> b: 1 <br /> c: 1</p>
      </div>
    </div>
  );
});

export const SubmitToolTip = withStyles(styles)((props) => {
  return (
    <div className={props.classes.basic}>
      <div className={props.classes.float}>
        <p className={props.classes.icon}><HelpOutline /></p>
      </div>
      <p>Hitting submit will display an output section, which will show you what the end results will look like.</p>
    </div>
  );
});

export const InputToolTip = withStyles(styles)((props) => {
  return (
    <div className={props.classes.basic}>
      <div className={props.classes.float}>
        <p className={props.classes.icon}><HelpOutline /></p>
      </div>
      <p>Drop and paste the code in your project! Make sure you import the npm package before putting it in your code.</p>
    </div>
  );
});

export const OutputToolTip = withStyles(styles)((props) => {
  return (
    <div className={props.classes.basic}>
      <div className={props.classes.float}>
        <p className={props.classes.icon}><HelpOutline /></p>
      </div>
      <p>expected output from the function when it runs.</p>
    </div>
  );
});

export const MArrayContentToolTip = withStyles(styles)((props) => {
  return (
    <div className={props.classes.basic}>
      <div className={props.classes.float}>
        <p className={props.classes.icon}><HelpOutline /></p>
      </div>
      <p>Unlike a regular array  where items are delineated by commas, you can just enter in items and hit return/enter.</p>
      <div className={props.classes.example}>
        <p>To add additional arrays, click on the 'Add Array' button</p>
        <p>Example:</p>
        <p>huskies <br /> dachshund <br /> pug <br /> pitbull <br /> corgi</p>
      </div>
    </div>
  );
});

export const MArrayIndexToolTip = withStyles(styles)((props) => {
  return (
    <div className={props.classes.basic}>
      <div className={props.classes.float}>
        <p className={props.classes.icon}><HelpOutline /></p>
      </div>
      <p>This section determines how many items form each array you want to be in the final results.</p>
      <div className={props.classes.example}>
        <p>*NOTE* the end index value cannot exceed the length of the related array.</p>
        <p>Example:</p>
        <p>a: 1 <br /> b: 2 <br /> c: 3</p>
      </div>
    </div>
  );
});