import { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import { setSelectedId } from "../store/actions/pageActions";
import * as musicActions from "../store/actions/musicActions";
import { getSelectedSong } from "../store/selectors/musicSelectors";
import Layout from "../components/common/Layout";

const styles = theme => ({
  artist: {
    "&:not(:last-child)": {
      marginRight: theme.spacing.unit
    }
  },
  artists: {
    marginBottom: theme.spacing.unit * 2
  },
  grid: {
    textAlign: "center"
  },
  text: {
    whiteSpace: "pre-line"
  }
});

class EditSong extends Component {
  static async getInitialProps({ store, query }) {
    const { id } = query;

    store.dispatch(setSelectedId(id));

    return { id };
  }

  constructor(props) {
    super(props);

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
    updateSongDetails({
      id,
      details: { artists: artists.map(({ value }) => value), title, year }
    });
    updateSongText({ id, text });
  }

  render() {
    const { classes, song } = this.props;
    const { artists, text, title, year } = song;

    return (
      <Layout title="Song Details">
        <Grid item xs={12} sm={8} className={classes.grid}>
          <Typography variant="h4" component="h1">
            {title} ({year})
          </Typography>
          <List className={classes.artists}>
            {artists.map(({ name }) => (
              <Chip
                className={classes.artist}
                component="li"
                icon={<FaceIcon />}
                label={name}
              />
            ))}
          </List>
          <Typography component="p" className={classes.text}>
            {text}
          </Typography>
        </Grid>
      </Layout>
    );
  }
}

export default connect(
  (state, props) => ({ ...props, song: getSelectedSong(state) }),
  { ...musicActions }
)(withStyles(styles)(EditSong));