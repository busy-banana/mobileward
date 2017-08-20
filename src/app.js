import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import AppContainer from './modules/appContainer';
import Login from './modules/users/login';
import Register from './modules/users/register';
import Dashboard from './modules/users/dashboard';
import AddEquipment from './modules/users/addEquipment';
import Message from './modules/users/message';
import Home from './modules/users/home';
import UserInfo from './modules/users/userInfo';
import ChangePWD from './modules/users/changePwd';
import About from './modules/manage/about';
import EquipmentInfo from './modules/manage/equipmentInfo';
import MemberInfo from './modules/manage/memberInfo';
import EquipmentList from './modules/users/equipmentList';
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
				<Route path="/" component={AppContainer}>
					<IndexRoute component={Login}/>
					<Route path="/login" components={Login}/>
					<Route path="/register" components={Register}/>
					<Route path="/dashboard" components={Dashboard}/>
					<Route path="/addEquipment" components={AddEquipment}/>
					<Route path="/message" components={Message}/>
					<Route path="/home" components={Home}/>
					<Route path="/home/about" components={About}/>					
					<Route path="/home/userInfo" components={UserInfo}/>
					<Route path="/home/changePwd" components={ChangePWD}/>					
					<Route path="/equipmentList" components={EquipmentList}/>
					<Route path="/dashboard/physiologicalParams" components={PhysiologicalParams}/>
					<Route path="/dashboard/equipmentInfo" components={EquipmentInfo}/>
					<Route path="/dashboard/memberInfo" components={MemberInfo}/>
				</Route>
			</Router>
  		</MuiThemeProvider>
		, document.getElementById('app'));
}
run();