const {
    createProxyMiddleware
} = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://118.178.182.184:8080',
      changeOrigin: true,
    })
  );
};