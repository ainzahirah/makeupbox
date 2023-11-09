const { app, BrowserWindow } = require('electron');
const fs = require('fs')
const path = require('path')
const fileTableBody = document.getElementById('fileTableBody');

// Define event listeners and elements
var btnCreate = document.getElementById('btnCreate')
var btnRead = document.getElementById('btnRead')
var btnDelete = document.getElementById('btnDelete')
var btnUpdate = document.getElementById('btnUpdate')
var fileName = document.getElementById('fileName')
var fileContents = document.getElementById('fileContents')

let pathName = path.join(__dirname, 'Files')

// Event listener for the "Create" button
btnCreate.addEventListener('click', function(){ // Creating text file when the user clicks the "Create" button
    let file = path.join(pathName, fileName.value)
    let contents = fileContents.value
    fs.writeFile(file, contents, function(err){ 
        if(err){
            return console.log(err)
        }
        var txtfile = document.getElementById("fileName").value
        alert(txtfile + " text file was created") 
        console.log("The file was created")
    })
})

// Event listener for the "Read" button
btnRead.addEventListener('click', function() { // Reading contents of the created text file
    let file = path.join(pathName, fileName.value);

    // Read the file asynchronously
    fs.readFile(file, 'utf8', function(err, data) {
        if (err) {
            console.error(err);
            return console.log(err);
        }
        fileContents.value = data;

        // Split the file content into lines
        const lines = data.split('\n');

        const tableBody = document.getElementById('fileTableBody');
        tableBody.innerHTML = '';

        // Iterate through the lines and add them to the table
        lines.forEach(function(line) {
            addContentToTable(line);
        });

        console.log("Text file has been Read!");
    });
});

// Event listener to update data
btnUpdate.addEventListener('click', function () { // Updating the text file with new contents
    let file = path.join(pathName, fileName.value);
    let contents = fileContents.value; 

    fs.writeFile(file, contents, function (err) { 
        if (err) {
            return console.log(err);
        }
        alert("File " + file + " has been updated")
        console.log("The file was updated!")
    });
})

// Function to add content to the table
function addContentToTable(content) {
    const newRow = document.createElement('tr');

    const contentCell = document.createElement('td');
    contentCell.textContent = content;

    const deleteCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';

    // Event listener for the "Delete" button
    deleteButton.addEventListener('click', function() {
        const row = this.parentNode.parentNode;
        const rowIndex = row.rowIndex;

        row.remove();

        // Read the file, remove the specified line
        const file = path.join(pathName, fileName.value);
        fs.readFile(file, 'utf8', function(err, data) {
            if (err) {
                console.error(err);
                return console.log(err);
            }
            const lines = data.split('\n');
            lines.splice(rowIndex - 1, 1);
            const updatedData = lines.join('\n');
            fs.writeFile(file, updatedData, 'utf8', function(err) {
                if (err) {
                    console.error(err);
                }
            });
        });
    });

    deleteCell.appendChild(deleteButton);

    newRow.appendChild(contentCell);
    newRow.appendChild(deleteCell);

    const tableBody = document.getElementById('fileTableBody');
    tableBody.appendChild(newRow);
}
