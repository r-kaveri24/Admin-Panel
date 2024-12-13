document.addEventListener('DOMContentLoaded', function () {
    const fileInput = document.getElementById('fileInput');
    const fileList = document.getElementById('fileList');
    const submitBtn = document.getElementById('submitBtn');
    const popup = document.getElementById('popup');
    const closePopupBtn = document.getElementById('close-popup');
    const cancelBtn = document.getElementById('cancel-btn');
    const confirmDeleteBtn = document.getElementById('confirm-delete');
    const overlay = document.getElementById('overlay');
    const content = document.getElementById('content');
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeImageModalBtn = document.getElementById('close-image-modal');
    let uploadedFile;
    let currentDeleteButton;
    let currentDeleteIndex;
    let currentDeleteSize;

    // Object to store uploaded files by size
    const uploadedFilesBySize = {
        '1728x800': [],
        '1440x600': [],
        '769x354': [],
        '430x353': []
    };

    // Function to render uploaded files
    function renderFiles(size) {
        const files = uploadedFilesBySize[size];
        fileList.innerHTML = '';
        files.forEach((file, index) => {
            const listItem = document.createElement('li');

            const fileIcon = document.createElement('img');
            fileIcon.src = './assets-hero/photo.png';
            fileIcon.alt = 'file icon';
            fileIcon.style.width = '20px';
            fileIcon.style.height = '20px';
            fileIcon.style.marginRight = '10px';

            const fileName = document.createElement('span');
            fileName.textContent = file.name;

            const viewButton = document.createElement('button');
            const viewIcon = document.createElement('img');
            viewIcon.src = './assets-hero/view.png';
            viewIcon.alt = 'view';
            viewIcon.style.width = '20px';
            viewIcon.style.height = '20px';
            viewButton.appendChild(viewIcon);

            viewButton.addEventListener('click', function () {
                const fileURL = URL.createObjectURL(file);
                modalImage.src = fileURL;
                imageModal.style.display = 'flex';
                overlay.style.display = 'block';
            });

            const deleteButton = document.createElement('button');
            const deleteIcon = document.createElement('img');
            deleteIcon.src = './assets-hero/delete.png';
            deleteIcon.alt = 'delete';
            deleteIcon.style.width = '20px';
            deleteIcon.style.height = '20px';
            deleteButton.appendChild(deleteIcon);
            deleteButton.onclick = function () {
                currentDeleteButton = deleteButton;
                currentDeleteIndex = index;
                currentDeleteSize = size;
                popup.style.display = 'flex';
                overlay.style.display = 'block';
                content.classList.add('blurred');
            };

            listItem.appendChild(fileIcon);
            listItem.appendChild(fileName);
            listItem.appendChild(viewButton);
            listItem.appendChild(deleteButton);

            fileList.appendChild(listItem);
        });
    }

    // Function to delete file
    function deleteFile() {
        uploadedFilesBySize[currentDeleteSize].splice(currentDeleteIndex, 1);
        renderFiles(currentDeleteSize);
        popup.style.display = 'none';
        overlay.style.display = 'none';
        content.classList.remove('blurred');
    }

    // Event listener for file input change
    fileInput.addEventListener('change', function () {
        uploadedFile = fileInput.files[0];
        if (uploadedFile) {
            console.log('File selected:', uploadedFile);
        } else {
            console.error('No file selected.');
        }
    });

    // Event listener for submit button
    submitBtn.addEventListener('click', function () {
        const activeButton = document.querySelector('.size-img .active');
        const size = activeButton.getAttribute('data-size');

        if (uploadedFile) {
            if (uploadedFilesBySize[size].length >= 4) {
                uploadedFilesBySize[size].shift(); // Remove the first item if there are already 4 items
            }
            uploadedFilesBySize[size].push(uploadedFile);
            renderFiles(size);

            uploadedFile = null; // Reset the variable after processing
            fileInput.value = '';
        } else {
            alert('Please select a file before submitting.');
            console.error('No file to submit.');
        }
    });

    // Event listeners for popup close buttons
    closePopupBtn.addEventListener('click', function () {
        popup.style.display = 'none';
        overlay.style.display = 'none';
        content.classList.remove('blurred');
    });

    cancelBtn.addEventListener('click', function () {
        popup.style.display = 'none';
        overlay.style.display = 'none';
        content.classList.remove('blurred');
    });

    confirmDeleteBtn.addEventListener('click', function () {
        deleteFile();
    });

    closeImageModalBtn.addEventListener('click', function () {
        imageModal.style.display = 'none';
        overlay.style.display = 'none';
    });

    // Event listeners for size buttons
    const sizeButtons = document.querySelectorAll('.size-img button');
    sizeButtons.forEach(function (button) {
        button.addEventListener('click', function () {
           
            sizeButtons.forEach(function (btn) {
                btn.classList.remove('active');
            });
            
            button.classList.add('active');
            const size = button.getAttribute('data-size');
            renderFiles(size);
        });
    });
});
