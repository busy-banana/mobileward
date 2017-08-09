export default class getRegisterDate{
	getCurrentDate(){
		let nDate = new Date();
		let nYear = nDate.getFullYear();
		let nMonth = nDate.getMonth() + 1;
		let nDay = nDate.getDate();
		let nHour = nDate.getHours();
		let nMin = nDate.getMinutes();
		let nSec = nDate.getSeconds();
		nMonth = nMonth < 10 ? '0' + nMonth : nMonth;
		nDay = nDay < 10 ? '0' + nDay : nDay;
		nHour = nHour < 10 ? '0' + nHour : nHour;
		nMin = nMin < 10 ? '0' + nMin : nMin;
		nSec = nSec < 10 ? '0' + nSec : nSec;
		nDate = nYear + '-' + nMonth + '-' + nDay + ' ' + nHour + ':' + nMin + ':' + nSec;
		return nDate;
	}
}