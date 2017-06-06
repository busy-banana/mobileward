import React from 'react';
import NavBar from '../../../components/navbar';
import Person from 'material-ui/svg-icons/social/person';
import PersonOutline from 'material-ui/svg-icons/social/person-outline';
import LockOpen from 'material-ui/svg-icons/action/lock-open';
import LockOutline from 'material-ui/svg-icons/action/lock-outline';
import List from 'material-ui/svg-icons/action/list';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import './style.css';

export default class Register extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		const style = {
			registerContainer: {
	   			width: '100%',
	    		height: '100px',
	    		marginTop: '40px'
			},
			registerFirstInput: {
				width: '100%',
	    		height: '100px',
	    		marginTop: '100px'
			},
			inputContainer: {
				width: '89%',
	    		height: '100%',
	    		fontSize: '35px',
	    		float: 'right'
			},
			svgIcon: {
				width: '7%',
		    	height: '100px',
				marginLeft: '15px'
			},
			registerBtn: {
				width: '80%',
				height: '100px',
				margin: '10%'
			},
			btnStyle: {
				backgroundColor: '#4642B6',
			},
			registerLabelStyle: {
				fontSize: '42px',
				color: '#fff',
				top: '20px',
				fontWeight: 'normal'
			},
			labelFocusStyle: {
				lineHeight:'0',
			},
			menuItemStyle: {
				fontSize: '40px',
				padding: '40px 0'
			}
		};





		return (
			<div className="container">
				<NavBar title="注册账号" href="#/login"/>

				<div style={style.registerFirstInput}>
					<PersonOutline style={style.svgIcon}/>
					<TextField
						floatingLabelText="用户名(必填)"
						floatingLabelFocusStyle={style.labelFocusStyle}
						style={style.inputContainer}
					/>
				</div>

				<div style={style.registerContainer}>
					<LockOpen style={style.svgIcon}/>
					<TextField
						type="password"
						floatingLabelText="密码(必填，区分大小写)"
						floatingLabelFocusStyle={style.labelFocusStyle}
						style={style.inputContainer}
					/>
				</div>

				<div style={style.registerContainer}>
					<LockOutline style={style.svgIcon}/>
					<TextField
						type="password"
						floatingLabelText="确认密码"
						floatingLabelFocusStyle={style.labelFocusStyle}
						style={style.inputContainer}
					/>
				</div>

				<div style={style.registerContainer}>
					<Person style={style.svgIcon}/>
					<TextField
						floatingLabelText="昵称"
						floatingLabelFocusStyle={style.labelFocusStyle}
						style={style.inputContainer}
					/>
				</div>

				<RaisedButton
					href="#/addUserInfo"
					label="注册"
					style={style.registerBtn}
					buttonStyle={style.btnStyle}
					labelStyle={style.registerLabelStyle}
				/>

			</div>
		)
	}
}