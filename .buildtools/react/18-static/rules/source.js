module.exports = () => { return {
    test: /\.html/i,
    dependency: { not: ['url'] },
    type: 'asset/source'
}}