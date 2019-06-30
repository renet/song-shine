import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Link from "next/link";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import GradientIcon from "@material-ui/icons/Gradient";
import SettingsIcon from "@material-ui/icons/Settings";
import QueueMusicIcon from "@material-ui/icons/QueueMusic";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";

const styles = {
  title: {
    cursor: "pointer"
  },
  list: {
    width: 250
  }
};

const SideMenu = ({ classes, open, toggle }) => (
  <SwipeableDrawer
    open={open}
    onClose={() => {
      toggle(false);
    }}
    onOpen={() => {
      toggle(true);
    }}
  >
    <div
      tabIndex={0}
      role="button"
      onClick={() => {
        toggle(false);
      }}
      onKeyDown={() => {
        toggle(false);
      }}
    >
      <AppBar position="static" color="default">
        <Toolbar>
          <Link href="/">
            <Typography variant="h6" color="inherit" className={classes.title}>
              Song Shine
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <div className={classes.list}>
        <List>
          <Link href="/" key="home">
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </Link>
          <Link href="/songs" key="songs">
            <ListItem button>
              <ListItemIcon>
                <QueueMusicIcon />
              </ListItemIcon>
              <ListItemText primary="Songs" />
            </ListItem>
          </Link>
          <Link href="/artists">
            <ListItem button>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Artists" />
            </ListItem>
          </Link>
          <Link href="/backgrounds" key="backgrounds">
            <ListItem button>
              <ListItemIcon>
                <GradientIcon />
              </ListItemIcon>
              <ListItemText primary="Backgrounds" />
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List>
          <Link href="/settings">
            <ListItem button>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
          </Link>
        </List>
      </div>
    </div>
  </SwipeableDrawer>
);

SideMenu.propTypes = {
  /** Styles */
  classes: PropTypes.shape({
    /** Menu list styles */
    list: PropTypes.object,
    /** Title styles */
    title: PropTypes.object
  }).isRequired,
  /** Open state */
  open: PropTypes.object.isRequired,
  /** Function to set the menu visibility */
  toggle: PropTypes.object.isRequired
};

export default withStyles(styles)(SideMenu);
