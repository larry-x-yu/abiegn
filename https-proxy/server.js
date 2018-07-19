var http = require('http'),
    httpProxy = require('http-proxy');

httpProxy.createProxyServer({
  target: {
    protocol: 'https:',
    host: 'www.toyota.com',
    port: 443
  },
  changeOrigin: true,
followRedirects: true
}).listen(8000);
