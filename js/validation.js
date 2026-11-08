const registrationForm = document.getElementById("registration-form");

const avatarInput = document.getElementById("user-avatar");
const avatarPreview = document.getElementById("avatar-preview");

const githubInput = document.getElementById("user-name");

// Displaying preview of user's avatar
avatarInput.addEventListener("change", function () {
  const selectedAvatar = avatarInput.files[0];

  if (selectedAvatar === undefined) {
    return;
  }

  if (
    selectedAvatar.type !== "image/jpeg" &&
    selectedAvatar.type !== "image/png"
  ) {
    return;
  }

  if (selectedAvatar.size > 512000) {
    return;
  }

  // I used FileReader for the avatar feature (https://www.w3docs.com/learn-javascript/file-and-filereader)
  const previewReader = new FileReader();

  previewReader.onload = function () {
    avatarPreview.src = previewReader.result;
    avatarPreview.style.display = "block";
  };
  // Reading the selected avatar
  previewReader.readAsDataURL(selectedAvatar);
});

registrationForm.addEventListener("submit", function (event) {
  // Prevent default form submission
  event.preventDefault();

  // Validation for user's full name
  const nameInput = document.getElementById("full-name").value.trim();
  const nameError = document.getElementById("name-error");
  if (nameInput === "") {
    nameError.textContent = "Please enter your full name";
    return;
  }

  nameError.textContent = "";

  // Email Validation
  const emailInput = document.getElementById("user-email").value;

  // Create a pattern to check email format
  const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailError = document.getElementById("email-error");

  if (!emailFormat.test(emailInput)) {
    emailError.textContent =
      "Invalid format! Please enter a valid email address";
    return;
  }

  emailError.textContent = "";

  // Avatar Validation
  const avatarError = document.getElementById("avatar-error");
  if (avatarInput.files[0] === undefined) {
    avatarError.textContent = "Please upload an avatar!";

    return;
  }

  if (
    avatarInput.files[0].type !== "image/jpeg" &&
    avatarInput.files[0].type !== "image/png"
  ) {
    avatarError.textContent = "Invalid file type! Please insert PNG or JPEG";
    return;
  }

  if (avatarInput.files[0].size > 512000) {
    avatarError.textContent =
      "File too large! Please insert a file that is 500KB or less";
    return;
  }

  avatarError.textContent = "";

  // GitHub Username Validation
  const githubError = document.getElementById("github-error");

  if (!githubInput.value.startsWith("@")) {
    githubError.textContent = "GitHub username must begin with '@'!";
    return;
  }

  githubError.textContent = "";

  // I used FileReader for the avatar feature (https://www.w3docs.com/learn-javascript/file-and-filereader)
  const reader = new FileReader();

  reader.onload = function () {
    // Storing user details in an object
    const userDetails = {
      fullName: nameInput,
      email: emailInput,
      github: githubInput.value,
      avatar: reader.result,
      ticketSerial: "#01609",
    };

    // Converting the object into a string and saving it to the local storage
    localStorage.setItem("userDetails", JSON.stringify(userDetails));

    // Redirecting user to their generated ticket
    window.location.href = "ticket.html";
  };

  // Reading user's avatar as a data URL
  reader.readAsDataURL(avatarInput.files[0]);
});
