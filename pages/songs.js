import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { getAllSongs } from "../store/selectors/musicSelectors";
import Layout from "../components/common/Layout";
import SongList from "../components/lists/SongList";

const App = ({ songs }) => (
  <Layout title="Songs">
    <Grid item xs={12} sm={8}>
      <SongList songs={songs} />
    </Grid>
  </Layout>
);

export default connect((state, props) => ({
  ...props,
  songs: getAllSongs(state)
}))(App);
