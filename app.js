var http = require('http');
var express = require('express');
var fs = require("fs");

var app = express();
/* 跨域 */
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type:text/html');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    res.header('Access-Control-Expose-Headers', 'Content-Disposition');
    next();
});

app.get('/download', function (req, res, next) {
    // 响应头：
    /**
     * HTTP/1.1 200 OK
     * X-Powered-By: Express
     * content-disposition: attachment;filename=xxx.xlsx
     * content-type: application/vnd.ms-excel;charset=utf-8
     * transfer-encoding: chunked
     * date: Thu, 04 Jun 2020 07:38:39 GMT
     * connection: close
     */
    var path = "./upload/aaaaaa.xls";
    var f = fs.createReadStream(path);
    res.writeHead(200, {
        'Access-Control-Expose-Headers': 'Content-Disposition',
        'Content-Type': 'application/vnd.ms-excel;charset=utf-8',
        'Content-Disposition': 'attachment;filename=djshfljkashldf.xlsx'
    });
    f.pipe(res);
});

http.createServer(app).listen(3000, function () {
    console.log('下载服务端口3000');
});