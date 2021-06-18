import React from 'react';
import { Provider } from "react-redux";

import Search from './components/Search';
import Navigation from "./navigation/Navigation";
import Store from "./store/configureStore";

class App extends React.Component {
  render() {
    return(
      <Provider store={Store}>
        <Navigation />
      </Provider>
    );
  }
}

export default App;
