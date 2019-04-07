import { connect } from "react-redux";
import Link from "next/link";
import { withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import * as pageActions from "../store/actions/pageActions";
import Layout from "../components/common/Layout";

const styles = {
  media: {
    objectFit: "cover"
  }
};

const App = ({ classes }) => (
  <Layout title="Welcome to Song Shine">
    <Grid item xs={12} sm={6} lg={4}>
      <Link href="/songs">
        <Card>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="Songs"
              className={classes.media}
              height="140"
              image="/static/songs.png"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Songs
              </Typography>
              <Typography component="p">
                Show songs in your database and start a presentation
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </Grid>
    <Grid item xs={12} sm={6} lg={4}>
      <Link href="/artists">
        <Card>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="Artists"
              className={classes.media}
              height="140"
              image="/static/artists.jpg"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Artists
              </Typography>
              <Typography component="p">
                Find songs from certain artists or manage artists in your
                database
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </Grid>
  </Layout>
);

export default connect(
  ({ page }, props) => ({ ...props, theme: page.theme }),
  { ...pageActions }
)(withStyles(styles)(App));
