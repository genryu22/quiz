$(function() {
	var	socketio = io.connect('/monitor');
	
	var $body = $('body');
	var $result = $('#result');
				
	socketio.on('answer', function(name) {
		$body.css('background-image', 'url("image/now.png")');
		$result
			.text(name)
			.css('font-size', 'calc(' + Math.floor(100 / name.length) + 'vw - 10px)');
		playSound('answer');
	});

	socketio.on('reset', function() {
		$result.text('');
		$body.css('background-image', '');
		playSound('question');
	});
	
	socketio.on('correct', function() {
		$body.css('background-image', 'url("image/maru.jpg")');
		playSound('correct');
	});

	socketio.on('incorrect', function() {
		$body.css('background-image', 'url("image/batsu.jpg")');
		playSound('incorrect');
	});
	
	function playSound(name) {
		var sound = $('#' + name)[0];
		sound.pause();
		sound.load();
		sound.play();
	}
});