import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react';
import ReactDOM from 'react-dom';
import './App.css'
/*
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
  </StrictMode>,
)
  */

// File Upload and Preview Functionality after submit button click
document.addEventListener('DOMContentLoaded', () => { //domContentLoaded ensures the DOM is fully loaded before running the script
  const file_input = document.querySelector('.resumeUploadButton');
  const submitButton = document.querySelector('.submitButton');
  const displayArea = document.querySelector('.displayArea');
  const submittedFilesList = document.querySelector('.submittedFilesList');

  const submittedFiles = [];

  const formatFileSize = (bytes) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
  };

  const previewFile = (file) => {
    const fileURL = URL.createObjectURL(file);
    const preview = `
      <p><strong>${file.name}</strong></p>
      <p>Size: ${formatFileSize(file.size)}</p>
      ${file.type === 'application/pdf' 
        ? `<embed src="${fileURL}" width="100%" height="400px" type="application/pdf" />` 
        : `<p>Preview not available for this file type. Download below:</p>
           <a href="${fileURL}" download="${file.name}">Download ${file.name}</a>`}
    `;
    displayArea.innerHTML = preview;
  };


  // Handle file submission with error message if no file is uploaded
  submitButton.addEventListener('click', () => {
    const file = file_input.files[0];
    const statusMessage = document.querySelector('.statusMessage');

    if (!file) {
      statusMessage.innerHTML = `<p style="color: red;">*No files currently selected for upload</p>`;
      return;
    }
  
    statusMessage.innerHTML = ''; // Clear the status if file is valid

    // Preview the current file
    previewFile(file);

    // Store the file in memory
    submittedFiles.push(file);

    // Add entry to submitted list
    const index = submittedFiles.length - 1;
    const li = document.createElement('li');
    li.textContent = file.name;
    li.style.cursor = 'pointer';
    li.addEventListener('click', () => {
      previewFile(submittedFiles[index]);
    });

    submittedFilesList.appendChild(li);

    // Clear the input so a new file can be chosen again
    file_input.value = '';
  });

  //handle drag and drop functionality
  const fileUploadArea = document.querySelector('.file-upload-area');
  fileUploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    fileUploadArea.classList.add('dragging');
  });
  fileUploadArea.addEventListener('dragleave', () => {
    fileUploadArea.classList.remove('dragging');
  });
  fileUploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    fileUploadArea.classList.remove('dragging');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        const fileURL = event.target.result;
        previewFile(fileURL);
        displayArea.innerHTML = preview;
      };
      
      reader.readAsDataURL(file);
    }
  });

});


/* drag/drop functionality
const fileUploadArea = document.querySelector('.file-upload-area');
fileUploadArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  fileUploadArea.classList.add('dragging');
});
fileUploadArea.addEventListener('dragleave', () => {
  fileUploadArea.classList.remove('dragging');
});
fileUploadArea.addEventListener('drop', (e) => {
  e.preventDefault();
  fileUploadArea.classList.remove('dragging');
  
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    const file = files[0];
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const file = document.createElement('file');
      file.src = event.target.result;
      file.classList.add('uploaded-file');
      fileUploadArea.innerHTML = ''; // Clear previous content
      fileUploadArea.appendChild(file);
    };
    
    reader.readAsDataURL(file);
  }
});

*/



/* trying to add gradient follows cursor effect
const gradyent = document.querySelector('.file-upload-area');

gradyent.addEventListener('mousemove', (e) => {
const rect = e.target.getBoundingClientRect();
const x = e.clientX - rect.left;
const y = e.clientY - rect.top;

gradyent.current.style.setProperty('--x', x + `${clientX}px`);
gradyent.current.style.setProperty('--y', y + `${clientY}px`);
});
*/
