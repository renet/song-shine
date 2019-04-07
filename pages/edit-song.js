import { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import classNames from "classnames";
import { withStyles } from "@material-ui/core";
import { emphasize } from "@material-ui/core/styles/colorManipulator";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import CancelIcon from "@material-ui/icons/Cancel";
import * as pageActions from "../store/actions/pageActions";
import * as musicActions from "../store/actions/musicActions";
import { getAllArtists, getAllSongs } from "../store/selectors/musicSelectors";
import Layout from "../components/common/Layout";
import { AST_PrefixedTemplateString } from "terser";

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250
  },
  input: {
    display: "flex",
    padding: 0
  },
  valueContainer: {
    display: "flex",
    flexWrap: "wrap",
    flex: 1,
    alignItems: "center",
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
    position: "absolute",
    left: 2,
    fontSize: 16
  },
  paper: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  divider: {
    height: theme.spacing.unit * 2
  }
});

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
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
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps
        }
      }}
      {...props.selectProps.textFieldProps}
      margin="normal"
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
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
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
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
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

function Menu(props) {
  return (
    <Paper
      square
      className={props.selectProps.classes.paper}
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

class EditSong extends Component {
  static async getInitialProps({ query }) {
    return {
      id: query.id
    };
  }

  constructor(props) {
    super(props);

    const { allArtists, setPageTitle, song } = props;
    const { artists, text, title, year } = song;

    this.state = {
      artists: allArtists.filter(artist => artists.includes(artist.value)),
      text,
      title,
      year
    };

    setPageTitle(`Edit Song: ${song.title}`);

    this.handleArtistsChange = this.handleArtistsChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
  }

  handleArtistsChange(value) {
    this.setState({
      artists: value
    });
  }

  handleTextChange(event) {
    this.setState({ text: event.target.value });
  }

  handleTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  handleYearChange(event) {
    this.setState({ year: event.target.value });
  }

  saveChanges() {
    const { id, updateSongDetails, updateSongText } = this.props;
    const { artists, text, title, year } = this.state;
    console.log("yu");
    updateSongDetails({
      id,
      details: { artists: artists.map(({ value }) => value), title, year }
    });
    updateSongText({ id, text });
  }

  render() {
    const { allArtists, classes, theme } = this.props;

    const { artists, text, title, year } = this.state;
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
      <Layout>
        <Grid item xs={12} sm={8}>
          <Grid container justify="flex-end" spacing={24}>
            <Grid item xs={9}>
              <TextField
                fullWidth
                label="Song Title"
                margin="normal"
                onChange={this.handleTitleChange}
                value={title}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Year"
                margin="normal"
                onChange={this.handleYearChange}
                type="number"
                value={year}
              />
            </Grid>
            <Grid item xs={12}>
              <Select
                classes={classes}
                styles={selectStyles}
                textFieldProps={{
                  label: "Artists",
                  InputLabelProps: {
                    shrink: true
                  }
                }}
                options={allArtists}
                components={components}
                value={artists}
                onChange={this.handleArtistsChange}
                placeholder="Select one or more artists..."
                isMulti
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Lyrics"
                margin="normal"
                multiline
                onChange={this.handleTextChange}
                value={text}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={this.saveChanges}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Layout>
    );
  }
}

export default connect(
  (state, props) => ({
    ...props,
    song: getAllSongs(state)[props.id] || {},
    allArtists: Object.values(getAllArtists(state)).map(({ id, name }) => ({
      value: id,
      label: name
    }))
  }),
  { ...pageActions, ...musicActions }
)(withStyles(styles, { withTheme: true })(EditSong));
