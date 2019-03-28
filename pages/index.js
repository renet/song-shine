import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import * as pageActions from "../store/actions/pageActions";

const toggleTheme = (setTheme, currentTheme) =>
  setTheme(currentTheme === "dark" ? "light" : "dark");

const App = ({ setTheme, theme }) => (
  <>
    <Button
      variant="contained"
      color="primary"
      onClick={() => toggleTheme(setTheme, theme)}
    >
      Toggle Theme
    </Button>
  </>
);

export default connect(
  ({ page }, props) => ({ ...props, theme: page.theme }),
  { ...pageActions }
)(App);
