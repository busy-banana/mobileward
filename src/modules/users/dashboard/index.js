import React from 'react';
import NavBar from '../../../components/navbar';
import {List, ListItem} from 'material-ui/List';
import PhotoLibrary from 'material-ui/svg-icons/image/photo-library';
import History from 'material-ui/svg-icons/action/history';
import People from 'material-ui/svg-icons/social/people';
import Computer from 'material-ui/svg-icons/hardware/computer';
import Divider from 'material-ui/Divider';
import AppContainer from '../../appContainer';
import './style.css';

export default class Dashboard extends AppContainer{
	constructor(props){
		super(props);
		this.SN = this.getParams(1);
	}

	render(){
		return (
			<div className="container">
				<NavBar title="功能" href="#/equipmentList"/>

				<List style={{marginTop: '40px'}}>
					<ListItem
						className="home-list-item"
						primaryText="生理参数" 
						leftIcon={<PhotoLibrary />}
						href={`#/dashboard/physiologicalParams?SN=${this.SN}`}
					/>
					<Divider />
					<ListItem
						className="home-list-item"
						primaryText="历史回顾" 
						leftIcon={<History />} 
					/>
					<Divider />
					<ListItem 
						className="home-list-item"
						primaryText="设备信息"
						leftIcon={<Computer />} 
						href={`#/dashboard/equipmentInfo?SN=${this.SN}`}
					/>
					<Divider />
					<ListItem 
						className="home-list-item"
						primaryText="成员列表" 
						leftIcon={<People />} 
						href={`#/dashboard/memberList?SN=${this.SN}`}
					/>
					<Divider />

				</List>
			</div>
		)
	}
}