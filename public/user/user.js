$(function(){
	var	socketio = io.connect('/user');
				
	var user_name = window.prompt("名前を入力してください。");
	user_name = user_name == null ? '' : user_name;
	socketio.emit("request", user_name);
	
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
	
	$name_label
		.text(user_name)
		.css('font-size', Math.floor(15 / user_name.length) + 'vw');
	
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
	
	socketio.on("correct", function() {
		//$maru.show();
	});
	
	socketio.on("incorrect", function() {
		//$batsu.show();
	});
	
	socketio.on("reset", function() {
		$now_answer.hide();
		$answer_name.hide().text('');
		$maru.hide();
		$batsu.hide();
		$left.hide();
	});
	
	function playSound(name) {
		var sound = $('#' + name)[0];
		sound.pause();
		sound.load();
		sound.play();
	}
});