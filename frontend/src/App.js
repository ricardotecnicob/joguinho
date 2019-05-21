import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Jogo from './pages/Jogo';
import Records from './pages/Records';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/jogo" component={Jogo} />
            <Route path="/pontuacao" component={Records} />
        </Switch>
    </BrowserRouter>
    );
  }
}

export default App;


