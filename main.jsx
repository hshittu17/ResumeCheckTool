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
  const displayArea = document.querySelector('.displayArea'); //file display or preview area
  const submittedFilesList = document.querySelector('.submittedFilesList');
  const clearButton = document.querySelector('#clearButton');


  const submittedFiles = [];

  // Function to format file size in a human-readable format
  // Converts bytes to KB, MB, or GB as appropriate
  // Uses Math.log to determine the size category and formats the output
  // Returns a string with the size and appropriate unit
  const formatFileSize = (bytes) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
  };

  // Function to preview the file, showing the file name, size, and a preview if it's a PDF
  // If the file is not a PDF, it will show a download link instead
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

  // Function to display the job description entered by the user
  const displayJD = (job_description) => {
    const jdPreview = `
      <h3>Here's How You Can Improve:</h3>
      <p style="text-align: center; padding: 1rem; margin: 1rem;">Generating...</p>
    `;
    const jdDisplayArea = document.querySelector('.jdDisplayArea');
    jdDisplayArea.innerHTML = jdPreview;
  }

  // Handle file submission with error message if no file or job description is entered
  submitButton.addEventListener('click', () => {
    const file = file_input.files[0];
    const job_description = document.querySelector('#job-description-input').value;
    const resumeStatusMessage = document.querySelector('.resumeStatusMessage');
    const jdStatusMessage = document.querySelector('.jdStatusMessage');

    //if no file is selected or job description is empty, display error messages
    if (!file) {
      resumeStatusMessage.innerHTML = `<p style="color: red;">*No files currently selected for upload</p>`;
      return;
    } else if (job_description === '') {
      jdStatusMessage.innerHTML = `<p style="color: red;">*Please enter a job description</p>`;
      return;
    }
    
    resumeStatusMessage.innerHTML = ''; // Clear the status if file is valid
    jdStatusMessage.innerHTML = ''; // Clear any previous messages

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

    // Add file size to the list item
    submittedFilesList.appendChild(li);

    // Clear the input so a new file can be chosen again
    file_input.value = '';

    //display job description
    displayJD(job_description);
  });

  //Handle clear button functionality
  clearButton.addEventListener('click', () => {
    // Clear the file input and display area
    file_input.value = '';
    displayArea.innerHTML = '';
    submittedFilesList.innerHTML = '';
    submittedFiles.length = 0; // Clear the submitted files array

    // Clear job description display
    const jdDisplayArea = document.querySelector('.jdDisplayArea');
    jdDisplayArea.innerHTML = '';

    // Clear status messages
    const resumeStatusMessage = document.querySelector('.resumeStatusMessage');
    const jdStatusMessage = document.querySelector('.jdStatusMessage');
    resumeStatusMessage.innerHTML = '';
    jdStatusMessage.innerHTML = '';
  });

  //handle drag and drop functionality (doesn't work yet)
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
