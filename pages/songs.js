import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import Link from "next/link";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import * as pageActions from "../store/actions/pageActions";
import Layout from "../components/common/Layout";
import { getAllSongs } from "../store/selectors/musicSelectors";

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752
  },
  demo: {
    backgroundColor: theme.palette.background.paper
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`
  }
});

function renderList(songs) {
  return songs.map(({ artists, id, title }) => (
    <Link href={`/song/${id}`} key={id}>
      <ListItem button>
        <ListItemAvatar>
          <Avatar>
            <MusicNoteIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={title}
          secondary={artists.reduce((artist, string) => `${string}, artist`)}
        />
        <ListItemSecondaryAction>
          <Link href={`/song/${id}/edit`} key={id}>
            <IconButton aria-label="edit">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton aria-label="edit">
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </Link>
  ));
}

const App = ({ classes, songs }) => (
  <Layout title="Songs">
    <Grid item xs={12} sm={8}>
      <List>{renderList(songs)}</List>
    </Grid>
  </Layout>
);

export default connect((state, props) => ({
  ...props,
  songs: Object.values(getAllSongs(state))
}))(withStyles(styles)(App));
