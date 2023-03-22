let path = require('path')

module.exports= {
    entry: './public/js/index.js',
    mode:'development',
    output:{
        filename: 'bundle.js',
        path: path.resolve(__dirname,'public')
    }
}