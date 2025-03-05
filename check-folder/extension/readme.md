# AutoFormatter
AutoFormatter is a Visual Studio Code extension designed to automatically format your code according to best practices. It helps improve readability and ensures consistency across different files and projects.

# Features
✨ Auto Code Formatting – Automatically formats your code on save.
⚡ Supports Multiple Languages – Works with JavaScript, TypeScript, Python, and more.
🛠 Customizable Rules – Configure formatting preferences through settings.
📌 One-Click Formatting – Use a simple command or shortcut to format the entire file.
Screenshots

# Installation
Open VS Code and navigate to Extensions (Ctrl+Shift+X).
Search for AutoFormatter.
Click Install and reload VS Code.
Go to setting.json and use this where ever you want to use like this:
# "[javascript]": {
        "editor.defaultFormatter": "Auto-formatter.techkitFormatters"
},

# Alternatively, install via CLI:
code --install-extension autoFormatter

# Format on Save – Enable this in settings for automatic formatting.
# Manual Formatting – Use the command: Ctrl + Shift + P → "Format Document"
Keyboard Shortcut – Customize shortcuts for quick access.
Configuration
This extension provides the following settings:

Setting	Description	Default Value
autoFormatter.enable	Enables or disables AutoFormatter	true
autoFormatter.indentation	Set indentation style (spaces or tabs)	spaces
autoFormatter.tabSize	Number of spaces per tab	4
Modify these settings in VS Code Settings (settings.json).

# Requirements
VS Code version 1.60.0 or later
Node.js (if using custom formatting rules)
Known Issues
Some language-specific formatting conflicts with Prettier/ESLint.
Formatting large files may cause minor performance delays.

# Release Notes
1.1.0 (Latest)
Added support for additional languages (Go, Rust, etc.).
Improved performance for large files.
1.0.1
Fixed bug with tab indentation settings.
1.0.0
Initial release with basic formatting features.
Contributing
Want to contribute? Follow these steps:

# Fork the repository.
Create a feature branch:
git checkout -b feature-new-option
Commit changes and push:
git commit -m "Added new formatting option"
git push origin feature-new-option

Open a pull request.
More Information
VS Code Extension Guidelines
Markdown Guide
🚀 Enjoy seamless formatting with AutoFormatter!