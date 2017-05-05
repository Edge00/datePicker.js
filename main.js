;(function(){

	var monthData, $wrapper;

	datePicker.buildUi = function (year, month){
		monthData = datePicker.getMonthData(year, month)
		var html = 	'<div class="ui-datepicker-header">' +
						'<a class="ui-datepicker-btn ui-datepicker-prev-btn" href="#">&lt;</a>' +
						'<a class="ui-datepicker-btn ui-datepicker-next-btn" href="#">&gt;</a>' +
						'<span class="ui-datepicker-current-month">' + monthData.year + '-' + monthData.month + '</span>' +
					'</div>' +
					'<div class="ui-datepicker-body">' +
						'<table>' +
							'<thead>' +
								'<tr>' +
									'<th>一</th>' +
									'<th>二</th>' +
									'<th>三</th>' +
									'<th>四</th>' +
									'<th>五</th>' +
									'<th>六</th>' +
									'<th>日</th>' +
								'</tr>' +
							'</thead>' +
						'<tbody>';

		for (var i = 0; i < monthData.days.length; i++) {

			if (i%7 === 0) {
				html += '<tr>';
			}

			html += '<td data-date="' + monthData.days[i].date + '">' + monthData.days[i].showDate + '</td>';

			if (i%7 === 6) {
				html += '</tr>';
			}

		}

		html += 		'</tbody>' +
					'</table>' +
				'</div>';

		return html;
	}

	datePicker.render = function (direction){
		var year, month;
		if (monthData) {
			year = monthData.year;
			month = monthData.month;
		}
		if (direction === 'next') month ++;
		if (direction === 'prev') month --;

		if (month < 1) {
			year--;
			month = 12;
		}
		if(month > 12) {
			year++;
			month = 1;
		}

		var html = datePicker.buildUi(year, month);
		$wrapper = document.querySelector('.ui-datepicker-container');
		if (!$wrapper) {
			$wrapper = document.createElement('div');
			document.body.appendChild($wrapper);
			$wrapper.className = 'ui-datepicker-container';
		}
		$wrapper.innerHTML = html
	};

	datePicker.init = function (input) {

		var $input = document.querySelector(input);

		datePicker.render()

		$input.addEventListener('focus', function(){
			$wrapper.classList.add('ui-datepicker-container-show');
			var left = $input.offsetLeft;
			var top = $input.offsetTop + $input.offsetHeight;
			$wrapper.style.left = left + 'px';
			$wrapper.style.top = top + 2 + 'px';
		}, false)

		$wrapper.addEventListener('click', function(e){
			var $target = e.target;
			if (!$target.classList.contains('ui-datepicker-btn')) {
				return false;
			}
			if ($target.classList.contains('ui-datepicker-prev-btn')) {
				datePicker.render('prev');
			} else if ($target.classList.contains('ui-datepicker-next-btn')) {
				datePicker.render('next');
			}

		}, false)

		$wrapper.addEventListener('click', function(e){
			var $target = e.target;
			if ($target.tagName.toLowerCase() !== 'td') {
				return false;
			}

			var date = new Date(monthData.year, monthData.month - 1, $target.dataset.date);

			$input.value = format(date);

			$wrapper.classList.remove('ui-datepicker-container-show');

		}, false)

	};

	function format (date) {
		var result = '';
		var padding = function (num) {
			if (num <= 9) {
				return '0' + num;
			}
			return num;
		}
		result += date.getFullYear() + '-';
		result += padding(date.getMonth() + 1) + '-';
		result += padding(date.getDate());
		return result;
	}

})();
