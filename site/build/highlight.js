const ts = require('typescript');
const { escape } = require('./html');
function highlight(code, language = '') {
    if (!/^(tsx?|jsx?|json|css|sh|bash)$/.test(language)) return escape(code);
    // Syntax scanning is performed at build time; the browser receives plain spans.
    const scanner = ts.createScanner(ts.ScriptTarget.Latest, false, ts.LanguageVariant.JSX, code);
    let html = '', token;
    while ((token = scanner.scan()) !== ts.SyntaxKind.EndOfFileToken) {
        const value = escape(scanner.getTokenText());
        const kind = token === ts.SyntaxKind.StringLiteral || token === ts.SyntaxKind.NoSubstitutionTemplateLiteral ? 'string'
            : token === ts.SyntaxKind.NumericLiteral ? 'number'
            : token === ts.SyntaxKind.SingleLineCommentTrivia || token === ts.SyntaxKind.MultiLineCommentTrivia ? 'comment'
            : token >= ts.SyntaxKind.FirstKeyword && token <= ts.SyntaxKind.LastKeyword ? 'keyword' : '';
        html += kind ? `<span class="token-${kind}">${value}</span>` : value;
    }
    return html;
}
function codeBlock(code, language = '') {
    return `<div class="code-block"><div class="code-toolbar"><span>${escape(language || 'Code')}</span><button class="copy-button" type="button" data-copy aria-label="Copy code">Copy</button></div><pre tabindex="0"><code>${highlight(code, language)}</code></pre><span class="sr-only" data-copy-status role="status"></span></div>`;
}
module.exports = { highlight, codeBlock };
