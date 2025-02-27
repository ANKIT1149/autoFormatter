import * as vscode from "vscode";
import * as pretier from "prettier";

export function activate(context: vscode.ExtensionContext) {
	let formatter = vscode.languages.registerDocumentFormattingEditProvider("javascript", {
		async provideDocumentFormattingEdits(document: vscode.TextDocument): Promise<vscode.TextEdit[]> {
			console.log('console.log("🚀 Auto Formatter Activated!");', document.fileName);
			const fullrange = new vscode.Range(
				document.positionAt(0),
				document.positionAt(document.getText().length)
			);

			const originalText = document.getText();
			let formattedText = "";

			try {
				formattedText = await pretier.format(originalText, {
					parser: 'babel',
					semi: true,
					singleQuote: true,
					tabWidth: 2,
					printWidth: 80,
					trailingComma: "es5",
				});
			} catch (error) {
				console.log("Formatting failed", error);
				return [];
			}
			
			console.log("🔹 Original Text:\n", originalText);
			console.log("✅ Formatted Text:\n", formattedText);
			
			if (originalText === formattedText) {
				console.log("⚠️ No changes detected, VS Code might be rejecting the edit.");
				return [];
			}
			console.log("✅ Formatting Applied");
			return [vscode.TextEdit.replace(fullrange, formattedText)];
		},
	});
    
	context.subscriptions.push(formatter);
	console.log("✅ Formatter Registered!");
} 

export function deactivate(){}