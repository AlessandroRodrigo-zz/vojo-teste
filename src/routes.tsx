import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Feed from './pages/feed';

export default function App(): JSX.Element {
  return (
    <HashRouter hashType={'slash'}>
      <Switch>
        <Route path={'/'} exact component={Feed} />
      </Switch>
    </HashRouter>
  );
}
