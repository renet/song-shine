import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Head from "next/head";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Header from "./Header";
import SideMenu from "./SideMenu";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  fab: {
    bottom: theme.spacing.unit * 2,
    position: "fixed",
    right: theme.spacing.unit * 2
  }
});

/** Basic layout wrapping every content */
const Layout = ({ children, classes, title }) => (
  <div className={classes.root}>
    <Head>
      <title>{title}</title>
    </Head>
    <Grid container spacing={24} justify="center">
      <Header title={title} />
      <SideMenu />
      {children}
      <Fab className={classes.fab} color="primary">
        <AddIcon />
      </Fab>
    </Grid>
  </div>
);

Layout.propTypes = {
  /** Page content */
  children: PropTypes.node
};

export default withStyles(styles)(Layout);
