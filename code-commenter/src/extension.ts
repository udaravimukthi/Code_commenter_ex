 // The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import axios from "axios"
import * as vscode from 'vscode';

// this method is called when your extension is activated 
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "code-commenter" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('code-commenter.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
        
		const editor = vscode.window.activeTextEditor;
		if (!editor){
			return; //the user doesn't have the text editor open
		}

		const document = editor.document;
		const selection = editor.selection;

		let code = document.getText(selection)
		code = code.split(/[\s]+/).join(' ').toLowerCase();
	    
		axios.post(" ", {code: code}, {headers: {"Content-Type": "application/json"}}).then(function(response){
            // Display a message box to the user
			vscode.window.showInformationMessage(response.data);
		})
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
