import React from 'react';
import NavBar from '../../../components/navbar';
import Backup from 'material-ui/svg-icons/action/backup';
import CastConnected from 'material-ui/svg-icons/hardware/cast-connected';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import './style.css';

export default class MonitorTerminalList extends React.Component{
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
				<NavBar title="监控终端列表" href="#/dashboard"/>

				<div className="terminal-type">
					<p>超级管理员</p>
				</div>
				<Divider />
				<List>
					<ListItem
						className="list-item"
						primaryText="设备列表" 
						leftIcon={<CastConnected />}
						href="#/physiologicalParams"
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
						leftIcon={<CastConnected />}
						href="#/physiologicalParams"
						style={style.listItemStyle}
					/>
					<span className="user-name">张三</span>

					<ListItem
						className="list-item"
						primaryText="设备列表" 
						leftIcon={<CastConnected />}
						href="#/physiologicalParams"
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
						href="#/physiologicalParams"
						style={style.listItemStyle}
					/>
					<span className="user-name">张三</span>

					<ListItem
						className="list-item"
						primaryText="设备列表" 
						leftIcon={<Backup />}
						href="#/physiologicalParams"
						style={style.listItemStyle}
					/>
					<span className="user-name">张三</span>

					<ListItem
						className="list-item"
						primaryText="设备列表" 
						leftIcon={<Backup />}
						href="#/physiologicalParams"
						style={style.listItemStyle}
					/>
					<span className="user-name">张三</span>

					<ListItem
						className="list-item"
						primaryText="设备列表" 
						leftIcon={<Backup />}
						href="#/physiologicalParams"
						style={style.listItemStyle}
					/>
					<span className="user-name">张三</span>

					<ListItem
						className="list-item"
						primaryText="设备列表" 
						leftIcon={<Backup />}
						href="#/physiologicalParams"
						style={style.listItemStyle}
					/>
					<Divider />
					<span className="user-name">张三</span>
				</List>
			</div>
		)
	}
}