import React from 'react';
import NavBar from '../../../components/navbar';
import Person from 'material-ui/svg-icons/social/person';
import PersonOutline from 'material-ui/svg-icons/social/person-outline';
import LockOpen from 'material-ui/svg-icons/action/lock-open';
import LockOutline from 'material-ui/svg-icons/action/lock-outline';
import List from 'material-ui/svg-icons/action/list';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import './style.css';

export default class AddUserInfo extends React.Component{
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
	   			width: '90%',
	    		height: '100px',
	    		marginTop: '40px'
			},
			inputContainer: {
				width: '90%',
	    		height: '100%',
	    		fontSize: '35px',
	    		float: 'right'
			},
			dateInputContainer: {
				width: '90%',
	    		height: '100%',
	    		fontSize: '35px',
	    		float: 'right',
	    		lineHeight: '90px'
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
				<NavBar title="填写个人信息" href="#/login"/>

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
					<DatePicker
						hintText="出生日期(必填)"
						autoOk={true}
						cancelLabel='取消'
						value={this.state.birthday}
        				onChange={this.handleDateChange}
        				textFieldStyle={style.dateInputContainer}
					/>
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

				<RaisedButton
					href="#/login"
					label="注册"
					style={style.registerBtn}
					buttonStyle={style.btnStyle}
					labelStyle={style.registerLabelStyle}
				/>

			</div>
		)
	}
}