import { Component } from "react";
import { connect } from "react-redux";
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

    store.dispatch(setSelectedId(id));

    return { id };
  }

  constructor(props) {
    super(props);

    const { song } = props;
    const { artists, text, title, year } = song;

    this.state = {
      artists: artists.map(({ id, name }) => ({ label: name, value: id })),
      text,
      title,
      year
    };

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
      artists.push({ label: name });

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
    const { id, updateSongDetails, updateSongText } = this.props;
    const { artists, text, title, year } = this.state;

    updateSongDetails({
      id,
      details: {
        artists: artists.map(({ value, label }) => ({
          id: value,
          name: label
        })),
        title,
        year
      }
    });
    updateSongText({ id, text });
  }

  render() {
    const { allArtists, song } = this.props;
    const { artists, text, title, year } = this.state;

    return (
      <Layout title={`Edit Song: ${song.title}`}>
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
                label="Artists"
                noOptionsMessage={({ inputValue }) => {
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

export default connect(
  (state, props) => ({
    ...props,
    song: getSelectedSong(state),
    allArtists: getAllArtists(state).map(({ id, name }) => ({
      value: id,
      label: name
    }))
  }),
  { ...musicActions }
)(EditSong);
