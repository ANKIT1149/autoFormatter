import * as vscode from "vscode";
import * as prettier from "prettier";


export function activate(context: vscode.ExtensionContext) {
	console.log("🚀 Auto Formatter Extension Activated!");
     
    const ext = vscode.extensions.getExtension("Auto-formatter.techkitFormatters");
    console.log("Extension Info:", ext);

	vscode.window.showInformationMessage("Gent extension successfully");
	
	let disposable = vscode.commands.registerCommand(
		"Auto-formatter.techkitFormatters",
		async () => {
			console.log("📌 Command 'Auto-formatter.techkitFormatters' triggered!");
			const editor = vscode.window.activeTextEditor;

			if (!editor || !editor.document) {
				vscode.window.showErrorMessage("No file is open. Open a file to format.");
				return;
			}

			console.log("📂 Active file:", editor.document.fileName);

			await vscode.commands.executeCommand("editor.action.formatDocument");
		}
	);

	let formatter = vscode.languages.registerDocumentFormattingEditProvider(
		 { language: "javascript", scheme: "file" },
		{
			async provideDocumentFormattingEdits(
				document: vscode.TextDocument
			): Promise<vscode.TextEdit[]> {
				if (!document || !document.fileName) {
					console.error("⚠️ No file is open.");
					vscode.window.showErrorMessage("No file open for formatting.");
					return [];
				}

				const fullRange = new vscode.Range(
					document.positionAt(0),
					document.positionAt(document.getText().length)
				);

				const originalText = document.getText();
				let formattedText = "";

				try {
					formattedText = await prettier.format(originalText, {
						parser: "babel",
						semi: true,
						singleQuote: true,
						tabWidth: 2,
						printWidth: 80,
						trailingComma: "es5",
					});
				} catch (error) {
					console.error("❌ Formatting failed", error);
					vscode.window.showErrorMessage("Formatting failed: " + error);
					return [];
				}

				if (originalText === formattedText) {
					console.log("⚠️ No changes detected, skipping formatting.");
					return [];
				}

				console.log("✅ Formatting Applied");
				return [vscode.TextEdit.replace(fullRange, formattedText)];
			},
		}
	);

	context.subscriptions.push(formatter);
	context.subscriptions.push(disposable);
	console.log("✅ Formatter Registered!");
}

export function deactivate() {}
