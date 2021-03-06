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
import AppContainer from '../../appContainer';
import Dialogs from '../../../components/dialog';
import './style.css';

export default class MonitorTerminalList extends AppContainer{
	constructor(props){
		super(props);
		this.state = {
			datas : '',
			open: false,
			message: ''
		}
		this.addEquipment = this.addEquipment.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	handleClose(){
		this.setState({open: false});
	}

	componentWillMount(){
		this.getEquipmentList();
	}

	getEquipmentList(){
		let SN = localStorage.getItem('serialNumber');
		Http.http('post',{
				url:'/api/getEquipmentList',
				params:{serialNumber: SN}
			},
			(data) => {
				this.setState({datas:data});
			}
		);
	}

	addEquipment(){
		const username = localStorage.getItem('username');
		if(!username){
			this.setState({open: true, message: '用户未登录'});
		}else{
			this.go("#/addEquipment");
		}
	}
	
	//处理数据
	handleData(data){
		return (
			<div key={data.equipmentSN}>
				<ListItem
					className="list-item"
					primaryText={data.equipmentName ? data.equipmentName : '('+data.equipmentSN+')'}
					leftIcon={
						<CastConnected
							color={data.equipmentStatus==0 || data.equipmentStatus==1  ? "#4642B6" : ""}
						/>}
					onTouchTap={(e) => {e.preventDefault();this.go(`#/dashboard?SN=${data.equipmentSN}`)}}
					style={{height: '65px',
							fontSize: '1rem',
							fontWeight: 'normal',
							lineHeight: '30px',}}
				/>
				<span className="user-name">{data.patientName}</span>
			</div>
		);		
	}

	render(){
		let datas = this.state.datas;
		let superAdminDOM ='',
			commonAdminDOM ='',
			tempUserDOM ='',
			arr0 = [], arr1 = [], arr2 = [];
		const emptyDOM = (
			<p className="empyt-list">该权限下暂未绑定设备</p>
		);
		const style = {
			bottomNavigation: {
				position: 'fixed',
				bottom: '0',
				height: '10%',
				backgroundColor: '#fafafa',
			   	borderTop: '1px solid #e0e0e0',
			},
		}
		if(datas){
			//把数据按管理员类型分类放入数组中
			datas.map((item) => {
				if(item.equipmentStatus == 0 || item.equipmentStatus == 1){
					if(item.bindType == 0){
						arr0.unshift(item);
					}else if(item.bindType == 1){
						arr1.unshift(item);
					}else if(item.bindType == 2){
						arr2.unshift(item);
					}
				}else{
					if(item.bindType == 0){
						arr0.push(item);
					}else if(item.bindType == 1){
						arr1.push(item);
					}else if(item.bindType == 2){
						arr2.push(item);
					}
				}
			});
			superAdminDOM = arr0 && arr0.length ? arr0.map((item) => {
				return this.handleData(item);
			}) : emptyDOM;
			commonAdminDOM = arr1 && arr1.length ? arr1.map((item) => {
				return this.handleData(item);
			}) : emptyDOM;
			tempUserDOM = arr2 && arr2.length ? arr2.map((item) => {
				return this.handleData(item);
			}) : emptyDOM;
		}
	
		return (
			<div className="container">
				<AppBar
					title={<span className="center-navbar-title">设备列表</span>}
					className="app-bar"
					iconStyleLeft={{display:'none'}}
					iconElementRight={
						<IconButton 
							className="add-equipment-btn"
							onTouchTap ={(e) => {e.preventDefault();this.addEquipment()}}>
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
						{superAdminDOM}
					</List>
					<Divider />

					<div className="terminal-type">
						<p>普通管理员</p>
					</div>
					<Divider />
					<List>
						{commonAdminDOM}
					</List>
					<Divider />

					<div className="terminal-type">
						<p>临时用户</p>
					</div>
					<Divider />
					<List>
						{tempUserDOM}
					</List>
					<Divider />
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
						onTouchTap={() => {this.go("#/message")}}
					/>
					<BottomNavigationItem
						className="bottom-navigation-item"
						label="个人中心"
						icon={<Person/>}
						onTouchTap={() => {this.go("#/home")}}
					/>
		        </BottomNavigation>

				<Dialogs
					message={this.state.message}
					onTouchTap={this.handleClose}
					open={this.state.open}
				/>
			</div>
		)
	}
}