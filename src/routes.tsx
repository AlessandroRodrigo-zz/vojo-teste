import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/home';

export default function App(): JSX.Element {
  return (
    <Router>
      <Switch>
        <Route path={'/'} exact component={Home} />
      </Switch>
    </Router>
  );
}
