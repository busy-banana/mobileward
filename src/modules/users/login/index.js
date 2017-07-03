import React from 'react';
import AppBar from 'material-ui/AppBar';
import PersonOutline from 'material-ui/svg-icons/social/person-outline';
import LockOpen from 'material-ui/svg-icons/action/lock-open';
import IconButton from 'material-ui/IconButton';
import Img from '../../../../public/images/doctor.jpg';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dialogs from '../../../components/dialog';
import './style.css';

export default class Login extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			open: false,
			message: "注册成功",
			username: "",
			password: ""
		};
		this.handleClose = this.handleClose.bind(this);
		this.login = this.login.bind(this);
		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
	}

	handleClose(){
		this.setState({open: false});
	}

	handleUsernameChange(event,value){
		this.setState({username: value});
	}

	handlePasswordChange(event,value){
		this.setState({password: value});
	}

	login(){
		if(this.state.username && this.state.password){
			fetch('/api/login',{
				method: 'post',
				headers: {
			    	'Content-Type': 'application/json'
			  	},
			  	body: JSON.stringify({
			    	username: this.state.username,
			    	password: this.state.password,
			  	})
			}).then((res) => {
					res.json().then(
						(data) => {
							console.log(data);
						}
					)
			}).catch(
				(err) => console.log("Fetch错误:"+err)
			)
		}else{
			this.setState({open: true, message: "用户名和密码不能为空"});
		}
	}
	
	render(){
		const style = {
			loginContainer: {
	   			width: '100%',
	    		height: '100px'
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
			loginBtn: {
				width: '80%',
				height: '100px',
				margin: '10%'
			},
			btnStyle: {
				backgroundColor: '#4642B6',
			},
			loginLabelStyle: {
				fontSize: '42px',
				color: '#fff',
				top: '20px',
				fontWeight: 'normal'
			},
			registerBtn: {
				width: '20%',
				height: '100px',
				marginLeft: '40%',
				boxShadow: 'none',
				marginTop: '20%'
			},
			registerLabelStyle: {
				fontSize: '42px',
				top: '20px',
				fontWeight: 'normal',
			},
			labelFocusStyle: {
				lineHeight:'0',
			}
		};
		return(
			<div className="container">
				<div className="login-header">
					<span className="login-title">移动病房</span>
				</div>
				<div className="login-img">
					<img className="login-portrait" src={Img} />
				</div>
				<div style={style.loginContainer}>
					<PersonOutline style={style.svgIcon}/>
					<TextField
						floatingLabelText="用户名"
						floatingLabelFocusStyle={style.labelFocusStyle}
						style={style.inputContainer}
						className="login-input"
						onChange={this.handleUsernameChange}
					/>
					<br/>
				</div>
				<div style={style.loginContainer}>
					<LockOpen style={style.svgIcon}/>
					<TextField
						floatingLabelText="密码"
						floatingLabelFocusStyle={style.labelFocusStyle}
						type="password"
						style={style.inputContainer}
						className="login-input"
						onChange={this.handlePasswordChange}
					/>
				</div>
				<RaisedButton
					label="登录"
					style={style.loginBtn}
					buttonStyle={style.btnStyle}
					labelStyle={style.loginLabelStyle}
					onTouchTap={this.login}
				/>
				<RaisedButton
					href="#/register"
					label="注册"
					style={style.registerBtn}
					labelStyle={style.registerLabelStyle}
				/>
				<Dialogs
					message={this.state.message}
					onTouchTap={this.handleClose}
					open={this.state.open}
				/>
			</div>
		)
	}
}