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
  search: {
    wrapper: {
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
    icon: {
      width: theme.spacing.unit * 9,
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    input: {
      root: {
        color: "inherit",
        width: "100%"
      },
      input: {
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
        <div className={classes.search.wrapper}>
          <div className={classes.search.icon}>
            <SearchIcon />
          </div>
          <InputBase placeholder="Search…" classes={classes.search.input} />
        </div>
      </Toolbar>
    </AppBar>
  </div>
);

Header.propTypes = {
  /** Styles */
  classes: PropTypes.shape({
    /** Grow area styles */
    grow: PropTypes.object,
    /** Menu button styles */
    menuButton: PropTypes.object,
    /** Root element styles */
    root: PropTypes.object,
    /** Search styles */
    search: PropTypes.shape({
      /** Search icon styles */
      icon: PropTypes.object,
      /** Search input styles object */
      input: PropTypes.object,
      /** Search wrapper styles */
      wrapper: PropTypes.object
    }),
    /** Title styles */
    title: PropTypes.object
  }).isRequired,
  /** Title to display in the middle of the header */
  title: PropTypes.string.isRequired,
  /** Function to set the menu visibility */
  toggleMenu: PropTypes.func.isRequired
};

export default withStyles(styles)(Header);
