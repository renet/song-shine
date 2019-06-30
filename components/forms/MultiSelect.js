import PropTypes from "prop-types";
import Creatable from "react-select/lib/Creatable";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import { emphasize } from "@material-ui/core/styles/colorManipulator";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import CancelIcon from "@material-ui/icons/Cancel";

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250
  },
  input: {
    display: "flex",
    minHeight: 40,
    padding: 0
  },
  valueContainer: {
    alignItems: "center",
    display: "flex",
    flex: 1,
    flexWrap: "wrap",
    overflow: "hidden"
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === "light"
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
      0.08
    )
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  singleValue: {
    fontSize: 16
  },
  placeholder: {
    fontSize: 16,
    left: 2,
    position: "absolute"
  },
  paper: {
    left: 0,
    marginTop: theme.spacing.unit,
    position: "absolute",
    right: 0,
    zIndex: 1
  }
});

function NoOptionsMessage(props) {
  return (
    <Typography
      className={props.selectProps.classes.noOptionsMessage}
      color="textSecondary"
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          children: props.children,
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          ...props.innerProps
        }
      }}
      margin="normal"
      required
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      component="div"
      selected={props.isFocused}
      style={{
        fontWeight: props.isSelected ? 500 : 400
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      className={props.selectProps.classes.placeholder}
      color="textSecondary"
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function SingleValue(props) {
  return (
    <Typography
      className={props.selectProps.classes.singleValue}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return (
    <div className={props.selectProps.classes.valueContainer}>
      {props.children}
    </div>
  );
}

function MultiValue(props) {
  return (
    <Chip
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused
      })}
      deleteIcon={<CancelIcon {...props.removeProps} />}
      label={props.children}
      onDelete={props.removeProps.onClick}
      tabIndex={-1}
    />
  );
}

function Menu(props) {
  return (
    <Paper
      className={props.selectProps.classes.paper}
      square
      {...props.innerProps}
    >
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer
};

/** Basic layout wrapping every content */
const MultiSelect = ({
  classes,
  formatCreateLabel,
  label,
  noOptionsMessage,
  onChange,
  onCreateOption,
  options,
  placeholder,
  theme,
  value
}) => {
  const selectStyles = {
    input: base => ({
      ...base,
      color: theme.palette.text.primary,
      "& input": {
        font: "inherit"
      }
    })
  };

  return (
    <Creatable
      classes={classes}
      components={components}
      isClearable={false}
      isMulti
      noOptionsMessage={noOptionsMessage}
      formatCreateLabel={formatCreateLabel}
      onChange={onChange}
      onCreateOption={onCreateOption}
      options={options}
      placeholder={placeholder}
      styles={selectStyles}
      textFieldProps={{
        label,
        InputLabelProps: {
          shrink: true
        }
      }}
      value={value}
    />
  );
};

MultiSelect.propTypes = {
  /** Styles object for Creatable component */
  classes: PropTypes.object.isRequired,
  /** Function for formatting the label for adding a new value */
  formatCreateLabel: PropTypes.func.isRequired,
  /** Main input label */
  label: PropTypes.string.isRequired,
  /** Function to create the message shown, when no options are available */
  noOptionsMessage: PropTypes.func,
  /** Callback to call on value change */
  onChange: PropTypes.func,
  /** Callback to call when a new option is created */
  onCreateOption: PropTypes.func,
  /** List of available options */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      /** Option value */
      value: PropTypes.string.isRequired,
      /** Option label, if different from value */
      label: PropTypes.string
    })
  ),
  /** Placeholder text */
  placeholder: PropTypes.string,
  /** Styles theme */
  theme: PropTypes.object.isRequired,
  /** List of currently selected options */
  value: PropTypes.arrayOf(
    PropTypes.shape({
      /** Option value */
      value: PropTypes.string.isRequired,
      /** Option label, if different from value */
      label: PropTypes.string
    })
  )
};

export default withStyles(styles, { withTheme: true })(MultiSelect);
