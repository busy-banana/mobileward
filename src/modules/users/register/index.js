import React from 'react';
import NavBar from '../../../components/navbar';
/*import Person from 'material-ui/svg-icons/social/person';
import PersonOutline from 'material-ui/svg-icons/social/person-outline';
import LockOpen from 'material-ui/svg-icons/action/lock-open';
import LockOutline from 'material-ui/svg-icons/action/lock-outline';
import CreditCard from 'material-ui/svg-icons/action/credit-card';
import Telephone from 'material-ui/svg-icons/action/settings-phone';
import MobileTelephone from 'material-ui/svg-icons/hardware/phone-iphone';
import People from 'material-ui/svg-icons/social/people-outline';
import BubbleChart from 'material-ui/svg-icons/editor/bubble-chart';
import Email from 'material-ui/svg-icons/communication/email';
import ContactMail from 'material-ui/svg-icons/communication/contact-mail';
import List from 'material-ui/svg-icons/action/list';*/
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
			value : null,
			birthday: null,
		}
		this.handleSelectFieldChange = this.handleSelectFieldChange.bind(this);
		this.handleDateChange = this.handleDateChange.bind(this);
	}

	handleSelectFieldChange(event, index, value){
		this.setState({value});
	}

	handleDateChange(event, date){
		this.setState({
			birthday: date
		});
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
					/>
				</div>

				<div style={style.registerContainer}>
					<TextField
						type="password"
						floatingLabelText="密码(必填，区分大小写)"
						floatingLabelFocusStyle={style.labelFocusStyle}
						style={style.inputContainer}
					/>
				</div>

				<div style={style.registerContainer}>
					<TextField
						type="password"
						floatingLabelText="确认密码"
						floatingLabelFocusStyle={style.labelFocusStyle}
						style={style.inputContainer}
					/>
				</div>

				<div style={style.registerContainer}>
					<TextField
						floatingLabelText="姓名(必填)"
						floatingLabelFocusStyle={style.labelFocusStyle}
						style={style.inputContainer}
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
          				onChange={this.handleSelectFieldChange}
					>
						<MenuItem value={1} primaryText="男" />
						<MenuItem value={2} primaryText="女" />
					</SelectField>
				</div>

				<div style={style.registerContainer}>
					<TextField
						floatingLabelText="证件类型"
						floatingLabelFocusStyle={style.labelFocusStyle}
						style={style.inputContainer}
					/>
				</div>

				<div style={style.registerContainer}>
					<TextField
						floatingLabelText="证件号码"
						floatingLabelFocusStyle={style.labelFocusStyle}
						style={style.inputContainer}
					/>
				</div>

				<div style={style.registerContainer}>
					<TextField
						floatingLabelText="固定电话"
						floatingLabelFocusStyle={style.labelFocusStyle}
						style={style.inputContainer}
					/>
				</div>

				<div style={style.registerContainer}>
					<TextField
						floatingLabelText="手机"
						floatingLabelFocusStyle={style.labelFocusStyle}
						style={style.inputContainer}
					/>
				</div>

				<div style={style.registerContainer}>
					<TextField
						floatingLabelText="电子邮箱"
						floatingLabelFocusStyle={style.labelFocusStyle}
						style={style.inputContainer}
					/>
				</div>

				<div style={style.registerContainer}>
					<TextField
						floatingLabelText="微信号"
						floatingLabelFocusStyle={style.labelFocusStyle}
						style={style.inputContainer}
					/>
				</div>

				<div style={style.registerContainer}>
					<TextField
						floatingLabelText="地址"
						floatingLabelFocusStyle={style.labelFocusStyle}
						style={style.inputContainer}
					/>
				</div>

				<div style={style.registerContainer}>
					<TextField
						floatingLabelText="邮政编码"
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

		/*<div style={style.registerContainer}>
			<DatePicker
				hintText="出生日期(必填)"
				autoOk={true}
				cancelLabel='取消'
				value={this.state.birthday}
				onChange={this.handleDateChange}
				textFieldStyle={style.dateInputContainer}
			/>
		</div>
		*/

	}
}