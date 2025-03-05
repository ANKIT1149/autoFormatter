import * as vscode from "vscode";
import * as prettier from "prettier";
import * as dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY});

export function activate(context: vscode.ExtensionContext) {
  console.log("🚀 Auto Formatter Extension Activated!");

  const provider = new Sidebar(context);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider("autoFormatter.sidebar", provider)
  );

  let Sidebarshowcmd = vscode.commands.registerCommand(
    "autoFormatter.showSidebar",

    () => {
     vscode.commands.executeCommand("autoFormatter.sidebar");
    }
  );
  
  context.subscriptions.push(Sidebarshowcmd);
  //get extension
  const ext = vscode.extensions.getExtension("Auto-formatter.techkitFormatters");
  console.log("Extension Info:", ext);

  vscode.window.showInformationMessage("Gent extension successfully");

  let disposable = vscode.commands.registerCommand("Auto-formatter.techkitFormatters", async () => {
      console.log("📌 Command 'Auto-formatter.techkitFormatters' triggered!");
      const editor = vscode.window.activeTextEditor;

      if (!editor || !editor.document) {
        vscode.window.showErrorMessage("No file is open. Open a file to format.");
        return;
      }

      console.log("📂 Active file:", editor.document.fileName);
      console.log("📂 URI fsPath:", editor.document.uri.fsPath); // Double-check
      await vscode.commands.executeCommand("editor.action.formatDocument");
    }
  );

  let formatter = vscode.languages.registerDocumentFormattingEditProvider({ language: "javascript", scheme: "file" },
    {
      async provideDocumentFormattingEdits(document: vscode.TextDocument): Promise<vscode.TextEdit[]>
      {
        const editor = vscode.window.activeTextEditor;
        if (!document || !document.fileName) {
          console.error("⚠️ No file is open.");
          vscode.window.showErrorMessage("No file open for formatting.");
          return [];
        }

        console.log("📝 Formatting file:", document.fileName);
        console.log("📝 URI fsPath:", document.uri.fsPath); // Double-check

        if (!document.fileName || document.fileName === "") {
          console.error("⚠️ document.fileName is empty or undefined!");
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
            filepath: document.fileName || "unnamed.js", // Fallback
          });

          const aiResponse = await openai.chat.completions.create({
            model: "gpt-4-turbo",
            messages: [{ role: "user", content: `Debug and fix this code:\n\n${formattedText}` }]
          });
          console.log(aiResponse);

          const aiFixSuggestion = aiResponse.choices[0].message?.content || "No issue found";
          Sidebar.updateAIResponse(aiFixSuggestion);
          
        } catch (error) {
          console.error("❌ Formatting failed:", error);
          vscode.window.showErrorMessage("Formatting failed: ");
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

class Sidebar implements vscode.WebviewViewProvider {
 public static readonly viewType = "autoFormatter.sidebar";
  private static aiFixSuggestion: string = "No AI response yet.";
  private static currentWebview: vscode.WebviewView | null = null;
  static context: vscode.ExtensionContext; // Store context globally

  constructor(private readonly context: vscode.ExtensionContext) {
    Sidebar.context = context; // ✅ Assign the context
  }

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ) {
    Sidebar.currentWebview = webviewView;
    webviewView.webview.options = { enableScripts: true };
    webviewView.webview.html = this.getHtmlView(Sidebar.aiFixSuggestion);
  }

  private formatResponse(response: string) {
    const introMatch = response.match(/^(.*?)(?=1\. )/s) || [response, response];
    const intro = introMatch[1].trim();

    const fixesMatch = response.match(/(1\..*?)(?=Here is the corrected)/s) || ["", ""];
    const fixesText = fixesMatch[1].trim();
    const fixText = fixesText
      .split(/\n(?=\d+\. )/)
      .map((fix) => `<li>${fix.replace(/(\*\*.*?\*\*)/g, "<strong>$1</strong>").replace(/\*\*/g, "")}</li>`)
      .join("");
    
    const codeMatch = response.match(/```javascript\n([\s\S]*?)\n```/) || ["", ""];
    const code = codeMatch[1].trim();

    const explanationMatch = response.match(/### Explanation:(.*)$/s) || ["", ""];
    const explanation = explanationMatch[1].trim().split("\n- ")
      .map((line) => (line.startsWith("- ") ? line : `- ${line}`))
      .join("")
      .replace(/- /g, "<li>")
      .replace(/\n/g, "</li>");;
    
    return { intro, fixText, code, explanation };
  }

  private getHtmlView(aiFixSuggestion: string): string {
    const { intro, fixText, code, explanation} = this.formatResponse(aiFixSuggestion);
    
   return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AI Debugger</title>
        <style>
          body {
            font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Roboto', sans-serif;
            background-color: #1a1a1a;
            color: #e0e0e0;
            margin: 0;
            padding: 15px;
            height: 100vh;
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
          }
          .chat-container {
            flex: 1;
            display: flex;
            flex-direction: column;
            background-color:rgb(33, 48, 61);
            border-radius: 8px;
            padding: 15px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            overflow-y: auto; /* Make container scrollable */
            min-height: 0; /* Allow shrinking if needed */
          }
          .header {
            font-size: 18px;
            font-weight: 600;
            color: #ffffff;
            background-color: #0078d4;
            padding: 10px;
            border-radius: 6px 6px 0 0;
            text-align: center;
            margin-bottom: 15px;
          }
          .section {
            margin-bottom: 20px;
          }
          .section-title {
            font-size: 16px;
            font-weight: 700;
            color: #00ccff;
            margin-bottom: 10px;
          }
          .intro, .fixes-list, .explanation-list {
            font-size: 14px;
            line-height: 1.5;
            padding: 10px;
            background-color:rgb(24, 12, 12);
            border: 1px solidrgb(21, 12, 12);
            border-radius: 4px;
          }
          .fixes-list ul, .explanation-list ul {
            margin: 0;
            padding-left: 20px;
            list-style-type: decimal; /* For fixes */
          }
          .explanation-list ul {
            list-style-type: disc; /* For explanation */
          }
          .code-block {
            background-color:rgb(7, 2, 2);
            border: 1px solid #555555;
            border-radius: 4px;
            padding: 15px;
            font-family: 'Consolas', 'Courier New', monospace;
            font-size: 20px;
            color:rgb(243, 236, 236);
            white-space: pre-wrap;
            word-wrap: break-word;
            max-height: 300px;
            overflow-y: auto;
            margin-bottom: 20px;
          }
          .button-container {
            display: flex;
            gap: 10px;
            justify-content: center;
            padding-top: 10px;
          }
          .action-btn {
            background-color: #0078d4;
            color: #ffffff;
            border: none;
            padding: 8px 20px;
            border-radius: 4px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.2s ease, transform 0.1s ease;
          }
          .action-btn:hover {
            background-color: #005a9e;
            transform: translateY(-1px);
          }
          .action-btn:active {
            transform: translateY(0);
          }
          .action-btn.copied {
            background-color: #00cc00;
          }
        </style>
        <script>
          const vscode = acquireVsCodeApi();
          function copyToClipboard() {
            const text = document.getElementById('codeBlock').innerText;
            navigator.clipboard.writeText(text);
            const btn = document.getElementById('copyBtn');
            btn.innerText = 'Copied!';
            btn.classList.add('copied');
            setTimeout(() => {
              btn.innerText = 'Copy Fix';
              btn.classList.remove('copied');
            }, 2000);
          }
          function applyFix() {
            const text = document.getElementById('codeBlock').innerText;
            vscode.postMessage({ command: 'applyFix', text: text });
          }
        </script>
      </head>
      <body>
        <div class="chat-container">
          <div class="header">AI Debugger Response</div>
          <div class="section">
            <div class="section-title">Summary</div>
            <div class="intro">${intro}</div>
          </div>
          <div class="section">
            <div class="section-title">Fixes</div>
            <div class="fixes-list"><ul>${fixText}</ul></div>
          </div>
          <div class="section">
            <div class="section-title">Fixed Code</div>
            <div class="code-block" id="codeBlock">${code || "No code provided"}</div>
          </div>
          <div class="section">
            <div class="section-title">Explanation</div>
            <div class="explanation-list"><ul>${explanation || "<li>No explanation provided</li>"}</ul></div>
          </div>
          <div class="button-container">
            <button id="copyBtn" class="action-btn" onclick="copyToClipboard()">Copy Fix</button>
            <button id="applyBtn" class="action-btn" onclick="applyFix()">Apply Fix</button>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  public static createOrShow(context: vscode.ExtensionContext) {
    const provider = new Sidebar(context);
    context.subscriptions.push(
      vscode.window.registerWebviewViewProvider(Sidebar.viewType, provider)
    );
  }

 public static updateAIResponse(newAIResponse: string) {
  Sidebar.aiFixSuggestion = newAIResponse;
  if (Sidebar.currentWebview) {
    Sidebar.currentWebview.webview.html = new Sidebar(Sidebar.context).getHtmlView(newAIResponse);
  }

  }
}

