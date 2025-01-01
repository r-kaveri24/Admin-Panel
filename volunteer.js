function handleOurTeam() {
  document.getElementById("down").classList.toggle("up");
  document.getElementById("dropdownContent").classList.toggle("show");
}

// Save Data in LocalStorage
document
  .getElementById("volunteerForm")
  ?.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("nameVolunteer").value.trim();
    const designation = document
      .getElementById("designationVolunteer")
      .value.trim();
    const imageInput = document.getElementById("image").files[0];

    if (name && designation && imageInput) {
      const reader = new FileReader();
      reader.onload = function () {
        const image = reader.result;

        const VolunteerData =
          JSON.parse(localStorage.getItem("VolunteerData")) || [];
        VolunteerData.push({ name, designation, image });
        localStorage.setItem("VolunteerData", JSON.stringify(VolunteerData));

        window.location.href = "ourVolunteer.html";
      };
      reader.readAsDataURL(imageInput);
    } else {
      alert("Please fill out all fields and upload an image.");
    }
  });

// Load Data into Team Section
function loadVolunteerData() {
  const VolunteerData = JSON.parse(localStorage.getItem("VolunteerData")) || [];
  const previewSection = document.getElementById("images");
  const tableBody = document.querySelector(".uploadedImg tbody");

  if (previewSection) previewSection.innerHTML = "";
  if (tableBody) tableBody.innerHTML = "";

  VolunteerData.forEach((member, index) => {
    const previewItem = document.createElement("div");
    previewItem.classList.add(
      "preview-item",
      "d-flex",
      "flex-direction-col",
      "p-10",
      "rounded-1",
      "box-shadow",
      "fontFamily-lato"
    );

    // Add the image
    const imgElement = document.createElement("img");
    imgElement.src = member.image;
    imgElement.alt = `${member.name}'s Image`;
    imgElement.classList.add("preview-image", "py-5");
    previewItem.appendChild(imgElement);

    // Add the name
    const nameElement = document.createElement("p");
    nameElement.textContent = member.name;
    nameElement.classList.add("preview-name");
    previewItem.appendChild(nameElement);

    // Add the designation
    const designationElement = document.createElement("p");
    designationElement.textContent = member.designation;
    designationElement.classList.add("preview-designation");
    previewItem.appendChild(designationElement);

    // Append the preview item to the preview section
    previewSection.appendChild(previewItem);
    const tableRow = `
      <tr class="UploadedtableRow fontFamily-lato"  >
        <td>${index + 1}</td>
        <td class="py-5"><img src="${member.image}" alt="${
      member.name
    }'s Profile" class="table-image rounded" /></td>
        <td>${member.name}</td>
        <td>${member.designation}</td>
        <td class=" delete-preview">
          <a href="uploadVolunteer.html">
           <button class="penImg cursor-pointer "></button>
          </a>
          <button class="deleteImg cursor-pointer" onclick="deleteMember(${index})"></button>
        </td>
      </tr>
    `;
    if (tableBody) tableBody.innerHTML += tableRow;
  });
}

function deleteMember(index) {
  const VolunteerData = JSON.parse(localStorage.getItem("VolunteerData")) || [];
  VolunteerData.splice(index, 1);
  localStorage.setItem("VolunteerData", JSON.stringify(VolunteerData));
  loadVolunteerData();
}

// Initialize Data on Page Load
if (document.querySelector(".uploadedImg")) {
  document.addEventListener("DOMContentLoaded", loadVolunteerData);
}
