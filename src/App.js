import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Nav from './components/Nav';
import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';
import Group from './components/Group';
import Pool from './components/Pool';
import Profile from './components/Profile';
import CreatePool from './components/CreatePool';
import CreateGroup from './components/CreateGroup';
import Groups from './components/Groups';
import MyGroups from './components/MyGroups';

import UpdatePool from './components/UpdatePool';
import Home from './components/Home';
import Main from './components/Main';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Nav />
				<Switch>
					<Route component={Signup} path="/register" />
					<Route component={Signin} path="/login" />
					<Route component={Main} path="/about" />
					<Route component={CreatePool} path="/create_pool" />
					<Route component={CreateGroup} path="/create_group" />
					<Route component={Groups} path="/groups" />
					<Route component={MyGroups} path="/mygroups" />
					<Route component={UpdatePool} path="/update_pool" />
					<Route component={Group} path="/group/:id" />
					<Route component={Pool} path="/group/:id/pool/:poolid" />
					<Route component={Profile} path="/profile" />
					<Route component={Home} path="/" />
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
