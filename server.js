var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');

app.listen(8080);

var firstPush = true;

function handler(req, res) {
	fs.readFile(req.url == '/' ? './public/user.html' : './public' + req.url, function (err, data) {
		if (err) {
			res.writeHead(500);
			return res.end('Error');
		}

		res.writeHead(200);
		res.end(data);
	});
}

(function initUser() {
	var user = io.of('/user');
	user.on('connection', function(socket) {
		socket.on('request', function(name) {
			socket.nickname = name;
			io.of('/parent').emit('log', name + ' が接続しました。');
		});
		
		socket.on('push', function() {
			if (firstPush) {
				io.of('/user').emit('now', socket.nickname);
				io.of('/parent').emit('log', socket.nickname + ' が解答権を得ました。');
				io.of('/monitor').emit('answer', socket.nickname);
				firstPush = false;
			}
		});
		
		socket.on('disconnect', function() {
			io.of('/parent').emit('log', socket.nickname + ' が切断しました。');
		});
	});
}());

(function initParent() {
	var parent = io.of('/parent');
	parent.on('connection', function(socket) {
		socket.on('reset', function() {
			firstPush = true;
			parent.emit('log', '[解答権がリセットされました]');
			io.of('/monitor').emit('reset');
			io.of('/user').emit('reset');
		});
		
		socket.on('correct', function() {
			io.of('/monitor').emit('correct');
			io.of('/user').emit('correct');
			parent.emit('log', '正解です。');
		});
		
		socket.on('incorrect', function() {
			io.of('/monitor').emit('incorrect');
			io.of('/user').emit('incorrect');
			parent.emit('log', '不正解です。');
		});
	});
}());

(function initMonitor() {
	var monitor = io.of('/monitor');
	monitor.on('connection', function(socket) {
		
	});
}());