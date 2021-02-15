import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './index.scss';
import Cookies from 'js-cookie';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

import Home from './pages/home/Home';
import ViewPost from './pages/view-post/ViewPost';
import Profile from './pages/profile/Profile';
import Search from './pages/search/Search';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={Register}/>
        {Cookies.get("jwtToken") === null &&
          <Route path="/*">
            <Redirect to="/login"/>
          </Route>
        }
        <Route exact path="/search" component={Search}/>
        <Route exact path="/:username/post/:pid" children={<ViewPost/>}/>
        <Route exact path="/:username" children={<Profile/>}/>
        <Route exact path="/" component={Home}/>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// file structure https://stackoverflow.com/questions/55221433/is-there-an-official-style-guide-or-naming-convention-for-react-based-projects/56196707#56196707