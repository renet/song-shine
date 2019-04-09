import { useState } from "react";
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
  },
  grid: {
    // Fix horizontal scrollbar issue
    margin: 0,
    width: "100%"
  }
});

/** Basic layout wrapping every content */
const Layout = ({ children, classes, title }) => {
  const [sideMenuOpen, toggleSideMenu] = useState(false);

  return (
    <>
      <Head>
        <title>{title} - Song Shine</title>
      </Head>
      <Header toggleMenu={toggleSideMenu} title={title} />
      <Grid container spacing={24} justify="center" className={classes.grid}>
        <SideMenu open={sideMenuOpen} toggle={toggleSideMenu} />
        {children}
        <Fab className={classes.fab} color="primary">
          <AddIcon />
        </Fab>
      </Grid>
    </>
  );
};

Layout.propTypes = {
  /** Page content */
  children: PropTypes.node
};

export default withStyles(styles)(Layout);
