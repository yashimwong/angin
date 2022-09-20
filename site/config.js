const path = require('path');
const root = path.resolve(__dirname, '..');
module.exports = {
    root,
    output: path.join(root, 'out'),
    cache: path.join(root, '.site-cache'),
    title: 'Angin',
    description: 'A lightweight React UI library. Explore 46 components, accessible patterns, and high-performance charts.',
    origin: process.env.DOCS_ORIGIN || 'https://angin-documentation.sunny-cabin-4083.chatgpt.site',
    basePath: process.env.DOCS_BASE_PATH || '/',
    repository: 'https://github.com/yashimwong/angin',
    version: require('../package.json').version,
};
