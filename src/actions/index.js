import request from 'reqwest';

class Http{

	http(method, options, onResponse){
		request({
			url: options.url,
			method: method || 'get',
			data: options.params || {},
			type: options.type || 'json',
			headers: {
				'Accept': 'application/json;charset=UTF-8'
			},
			success: (data) => {
				onResponse(data);
			},
			error: (err) => {
				console.log('HTTP Error:'+err);
			}
		})
	}

}
export default new Http('Http');