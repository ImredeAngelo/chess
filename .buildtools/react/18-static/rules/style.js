module.exports = (loader) => { return {
    test: /\.s?css$/,
    use: [
        {
            loader: loader
        },
        {
            loader: 'css-loader',
            options: {
                importLoaders: 1,
                esModule: false,
                modules: {
                    localIdentName: '[name]-[local]'
                },
                // url: false
            },
        },
        {
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    plugins: [
                        [ "cssnano", { preset: ['default', { svgo: false }, { discardComments: { removeAll: true }}]}],
                        [ "postcss-preset-env" ],
                        [ "postcss-cssnext", { warnForDuplicates: false } ],
                        [ "postcss-inline-svg" ],
                    ]
                }
            }
        },
        {
            loader: 'sass-loader',
            options: {
                // TODO: Configure from webpack
                additionalData: "@use 'src/styles/config.scss' as *;",
                sassOptions: {
                    implementation: require('sass'),
                }
            }
        }
    ]
}}