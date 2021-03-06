import PropTypes from "prop-types";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { getSortedSongs } from "../store/selectors/musicSelectors";
import Layout from "../components/common/Layout";
import SongList from "../components/lists/SongList";

const Songs = ({ songs }) => (
  <Layout title="Songs">
    <Grid item xs={12} sm={8}>
      <SongList songs={songs} />
    </Grid>
  </Layout>
);

Songs.propTypes = {
  /** List of songs */
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

export default connect((state, props) => ({
  ...props,
  songs: getSortedSongs(state)
}))(Songs);
