import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Nav from './components/Nav';
import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';
import Pools from './components/Pools';
import Pool from './components/Pool';
import Profile from './components/Profile';
import CreatePool from './components/CreatePool';
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
					<Route component={Home} path="/" />
					<Route component={Signup} path="/register" />
					<Route component={Signin} path="/login" />
					<Route component={Main} path="/about" />
					<Route component={CreatePool} path="/create_pool" />
					<Route component={UpdatePool} path="/update_pool" />
					<Route component={Pools} path="/pools" />
					<Route component={Pool} path="/pool/:id" />
					<Route component={Profile} path="/profile" />
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
