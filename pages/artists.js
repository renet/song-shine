import { connect } from "react-redux";
import Link from "next/link";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Layout from "../components/common/Layout";
import { getAllArtists } from "../store/selectors/musicSelectors";

function renderList(artists) {
  return artists.map(({ id, name }) => (
    <Link href={`/artist?id=${id}`} as={`/artist/${id}`} key={id}>
      <ListItem button>
        <ListItemAvatar>
          <Avatar>
            <MusicNoteIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={name} />
        <ListItemSecondaryAction>
          <Link href={`/edit-artist?id=${id}`} as={`/artist/${id}/edit`}>
            <IconButton aria-label="edit">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </Link>
  ));
}

const App = ({ artists }) => (
  <Layout title="Artists">
    <Grid item xs={12} sm={8}>
      <List>{renderList(artists)}</List>
    </Grid>
  </Layout>
);

export default connect((state, props) => ({
  ...props,
  artists: Object.values(getAllArtists(state))
}))(App);
