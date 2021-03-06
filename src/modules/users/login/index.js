import React from 'react';
import AppBar from 'material-ui/AppBar';
import PersonOutline from 'material-ui/svg-icons/social/person-outline';
import LockOpen from 'material-ui/svg-icons/action/lock-open';
import IconButton from 'material-ui/IconButton';
import Img from '../../../../public/images/doctor.jpg';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dialogs from '../../../components/dialog';
import Http from '../../../actions';
import AppContainer from '../../appContainer';
import './style.css';

export default class Login extends AppContainer{
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

	componentWillMount(){
		// this.quitApp();
		this.isCacheExit();
	}
	
	// quitApp(){
		
	// }

	//判断localStorage是否包含用户登录信息，有则跳过登录。
	isCacheExit(){
		let user = localStorage.getItem('username');
		if(user && user != null){
			this.go('#/equipmentList');
		}else{
			return null;
		}
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
			Http.http('post',{
					url:'/api/login',
					params:{username: this.state.username,password: this.state.password}
				},
				(data) => {
					//console.log(data);
					if(data.datas == "登录成功"){
						if(!window.localStorage){
							//不支持localStorage，考虑降级方案
							//不支持localStorage，考虑降级方案
							//不支持localStorage，考虑降级方案
						}else{
							localStorage.setItem('username',this.state.username);//缓存用户名
							localStorage.setItem('serialNumber',data.SN);//缓存用户序列号
							localStorage.setItem('cacheTime',new Date().getTime());//缓存添加时间，后期清除用
							localStorage.setItem('name',data.Name);//缓存用户姓名
						}
						this.go('#/equipmentList');
					}else{
						this.setState({open: true, message: data.datas});
					}
				}
			)
		}else{
			this.setState({open: true, message: "用户名和密码不能为空"});
		}
	}
	
	render(){
		const style = {
			loginContainer: {
	   			width: '100%',
				height: '40px',
				marginBottom: '2px'
			},
			inputContainer: {
				width: '89%',
	    		height: '100%',
	    		fontSize: '1rem',
	    		float: 'right'
			},
			svgIcon: {
				width: '7%',
		    	height: '40px',
				marginLeft: '2%'
			},
			loginBtn: {
				width: '80%',
				height: '40px',
				margin: '10% 10% 0 10%'
			},
			btnStyle: {
				backgroundColor: '#4642B6',
			},
			loginLabelStyle: {
				fontSize: '1.15rem',
				color: '#fff',
				top: '6px',
				fontWeight: 'normal'
			},
			registerBtn: {
				width: '28%',
				height: '3rem',
				margin: '40px 36%',
				boxShadow: 'none'
			},
			registerLabelStyle: {
				fontSize: '1.15rem',
				top: '8px',
				fontWeight: 'normal',
			},
			labelFocusStyle: {
				lineHeight:'40px',
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
					onTouchTap={(e) => {e.preventDefault();this.login()}}
				/>
				<RaisedButton
					href="#/register"
					label="注册"
					style={style.registerBtn}
					labelStyle={style.registerLabelStyle}
					disableTouchRipple={true}
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