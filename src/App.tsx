import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Nav from './components/Nav';

import Group from './components/Group';
import Profile from './components/Profile';
import CreateGroup from './components/CreateGroup';
import Groups from './components/Groups';
import MyGroups from './components/MyGroups';
import UpdatePool from './components/UpdatePool';
import Home from './components/Home';
import Main from './components/Main';
//import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';
import Authenticator from './components/Authenticator';
import AuthenticationWrapper from './components/AuthenticationWrapper';
import Logout from './components/Logout';
import PoolPage from './components/PoolPage';

function App() {
	return (
		<AuthenticationWrapper>
			<BrowserRouter>
				<Nav />
				<Switch>
					<Route component={Main} path="/about" />
					<Route component={Authenticator} path="/auth/:provider/callback" />
					<Route component={CreateGroup} path="/create_group" />
					<Route component={MyGroups} path="/mygroups" />
					<Route component={UpdatePool} path="/update_pool" />
					<Route component={Group} path="/groups/:id" />
					<Route component={PoolPage} path="/pools/:id" />
					<Route component={Groups} path="/groups" />
					<Route component={Profile} path="/profile" />
					<Route component={Logout} path="/logout" />
					<Route component={Home} path="/" />
				</Switch>
			</BrowserRouter>
		</AuthenticationWrapper>
	);
}

export default App;
