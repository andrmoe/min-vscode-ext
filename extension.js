const vscode = require("vscode");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  const disposable = vscode.commands.registerCommand(
    "cursor-command.run",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage("No active editor.");
        return;
      }

      const filePath = editor.document.uri.fsPath;
      const position = editor.selection.active;
      const selection = editor.selection;
      const payload = {
        file: filePath,
        cursor: {
          row: position.line,
          col: position.character,
        },
        selection: {
          startrow: selection.start.line,
          startcol: selection.start.character,
          endrow: selection.end.line,
          endcol: selection.end.character,
        },
      };

      const jsonArg = JSON.stringify(payload).replace(/"/g, '\\"');
      const command = `/home/andreas/min-vscode-ext/v/bin/python /home/andreas/min-vscode-ext/main.py '${jsonArg}'`;

      const terminal =
        vscode.window.activeTerminal ||
        vscode.window.createTerminal("Cursor Command");
      terminal.show(true);
      terminal.sendText(command);
    }
  );

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = { activate, deactivate };
