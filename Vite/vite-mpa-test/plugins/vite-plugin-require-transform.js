// src/index.ts
import * as parser from "@babel/parser";
import _traverse from "@babel/traverse";
import _generate from "@babel/generator";
import * as t from "@babel/types";
var traverse = _traverse.default || _traverse;
var generate = _generate.default || _generate;
function vitePluginRequireTransform(params = {}) {
  const {
    fileRegex = /.ts$|.tsx$/,
    importPrefix: prefix = "_vite_plugin_require_transform_",
    importPathHandler = (path) => path.replace(/(.*\/)*([^.]+).*/ig, "$2").replace(/-/g, "_")
  } = params;
  return {
    name: prefix,
    async transform(code, id) {
      if (!fileRegex.test(id)) {
        return { code, map: null };
      }
      const importMap = /* @__PURE__ */ new Map();
      const plugins = [];
      const ast = parser.parse(code, {
        sourceType: "module",
        plugins,
        sourceFilename: id
      });
      const declaredVariables = {};
      traverse(ast, {
        enter(path) {
          var _a, _b, _c, _d;
          const reportError = (message) => {
            var _a2, _b2;
            const loc = (_b2 = (_a2 = path.parentPath) == null ? void 0 : _a2.node.loc) == null ? void 0 : _b2.start;
            console.error(message + " in " + id + (loc ? ":" + loc.line + ":" + loc.column : ""));
          };
          if (((_a = path.parentPath) == null ? void 0 : _a.node) && t.isVariableDeclarator(path.parentPath.node)) {
            const name = path.parentPath.node.id.name;
            if (!declaredVariables[name]) {
              declaredVariables[name] = path.parentPath.node;
            }
          }
          if (path.isIdentifier({ name: "require" }) && t.isCallExpression((_b = path == null ? void 0 : path.parentPath) == null ? void 0 : _b.node)) {
            const argument = path.parentPath.node.arguments[0];
            let requirePath = void 0;
            if (t.isTemplateLiteral(argument)) {
              const tl = argument;
              let templateElementValue = "";
              for (let i = 0; i < tl.quasis.length; i++) {
                const element = tl.quasis[i];
                const expression = tl.expressions[i];
                if (expression === void 0) {
                  continue;
                }
                if (t.isIdentifier(expression)) {
                  const identifier2 = expression;
                  const variableValue = (_c = declaredVariables[identifier2.name]) == null ? void 0 : _c.init;
                  if (variableValue === void 0 || variableValue === null) {
                    reportError(`Unknown variable for template value: "${identifier2.name}"`);
                    continue;
                  }
                  if (t.isStringLiteral(variableValue)) {
                    const sl = variableValue;
                    templateElementValue += element.value.raw;
                    templateElementValue += variableValue.value;
                  } else {
                    reportError(`Unknown type of template value: "${variableValue.type}" for "${identifier2.name}"`);
                  }
                } else {
                  reportError(`Unknown type of template expression: "${expression.type}"`);
                }
              }
              requirePath = templateElementValue;
            } else if (t.isStringLiteral(argument)) {
              const sl = argument;
              requirePath = sl.value;
            } else {
              reportError(`Unknown type of require argument: "${argument.type}"`);
              return;
            }
            const nodes = (_d = importMap.get(requirePath)) != null ? _d : [];
            nodes.push(path.parentPath);
            importMap.set(requirePath, nodes);
          }
        }
      });
      let importIndex = 0;
      for (const [requirePath, nodes] of importMap) {
        const importVariableName = prefix + importPathHandler(requirePath) + "_" + importIndex++;
        // const identifier2 = t.identifier(importVariableName);
        const identifier2 = t.identifier(importVariableName.replaceAll('@', '__'));
        const firstNode = nodes[0];
        const importNamespaceSpecifier2 = t.importNamespaceSpecifier(identifier2);
        const importDeclaration2 = t.importDeclaration([importNamespaceSpecifier2], t.stringLiteral(requirePath));
        importDeclaration2.loc = firstNode.node.loc;
        const rootNode = firstNode.findParent((path) => {
          var _a;
          return ((_a = path.parentPath) == null ? void 0 : _a.isProgram()) || false;
        });
        rootNode == null ? void 0 : rootNode.insertBefore(importDeclaration2);
        const identifierDefault = t.memberExpression(identifier2, t.identifier("default"));
        const identifierDefaultOrIdentifier = t.logicalExpression("||", identifierDefault, identifier2);
        nodes.forEach((node) => {
          node.replaceWith(identifierDefaultOrIdentifier);
        });
      }
      const output = generate(ast, { sourceMaps: true });
      return { code: output.code, map: output.map };
    }
  };
}
export {
  vitePluginRequireTransform as default
};
