const proxy = require('http-proxy-middleware')

module.exports = function(app) {
    app.use(
        proxy(
            '/user/', {
                target: 'http://192.168.170.39:8082',
                changeOrigin: true
            }
        ),
        proxy(
            '/manager/', {
                // target: 'http://192.168.31.219:8081',
                target: 'http://192.168.170.39:8082',
                changeOrigin: true
            }
        )
    )
} 