import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
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
import PersonIcon from "@material-ui/icons/Person";
import * as pageActions from "../../store/actions/pageActions";

const styles = {
  list: {
    width: 250
  }
};

const SideMenu = ({ classes, sidemenuOpen, toggleSideMenu }) => (
  <SwipeableDrawer
    open={sidemenuOpen}
    onClose={() => {
      toggleSideMenu(false);
    }}
    onOpen={() => {
      toggleSideMenu(true);
    }}
  >
    <div
      tabIndex={0}
      role="button"
      onClick={() => {
        toggleSideMenu(false);
      }}
      onKeyDown={() => {
        toggleSideMenu(false);
      }}
    >
      <AppBar position="static" color="gray">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Song Shine
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.list}>
        <List>
          <ListItem button key="songs">
            <ListItemIcon>
              <QueueMusicIcon />
            </ListItemIcon>
            <ListItemText primary="Songs" />
          </ListItem>
          <ListItem button key="artists">
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Artists" />
          </ListItem>
          <ListItem button key="settings">
            <ListItemIcon>
              <GradientIcon />
            </ListItemIcon>
            <ListItemText primary="Backgrounds" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button key="settings">
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </div>
    </div>
  </SwipeableDrawer>
);

SideMenu.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  ({ page }, props) => ({ ...props, sidemenuOpen: page.sidemenuOpen }),
  { ...pageActions }
)(withStyles(styles)(SideMenu));
