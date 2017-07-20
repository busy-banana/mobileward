import React from 'react';
import AppBar from 'material-ui/AppBar';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Person from 'material-ui/svg-icons/social/person';
import DashboardIcon from 'material-ui/svg-icons/action/dashboard';
import Message from 'material-ui/svg-icons/communication/message';
import CastConnected from 'material-ui/svg-icons/hardware/cast-connected';
import {List, ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import Add from 'material-ui/svg-icons/content/add';
import Http from '../../../actions';
import './style.css';

export default class MonitorTerminalList extends React.Component{
	constructor(props){
		super(props);
	}


	componentWillMount(){
		this.getEquipmentList();
	}

	getEquipmentList(){
		Http.http('post',{
				url:'/api/getEquipmentList',
				params:{SerialNumber:88888888}
			},
			(data) => {
				console.log(data);
			}
		);

	}

	render(){
		const style = {
			listItemStyle: {
				height: '150px',
				fontSize: '40px',
				fontWeight: 'normal',
				lineHeight: '120px',
			},
			bottomNavigation: {
				position: 'fixed',
				bottom: '0',
				height: '10%',
				backgroundColor: '#fafafa',
			   	borderTop: '1px solid #e0e0e0',
			},
		}

		return (
			<div className="container">
				<AppBar
					title={<span className="navbar-title">设备列表</span>}
					className="app-bar"
					iconStyleLeft={{visibility:'hidden'}}
					iconElementRight={
						<IconButton 
							className="add-equipment-btn"
							href="#/addEquipment">
							<Add className="add-equipment" />
						</IconButton>
					}
				/>

				<div className="equipmentList">
					<div className="terminal-type">
						<p>超级管理员</p>
					</div>
					<Divider />
					<List>
						<ListItem
							className="list-item"
							primaryText="设备列表" 
							leftIcon={<CastConnected color="#4642B6"/>}
							href="#/dashboard"
							style={style.listItemStyle}
						/>
						<Divider />
						<span className="user-name">张三</span>
					</List>

					<div className="terminal-type">
						<p>普通管理员</p>
					</div>
					<Divider />
					<List>
						<ListItem
							className="list-item"
							primaryText="设备列表" 
							leftIcon={<CastConnected color="#4642B6"/>}
							href="#/dashboard"
							style={style.listItemStyle}
						/>
						<span className="user-name">张三</span>

						<ListItem
							className="list-item"
							primaryText="设备列表" 
							leftIcon={<CastConnected color="#4642B6"/>}
							href="#/dashboard"
							style={style.listItemStyle}
						/>
						<Divider />
						<span className="user-name">张三</span>
					</List>

					<div className="terminal-type">
						<p>临时用户</p>
					</div>
					<Divider />
					<List>
						<ListItem
							className="list-item"
							primaryText="设备列表" 
							leftIcon={<CastConnected />}
							href="#/dashboard"
							style={style.listItemStyle}
						/>
						<span className="user-name">张三</span>

						<ListItem
							className="list-item"
							primaryText="设备列表" 
							leftIcon={<CastConnected />}
							href="#/dashboard"
							style={style.listItemStyle}
						/>
						<span className="user-name">张三</span>

						<ListItem
							className="list-item"
							primaryText="设备列表" 
							leftIcon={<CastConnected />}
							href="#/dashboard"
							style={style.listItemStyle}
						/>
						<span className="user-name">张三</span>

						<ListItem
							className="list-item"
							primaryText="设备列表" 
							leftIcon={<CastConnected />}
							href="#/dashboard"
							style={style.listItemStyle}
						/>
						<span className="user-name">张三</span>

						<ListItem
							className="list-item"
							primaryText="设备列表" 
							leftIcon={<CastConnected />}
							href="#/dashboard"
							style={style.listItemStyle}
						/>
						<Divider />
						<span className="user-name">张三</span>
					</List>
				</div>

				<BottomNavigation selectedIndex={0} style={style.bottomNavigation}>
					<BottomNavigationItem
						className="bottom-navigation-item"
						label="设备列表"
						icon={<DashboardIcon/>}
						disabled={true}
					/>
					<BottomNavigationItem
						className="bottom-navigation-item"
						label="消息"
						icon={<Message/>}
						onTouchTap={() => {window.location = "#/message"}}
					/>
					<BottomNavigationItem
						className="bottom-navigation-item"
						label="个人中心"
						icon={<Person/>}
						onTouchTap={() => {window.location = "#/home"}}
					/>
		        </BottomNavigation>
			</div>
		)
	}
}