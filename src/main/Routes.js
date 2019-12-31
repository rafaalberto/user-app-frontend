import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import Home from '../components/home/Home';
import UserTable from '../components/user/UserTable';
import UserForm from '../components/user/UserForm';

const Routes = () => 
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/users' component={UserTable} />
        <Route path='/userForm/:id' component={UserForm} />
        <Redirect from='*' to='/' />
    </Switch>

export default Routes;