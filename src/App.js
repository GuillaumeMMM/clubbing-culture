import React from 'react';
import './scss/App.scss';
import { Provider } from 'mobx-react';
import DataStore from './stores/DataStore.js';
import HelpStore from './stores/HelpStore.js';
import Content from './components/pages/Content';

function App() {
  return (
    <div className="App">
      <Provider DataStore={DataStore} HelpStore={HelpStore}>
        <Content></Content>
      </Provider>
    </div>
  );
}

export default App;
