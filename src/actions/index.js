import request from 'reqwest';

export default class Http{

	http(method, options, onResponse){
		request({
			url: options.url,
			method: method,
			data: options.params,
			type: options.type || 'json',
			headers: {
				'Accept': 'application/json;charset=UTF-8'
			},
			success: (data) => {
				onResponse(data);
			},
			error: (err) => {
				console.log(err);
			}
		})
	}

}