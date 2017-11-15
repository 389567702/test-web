var express = require('express');
var proxy = require('http-proxy-middleware');
var path = require('path');
var app = express();
// 需要代理转发的路径的服务器地址。
// app.use('/app_api', proxy({target: 'http://k12.lenovouat.com',changeOrigin: true}));
// app.use('/api', proxy({target: 'http://team5-edu-cloud-app.dockeruat.lefile.cn',changeOrigin: true}));
// app.use('/search', proxy({target: 'http://s.lenovouat.com/',changeOrigin: true}));
// app.use(proxy(function (pathname, req) {
//     // 这里的正则表示 .js .css .xxxx 等文件不代理 包含 根路径 /
//     var file=!(/\.(gif|jpg|png|woff|svg|eot|ttf|js|css|html)\??.*/.test(pathname)||pathname=="/");
//     if(file) console.log(pathname);
//     return file;
// },{target: 'http://admin.lenovouat.com/',changeOrigin: true}));
// //静态资源文件路径地址。 lenovo-edu-server\edu-cloud\edu-cloud-web-app\src\main\resources\static
// // app.use(express.static(path.join(path.dirname(__dirname), 'lenovo-edu-server', 'edu-cloud', 'edu-cloud-web-app', 'src', 'main', 'resources')));
// // app.use(express.static(path.join(path.dirname(__dirname), 'search', 'static', 'src', 'lenovoapp')));
// app.use(express.static(path.join(path.dirname(__dirname), 'NewBackSys', 'src')));
// app.use("/moto",express.static(path.join(path.dirname(__dirname), 'MotoPos')));

// //启动端口
// app.listen(3000);


// var app2 = express();
// // 需要代理转发的路径的服务器地址。
// // app.use('/app_api', proxy({target: 'http://k12.lenovouat.com',changeOrigin: true}));
// // app.use('/api', proxy({target: 'http://team5-edu-cloud-app.dockeruat.lefile.cn',changeOrigin: true}));
// // app.use('/search', proxy({target: 'http://s.lenovouat.com/',changeOrigin: true}));
// app2.use(proxy(function (pathname, req) {
//     // 这里的正则表示 .js .css .xxxx 等文件不代理 包含 根路径 /
//     var file=!(/\.(gif|jpg|png|woff|svg|eot|ttf|js|css|html)\??.*/.test(pathname)||pathname=="/");
//     if(file) console.log(pathname);
//     return file;
// },{target: 'http://pos.lenovouat.com/',changeOrigin: true}));
// //静态资源文件路径地址。 lenovo-edu-server\edu-cloud\edu-cloud-web-app\src\main\resources\static
// app2.use(express.static(path.join(path.dirname(__dirname), 'MotoPos')));
// //启动端口
// app2.listen(3111);

var app3 = express();
//静态资源文件路径地址。 lenovo-edu-server\edu-cloud\edu-cloud-web-app\src\main\resources\static
app3.use(express.static(path.join(__dirname,"moto")));
//启动端口
app3.listen(3112);