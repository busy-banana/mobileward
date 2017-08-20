import React from 'react';
import NavBar from '../../../components/navbar';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import AppContainer from '../../appContainer';
import Http from '../../../actions';
import IconButton from 'material-ui/IconButton';
import Dialogs from '../../../components/dialog';
import Add from 'material-ui/svg-icons/content/add';
import Person from 'material-ui/svg-icons/social/person';
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
        this.getMemberInfo();
    }

	handleClose(){
		this.setState({open: false});
	}

    getMemberInfo(){
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
        const rightBtn = (
			<IconButton 
				className="add-equipment-btn"
				onTouchTap={this.addMember}>
				<Add className="add-equipment" />
			</IconButton>
		);
        return(
            <div className="container">
                <NavBar title="成员信息" href={`#/dashboard?SN=${this.SN}`} rightElement={rightBtn}/>

                <Person className="person-icon"/>
                <Dialogs
					message={this.state.message}
					onTouchTap={this.handleClose}
					open={this.state.open}
				/>
            </div>
        )
    }
}