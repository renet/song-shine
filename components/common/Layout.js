import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Header from "./Header";
import SideMenu from "./SideMenu";

const toggleTheme = (setTheme, currentTheme) =>
  setTheme(currentTheme === "dark" ? "light" : "dark");

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  }
});

const Layout = ({ children, classes }) => (
  <div className={classes.root}>
    <Grid container spacing={24}>
      <Header />
      <SideMenu />
      {children}
    </Grid>
  </div>
);

Layout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Layout);
