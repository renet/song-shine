import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
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
      <div className={classes.list}>
        <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
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
