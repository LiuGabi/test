// 过滤器


Date.prototype.format = function(format) {
    var date = {
          "M+": this.getMonth() + 1,
          "d+": this.getDate(),
          "h+": this.getHours(),
          "m+": this.getMinutes(),
          "s+": this.getSeconds(),
          "q+": Math.floor((this.getMonth() + 3) / 3),
          "S+": this.getMilliseconds()
    };

   if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
   }

    for (var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
             format = format.replace(RegExp.$1, RegExp.$1.length == 1? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
   return format;
}


let filter = {}

filter.install = function (Vue) {

	Vue.filter('dateFormatToS', function(value) {
		
	    let time = new Date(parseInt(value))

	    
	    return time.format('yyyy-MM-dd hh:mm:ss')

	})

	Vue.filter('dateFormatToD', function(value) {
		
	    let time = new Date(parseInt(value))

	    
	    return time.format('yyyy-MM-dd')

	})

	Vue.filter('getAge', function(birthday) {
		
	    let birthYear = new Date(parseInt(birthday)).getFullYear()

	    let currentYear = new Date().getFullYear()

	    let age = currentYear - birthYear;

	    
	    return age

	})

	Vue.filter('getChineseZodiac', function(birthday) {

		let year = new Date(birthday).format('yyyy')
		let arr=['猴','鸡','狗','猪','鼠','牛','虎','兔','龙','蛇','马','羊']; 
		
		return /^\d{4}$/.test(year)?arr[year%12]:null

	})

	Vue.filter('getZodiac', function(birthday) {

		let month = new Date(birthday).format('M')
		let day = new Date(birthday).format('d')

		let s = "魔羯水瓶双鱼牡羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯"; 
		let arr = [20,19,21,21,21,22,23,23,23,23,22,22];

		return s.substr(month*2-(day<arr[month-1]?2:0), 2);

	})

	Vue.filter('statusMap', function(status) {

		switch(status) {
			case 0: 
				return '待放款';
			case 12: 
				return '放款中';
			case 21:
				return '放款失败';
			case 22:
				return '放款拒绝 ';
			case 23:
				return '放款异常';
			case 29:
				return '放款成功';
			default:
				return 'ERROR DATA';
		}

	})

}

export default filter
