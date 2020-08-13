const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:4000',
      changeOrigin: true,
      logLevel: 'debug',
      headers: {
            Connection: 'keep-alive',
            'Accept-Encoding': ""
        },
        bypass: function(req, res, proxyOptions){
            req.headers['accept-encoding'] = "deflate";
            req.headers['origin'] = proxyOptions.target;
        }
    })
  );

}