import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import Login from './modules/users/login';
import Register from './modules/users/register';
import AddUserInfo from './modules/users/addUserInfo';
import Dashboard from './modules/users/dashboard';
import Message from './modules/users/message';
import Home from './modules/users/home';
import MonitorTerminalList from './modules/users/monitorTerminalList';
import PhysiologicalParams from './modules/patients/physiologicalParams';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import './style.css';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#4642B6',
    accent1Color: '#4642B6',
  },
});

const run = () => {
	injectTapEventPlugin();
	ReactDOM.render(
  		<MuiThemeProvider muiTheme={muiTheme}>
			<Router history={hashHistory}>
				<Route path="/login" components={Login}/>
				<Route path="/register" components={Register}/>
				<Route path="/addUserInfo" components={AddUserInfo}/>
				<Route path="/dashboard" components={Dashboard}/>
				<Route path="/message" components={Message}/>
				<Route path="/home" components={Home}/>
				<Route path="/monitorTerminalList" components={MonitorTerminalList}/>
				<Route path="/physiologicalParams" components={PhysiologicalParams}/>
			</Router>
  		</MuiThemeProvider>
		, document.getElementById('app'));
}
run();