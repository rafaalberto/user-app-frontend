import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import Home from '../components/home/Home';
import UserTable from '../components/user/UserTable';

const Routes = () => 
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/users' component={UserTable} />
        <Redirect from='*' to='/' />
    </Switch>

export default Routes;