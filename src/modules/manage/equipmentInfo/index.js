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
                        serialNumber: this.SN
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

    render(){
        let datas = this.state.datas;

        console.log(datas)
        return(
            <div className="container">
                <NavBar title="设备信息" href={`#/dashboard?SN=${this.SN}`}/>

                <List>
                    <ListItem
                        disabled={true}
                        className="equipment-list-left"
                        primaryText="设备名称"
                        style={{height: '150px',fontSize: '40px',fontWeight: 'normal',lineHeight: '120px'}}
                    />
                    <span className="equipment-list-right">{datas.equipmentName}</span>
                    <Divider/>

                    <ListItem
                        disabled={true}
                        className="equipment-list-left"
                        primaryText="设备状态"
                        style={{height: '150px',fontSize: '40px',fontWeight: 'normal',lineHeight: '120px'}}
                    />
                    <span className="equipment-list-right">{datas.status}</span>
                    <Divider/>

                    <ListItem
                        disabled={true}
                        className="equipment-list-left"
                        primaryText="设备序列号"
                        style={{height: '150px',fontSize: '40px',fontWeight: 'normal',lineHeight: '120px'}}
                    />
                    <span className="equipment-list-right">{this.SN}</span>
                    <Divider/>

                    <ListItem
                        disabled={true}
                        className="equipment-list-left"
                        primaryText="超级管理员序列号"
                        style={{height: '150px',fontSize: '40px',fontWeight: 'normal',lineHeight: '120px'}}
                    />
                    <span className="equipment-list-right">{datas.adminUserSN}</span>
                    <Divider/>

                    <ListItem
                        disabled={true}
                        className="equipment-list-left"
                        primaryText="患者序列号"
                        style={{height: '150px',fontSize: '40px',fontWeight: 'normal',lineHeight: '120px'}}
                    />
                    <span className="equipment-list-right">{datas.patientSN}</span>
                    <Divider/>

                    <ListItem
                        disabled={true}
                        className="equipment-list-left"
                        primaryText="数据浏览状态"
                        style={{height: '150px',fontSize: '40px',fontWeight: 'normal',lineHeight: '120px'}}
                    />
                    <span className="equipment-list-right">{datas.userBrowseStatus}</span>
                    <Divider/>

                    <ListItem
                        disabled={true}
                        className="equipment-list-left"
                        primaryText="设备加载模块"
                        style={{height: '150px',fontSize: '40px',fontWeight: 'normal',lineHeight: '120px'}}
                    />
                    <span className="equipment-list-right">{datas.moduleSet}</span>
                    <Divider/>

                    <ListItem
                        disabled={true}
                        className="equipment-list-left"
                        primaryText="设备连接时间"
                        style={{height: '150px',fontSize: '40px',fontWeight: 'normal',lineHeight: '120px'}}
                    />
                    <span className="equipment-list-right">{datas.connectionTime}</span>
                    <Divider/>
                </List>
            </div>
        )
    }
}