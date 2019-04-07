import { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import * as musicActions from "../store/actions/musicActions";
import { getAllArtists } from "../store/selectors/musicSelectors";
import Layout from "../components/common/Layout";

class EditArtist extends Component {
  static async getInitialProps({ query }) {
    return {
      id: query.id
    };
  }

  constructor(props) {
    super(props);

    const { artist } = props;

    this.state = { ...artist };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  saveChanges() {
    const { id, updateArtist } = this.props;
    const { name } = this.state;

    updateArtist({ id, name });
  }

  render() {
    const { artist } = this.props;
    const { name } = this.state;
    return (
      <Layout title={`Edit Artist: ${artist.name}`}>
        <Grid item xs={12} sm={8}>
          <Grid container justify="flex-end">
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Artist Name"
                value={name}
                onChange={this.handleNameChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={this.saveChanges}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Layout>
    );
  }
}

export default connect(
  (state, props) => ({
    ...props,
    theme: state.page.theme,
    artist: getAllArtists(state)[props.id] || {}
  }),
  { ...musicActions }
)(EditArtist);
