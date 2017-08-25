import React from 'react';
import NavBar from '../../../components/navbar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dialogs from '../../../components/dialog';
import Http from '../../../actions';
import AppContainer from '../../appContainer';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import './style.css';

export default class Dashboard extends AppContainer{
	constructor(props){
        super(props);
        this.state = {
            message: '',
            open: false,
            addUsername: '',
            addMemberType: '',
            usernameErrorText: '',            
        }
        this.SN = this.getParams(1);
        this.handleAddMemberChange = this.handleAddMemberChange.bind(this);
        this.handleAddMemberTypeChange = this.handleAddMemberTypeChange.bind(this);
        this.addMember = this.addMember.bind(this);
		this.handleClose = this.handleClose.bind(this);
    }
    
    handleClose(){
		this.setState({open: false});
		if(this.state.message == '添加成功'){
			this.go('#/equipmentList');
		}
    }
    
    handleAddMemberChange(event, value){
        if(!/^[a-zA-Z][a-zA-Z0-9_]{3,}$/.test(value) || value.length > 20){
            this.setState({usernameErrorText: '4~20个字符(字母、数字、下划线)，以字母开头'});
        }else{
            this.setState({
                usernameErrorText: '',
                addUsername: value
            });
        }
    }
    
    handleAddMemberTypeChange(event, index, value){
		this.setState({
			addMemberType: value,
		});
	}
    
    addMember(){
		let SN = localStorage.getItem('serialNumber');
		if(this.state.equipmentSN && this.state.equipmentBN && SN){
			Http.http('post',{
					url: '/api/addEquipment',
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
		}else{
			return '';
		}
	}
	

	render(){
		const style = {
            inputContainer: {
				width: '90%',
	    		height: '100%',
	    		fontSize: '0.9rem',
	    		left: '22px',
            },
            errorTextStyle: {
				fontSize: '0.9rem',
				marginTop: '10px'
            },
            registerContainer: {
	   			width: '100%',
	    		height: '40px',
	    		marginTop: '20px'
            },
            registerBtn: {
				width: '80%',
				height: '40px',
				margin: '10%'
            },
            menuItemStyle: {
				fontSize: '1rem',
				padding: '6px 0'
			},
            registerLabelStyle: {
				fontSize: '1.15rem',
				color: '#fff',
				top: '7px',
				fontWeight: 'normal'
            },
            btnStyle: {
				backgroundColor: '#4642B6',
            }
        }

        let btnDisabled = true;
		if(this.state.addUsername && this.state.addMemberType && this.state.usernameErrorText == ''){
			btnDisabled = false;
		}

        const btnDOM =  btnDisabled ?
			<RaisedButton
				label="添加"
				style={style.registerBtn}
				labelStyle={style.registerLabelStyle}
				onTouchTap={(e) => {e.preventDefault();this.addMember()}}
				disabled={true}
			/> :
			<RaisedButton
				label="添加"
				style={style.registerBtn}
				buttonStyle={style.btnStyle}
				labelStyle={style.registerLabelStyle}
				onTouchTap={(e) => {e.preventDefault();this.addMember()}}
			/>;

		return (
			<div className="container">
				<NavBar title="添加成员" href={`#/dashboard/memberInfo?SN=${this.SN}`}/>
                <div style={style.registerContainer}>
					<TextField
						className="input-container"
						floatingLabelText="添加成员用户名"
						style={style.inputContainer}
          				onChange={this.handleAddMemberChange}
          				errorText={this.state.usernameErrorText}
          				errorStyle={style.errorTextStyle}
					/>
				</div>

                <div style={style.registerContainer}>
					<SelectField
          				className="select-field"
						floatingLabelText="添加成员类型"
						style={style.inputContainer}
						menuItemStyle={style.menuItemStyle}
						value={this.state.addMemberType}
          				onChange={this.handleAddMemberTypeChange}
					>
						<MenuItem value="1" primaryText="普通管理员" />
						<MenuItem value="2" primaryText="临时用户" />
					</SelectField>
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