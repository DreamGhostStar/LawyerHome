const {
    createProxyMiddleware
} = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://106.14.174.206:7003',
      changeOrigin: true,
    })
  );
};