var fs = require('fs');
var colors = require('colors');
var readline = require('readline');
var exec = require('child_process').execFile;
var open = require('open');

// directory creating
function mkdir_p(path, mode, callback, position) {
	mode = mode || 0777;
	position = position || 0;
	parts = require('path').normalize(path).split('/');

	if (position >= parts.length) {
		if (callback) {
			return callback();
		} else {
			return true;
		}
	}

	var directory = parts.slice(0, position + 1).join('/');
	fs.stat(directory, function(err) {
		if (err === null) {
			mkdir_p(path, mode, callback, position + 1);
		} else {
			fs.mkdir(directory, mode, function (err) {
				if (err) {
					if (callback) {
						return callback(err);
					} else {
						throw err;
					}
				} else {
					mkdir_p(path, mode, callback, position + 1);
				}
			})
		}
	})
}

var readline = require('readline');
var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

rl.question("Thigolaa beynun domain name eh jahaabala !!!", function(dirname) {
  // TODO: Log the answer in a database
  mkdir_p("G:/server/htdocs/"+dirname);

  var hostName = '<VirtualHost *:80>\r\n';
  hostName += 'DocumentRoot  "G:/server/htdocs/'+dirname+'"\r\n';
  hostName += 'ServerName  '+'dev.'+dirname+'\r\n';
  hostName += 'ServerAlias '+'dev.'+dirname+'\r\n';
  hostName += '<Directory  "G:/server/htdocs/'+dirname+'">\r\n';
  hostName += 'AllowOverride All\r\n';
  hostName += 'Require all Granted\r\n';
  hostName += '</Directory>\r\n';
  hostName += '</VirtualHost>\r\n';

  var host ="127.0.0.1    ";
  fs.appendFile('C:/Windows/System32/Drivers/etc/hosts', host+'dev.'+dirname+"\r\n", function (err) {
  	if (err) return console.log(err);
  	console.log('Habbeys'.green);
  	console.log('Mihaar Fennaane :http://dev.'+dirname+''.blue);
  	console.log('============================================='.red);
  });

  fs.appendFile('G:/server/apache/conf/extra/httpd-vhosts.conf', hostName+"\r\n", function (err) {
  	if (err) return console.log(err);
  	
  });
  

  exec('G:/server/xampp_start.exe', function(err, data) {  
  	console.log(err)
  	console.log('Mihaar alun apache server start vefa innaane'.green);                       
  });  
  
  open('http://dev.'+dirname);

  rl.close();
});







