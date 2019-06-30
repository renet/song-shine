import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { getAllSongs } from "../store/selectors/musicSelectors";
import Layout from "../components/common/Layout";
import SongList from "../components/lists/SongList";

const Songs = ({ songs }) => (
  <Layout title="Songs">
    <Grid item xs={12} sm={8}>
      <SongList songs={songs} />
    </Grid>
  </Layout>
);

Artists.propTypes = {
  /** List of songs */
  songs: PropTypes.arrayOf(
    PropTypes.shape({
      /** List of song artists */
      artists: PropTypes.shape().isRequired,
      /** Song ID */
      id: PropTypes.string.isRequired,
      /** Song title */
      title: PropTypes.string.isRequired
    })
  ).isRequired
};

export default connect((state, props) => ({
  ...props,
  songs: getAllSongs(state)
}))(Songs);
