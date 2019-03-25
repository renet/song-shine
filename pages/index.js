import { createGlobalStyle } from 'styled-components';
import Head from 'next/head';
import Button from '@material-ui/core/Button';

const GlobalStyles = createGlobalStyle`
  body {
    @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500');
    @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
  }
`

const App = () => (
  <div>
    <Button variant="contained" color="primary">
      Welcome to Next.js!
    </Button>
    <GlobalStyles />
  </div>
);

export default App;
