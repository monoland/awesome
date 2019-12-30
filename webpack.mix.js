const mix = require('laravel-mix');

mix.setPublicPath('public');

mix.webpackConfig({
    resolve: {
        extensions: ['.js', '.scss', '.vue'],
        alias: {
            '@apps': __dirname + '/resources/apps',
            '@sass': __dirname + '/resources/sass'
        }
    }
});

mix.js('resources/apps/index.js', 'scripts/core/apps.js');
mix.extract();