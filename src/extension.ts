// src/extension.ts
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as path from "path";
import { TextEncoder } from "util";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated

  console.log(
    'Congratulations, your extension "ai-code-paster" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand(
    "ai-code-paster.writeAiMarkdown",
    async () => {
      // Read current clipboard
      const clipboardText = await vscode.env.clipboard.readText();

      if (!clipboardText) {
        vscode.window.showWarningMessage("Clipboard is empty.");
        return;
      }

      const workspaceFolders = vscode.workspace.workspaceFolders;
      if (!workspaceFolders) {
        vscode.window.showErrorMessage("No workspace folder is open.");
        return;
      }

      const rootPath = workspaceFolders[0].uri.fsPath;
      
      // Regex to find markdown code blocks with a file path in the first line
      // Matches ```lang(optional) \n // path \n content ```
      const regex = /```[\w-]*\r?\n\s*\/\/\s*(.+?)\r?\n([\s\S]*?)```/g;
      
      let match;
      let processedCount = 0;

      while ((match = regex.exec(clipboardText)) !== null) {
        const relativePath = match[1].trim();
        const fileContent = match[2];
        const fullPath = path.join(rootPath, relativePath);
        const directoryPath = path.dirname(fullPath);

        try {
          // Create directory if it doesn't exist
          await vscode.workspace.fs.createDirectory(vscode.Uri.file(directoryPath));
          
          // Write file (overwrite if exists)
          const encoder = new TextEncoder();
          await vscode.workspace.fs.writeFile(
            vscode.Uri.file(fullPath), 
            encoder.encode(fileContent)
          );
          
          processedCount++;
        } catch (error) {
          console.error(`Error writing file ${relativePath}:`, error);
          vscode.window.showErrorMessage(`Failed to write ${relativePath}`);
        }
      }

      if (processedCount > 0) {
        vscode.window.showInformationMessage(`Successfully processed ${processedCount} file(s).`);
      } else {
        vscode.window.showInformationMessage("No valid code blocks with file paths found in clipboard.");
      }
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}

