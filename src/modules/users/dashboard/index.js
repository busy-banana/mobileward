import React from 'react';
import NavBar from '../../../components/navbar';
import {List, ListItem} from 'material-ui/List';
import PhotoLibrary from 'material-ui/svg-icons/image/photo-library';
import History from 'material-ui/svg-icons/action/history';
import People from 'material-ui/svg-icons/social/people';
import Computer from 'material-ui/svg-icons/hardware/computer';
import Divider from 'material-ui/Divider';
import './style.css';

export default class Dashboard extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		const style = {
			listItemStyle: {
				height: '150px',
				fontSize: '40px',
				fontWeight: 'normal',
				lineHeight: '120px',
			}
		}

		return (
			<div className="container">
				<NavBar title="功能" href="#/equipmentList"/>

				<List style={{marginTop: '100px'}}>
					<ListItem
						className="list-item"
						primaryText="生理参数" 
						leftIcon={<PhotoLibrary />}
						href="#/physiologicalParams"
						style={style.listItemStyle}
					/>
					<Divider />
					<ListItem 
						className="list-item"
						primaryText="历史回顾" 
						leftIcon={<History />} 
						style={style.listItemStyle}
					/>
					<Divider />
					<ListItem 
						className="list-item"
						primaryText="设备信息" 
						leftIcon={<Computer />} 
						style={style.listItemStyle}
					/>
					<Divider />
					<ListItem 
						className="list-item"
						primaryText="成员信息" 
						leftIcon={<People />} 
						style={style.listItemStyle}
					/>
					<Divider />

				</List>
			</div>
		)
	}
}