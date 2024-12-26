document.addEventListener('DOMContentLoaded', function () {
    const stars = document.querySelectorAll(".stars svg");
    let selectedRating = 0;
    const formDataArray = [];
    let rowToDelete = null; // Variable to store the row to be deleted

    function fillStars(index) {
        stars.forEach((star, i) => {
            if (i <= index) {
                star.setAttribute('fill', 'gold');
            } else {
                star.setAttribute('fill', 'none');
            }
        });
    }

    stars.forEach((star, index) => {
        star.addEventListener("click", (e) => {
            e.preventDefault();
            selectedRating = index + 1;
            fillStars(index);
            console.log(`Star ${index + 1} clicked`);
        });
    });

    const submitBtn = document.getElementById("submit");
    const imageInput = document.querySelector('.upload-img input[type="file"]');
    const uploadBoxImage = document.querySelector('.upload-box img');

    imageInput.addEventListener("change", function () {
        const uploadedImage = imageInput.files[0];
        if (uploadedImage) {
            const reader = new FileReader();
            reader.onload = function (event) {
                uploadBoxImage.src = event.target.result;
            };
            reader.readAsDataURL(uploadedImage);
        }
    });

    submitBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const name = document.querySelector(".left input:nth-of-type(1)").value.trim();
        const description = document.querySelector(".left input:nth-of-type(2)").value.trim();
        const designation = document.querySelector(".left input:nth-of-type(3)").value.trim();
        const uploadedImage = imageInput.files[0];

        if (!name || !description || !designation || selectedRating === 0) {
            alert("Please fill in all fields and select a rating!");
            return;
        }

        let imageURL = "";
        if (uploadedImage) {
            const reader = new FileReader();
            reader.onload = function (event) {
                imageURL = event.target.result;
                saveData(name, description, designation, selectedRating, imageURL);
            };
            reader.readAsDataURL(uploadedImage);
        } else {
            saveData(name, description, designation, selectedRating, "");
        }
    });

    function saveData(name, description, designation, rating, image) {
        const formData = {
            name: name,
            description: description,
            designation: designation,
            rating: rating,
            image: image
        };

        formDataArray.push(formData);
        addToTable(name, description, designation, rating, image);
        alert("Form submitted successfully!");
        clearForm();
    }

    function clearForm() {
        document.querySelector(".left input:nth-of-type(1)").value = "";
        document.querySelector(".left input:nth-of-type(2)").value = "";
        document.querySelector(".left input:nth-of-type(3)").value = "";
        imageInput.value = "";
        uploadBoxImage.src = "./testimonial-assets/upload.png";
        selectedRating = 0;
        fillStars(-1);
    }

    function addToTable(name, description, designation, rating, image) {
        const tableBody = document.querySelector(".testimonial-list tbody");
        const rowCount = tableBody.rows.length + 1;

        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${rowCount}</td>
            <td><img src="${image || './testimonial-assets/upload.png'}" alt="Profile" style="width: 50px; height: 50px; border-radius: 50%;"></td>
            <td>${name}</td>
            <td class="description-cell" data-full-text="${description}">${description} </td>
            <td>${designation}</td>
            <td>${'⭐'.repeat(rating)}</td>
            <td>
                <button class="view-btn">
                    <img src="./testimonial-assets/black-eye.png" alt="View" />
                </button>
                <button class="delete-btn" id="delete">
                    <img src="./testimonial-assets/delete.png" alt="Delete" />
                </button>
            </td>
        `;

        tableBody.appendChild(newRow);

        // Add delete functionality
        addDeleteEvent(newRow.querySelector("#delete"), newRow);

        // Add view functionality
        addViewEvent(newRow.querySelector(".view-btn"), { name, description, designation, rating, image });
    }

    function addDeleteEvent(button, row) {
        button.addEventListener("click", () => {
            rowToDelete = row; // Store the row to be deleted
            popup.style.display = "flex";
            overlay.style.display = "block";
        });
    }

    function addViewEvent(button, data) {
        button.addEventListener("click", () => {
            const modal = document.querySelector(".modal");
            const modalImage = modal.querySelector(".info img");
            const modalName = modal.querySelector(".info .name");
            const modalDescription = modal.querySelector(".info .disc");
            const modalDesignation = modal.querySelector(".info h4");
            const modalRating = modal.querySelector(".info .rating");

            modalImage.src = data.image || './testimonial-assets/upload.png';
            modalName.textContent = data.name;
            modalDescription.textContent = data.description;
            modalDesignation.textContent = data.designation;
            modalRating.textContent = '⭐'.repeat(data.rating);

            modal.style.display = "block";
            overlay.style.display = "block";
        });
    }

    const popup = document.getElementById("popup");
    const overlay = document.getElementById("overlay");
    const closePopupButton = document.getElementById("close-popup");
    const cancelBtn = document.getElementById("cancel-btn");
    const confirmDeleteBtn = document.getElementById("confirm-delete");

    closePopupButton.addEventListener("click", () => {
        popup.style.display = "none";
        overlay.style.display = "none";
    });

    cancelBtn.addEventListener("click", () => {
        popup.style.display = "none";
        overlay.style.display = "none";
    });

    confirmDeleteBtn.addEventListener("click", () => {
        if (rowToDelete) {
            rowToDelete.remove();
            rowToDelete = null;
        }
        popup.style.display = "none";
        overlay.style.display = "none";
    });

    // Close modal functionality
    const modal = document.querySelector(".modal");
    const closeImageModalButton = document.getElementById("close-image-modal");
    closeImageModalButton.addEventListener("click", () => {
        modal.style.display = "none";
        overlay.style.display = "none";
    });
});
