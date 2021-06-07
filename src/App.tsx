import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import AuthenticationWrapper from './components/Authentication/AuthenticationWrapper';
import Authenticator from './components/Authentication/Authenticator';
import CreateGroup from './components/CreateGroup';
import Group from './components/Group';
import Groups from './components/Groups';
import Home from './components/Home';
import Logout from './components/Logout';
import Main from './components/Main';
import MyGroups from './components/MyGroups';
import Nav from './components/Nav';
import PoolPage from './components/PoolPage';
import Profile from './components/Profile';
import UpdatePool from './components/UpdatePool';

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
