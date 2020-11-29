import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './index.scss';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';

import Home from './pages/home/Home';
import ViewPost from './pages/view-post/ViewPost';
import Profile from './pages/profile/Profile';
import Settings from './pages/settings/Settings';
import Search from './pages/search/Search';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/forgot-password" component={ForgotPassword}/>
        <Route path="/search" component={Search}/>
        <Route path="/settings" component={Settings}/>
        <Route path="/:username/post/:postID" children={<ViewPost/>}/>
        <Route path="/:username" children={<Profile/>}/>
        <Route exact path="/" component={Home}/>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// file structure https://stackoverflow.com/questions/55221433/is-there-an-official-style-guide-or-naming-convention-for-react-based-projects/56196707#56196707