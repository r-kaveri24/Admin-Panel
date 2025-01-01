

function handleOurTeam() {
  document.getElementById("down").classList.toggle("up");
  document.getElementById("dropdownContent").classList.toggle("show");
}

// Save Data in LocalStorage 
document.getElementById("userForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const designation = document.getElementById("designation").value;
  const imageInput = document.getElementById("image").files[0];


  if (name && designation && imageInput) {
    // Convert the image to Base64
    const reader = new FileReader();
    reader.onload = function () {
      const image = reader.result;

      // Save the data to localStorage
      const teamData = JSON.parse(localStorage.getItem("teamData")) || [];
      teamData.push({ name, designation, image });
      localStorage.setItem("teamData", JSON.stringify(teamData));

      window.location.href = "team.html";
    };
    reader.readAsDataURL(imageInput);
  } else {
    alert("Please fill out all fields and upload an image.");
  }
});

// Load Data into Team Section
function loadTeamData() {
  const teamData = JSON.parse(localStorage.getItem("teamData")) || [];
  const previewSection = document.getElementById("images");
  const tableBody = document.querySelector(".uploadedImg tbody");

  previewSection.innerHTML = "";
  if (tableBody) tableBody.innerHTML = "";

  teamData.forEach((member, index) => {
    // Create a container for each team member's preview
    const previewItem = document.createElement("div");
    previewItem.classList.add(
      "preview-item",
      "d-flex",
      "flex-direction-col",
      "p-10",
      "rounded-1",
      "box-shadow",
      "fontFamily-lato",
      
    );

    // Add the image
    const imgElement = document.createElement("img");
    imgElement.src = member.image;
    imgElement.alt = `${member.name}'s Image`;
    imgElement.classList.add("preview-image","py-5");
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
          <button  class="penImg cursor-pointer">
             <a href="./ourVolunteer.html"></a>
          </button>
          <button class="deleteImg cursor-pointer" onclick="deleteMember(${index})"></button>
        </td>
      </tr>
    `;
    if (tableBody) tableBody.innerHTML += tableRow;
  });
}


function deleteMember(index) {
  const teamData = JSON.parse(localStorage.getItem("teamData")) || [];
  teamData.splice(index, 1);
  localStorage.setItem("teamData", JSON.stringify(teamData));
  loadTeamData();
}

// Call loadTeamData when the page loads
if (document.querySelector(".uploadedImg")) {
  document.addEventListener("DOMContentLoaded", loadTeamData);
}
