const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolve } = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports ={
    entry:'./src/js/index.js',
    output:{
        filename:'js/built.js',
        path:resolve(__dirname,'build')
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    //'style-loader',　//Styleタグを作成して、Cssをstyleタグの中に挿入する
                    MiniCssExtractPlugin.loader, // style-loaderの代わりに使う。JSファイルからCSSを抽出して単独でCSSファイルを生成する
                    'css-loader' //CSSファイルをJSファイルに合併する
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            // 生成されるCssをリネーム
            filename:'css/built.css'
        })
    ],
    mode: 'development'
};