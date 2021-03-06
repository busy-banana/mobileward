import React from 'react';
import NavBar from '../../../components/navbar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dialogs from '../../../components/dialog';
import Http from '../../../actions';
import AppContainer from '../../appContainer';
import './style.css';

export default class Dashboard extends AppContainer{
	constructor(props){
        super(props);
        this.state = {
            message: '',
            open: false,
            equipmentSN: '',    //设备序列号
            equipmentBN: '',    //设备绑定码
            snErrorText: '',    //设备序列号错误提示文字
            bnErrorText: '',    //设备绑定码错误提示文字
        }
        this.handleEquipmentSNChange = this.handleEquipmentSNChange.bind(this);
        this.handleEquipmentBNChange = this.handleEquipmentBNChange.bind(this);
        this.addEquipment = this.addEquipment.bind(this);
		this.handleClose = this.handleClose.bind(this);
		// ['handleEquipmentSNChange',
		//  'handleEquipmentBNChange',
		//  'addEquipment',
		//  'handleClose'
		// ].forEach((item) => {
		// 	this[item] = this[item].bind(this);
		// });

    }
    
    handleClose(){
		this.setState({open: false});
		if(this.state.message == '添加成功'){
			this.go('#/equipmentList');
		}
    }
    
    handleEquipmentSNChange(event, value){
		this.setState({equipmentSN: value});
    }
    
    handleEquipmentBNChange(event, value){
		this.setState({equipmentBN: value});
    }
    
    addEquipment(){
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
	    		fontSize: '1rem',
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
		if(this.state.equipmentSN && this.state.equipmentBN){
			btnDisabled = false;
		}

        const btnDOM =  btnDisabled ?
			<RaisedButton
				label="添加"
				style={style.registerBtn}
				labelStyle={style.registerLabelStyle}
				onTouchTap={(e) => {e.preventDefault();this.addEquipment()}}
				disabled={true}
			/> :
			<RaisedButton
				label="添加"
				style={style.registerBtn}
				buttonStyle={style.btnStyle}
				labelStyle={style.registerLabelStyle}
				onTouchTap={(e) => {e.preventDefault();this.addEquipment()}}
			/>;

		return (
			<div className="container">
				<NavBar title="添加设备" href="#/equipmentList"/>
                <p className="add-tips">添加设备后默认成为超级管理员</p>
                <div style={style.registerContainer}>
					<TextField
						className="input-container"
						floatingLabelText="设备序列号"
						style={style.inputContainer}
          				onChange={this.handleEquipmentSNChange}
          				errorText={this.state.snErrorText}
          				errorStyle={style.errorTextStyle}
					/>
				</div>
                <div style={style.registerContainer}>
					<TextField
						className="input-container"
						floatingLabelText="设备绑定码"
						style={style.inputContainer}
          				onChange={this.handleEquipmentBNChange}
          				errorText={this.state.bnErrorText}
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