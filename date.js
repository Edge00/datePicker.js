;(function(){

	var datePicker = {};

	// output days info of corresponding month
	datePicker.getMonthData = function(year, month){

		var result = [];

		if (!year || !month) {
			var today = new Date();
			year  = today.getFullYear();
			month = today.getMonth() + 1;
		}

		// get first day of corresponding month 获取当月第一天
		var firstDay = new Date(year, month - 1, 1);


		year = firstDay.getFullYear();
		month = firstDay.getMonth() + 1;


		// get week info of first day 获取当月第一天是周几
		var firstDayWeekDay = firstDay.getDay();
		if (firstDayWeekDay === 0) firstDayWeekDay = 7;

		// get last day of last month 获取上个月最后一天
		var lastDayOfLastMonth = new Date(year, month - 1, 0);
		var lastDateOfLastMonth = lastDayOfLastMonth.getDate();

		// blank cells number
		var preMonthDayCount = firstDayWeekDay - 1;

		// get last day of corresponding month 获取当月最后一天
		var lastDay = new Date(year, month, 0);
		var lastDate = lastDay.getDate();

		for (var i = 0; i < 7 * 6; i++) {

			var date = i + 1 - preMonthDayCount;
			var showDate = date;
			var thisMonth = month;

			if (date <= 0) {
				// last month 上一月
				thisMonth = month - 1;
				showDate = lastDateOfLastMonth + date;
			} else if (date > lastDate) {
				// next month 下一月
				thisMonth = month + 1;
				showDate = showDate - lastDate;
			}

			if (thisMonth === 0) thisMonth = 12;
			if (thisMonth === 13) thisMonth = 1;

			result.push({
				month: thisMonth,
				date: date,
				showDate: showDate
			})
		}

		return {
			year: year,
			month: month,
			days: result
		}

	}

	window.datePicker = datePicker;

})();
