$(function(){
	var	socketio = io.connect('/user');
	
	var $userNameArea = $('#userNameArea');
	var $userName = $('#userName');
	var $submitUserName = $('#submitUserName');
	
	var $buttonArea = $('#buttonArea');
	var $answer = $('#answer');
	var $name_label = $('#name_label');
	var $now_answer = $('#now_answer');
	var $answer_name = $('#answer_name');
	var $maru = $('#maru');
	var $batsu = $('#batsu');
	var $left = $('.left');
	
	(function() {
		move();
		setInterval(move, 2000);
		function move() {
			$left
				.animate({top:'5vh'}, 1000)
				.animate({top:'4vh'}, 1000);
		}
	}());
	
	$submitUserName.click(function() {
		var userName = $userName.val();
		if (userName != null && userName != '') {
			socketio.emit("request", userName);
			$name_label
				.text(userName)
				.css('font-size', Math.floor(15 / userName.length) + 'vw');
			$userNameArea.hide();
			$buttonArea.show();
		}
	});
	
	$answer.bind("touchstart", function() {
		socketio.emit("push");
	});
	
	socketio.on("now", function(name) {
		$now_answer.show();
		$answer_name
			.text(name)
			.css('font-size', 'calc(' + Math.floor(30 / name.length) + 'vw - 5px)');
		$answer_name.show();
		$left.show();
	});
	
	socketio.on("reset", function() {
		$now_answer.hide();
		$answer_name.hide().text('');
		$maru.hide();
		$batsu.hide();
		$left.hide();
	});
});