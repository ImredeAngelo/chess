module.exports = (hmr, rootPathSuffix="./src", rootPathPrefix="@") => { return {
    test: /\.(js|jsx)$/i,
    exclude: /(node_modules|bower_components)/,
    use: {
        loader: 'babel-loader',
        options: {
            plugins: [
                hmr && 'react-refresh/babel',
                [ '@babel/plugin-proposal-class-properties' ],
                [ 'babel-plugin-root-import', {
                    rootPathPrefix: rootPathPrefix,
                    rootPathSuffix: rootPathSuffix
                }]
            ].filter(Boolean),
            presets: [
                [
                    '@babel/preset-env', {
                    "targets": {
                        "node": "18"
                    }
                }],
                '@babel/preset-react',
            ]
        }
    }
}}