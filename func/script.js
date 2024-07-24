// Execute a command for the editor
function execCmd(command) {
    if (command === 'createLink') {
        const url = prompt('Enter the link URL:');
        document.execCommand(command, false, url);
    } else if (command === 'insertImage') {
        const url = prompt('Enter the image URL:');
        document.execCommand(command, false, url);
    } else {
        document.execCommand(command, false, null);
    }
}

// Execute a command with an argument for the editor
function execCmdWithArg(command, arg) {
    document.execCommand(command, false, arg);
}

// Save the content of the editor to local storage
function saveContent() {
    const content = document.getElementById('editor').innerHTML;
    localStorage.setItem('editorContent', content);
    alert('Content saved!');
}

// Load the content from local storage
function loadContent() {
    const content = localStorage.getItem('editorContent');
    if (content) {
        document.getElementById('editor').innerHTML = content;
    } else {
        alert('No content found.');
    }
}

// Export the content as an HTML file
function exportAsHtml() {
    const content = document.getElementById('editor').innerHTML;
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'content.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Convert HTML content to Markdown
function htmlToMarkdown(html) {
    return html
        .replace(/<\/h1>/gi, '\n\n')
        .replace(/<h1>/gi, '# ')
        .replace(/<\/h2>/gi, '\n\n')
        .replace(/<h2>/gi, '## ')
        .replace(/<\/h3>/gi, '\n\n')
        .replace(/<h3>/gi, '### ')
        .replace(/<\/h4>/gi, '\n\n')
        .replace(/<h4>/gi, '#### ')
        .replace(/<\/h5>/gi, '\n\n')
        .replace(/<h5>/gi, '##### ')
        .replace(/<\/h6>/gi, '\n\n')
        .replace(/<h6>/gi, '###### ')
        .replace(/<b>|<strong>/gi, '**')
        .replace(/<\/b>|<\/strong>/gi, '**')
        .replace(/<i>|<em>/gi, '_')
        .replace(/<\/i>|<\/em>/gi, '_')
        .replace(/<u>/gi, '__')
        .replace(/<\/u>/gi, '__')
        .replace(/<br>/gi, '\n')
        .replace(/<\/p>/gi, '\n\n')
        .replace(/<p>/gi, '')
        .replace(/<ul>/gi, '\n')
        .replace(/<\/ul>/gi, '\n')
        .replace(/<li>/gi, '- ')
        .replace(/<\/li>/gi, '\n')
        .replace(/<ol>/gi, '\n')
        .replace(/<\/ol>/gi, '\n')
        .replace(/<li>/gi, '1. ')
        .replace(/<\/li>/gi, '\n')
        .replace(/<a href="(.*?)">(.*?)<\/a>/gi, '[$2]($1)')
        .replace(/<[^>]+>/g, ''); // Remove remaining HTML tags
}

// Export the content as a Markdown file
function exportAsMarkdown() {
    const content = document.getElementById('editor').innerHTML;
    const markdownContent = htmlToMarkdown(content);
    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'content.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Undo the last action
function undo() {
    document.execCommand('undo', false, null);
}

// Redo the last undone action
function redo() {
    document.execCommand('redo', false, null);
}

// Open the find modal
function findText() {
    document.getElementById('findModal').style.display = 'flex';
}

// Open the replace modal
function replaceText() {
    document.getElementById('replaceModal').style.display = 'flex';
}

// Close the find modal
function closeFindModal() {
    document.getElementById('findModal').style.display = 'none';
}

// Close the replace modal
function closeReplaceModal() {
    document.getElementById('replaceModal').style.display = 'none';
}

// Highlight text in the editor
function highlightText() {
    const findInput = document.getElementById('findInput').value;
    const editor = document.getElementById('editor');
    const content = editor.innerHTML;
    const highlightedContent = content.replace(new RegExp(findInput, 'gi'), (match) => `<span class="highlight">${match}</span>`);
    editor.innerHTML = highlightedContent;
    closeFindModal();
}

// Replace all instances of text in the editor
function replaceAll() {
    const findReplaceInput = document.getElementById('findReplaceInput').value;
    const replaceInput = document.getElementById('replaceInput').value;
    const editor = document.getElementById('editor');
    const content = editor.innerHTML;
    const replacedContent = content.replace(new RegExp(findReplaceInput, 'gi'), replaceInput);
    editor.innerHTML = replacedContent;
    closeReplaceModal();
}

// Open the command palette modal
function openCommandPalette() {
    document.getElementById('commandPaletteModal').style.display = 'flex';
    populateCommandList();
}

// Close the command palette modal
function closeCommandPalette() {
    document.getElementById('commandPaletteModal').style.display = 'none';
}

// Populate the command list
function populateCommandList() {
    const commands = [
        { name: 'Bold', command: 'bold' },
        { name: 'Italic', command: 'italic' },
        { name: 'Underline', command: 'underline' },
        { name: 'Bullet List', command: 'insertUnorderedList' },
        { name: 'Numbered List', command: 'insertOrderedList' },
        { name: 'Create Link', command: 'createLink' },
        { name: 'Insert Image', command: 'insertImage' },
        { name: 'Save', command: 'saveContent' },
        { name: 'Load', command: 'loadContent' },
        { name: 'Export as HTML', command: 'exportAsHtml' },
        { name: 'Export as Markdown', command: 'exportAsMarkdown' },
        { name: 'Find', command: 'findText' },
        { name: 'Replace', command: 'replaceText' },
        { name: 'Undo', command: 'undo' },
        { name: 'Redo', command: 'redo' },
        { name: 'Align Left', command: 'justifyLeft' },
        { name: 'Align Center', command: 'justifyCenter' },
        { name: 'Align Right', command: 'justifyRight' },
        { name: 'Align Justify', command: 'justifyFull' },
        { name: 'Text Color', command: 'foreColor' },
        { name: 'Background Color', command: 'hiliteColor' },
        { name: 'Font Family', command: 'fontName' },
        { name: 'Font Size', command: 'fontSize' },
        { name: 'Superscript', command: 'superscript' },
        { name: 'Subscript', command: 'subscript' },
        { name: 'Remove Formatting', command: 'removeFormat' },
        { name: 'Indent', command: 'indent' },
        { name: 'Outdent', command: 'outdent' },
    ];
    const commandList = document.getElementById('commandList');
    commandList.innerHTML = '';
    commands.forEach((cmd) => {
        const li = document.createElement('li');
        li.textContent = cmd.name;
        li.onclick = () => {
            closeCommandPalette();
            if (cmd.command.includes('Color') || cmd.command === 'fontName' || cmd.command === 'fontSize') {
                execCmdWithArg(cmd.command, prompt(`Enter ${cmd.name.toLowerCase()}:`));
            } else {
                execCmd(cmd.command);
            }
        };
        commandList.appendChild(li);
    });
}

// Filter commands in the command palette
function filterCommands() {
    const filter = document.getElementById('commandInput').value.toLowerCase();
    const commandList = document.getElementById('commandList');
    const commands = commandList.getElementsByTagName('li');
    for (let i = 0; i < commands.length; i++) {
        const txtValue = commands[i].textContent || commands[i].innerText;
        if (txtValue.toLowerCase().indexOf(filter) > -1) {
            commands[i].style.display = '';
        } else {
            commands[i].style.display = 'none';
        }
    }
}
// Function to insert a table
function insertTable() {
    const rows = prompt("Enter the number of rows:");
    const cols = prompt("Enter the number of columns:");
    if (rows > 0 && cols > 0) {
        let table = '<table border="1">';
        for (let i = 0; i < rows; i++) {
            table += '<tr>';
            for (let j = 0; j < cols; j++) {
                table += '<td>&nbsp;</td>';
            }
            table += '</tr>';
        }
        table += '</table>';
        
        // Insert the table
        document.execCommand('insertHTML', false, table);
        
        // Create a new paragraph to position the cursor after the table
        const newParagraph = document.createElement('p');
        newParagraph.innerHTML = '&nbsp;'; // Non-breaking space to ensure the paragraph is visible
        const range = window.getSelection().getRangeAt(0);
        range.collapse(false); // Move the cursor to the end of the range
        range.insertNode(newParagraph);
        
        // Move the cursor inside the new paragraph
        const newRange = document.createRange();
        newRange.setStartAfter(newParagraph);
        newRange.collapse(true);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(newRange);
    }
}

// Load content on page load
window.onload = loadContent;

// Function to delete the table
function deleteTable() {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const table = range.commonAncestorContainer.closest('table');
    
    if (table) {
        table.remove();
    } else {
        alert('Please place the cursor inside or select a table to delete.');
    }
}
// Function to handle file input and read the file content
function openFile(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const content = e.target.result;
            document.getElementById('editor').innerHTML = content;
        };
        reader.readAsText(file);
    }
}
// Prevent default drag-and-drop behavior and handle it appropriately
document.getElementById('editor').addEventListener('dragover', function(event) {
    event.preventDefault();
});

document.getElementById('editor').addEventListener('drop', function(event) {
    event.preventDefault();
    // Ensure that no file content is inserted
    const dt = event.dataTransfer;
    if (dt.items) {
        // Use DataTransferItemList interface to remove files
        for (let i = 0; i < dt.items.length; i++) {
            if (dt.items[i].kind === 'file') {
                dt.items.remove(i);
            }
        }
    } else {
        // Use DataTransfer interface to remove files
        dt.clearData();
    }
});
