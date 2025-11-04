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
      const line = position.line; // 0-based
      const column = position.character;

      // Example command — customize this
      const command = `/home/andreas/min-vscode-ext/v/bin/python main.py ${filePath} ${line} ${column}`;

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
