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




 //auto complete code that checks filelist from the html, appends uploaded files to an empty list but checks if the list is empty first const curFiles = input.files;
 const file_input = document.querySelector("#file-upload-area");
 file_input.addEventListener("change", updateFileList);
const preview = document.querySelector(".preview");

function validFileType(file) {
  const fileTypes = [
    ".docx",
    ".doc",
    ".pdf"
  ];
  return fileTypes.includes(file.type);
}
/*
function returnFileSize(size) => {
  if (size < 1024) return `${size} bytes`;
  else if (size < 1048576) return `${(size / 1024).toFixed(2)} KB`;
  else return `${(size / 1048576).toFixed(2)} MB`;
}
  */

function returnFileSize(number) {
  if (number < 1e3) {
    return `${number} bytes`;
  } else if (number >= 1e3 && number < 1e6) {
    return `${(number / 1e3).toFixed(1)} KB`;
  }
  return `${(number / 1e6).toFixed(1)} MB`;
}

function updateFileList() {
  while (preview.firstChild) {
    preview.removeChild(preview.firstChild);
  }

  if (file_input.files.length === 0) {
    const file_list_item = document.createElement("p");
    file_list_item.textContent = "No files currently selected for upload";
    preview.appendChild(file_list_item);
    return;
  }

  displaySelectedFiles();
}
function displaySelectedFiles() {
  while (preview.firstChild) {
    preview.removeChild(preview.firstChild);
  }

  const list = document.createElement("ul");
  preview.appendChild(list);
}

 const curFiles = file_input.files;
  console.log(curFiles);
  if (curFiles.length === 0) {
    const file_list_item = document.createElement("p");
    file_list_item.textContent = "No files currently selected for upload";
    preview.appendChild(file_list_item);
  } else {
    const file_list_item = document.createElement("ol");
    preview.appendChild(file_list_item);

    for (const file of curFiles) {
      const list_item = document.createElement("li");
      const file_list_item = document.createElement("p");
      if (validFileType(file)) {
        file_list_item.textContent = `File name ${file.name}, file size ${returnFileSize(
          file.size,
        )}.`;
        const file_input = document.createElement("file_input");
        file_input.src = URL.createObjectURL(file);
        file_input.alt = file_input.title = file.name;

        list_item.appendChild(file_input);
        list_item.appendChild(list_item);
      } else {
        list_item.textContent = `File name ${file.name}: Not a valid file type. Update your selection.`;
        list_item.appendChild(list_item);
      }
    }
      list.appendChild(list_item);
      updateFileList();
      displaySelectedFiles();

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
