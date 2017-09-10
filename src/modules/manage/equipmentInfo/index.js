import React from 'react';
import NavBar from '../../../components/navbar';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import AppContainer from '../../appContainer';
import Http from '../../../actions';
import Dialogs from '../../../components/dialog';
import './style.css';

export default class EquipmentInfo extends AppContainer{
    constructor(props){
        super(props);
        this.state = {
            datas: '',
            open: false,
			message: ''
        }
        this.SN = this.getParams(1);
        this.handleClose = this.handleClose.bind(this);
    }

    componentWillMount(){
        this.getEquipmentInfo();
    }

	handleClose(){
		this.setState({open: false});
	}

    getEquipmentInfo(){
        if(this.SN){
            Http.http('post',{
                    url:'/api/getEquipmentInfo',
                    params:{
                        equipmentSN: this.SN
                    }
                },
                (data) => {
                    if(data.resCode == "00"){
                        this.setState({
                            datas: data.datas
                        })
                    }else{
                        this.setState({open: true,message: '系统异常'})
                    }
                }
            )
        }else{
            return null;
        }
    }

    handleEquipmentStatus(i){
        let status = '';
        switch(i){
            case '0': status = '未连接';break;
            case '1': status = '已连接';break;
            case '2': status = '数据传输中';break;
            case '3': status = '设备异常';break;
        }
        return status;
    }

    render(){
        let datas = this.state.datas;
        let status = this.handleEquipmentStatus(datas.status);
        return(
            <div className="container">
                <NavBar title="设备信息" href={`#/dashboard?SN=${this.SN}`}/>

                <List>
                    <ListItem
                        disabled={true}
                        className="equipment-list-left"
                        primaryText="设备名称"
                        style={{fontSize: '1rem',fontWeight: 'normal',lineHeight: '20px'}}
                    />
                    <span className="equipment-list-right">{datas.equipmentName}</span>
                    <Divider/>

                    <ListItem
                        disabled={true}
                        className="equipment-list-left"
                        primaryText="设备状态"
                        style={{fontSize: '1rem',fontWeight: 'normal',lineHeight: '120px'}}
                    />
                    <span className="equipment-list-right">{status}</span>
                    <Divider/>

                    <ListItem
                        disabled={true}
                        className="equipment-list-left"
                        primaryText="设备序列号"
                        style={{fontSize: '1rem',fontWeight: 'normal',lineHeight: '120px'}}
                    />
                    <span className="equipment-list-right">{this.SN}</span>
                    <Divider/>

                    {/* <ListItem
                        disabled={true}
                        className="equipment-list-left"
                        primaryText="超级管理员序列号"
                        style={{fontSize: '1rem',fontWeight: 'normal',lineHeight: '120px'}}
                    />
                    <span className="equipment-list-right">{datas.adminUserSN}</span>
                    <Divider/> */}

                    <ListItem
                        disabled={true}
                        className="equipment-list-left"
                        primaryText="患者序列号"
                        style={{fontSize: '1rem',fontWeight: 'normal',lineHeight: '120px'}}
                    />
                    <span className="equipment-list-right">{datas.patientSN}</span>
                    <Divider/>

                    <ListItem
                        disabled={true}
                        className="equipment-list-left"
                        primaryText="数据浏览状态"
                        style={{fontSize: '1rem',fontWeight: 'normal',lineHeight: '120px'}}
                    />
                    <span className="equipment-list-right">{datas.userBrowseStatus==1?'有用户浏览':'无用户浏览' }</span>
                    <Divider/>

                    <ListItem
                        disabled={true}
                        className="equipment-list-left"
                        primaryText="设备连接时间"
                        style={{fontSize: '1rem',fontWeight: 'normal',lineHeight: '120px'}}
                    />
                    <span className="equipment-list-right">{datas.connectionTime}</span>
                    <Divider/>
                    
                    <ListItem
                        disabled={true}
                        className="equipment-list-left"
                        primaryText="设备加载模块"
                        style={{fontSize: '1rem',fontWeight: 'normal',lineHeight: '120px'}}
                    />
                    <span className="equipment-list-right">{datas.moduleSet}</span>
                    <Divider/>
                </List>

                <Dialogs
					message={this.state.message}
					onTouchTap={this.handleClose}
					open={this.state.open}
				/>
            </div>
        )
    }
}