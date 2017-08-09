import React from 'react';
import NavBar from '../../../components/navbar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dialogs from '../../../components/dialog';
import Http from '../../../actions';
import './style.css';

export default class ChangePWD extends React.Component{
	constructor(props){
        super(props);
        this.state = {
            message: '',
            open: false,
            oldPassword: '',    //原密码
            newPassword: '',    //新密码
            confirmPwd: '',     //新密码确认
            newPwdErrorText: '',    
            confirmPwdErrorText: ''
        }
        this.handleOldPwdChange = this.handleOldPwdChange.bind(this);
        this.handleNewPwdChange = this.handleNewPwdChange.bind(this);
        this.handleConfirmPwdChange = this.handleConfirmPwdChange.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.changePwd = this.changePwd.bind(this);
    }
    
    handleClose(){
		this.setState({open: false});
		if(this.state.message == '修改成功，请重新登录'){
            localStorage.clear();
			window.location.href = window.location.origin + '#/login';
		}
    }
    
    handleOldPwdChange(event, value){
        this.setState({oldPassword: value});
    }
    
    handleNewPwdChange(event, value){
        if(!/\S{6,}$/.test(value) || value.length > 20){
			this.setState({newPwdErrorText: '6~20个字符，区分大小写'});
		}else if(value != this.state.confirmPwd){
			this.setState({
				newPwdErrorText: '',
				confirmPwdErrorText: '两次输入密码不一致',
				newPassword: value
			});
		}else{
			this.setState({
				pwdErrorText: '',
				confirmPwdErrorText: '',
				newPassword: value
			});
		}
    }

    handleConfirmPwdChange(event, value){
		if(value != this.state.newPassword){
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
    
    changePwd(){
        Http.http('post',{
                url: '/api/changePwd',
                params: {
                    equipmentSN : this.state.equipmentSN,
                    equipmentBN: this.state.equipmentBN,
                    serialNumber: SN,
                }
            },
            //00:绑定成功   01:设备已绑定  02:设备序列号不存在  03:设备绑定码不正确   99:系统异常
            (data) => {
                if(data == "00"){
                    this.setState({open: true, message: '添加成功'});
                }else if(data == "01"){
                    this.setState({open: true, message: '该设备已被绑定'});
                }else if(data == "02"){
                    this.setState({open: true, message: '设备序列号不正确'});
                }else if(data == "03"){
                    this.setState({open: true, message: '设备绑定码不正确'});
                }else{
                    this.setState({open: true, message: '系统异常，请稍后再试'});
                }
                //console.log(data);
            }
        )
	}
	

	render(){
		const style = {
            inputContainer: {
				width: '90%',
	    		height: '100%',
	    		fontSize: '35px',
	    		left: '50px',
            },
            errorTextStyle: {
				fontSize: '35px',
				marginTop: '10px'
            },
            registerContainer: {
	   			width: '100%',
	    		height: '100px',
	    		marginTop: '40px'
            },
            registerBtn: {
				width: '80%',
				height: '100px',
				margin: '10%'
            },
            registerLabelStyle: {
				fontSize: '42px',
				color: '#fff',
				top: '20px',
				fontWeight: 'normal'
            },
            btnStyle: {
				backgroundColor: '#4642B6',
            },
            labelFocusStyle: {
				lineHeight:'0',
			},
        }

        let btnDisabled = true;
        if(this.state.oldPassword && this.state.newPassword && this.state.confirmPwd 
            && this.state.newPwdErrorText == '' && this.state.confirmPwdErrorText == ''){
			btnDisabled = false;
		}

        const btnDOM =  btnDisabled ?
			<RaisedButton
				label="确认更改"
				style={style.registerBtn}
				labelStyle={style.registerLabelStyle}
				onTouchTap={(e) => {e.preventDefault();this.changePwd()}}
				disabled={true}
			/> :
			<RaisedButton
				label="确认更改"
				style={style.registerBtn}
				buttonStyle={style.btnStyle}
				labelStyle={style.registerLabelStyle}
				onTouchTap={(e) => {e.preventDefault();this.changePwd()}}
			/>;

		return (
			<div className="container">
				<NavBar title="修改密码" href="#/home"/>
                <div style={style.registerContainer}>
					<TextField
                        type="password"
						floatingLabelText="原密码"
						floatingLabelFocusStyle={style.labelFocusStyle}
						style={style.inputContainer}
          				onChange={this.handleOldPwdChange}
					/>
				</div>
                <div style={style.registerContainer}>
					<TextField
                        type="password"                    
						floatingLabelText="新密码"
						floatingLabelFocusStyle={style.labelFocusStyle}
						style={style.inputContainer}
          				onChange={this.handleNewPwdChange}
          				errorText={this.state.newPwdErrorText}
          				errorStyle={style.errorTextStyle}
					/>
				</div>
                <div style={style.registerContainer}>
					<TextField
                        type="password"                    
						floatingLabelText="确认新密码"
						floatingLabelFocusStyle={style.labelFocusStyle}
						style={style.inputContainer}
          				onChange={this.handleConfirmPwdChange}
          				errorText={this.state.confirmPwdErrorText}
          				errorStyle={style.errorTextStyle}
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