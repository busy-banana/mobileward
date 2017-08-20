import React from 'react';
import NavBar from '../../../components/navbar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import Dialogs from '../../../components/dialog';
import Http from '../../../actions';
import AppContainer from '../../appContainer';
import './style.css';

export default class Register extends AppContainer{
	constructor(props){
		super(props);
		this.state = {
			open: false,
			message: '',
			sex : '',
			birthday: '',
			username: '',
			password: '',
			confirmPwd: '',
			name: '',
			nameErrorText: '',
			usernameErrorText: '',
			pwdErrorText: '',
			confirmPwdErrorText: '',
			/*certificateType: '',
			certificateNum: '',*/
			telephone: '',
			mobilePhone: '',
			email: '',
			weChat: '',
			address: '',
			postcode: '',
		}
		this.handleClose = this.handleClose.bind(this);
		this.handleSexChange = this.handleSexChange.bind(this);
		this.handleBirthdayChange = this.handleBirthdayChange.bind(this);
		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleConfirmPwdChange = this.handleConfirmPwdChange.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
		/*this.handleCertificateTypeChange = this.handleCertificateTypeChange.bind(this);
		this.handleCertificateNumChange = this.handleCertificateNumChange.bind(this);*/
		this.handleTelephoneChange = this.handleTelephoneChange.bind(this);
		this.handleMobilePhoneChange = this.handleMobilePhoneChange.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handleWeChatChange = this.handleWeChatChange.bind(this);
		this.handleAddressChange = this.handleAddressChange.bind(this);
		this.handlePostcodeChange = this.handlePostcodeChange.bind(this);
		this.getRegisterDate = this.getRegisterDate.bind(this);
		this.getRandomSerialNum = this.getRandomSerialNum.bind(this);
		this.register = this.register.bind(this);
	}


	handleClose(){
		this.setState({open: false});
		if(this.state.message == '注册成功'){
			this.go('#/login');
		}
	}

	handleUsernameChange(event, value){
		if(!/^[a-zA-Z][a-zA-Z0-9_]{3,}$/.test(value) || value.length > 20){
			this.setState({usernameErrorText: '4~20个字符(字母、数字、下划线)，以字母开头'});
		}else{
			this.setState({
				usernameErrorText: '',
				username: value
			});
		}
	}

	handleSexChange(event, index, value){
		this.setState({
			sex: value,
		});
	}

	handleBirthdayChange(event, value){
		this.setState({birthday: value});
	}

	handlePasswordChange(event, value){
		if(!/\S{6,}$/.test(value) || value.length > 20){
			this.setState({pwdErrorText: '6~20个字符，区分大小写'});
		}else if(value != this.state.confirmPwd){
			this.setState({
				pwdErrorText: '',
				confirmPwdErrorText: '两次输入密码不一致',
				password: value
			});
		}else{
			this.setState({
				pwdErrorText: '',
				confirmPwdErrorText: '',
				password: value
			});
		}
	}

	handleConfirmPwdChange(event, value){
		if(value != this.state.password){
			this.setState({
				confirmPwdErrorText: '两次输入密码不一致',
				confirmPwd: value
			});
		}else{
			this.setState({
				confirmPwdErrorText: '',
				confirmPwd: value
			});
		}
	}

	handleNameChange(event, value){
		if(!/^[\u4e00-\u9fa5]{2,10}$/.test(value)){
			this.setState({nameErrorText: '请填写正确的中文名'});
		}else{
			this.setState({
				nameErrorText: '',
				name: value
			});
		}
	}

	/*handleCertificateTypeChange(event, value){
		this.setState({certificateType: value});
	}

	handleCertificateNumChange(event, value){
		this.setState({certificateNum: value});
	}*/

	handleTelephoneChange(event, value){
		this.setState({telephone: value});
	}

	handleMobilePhoneChange(event, value){
		this.setState({mobilePhone: value});
	}

	handleEmailChange(event, value){
		this.setState({email: value});
	}

	handleWeChatChange(event, value){
		this.setState({weChat: value});
	}

	handleAddressChange(event, value){
		this.setState({address: value});
	}

	handlePostcodeChange(event, value){
		this.setState({postcode: value});
	}

	getRegisterDate(){
		let nDate = new Date();
		let nYear = nDate.getFullYear();
		let nMonth = nDate.getMonth() + 1;
		let nDay = nDate.getDate();
		let nHour = nDate.getHours();
		let nMin = nDate.getMinutes();
		let nSec = nDate.getSeconds();
		nMonth = nMonth < 10 ? '0' + nMonth : nMonth;
		nDay = nDay < 10 ? '0' + nDay : nDay;
		nHour = nHour < 10 ? '0' + nHour : nHour;
		nMin = nMin < 10 ? '0' + nMin : nMin;
		nSec = nSec < 10 ? '0' + nSec : nSec;
		nDate = nYear + '-' + nMonth + '-' + nDay + ' ' + nHour + ':' + nMin + ':' + nSec;
		return nDate;
	}

	register(){
		const nDate = this.getRegisterDate();
		const SerialNum = this.getRandomSerialNum();
		Http.http('post',{
				url: '/api/register',
				params: {
					sex : this.state.sex,
					username: this.state.username,
					password: this.state.password,
					name: this.state.name,
					/*certificateType: this.state.certificateType,
					certificateNum: this.state.certificateNum,
					birthday: this.state.birthday,*/
					telephone: this.state.telephone,
					mobilePhone: this.state.mobilePhone,
					email: this.state.email,
					weChat: this.state.weChat,
					address: this.state.address,
					postcode: this.state.postcode,
					registerDate: nDate,
					SerialNumber: SerialNum
				}
			},
			(data) => {
				this.setState({open: true, message: data.datas});
			}
		)
	}

	//生成用户序列号
	getRandomSerialNum(){
		return Math.floor(Math.random() * 10000000000);
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
				width: '90%',
	    		height: '100%',
	    		fontSize: '35px',
	    		left: '50px',
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
			},
			dateInputContainer: {
				width: '90%',
	    		height: '100%',
	    		fontSize: '35px',
	    		float: 'right',
	    		lineHeight: '100px',
	    		left: '10px'
			},
			errorTextStyle: {
				fontSize: '35px',
				marginTop: '10px'
			}
		};
		let btnDisabled = true;
		if(this.state.nameErrorText == '' && this.state.usernameErrorText == '' && this.state.pwdErrorText == ''
			&& this.state.confirmPwdErrorText == '' && this.state.username && this.state.sex
			&& this.state.name && this.state.password && this.state.confirmPwd){
			btnDisabled = false;
		}
		const btnDOM =  btnDisabled ?
			<RaisedButton
				label="注册"
				style={style.registerBtn}
				labelStyle={style.registerLabelStyle}
				onTouchTap={(e) => {e.preventDefault();this.register()}}
				disabled={true}
			/> :
			<RaisedButton
				label="注册"
				style={style.registerBtn}
				buttonStyle={style.btnStyle}
				labelStyle={style.registerLabelStyle}
				onTouchTap={(e) => {e.preventDefault();this.register()}}
			/>;
		return (
			<div className="container">
				<NavBar title="注册账号" href="#/login"/>

				<div style={style.registerContainer}>
					<TextField
						floatingLabelText="用户名(必填)"
						floatingLabelFocusStyle={style.labelFocusStyle}
						style={style.inputContainer}
          				onChange={this.handleUsernameChange}
          				errorText={this.state.usernameErrorText}
          				errorStyle={style.errorTextStyle}
					/>
				</div>

				<div style={style.registerContainer}>
					<TextField
						type="password"
						floatingLabelText="密码(必填，区分大小写)"
						floatingLabelFocusStyle={style.labelFocusStyle}
						style={style.inputContainer}
          				onChange={this.handlePasswordChange}
          				errorText={this.state.pwdErrorText}
          				errorStyle={style.errorTextStyle}
					/>
				</div>

				<div style={style.registerContainer}>
					<TextField
						type="password"
						floatingLabelText="确认密码"
						floatingLabelFocusStyle={style.labelFocusStyle}
						style={style.inputContainer}
          				onChange={this.handleConfirmPwdChange}
          				errorText={this.state.confirmPwdErrorText}
          				errorStyle={style.errorTextStyle}
					/>
				</div>

				<div style={style.registerContainer}>
					<TextField
						floatingLabelText="姓名(必填)"
						floatingLabelFocusStyle={style.labelFocusStyle}
						style={style.inputContainer}
          				onChange={this.handleNameChange}
          				errorText={this.state.nameErrorText}
          				errorStyle={style.errorTextStyle}
					/>
				</div>

				<div style={style.registerContainer}>
					<SelectField
          				className="select-field"
						floatingLabelText="性别(必选)"
						floatingLabelStyle={style.labelFocusStyle}
						style={style.inputContainer}
						menuItemStyle={style.menuItemStyle}
						value={this.state.sex}
          				onChange={this.handleSexChange}
					>
						<MenuItem value="male" primaryText="男" />
						<MenuItem value="female" primaryText="女" />
					</SelectField>
				</div>

				<div style={style.registerContainer}>
					<TextField
						floatingLabelText="固定电话"
						floatingLabelFocusStyle={style.labelFocusStyle}
						style={style.inputContainer}
          				onChange={this.handleTelephoneChange}
					/>
				</div>

				<div style={style.registerContainer}>
					<TextField
						floatingLabelText="手机"
						floatingLabelFocusStyle={style.labelFocusStyle}
						style={style.inputContainer}
          				onChange={this.handleMobilePhoneChange}
					/>
				</div>

				<div style={style.registerContainer}>
					<TextField
						floatingLabelText="电子邮箱"
						floatingLabelFocusStyle={style.labelFocusStyle}
						style={style.inputContainer}
          				onChange={this.handleEmailChange}
					/>
				</div>

				<div style={style.registerContainer}>
					<TextField
						floatingLabelText="微信号"
						floatingLabelFocusStyle={style.labelFocusStyle}
						style={style.inputContainer}
          				onChange={this.handleWeChatChange}
					/>
				</div>

				<div style={style.registerContainer}>
					<TextField
						floatingLabelText="地址"
						floatingLabelFocusStyle={style.labelFocusStyle}
						style={style.inputContainer}
          				onChange={this.handleAddressChange}
					/>
				</div>

				<div style={style.registerContainer}>
					<TextField
						floatingLabelText="邮政编码"
						floatingLabelFocusStyle={style.labelFocusStyle}
						style={style.inputContainer}
          				onChange={this.handlePostcodeChange}
					/>
				</div>

				{btnDOM}

				<Dialogs
					message={this.state.message}
					onTouchTap={this.handleClose}
					open={this.state.open}
				/>
			</div>
		)
				/*<div style={style.registerContainer}>
					<DatePicker
						hintText="出生日期(必填)"
						autoOk={true}
						cancelLabel='取消'
						value={this.state.birthday}
						onChange={this.handleBirthdayChange}
						textFieldStyle={style.dateInputContainer}
					/>
				</div>

				<div style={style.registerContainer}>
					<TextField
						floatingLabelText="证件类型"
						floatingLabelFocusStyle={style.labelFocusStyle}
						style={style.inputContainer}
          				onChange={this.handleCertificateTypeChange}
					/>
				</div>

				<div style={style.registerContainer}>
					<TextField
						floatingLabelText="证件号码"
						floatingLabelFocusStyle={style.labelFocusStyle}
						style={style.inputContainer}
          				onChange={this.handleCertificateNumChange}
					/>
				</div>
				*/
	}
}