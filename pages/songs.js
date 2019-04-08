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
import { getAllSongs } from "../store/selectors/musicSelectors";

function renderList(songs) {
  return songs.map(({ artists, id, title }) => (
    <Link href={`/song?id=${id}`} as={`/song/${id}`} key={id}>
      <ListItem button>
        <ListItemAvatar>
          <Avatar>
            <MusicNoteIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={title}
          secondary={artists.reduce((prev, artist) => `${prev}, ${artist}`)}
        />
        <ListItemSecondaryAction>
          <Link href={`/edit-song?id=${id}`} as={`/song/${id}/edit`}>
            <IconButton aria-label="edit">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton aria-label="dalete">
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </Link>
  ));
}

const App = ({ songs }) => (
  <Layout title="Songs">
    <Grid item xs={12} sm={8}>
      <List>{renderList(songs)}</List>
    </Grid>
  </Layout>
);

export default connect((state, props) => ({
  ...props,
  songs: Object.values(getAllSongs(state))
}))(App);
