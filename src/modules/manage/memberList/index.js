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

export default class memberList extends AppContainer{
    constructor(props){
        super(props);
        this.state = {
            datas: '',
            open: false,
			message: ''
        }
        this.SN = this.getParams(1);
        this.handleClose = this.handleClose.bind(this);
        this.addMember = this.addMember.bind(this);
    }

    componentWillMount(){
        this.getMemberList();
    }

	handleClose(){
		this.setState({open: false});
    }
    
    addMember(){
		const username = localStorage.getItem('username');
		if(!username){
			this.setState({open: true, message: '用户未登录'});
		}else{
			this.go(`#/dashboard/addMember?SN=${this.SN}`);
		}
	}

    getMemberList(){
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
                <NavBar title="成员列表" href={`#/dashboard?SN=${this.SN}`} rightElement={rightBtn}/>

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