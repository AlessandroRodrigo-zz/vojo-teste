import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Feed from './pages/feed';
import Navbar from './components/ui/organisms/navbar';
import SignIn from './pages/sign_in';
import SignUp from './pages/sign_up';
import Article from './pages/article';

export default function App(): JSX.Element {
  return (
    <HashRouter hashType={'slash'}>
      <Navbar>
        <Switch>
          <Route path={'/'} exact component={Feed} />
          <Route path={'/login'} exact component={SignIn} />
          <Route path={'/register'} exact component={SignUp} />
          <Route path={'/article/:slug'} exact component={Article} />
        </Switch>
      </Navbar>
    </HashRouter>
  );
}
