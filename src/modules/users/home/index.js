import React from 'react';
import AppBar from 'material-ui/AppBar';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Person from 'material-ui/svg-icons/social/person';
import PersonOutline from 'material-ui/svg-icons/social/person-outline';
import DashboardIcon from 'material-ui/svg-icons/action/dashboard';
import Lock from 'material-ui/svg-icons/action/lock-outline';
import About from 'material-ui/svg-icons/action/info-outline';
import Logout from 'material-ui/svg-icons/action/input';
import Message from 'material-ui/svg-icons/communication/message';
import Img from '../../../../public/images/doctor.jpg';
import Http from '../../../actions';
import Dialogs from '../../../components/dialog';
import AppContainer from '../../appContainer';
import './style.css';

export default class Home extends AppContainer{
	constructor(props){
		super(props);
		 this.state = {
            message: '',
			open: false
		 }
		this.logout = this.logout.bind(this);
		this.changePwd = this.changePwd.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	handleClose(){
		this.setState({open: false});
		if(this.state.message == '用户未登录'){
			this.go('#/login');
		}
    }

	changePwd(){
		const username = localStorage.getItem('username');
		if(!username){
			this.setState({open: true, message: '用户未登录'});
		}else{
			this.go("#/home/changePwd");
		}
	}

	componentWillMount(){
		this.isUserLogin();
	}


	isUserLogin(){
		const username = localStorage.getItem('username');
		if(!username){
			this.setState({open: true, message: '用户未登录'});
		}
	}

	logout(){
		const username = localStorage.getItem('username');
		Http.http('post',{
			url: '/api/logout',
			params: {
				username: username,
			}
		},
		(data) => {
			if(data == '00'){
				localStorage.clear();
				this.go("#/login");
			}else{
				return false;
			}
		})
	}

	render(){
		const imgDOM = (
			<div className="clearfix">
				<div className="home-img-left">
					<img className="home-portrait" src={Img}/>
				</div>				
				<div>
					<p className="home-name">{localStorage.getItem('name') || '--'} </p>
					<p className="home-username">用户名：{localStorage.getItem('username') || '--'}</p>
				</div>				
			</div>				
		)

		const style = {
			bottomNavigation: {
				position: 'fixed',
				bottom: '0',
				height: '10%',
				backgroundColor: '#fafafa',
			   	borderTop: '1px solid #e0e0e0',
			}
		}

		return (
			<div className="container">
				<AppBar
					title={<span className="center-navbar-title">个人中心</span>}
					className="app-bar"
					iconStyleLeft={{display:'none'}}
				/>

				{imgDOM}

				<List>
					<ListItem
						className="home-list-item"
						primaryText="个人信息" 
						leftIcon={<PersonOutline />}
						href="#/home/userInfo"
					/>
					<Divider />
					<ListItem
						className="home-list-item"
						primaryText="修改密码" 
						leftIcon={<Lock />}
						onTouchTap={(e) => {e.preventDefault();this.changePwd()}}
					/>
					<Divider />
					<ListItem
						className="home-list-item"
						primaryText="关于" 
						leftIcon={<About />}
						href="#/home/about"
					/>
					<Divider />
					<ListItem 
						className="home-list-item"
						primaryText="退出登录" 
						leftIcon={<Logout />} 
						onTouchTap={this.logout}
					/>
					<Divider />
				</List>

				<BottomNavigation selectedIndex={2} style={style.bottomNavigation}>
					<BottomNavigationItem
						className="bottom-navigation-item"
						label="设备列表"
						icon={<DashboardIcon/>}
						onTouchTap={() => {this.go("#/equipmentList")}}
					/>
					<BottomNavigationItem
						className="bottom-navigation-item"
						label="消息"
						icon={<Message/>}
						onTouchTap={() => {this.go("#/message")}}
					/>
					<BottomNavigationItem
						className="bottom-navigation-item"
						label="个人中心"
						icon={<Person/>}
						disabled={true}
					/>
		        </BottomNavigation>
				
				<Dialogs
					message={this.state.message}
					onTouchTap={(e) => {e.preventDefault();this.handleClose()}}
					open={this.state.open}
				/>
			</div>
		)
	}
}