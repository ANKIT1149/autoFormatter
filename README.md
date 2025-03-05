<<<<<<< HEAD
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
=======
# autoFormatter README

This is the README for your extension "autoFormatter". After writing up a brief description, we recommend including the following sections.

## Features

Describe specific features of your extension including screenshots of your extension in action. Image paths are relative to this README file.

For example if there is an image subfolder under your extension project workspace:

\!\[feature X\]\(images/feature-x.png\)

> Tip: Many popular extensions utilize animations. This is an excellent way to show off your extension! We recommend short, focused animations that are easy to follow.

## Requirements

If you have any requirements or dependencies, add a section describing those and how to install and configure them.

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `myExtension.enable`: Enable/disable this extension.
* `myExtension.thing`: Set to `blah` to do something.

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release of ...

### 1.0.1

Fixed issue #.

### 1.1.0

Added features X, Y, and Z.

---

## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux).
* Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux).
* Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets.

## For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
>>>>>>> 9096045ec0ec5c3d307f1f38120438746de3d740
