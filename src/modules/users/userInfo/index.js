import React from 'react';
import NavBar from '../../../components/navbar';
import Create from 'material-ui/svg-icons/content/create';
import IconButton from 'material-ui/IconButton';
import Http from '../../../actions';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Dialogs from '../../../components/dialog';
import AppContainer from '../../appContainer';
import './style.css';

export default class UserInfo extends AppContainer{
    constructor(props){
        super(props);
        this.state = {
			open: false,
			message: '',
			disabled: true,
			name: '',
			sex: '',
			telephone: '',
			mobilephone: '',
			email: '',
			wechat: '',
			address: '',
			postcode: '',
			nameErrorText: '',
		}
		this.SN = localStorage.getItem('serialNumber');
		this.handleNameChange = this.handleNameChange.bind(this);
		['handleClose',
			'handleInputStatus',
			'handleNameChange',
			'handleSexChange',
			'handleTelephoneChange',
			'handleMobilePhoneChange',
			'handleEmailChange',
			'handlePostcodeChange',
			'handleWeChatChange',
			'handleAddressChange',
			'updateUserInfo'
		].forEach((method) => {
			this[method] = this[method].bind(this);
		})
    }

    componentWillMount(){
        this.getInitUserInfo();
    }

    //加载页面获取用户信息
    getInitUserInfo(){
		Http.http('post',{
				url: '/api/getUserInfo',
				params: {
					serialNumber: this.SN
				}
			},
			(data) => {
				if(data.resCode == "00"){
					this.handleUserInfo(data.datas);
				}else{
					this.setState({open: true, message: '系统异常'});
				}
			}
		)
	}

    //修改用户信息
	updateUserInfo(){
		Http.http('post',{
				url: '/api/updateUserInfo',
				params: {
					serialNumber: this.SN,
					name: this.state.name,
					sex: this.state.sex,
					telephone: this.state.telephone,
					mobilephone: this.state.mobilephone,
					email: this.state.email,
					wechat: this.state.wechat,
					address: this.state.address,
					postcode: this.state.postcode
				}
			},
			(data) => {
				if(data.resCode == "00"){
					localStorage.setItem('name',this.state.name);
					this.setState({open: true, message: '修改成功'});
				}else{
					this.setState({open: true, message: '系统异常'});
				}
			}
		)
	}

    handleInputStatus(){
		this.setState({disabled: false});
	}

	
	handleClose(){
		this.setState({open: false});
		if(this.state.message == '修改成功'){
			this.go('#/home');
		}
	}

	//处理服务端返回数据
	handleUserInfo(data){
		this.setState({
			name: data.name || '',
			sex: data.sex || '',
			telephone: data.telephone || '',
			mobilephone: data.mobilephone || '',
			email: data.email || '',
			wechat: data.wechat || '',
			address: data.address || '',
			postcode: data.postcode || ''
		})
	}

	handleNameChange(event, value){
		if(!/^[\u4e00-\u9fa5]{2,10}$/.test(value)){
			this.setState({
				nameErrorText: '请填写正确的中文名',
				name: value
			});
		}else{
			this.setState({
				nameErrorText: '',
				name: value
			});
		}
	}

	handleSexChange(event, index, value){
		this.setState({
			sex: value,
		});
	}

	handleTelephoneChange(event, value){
		this.setState({telephone: value});
	}

	handleMobilePhoneChange(event, value){
		this.setState({mobilephone: value});
	}

	handleEmailChange(event, value){
		this.setState({email: value});
	}

	handleWeChatChange(event, value){
		this.setState({wechat: value});
	}

	handleAddressChange(event, value){
		this.setState({address: value});
	}

	handlePostcodeChange(event, value){
		this.setState({postcode: value});
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
			labelFocusStyle: {
				lineHeight:'0',
			},
			registerLabelStyle: {
				fontSize: '42px',
				color: '#fff',
				top: '20px',
				fontWeight: 'normal'
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
        const rightBtn = (
			<IconButton 
				className="add-equipment-btn"
				onTouchTap={this.handleInputStatus}>
				<Create className="add-equipment" />
			</IconButton>
		);
		let btnDisabled = true;
		if(this.state.nameErrorText == '' && this.state.name && this.state.sex && this.state.disabled == false){
			btnDisabled = false;
		}
		const btnDOM =  btnDisabled ?
			<RaisedButton
				label="确定"
				style={style.registerBtn}
				labelStyle={style.registerLabelStyle}
				disabled={true}
			/> :
			<RaisedButton
				label="确定"
				style={style.registerBtn}
				buttonStyle={style.btnStyle}
				labelStyle={style.registerLabelStyle}
				onTouchTap={this.updateUserInfo}
			/>;
		
		return(
            <div className="container">
				<NavBar title="个人信息" href="#/home" rightElement={rightBtn}/>

				<div style={style.registerFirstInput}>
					<TextField
						floatingLabelText="姓名(必填)"
						floatingLabelFocusStyle={style.labelFocusStyle}
						style={style.inputContainer}
          				onChange={this.handleNameChange}
          				errorText={this.state.nameErrorText}
          				errorStyle={style.errorTextStyle}
						value={this.state.name}
						disabled={this.state.disabled}
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
						disabled={this.state.disabled}
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
						value={this.state.telephone}
						disabled={this.state.disabled}
					/>
				</div>

				<div style={style.registerContainer}>
					<TextField
						floatingLabelText="手机"
						floatingLabelFocusStyle={style.labelFocusStyle}
						style={style.inputContainer}
          				onChange={this.handleMobilePhoneChange}
						value={this.state.mobilephone}
						disabled={this.state.disabled}
					/>
				</div>

				<div style={style.registerContainer}>
					<TextField
						floatingLabelText="电子邮箱"
						floatingLabelFocusStyle={style.labelFocusStyle}
						style={style.inputContainer}
          				onChange={this.handleEmailChange}
						value={this.state.email}
						disabled={this.state.disabled}
					/>
				</div>

				<div style={style.registerContainer}>
					<TextField
						floatingLabelText="微信号"
						floatingLabelFocusStyle={style.labelFocusStyle}
						style={style.inputContainer}
          				onChange={this.handleWeChatChange}
						value={this.state.wechat}
						disabled={this.state.disabled}
					/>
				</div>

				<div style={style.registerContainer}>
					<TextField
						floatingLabelText="地址"
						floatingLabelFocusStyle={style.labelFocusStyle}
						style={style.inputContainer}
          				onChange={this.handleAddressChange}
						value={this.state.address}
						disabled={this.state.disabled}
					/>
				</div>

				<div style={style.registerContainer}>
					<TextField
						floatingLabelText="邮政编码"
						floatingLabelFocusStyle={style.labelFocusStyle}
						style={style.inputContainer}
          				onChange={this.handlePostcodeChange}
						value={this.state.postcode}
						disabled={this.state.disabled}
					/>
				</div>

				{btnDOM}
				
				<Dialogs
					message={this.state.message}
					onTouchTap={(e) => {e.preventDefault();this.handleClose()}}
					open={this.state.open}
				/>
            </div>
        )
    }
}