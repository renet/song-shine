import { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Router from "next/router";
import uuidv4 from "uuid/v4";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { setSelectedId } from "../store/actions/pageActions";
import * as musicActions from "../store/actions/musicActions";
import {
  getAllArtists,
  getSelectedSong
} from "../store/selectors/musicSelectors";
import Layout from "../components/common/Layout";
import MultiSelect from "../components/forms/MultiSelect";

class EditSong extends Component {
  static async getInitialProps({ store, query }) {
    const { id } = query;
    const addNew = !id;
    const selectedId = id || uuidv4();

    // If a new ID is created, unset selected ID.
    store.dispatch(setSelectedId(id));

    return { addNew, id: selectedId };
  }

  constructor(props) {
    super(props);

    const { addNew, song } = props;

    if (addNew) {
      this.state = {
        artists: []
      };
    } else {
      const { artists, text, title, year } = song;

      this.state = {
        artists: artists.map(({ id, name }) => ({ label: name, value: id })),
        text,
        title,
        year
      };
    }

    this.handleArtistCreate = this.handleArtistCreate.bind(this);
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

  handleArtistCreate(name) {
    this.setState(({ artists }) => {
      artists.push({ label: name, value: name });

      return { artists };
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
    const {
      addNew,
      addSong,
      id,
      updateSongDetails,
      updateSongText
    } = this.props;
    const { artists, text, title, year } = this.state;
    const mappedArtists = artists.map(({ value, label }) => ({
      id: value,
      name: label
    }));

    if (addNew) {
      addSong({
        artists: mappedArtists,
        id,
        text,
        title,
        year
      });

      Router.push(`/edit-song?id=${id}`, `/song/${id}/edit`);
    } else {
      updateSongDetails({
        id,
        details: {
          artists: mappedArtists,
          title,
          year
        }
      });
      updateSongText({ id, text });
    }
  }

  render() {
    const { addNew, allArtists, song } = this.props;
    const { artists, text, title, year } = this.state;

    return (
      <Layout title={addNew ? "New Song" : `Edit Song: ${song.title}`}>
        <Grid item xs={12} sm={8}>
          <Grid container justify="flex-end" spacing={24}>
            <Grid item xs={9}>
              <TextField
                fullWidth
                label="Song title"
                margin="normal"
                onChange={this.handleTitleChange}
                value={title}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Year"
                margin="normal"
                onChange={this.handleYearChange}
                type="number"
                value={year}
              />
            </Grid>
            <Grid item xs={12}>
              <MultiSelect
                formatCreateLabel={inputValue =>
                  `Add "${inputValue}" as new artist.`
                }
                label="Artists"
                noOptionsMessage={() => {
                  const { artists } = this.state;

                  if (artists.length) {
                    return "No other artists available.";
                  }

                  return "You haven't added any artists to the database, yet.";
                }}
                onChange={this.handleArtistsChange}
                onCreateOption={this.handleArtistCreate}
                options={allArtists}
                placeholder="Select one or more artists..."
                value={artists}
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

EditSong.propTypes = {
  /** List of all available artists */
  allArtists: PropTypes.arrayOf(
    PropTypes.shape({
      /** Artist ID */
      value: PropTypes.string.isRequired,
      /** Artist name */
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  /** Current song */
  song: PropTypes.shape({
    /** List of song artists */
    artists: PropTypes.arrayOf(
      PropTypes.shape({
        /** Artist ID */
        id: PropTypes.string.isRequired,
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
  /** Song ID */
  id: PropTypes.string.isRequired,
  /** Function that updates a song in store */
  updateArtist: PropTypes.func.isRequired
};

export default connect(
  (state, props) => ({
    ...props,
    allArtists: getAllArtists(state).map(({ id, name }) => ({
      value: id,
      label: name
    })),
    song: getSelectedSong(state)
  }),
  { ...musicActions }
)(EditSong);
