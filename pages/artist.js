import { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { setSelectedId } from "../store/actions/pageActions";
import * as musicActions from "../store/actions/musicActions";
import {
  getSelectedArtist,
  getSongsBySelectedArtist
} from "../store/selectors/musicSelectors";
import Layout from "../components/common/Layout";
import SongList from "../components/lists/SongList";

class Artist extends Component {
  static async getInitialProps({ store, query }) {
    const { id } = query;

    store.dispatch(setSelectedId(id));

    return { id };
  }

  render() {
    const { artist, songs } = this.props;
    const { name } = artist;

    return (
      <Layout title={`Songs by ${name}`}>
        <Grid item xs={12} sm={8}>
          <SongList songs={songs} />
        </Grid>
      </Layout>
    );
  }
}

Artist.propTypes = {
  /** Artist */
  artist: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  /** Songs of the current artist */
  songs: PropTypes.arrayOf(
    PropTypes.shape({
      /** List of song artists */
      artists: PropTypes.array.isRequired,
      /** Song ID */
      id: PropTypes.string.isRequired,
      /** Song title */
      title: PropTypes.string.isRequired
    })
  ).isRequired
};

export default connect(
  (state, props) => ({
    ...props,
    artist: getSelectedArtist(state),
    songs: getSongsBySelectedArtist(state)
  }),
  { ...musicActions }
)(Artist);
