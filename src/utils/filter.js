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

	});

	Vue.filter('dateFormatToM', function(value) {
		
	    let time = new Date(parseInt(value))

	    
	    return time.format('yyyy-MM-dd hh:mm')

	});

	Vue.filter('dateFormatToD', function(value) {
		
	    let time = new Date(parseInt(value))

	    
	    return time.format('yyyy-MM-dd')

	});

	Vue.filter('desensitize', function(value) {
		// 电话号码脱敏
	    let num = value

	    
	    return num.substr(0,3)+"****"+num.substr(7)

	});

	Vue.filter('nameDesensitize', function(name) {
		// 姓名脱敏
	    let myName = name

	    return myName.substr(0,1)+"**"

	});

	Vue.filter('refundStatusMap', function(status) {
		// 还款状态
		switch(status) {
			case 0: 
				return '申请';
			case 11: 
				return '未通过支用规则';
			case 19: 
				return '通过支用规则';
			case 21:
				return '放款失败';
			case 22:
				return '放款拒绝 ';
			case 29:
				return '放款成功';
			case 30:
				return '待还款';
			case 31:
				return '已逾期';
			case 88:
				return '代偿还款成功';
			case 89:
				return '还款成功';
			case 99:
				return '已清算';
			default:
				return '这是一个飞往外星的状态';
		}
	});

	Vue.filter('chargeTypeMap', function(status) {
		// 费用类型
		switch(status) {
			case 'capital': 
				return '借款金额'; // 本金
			case 'interest': 
				return '借款利息';
			case 'service_charge': 
				return '居间服务费';
			case 'overdue_interest':
				return '逾期利息';
			case 'overdue_service':
				return '逾期管理费 ';
			case 'roll_over_charge':
				return '展期费用 ';
			default:
				return '';
		}
	});

	Vue.filter('repaywayMap', function(status) {
		// 支付方式
		switch(status) {
			case 'AUTO_DEDUCT': 
				return '自动代扣'; // 本金
			case 'MANUAL_DEDUCT': 
				return '手工主动代扣';
			case 'OVERDUE_AUTO_DEDUCT': 
				return '逾期自动代扣';
			case 'URGE_MANUAL_DEDUCT':
				return '催收手工强扣';
			case 'NORMAL_ONLINE_APP':
				return '主动线上APP还款 ';
			case 'NORMAL_ONLINE_H5':
				return '主动线上H5还款 ';
			case 'NORMAL_OFFLINE':
				return '主动线下还款';
			default:
				return '';
		}
	});

}

export default filter
