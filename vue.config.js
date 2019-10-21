module.exports = {
    devServer: {
        proxy: {
            "/proxy": {
                target: "https://h5.ele.me",
                changeOrigin: true,
                pathRewrite: {
                    "^/proxy": ""
                },
                cookieDomainRewrite:{
                    "*":""
                }
            },
            "/geo": {
                target: "http://api.map.baidu.com",
                changeOrigin: true,
                pathRewrite: {
                    "^/geo": ""
                },
                cookieDomainRewrite:{
                    "*":""
                }
            }
        }
    }
}