"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
function activate(context) {
    vscode.workspace.onDidOpenTextDocument(doc => {
        if (doc.languageId !== 'csharp')
            return;
        // Delay to wait for editor to fully load
        setTimeout(() => {
            const editor = vscode.window.activeTextEditor;
            if (!editor || editor.document !== doc)
                return;
            const usingLines = [];
            for (let i = 0; i < doc.lineCount; i++) {
                const lineText = doc.lineAt(i).text.trim();
                if (/^using\s.+;$/.test(lineText)) {
                    usingLines.push(i);
                }
                else {
                    break; // Stop once we hit non-using line
                }
            }
            if (usingLines.length > 0) {
                const firstLine = usingLines[0];
                const lastLine = usingLines[usingLines.length - 1];
                const range = new vscode.Range(firstLine, 0, lastLine, doc.lineAt(lastLine).text.length);
                editor.selection = new vscode.Selection(range.start, range.end);
                vscode.commands.executeCommand('editor.fold');
            }
        }, 1000); // 1-second delay
    });
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map