const ts = require('typescript');
const path = require('path');
const config = require('../config');
const { components } = require('../catalog');
function extractApi() {
    const program = ts.createProgram([path.join(config.root, 'src/index.ts')], {
        target: ts.ScriptTarget.ES2018, module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.React,
        esModuleInterop: true, strict: true, skipLibCheck: true, noEmit: true,
    });
    const checker = program.getTypeChecker();
    const result = {};
    for (const component of components) {
        const source = program.getSourceFile(path.join(config.root, `src/components/${component.category}/${component.name}.tsx`));
        const declaration = source?.statements.find(node => ts.isInterfaceDeclaration(node) && node.name.text === `${component.name}Props`);
        if (!declaration) throw new Error(`Missing public props for ${component.name}`);
        const type = checker.getTypeAtLocation(declaration);
        result[component.name] = checker.getPropertiesOfType(type).filter(property => {
            const location = property.declarations?.[0]?.getSourceFile().fileName;
            return location && location.startsWith(path.join(config.root, 'src'));
        }).map(property => ({
            name: property.name,
            required: !(property.flags & ts.SymbolFlags.Optional),
            type: checker.typeToString(checker.getTypeOfSymbolAtLocation(property, declaration), declaration, ts.TypeFormatFlags.NoTruncation),
            description: ts.displayPartsToString(property.getDocumentationComment(checker)),
        })).sort((a, b) => Number(b.required) - Number(a.required) || a.name.localeCompare(b.name));
    }
    return result;
}
module.exports = { extractApi };
