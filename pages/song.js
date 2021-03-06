import { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Link from "next/link";
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
    display: "inline",

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

class Song extends Component {
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
            {artists.map(({ id, name }) => (
              <li className={classes.artist} key={id}>
                <Link href={`/artist?id=${id}`} as={`/artist/${id}`}>
                  <Chip component="a" icon={<FaceIcon />} label={name} />
                </Link>
              </li>
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

Song.propTypes = {
  /** Styles */
  classes: PropTypes.shape({
    /** Single artist styles */
    artist: PropTypes.string.isRequired,
    /** Artist list style */
    artists: PropTypes.string.isRequired,
    /** Grid style */
    grid: PropTypes.string.isRequired,
    /** Lyrics style */
    text: PropTypes.string.isRequired
  }).isRequired,
  /** Current song ID */
  id: PropTypes.string.isRequired,
  /** Current song */
  song: PropTypes.shape({
    /** Song artists */
    artists: PropTypes.arrayOf(
      PropTypes.shape({
        /** Artist name */
        name: PropTypes.string.isRequired
      })
    ).isRequired,
    /** Song lyrics */
    text: PropTypes.string.isRequired,
    /** Song title */
    title: PropTypes.string.isRequired,
    /** Publication year of the song */
    year: PropTypes.number.isRequired
  }).isRequired,
  /** Function to update current song details in state */
  updateSongDetails: PropTypes.func.isRequired,
  /** Function to update the current song text in state */
  updateSongText: PropTypes.func.isRequired
};

export default connect(
  (state, props) => ({ ...props, song: getSelectedSong(state) }),
  { ...musicActions }
)(withStyles(styles)(Song));
