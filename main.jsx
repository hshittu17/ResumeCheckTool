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
