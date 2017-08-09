import React from 'react';
import NavBar from '../../../components/navbar';
import Img from '../../../../public/images/doctor.jpg';
import './style.css';

export default class About extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div className="container">
                <NavBar title="关于" href="#/home"/>
                <img className="about-portrait" src={Img}/>
                <p className="about-title">移动病房</p>
                <p className="about-copyright">Copyright © 2017</p>
			</div>
		)
	}
}