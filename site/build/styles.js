const CleanCSS = require('clean-css');

/** Minify only the generated docs asset; published library CSS stays readable. */
function minifyStyles(source) {
    const result = new CleanCSS({ level: 1, rebase: false }).minify(source);
    if (result.errors.length) throw new Error(`Stylesheet build failed: ${result.errors.join('; ')}`);
    return result.styles;
}
module.exports = { minifyStyles };
