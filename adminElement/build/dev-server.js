require('./check-versions')();                              //检查NodeJS和npm的版本

let config = require('../config');

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

let opn = require('opn');                                   //自动打开浏览器
let path = require('path');
let express = require('express');
let webpack = require('webpack');
let proxyMiddleware = require('http-proxy-middleware');     //使用代理的中间件
let webpackConfig = require('./webpack.dev.conf');

let port = process.env.PORT || config.dev.port;             //端口号
let autoOpenBrowser = !!config.dev.autoOpenBrowser;         //是否自动打开浏览器
let proxyTable = config.dev.proxyTable;                     //http代理的url

let app = express();
let compiler = webpack(webpackConfig);                      //webpack编译

//webpack-dev-middleware的作用
//1.将编译后的生成的静态文件放在内存中,所以在npm run dev后磁盘上不会生成文件
//2.当文件改变时,会自动编译。
//3.当在编译过程中请求某个资源时，webpack-dev-server不会让这个请求失败，而是会一直阻塞它，直到webpack编译完毕
let devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true
});

//webpack-hot-middleware的作用就是实现浏览器的无刷新更新
let hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: () => {
    }
});

//声明hotMiddleware无刷新更新的时机:html-webpack-plugin 的template更改之后
compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        hotMiddleware.publish({action: 'reload'});
        cb()
    })
});

//将代理请求的配置应用到express服务上
/*Object.keys(proxyTable).forEach(function (context) {
 let options = proxyTable[context];

 if (typeof options === 'string') {
 options = {target: options}
 }

 app.use(proxyMiddleware(options.filter || context, options))
 });*/

let proxy = proxyMiddleware({
    target: "http://192.168.5.58:3001"
});

app.use("/api", proxy);


/*使用connect-history-api-fallback匹配资源
 如果不匹配就可以重定向到指定地址*/
app.use(require('connect-history-api-fallback')());

// serve webpack bundle output
app.use(devMiddleware);

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware);

//配置express静态资源目录
let staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
app.use(staticPath, express.static('./static'));

let uri = 'http://localhost:' + port;

let _resolve;
let readyPromise = new Promise(resolve => {
    _resolve = resolve
});

//编译成功后打印uri
console.log('> Starting dev server...');

devMiddleware.waitUntilValid(() => {
    console.log('> Listening at ' + uri + '\n');

    //满足条件则自动打开浏览器
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
        opn(uri)
    }
    _resolve()
});

let server = app.listen(port);

module.exports = {
    ready: readyPromise,
    close: () => {
        server.close()
    }
};
