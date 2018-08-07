const googlehome = require('google-home-notifier');

const googlehome_name = 'Your Google Home Name';    // Google Homeの名前（なんでもいい）
const googlehome_ip = '192.168.11.5';            // Google HomeのIPアドレス
const language = 'ja';                              // Google Homeに喋らせたい言語（usで英語です）
const message = 'てすと';                  // 喋らせたい内容

var config = require('config');
console.log(config);
config.userList.forEach(item => {
  console.log(item.user.userId);
});
//config.

var http = require('http');
http.createServer(function (request, response) {


  let post_data = '';

  request.on('data', function (chunk) {
    post_data += chunk;
  });

  request.on('end', function () {
    console.log('post_data : ' + post_data);

    const webhook = JSON.parse(post_data).events[0];
    if (webhook.type != 'message' || webhook.message.type != 'text') {
      return;
    }

    let userName ="";
    if (webhook.source.userId === "XXXX") {
        userName = "NAME1";
    } else if(webhook.source.userId === "YYYY") {
        userName = "NAME2";
    }
    
    // 特定の人からのメッセージのみ発話
    let str = userName + "です。" + webhook.message.text;
    //const data_text = webhook.message.text;
    //  googlehome_speak(config.beginning_sentence + data_text);

    googlehome.device(googlehome_name, language);
    googlehome.ip(googlehome_ip);

    googlehome.notify(str, (res) => {
        console.log(res);
    });

    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end();
  });

  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Hello Hosomichi!\n');


}).listen(3000, '127.0.0.1');
