function HM() {}

HM.prototype.page_view = function (data) {
	$.post("api/index.php?action=page_view", data, function(res){

	}, 'json')
}

HM.prototype.page_click = function (data, cb) {
	$.post("api/index.php?action=page_click", data, function(res){
		cb();
	}, 'json')
}

