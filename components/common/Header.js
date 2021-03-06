import PropTypes from "prop-types";
import Link from "next/link";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";

const styles = theme => ({
  root: {
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    cursor: "pointer",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  searchWrapper: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  searchRoot: {
    color: "inherit",
    width: "100%"
  },
  searchInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  }
});

const Header = ({ classes, title, toggleMenu }) => (
  <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <IconButton
          className={classes.menuButton}
          color="inherit"
          aria-label="Open drawer"
          onClick={() => {
            toggleMenu(true);
          }}
        >
          <MenuIcon />
        </IconButton>
        <Link href="/">
          <Typography
            className={classes.title}
            variant="h6"
            color="inherit"
            noWrap
          >
            {title}
          </Typography>
        </Link>
        <div className={classes.grow} />
        <div className={classes.searchWrapper}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              input: classes.searchInput,
              root: classes.searchRoot
            }}
          />
        </div>
      </Toolbar>
    </AppBar>
  </div>
);

Header.propTypes = {
  /** Styles */
  classes: PropTypes.shape({
    /** Grow area styles */
    grow: PropTypes.string,
    /** Menu button styles */
    menuButton: PropTypes.string,
    /** Root element styles */
    root: PropTypes.string,
    /** Search icon styles */
    searchIcon: PropTypes.string,
    /** Search input styles object */
    searchInput: PropTypes.string,
    /** Search input root styles */
    searchRoot: PropTypes.string,
    /** Search wrapper styles */
    searchWrapper: PropTypes.string,
    /** Title styles */
    title: PropTypes.string
  }).isRequired,
  /** Title to display in the middle of the header */
  title: PropTypes.string.isRequired,
  /** Function to set the menu visibility */
  toggleMenu: PropTypes.func.isRequired
};

export default withStyles(styles)(Header);
