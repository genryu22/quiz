$(function() {
	var	socketio = io.connect('/parent');
		
	socketio.on("log", function(str) {
		var $text = $('#log > p');
		var $new_text = $('<p>' + new Date().toLocaleTimeString() + ' : ' + str + '</p>');
		if ($text.length == 0) {
			$new_text.appendTo($('#log'));
		} else {
			$new_text.insertBefore($text.first());
		}
	});
	
	$('#clearButton').bind("click", function() {
		socketio.emit("reset");
	});
	
	$('#correctButton').bind("click", function() {
		socketio.emit("correct");
	});
	
	$('#incorrectButton').bind("click", function() {
		socketio.emit("incorrect");
	});
});