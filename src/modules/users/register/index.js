import React from 'react';
import NavBar from '../../../components/navbar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import './style.css';

export default class Register extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			sex : null,
			birthday: null,
			username: '',
			password: '',
			confirmPwd: '',
			name: '',
			/*certificateType: null,
			certificateNum: null,*/
			telephone: null,
			mobilePhone: null,
			email: '',
			weChat: '',
			address: '',
			postcode: null,
			registerDate: '',
		}
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
		this.register = this.register.bind(this);
	}

	handleSexChange(event, index, value){
		this.setState({sex: value});
	}

	handleBirthdayChange(event, value){
		this.setState({birthday: value});
	}

	handleUsernameChange(event, value){
		this.setState({username: value});
	}

	handlePasswordChange(event, value){
		this.setState({password: value});
	}

	handleConfirmPwdChange(event, value){
		this.setState({confirmPwd: value});
	}

	handleNameChange(event, value){
		this.setState({name: value});
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
		this.setState({registerDate: nDate});
	}

	register(){
		this.getRegisterDate();
		fetch('/api/login',{
			method: 'post',
			headers: {
		    	'Content-Type': 'application/json'
		  	},
		  	body: JSON.stringify({
				sex : this.state.sex,
				birthday: this.state.birthday,
				username: this.state.username,
				password: this.state.password,
				name: this.state.name,
				/*certificateType: this.state.certificateType,
				certificateNum: this.state.certificateNum,*/
				telephone: this.state.telephone,
				mobilePhone: this.state.mobilePhone,
				email: this.state.email,
				weChat: this.state.weChat,
				address: this.state.address,
				postcode: this.state.postcode,
				registerDate: this.state.registerDate,
		  	})
		}).then((res) => {
			res.json().then(
				(data) => {
					if(data.datas == "注册成功"){
						this.setState({open: true, message: data.datas});
						window.location.href = window.location.origin + '#/login';
					}else{
						this.setState({open: true, message: data.datas});
					}
				}
			)
		}).catch(
			(err) => console.log("Fetch错误:"+err)
		)


	}

	render(){
		console.log(this.state.registerDate);
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
			/*svgIcon: {
				width: '7%',
		    	height: '100px',
				marginLeft: '15px'
			},*/
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
			}
		};
		return (
			<div className="container">
				<NavBar title="注册账号" href="#/login"/>

				<div style={style.registerFirstInput}>
					<TextField
						floatingLabelText="用户名(必填)"
						floatingLabelFocusStyle={style.labelFocusStyle}
						style={style.inputContainer}
          				onChange={this.handleUsernameChange}
          				errorText="asdad"
					/>
				</div>

				<div style={style.registerContainer}>
					<TextField
						type="password"
						floatingLabelText="密码(必填，区分大小写)"
						floatingLabelFocusStyle={style.labelFocusStyle}
						style={style.inputContainer}
          				onChange={this.handlePasswordChange}
					/>
				</div>

				<div style={style.registerContainer}>
					<TextField
						type="password"
						floatingLabelText="确认密码"
						floatingLabelFocusStyle={style.labelFocusStyle}
						style={style.inputContainer}
          				onChange={this.handleConfirmPwdChange}
					/>
				</div>

				<div style={style.registerContainer}>
					<TextField
						floatingLabelText="姓名(必填)"
						floatingLabelFocusStyle={style.labelFocusStyle}
						style={style.inputContainer}
          				onChange={this.handleNameChange}
					/>
				</div>

				<div style={style.registerContainer}>
					<SelectField
          				className="select-field"
						floatingLabelText="性别(必选)"
						floatingLabelStyle={style.labelFocusStyle}
						style={style.inputContainer}
						menuItemStyle={style.menuItemStyle}
						value={this.state.value}
          				onChange={this.handleSexChange}
					>
						<MenuItem value={1} primaryText="男" />
						<MenuItem value={2} primaryText="女" />
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

				<RaisedButton
					label="注册"
					style={style.registerBtn}
					buttonStyle={style.btnStyle}
					labelStyle={style.registerLabelStyle}
					onTouchTap={this.register}
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