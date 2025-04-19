import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
/*
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
  </StrictMode>,
)
  */

console.log("Hello from main.jsx");
const dropArea = document.getElementById('#file-upload-area');

// Prevent default drag behaviors to allow custom handling
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false)
});

const initApp = () => {
  const dropArea = document.querySelector('#file-upload-area');
  const active = () => dropArea.classList.add('button:hover'); //decide how you want the drop area to be 
   const inactive = () => dropArea.classList.remove(''); 
   
   const preventDefaults = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }
   
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, highlight, prevents)
  });

  ['dragcenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, active)
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, inactive)
  });
  
  dropArea.addEventListener('drop', handleDrop, false);
   


}
/*
function preventDefaults (e) {
  e.preventDefault()
  e.stopPropagation()
}
  */

/* Highlight drop area when item is dragged over it
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, highlight, false)
})

['dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, unhighlight, false)
})


function highlight(e) {
  dropArea.classList.add('highlight')
}

function unhighlight(e) {
  dropArea.classList.remove('highlight')
}
  */

// Handle dropped files
dropArea.addEventListener('drop', handleDrop, false)

function handleDrop(e) {
  const dt = e.dataTransfer
  const files = dt.files

  handleFiles(files)
  console.log(files);
}

function handleFiles(files) {
  files = [...files]
  files.forEach(previewFile)
  console.log(files);
}

function previewFile(file) {
  let reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onloadend = function() {
    let img = document.createElement('img')
    img.src = reader.result
    document.getElementById('#file-upload-area').appendChild(img)
  }
}

const input = document.querySelector("input");
const preview = document.querySelector(".jd");

input.style.opacity = 0;

input.addEventListener("change", updateFileDisplay);

//checks if the file is a valid type
const fileTypes = [
  "application/pdf", 
  "application/msword,", //doc
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", //docx
];
function validFileType(file) {
  return fileTypes.includes(file.type);
}

function updateFileDisplay() {
  //while loop to empty the previous contents
  while (preview.firstChild) {
    preview.removeChild(preview.firstChild);
  }
  
  //sets the current file to the input file as an array
  const curFiles = input.files;
  if (curFiles.length === 0) {
    const para = document.createElement("p");
    para.textContent = "No files currently selected for upload";
    preview.appendChild(para);
  } else { //since the list is not empty, we can create a list and append the files to it
    const list = document.createElement("ol");
    preview.appendChild(list);

    // Loop through the file list and create a html list item for each file
    for (const file of curFiles) {
      const listItem = document.createElement("li");
      const para = document.createElement("p");
      if (validFileType(file)) {
        para.textContent = `File name ${file.name}, file size ${returnFileSize(
          file.size,
        )}.`;
        const image = document.createElement("img");
        image.src = URL.createObjectURL(file);
        image.alt = image.title = file.name;

        listItem.appendChild(image);
        listItem.appendChild(para);
      } else {
        para.textContent = `File name ${file.name}: Not a valid file type. Update your selection.`;
        listItem.appendChild(para);
      }

      list.appendChild(listItem);
    }
  }
}

  /* auto complete code that checks filelist from the html, appends uploaded files to an empty list but checks if the list is empty first const curFiles = input.files;
  const curFiles = input.files;
  console.log(curFiles);
  const fileList = document.querySelector(".file-list");
  fileList.innerHTML = "";
  if (curFiles.length === 0) {
    const listItem = document.createElement("li");
    listItem.textContent = "No files currently selected for upload";
    fileList.appendChild(listItem);
  } else {
    for (const file of curFiles) {
      const listItem = document.createElement("li");
      listItem.textContent = `${file.name} (${file.size} bytes)`;
      fileList.appendChild(listItem);
    }
  }
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
