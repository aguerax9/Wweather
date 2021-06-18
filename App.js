import React from 'react';
import { Provider } from "react-redux";

import Search from './components/Search';
import Navigation from "./navigation/Navigation";

class App extends React.Component {
  render() {
    return(
      <Navigation />
    );
  }
}

export default App;
