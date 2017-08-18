import React from 'react';

export default class AppContainer extends React.Component{
	constructor(props){
		super(props);
	}

	//页面跳转
	go(url){
		window.location = url;
	}

	//获取url参数
	getParams(index){
		let url = window.location.href;
		let a = url.indexOf("?");
		if(a >= 0){
			let query = url.slice(a+1);
			let arrParams = query.split('&');
			let arr = [];
			arrParams.forEach((i) => {
				arr.push(i.slice(i.indexOf('=')+1));
			})
			return index && index <= arr.length ? arr[index-1] : arr;
		}else{
			return '';
		}
	}

	render() {
		const style = {width: '100%',height: '100%'};
		return (
			<div style={style}>
				{this.props.children}
			</div>
		)
	}
}