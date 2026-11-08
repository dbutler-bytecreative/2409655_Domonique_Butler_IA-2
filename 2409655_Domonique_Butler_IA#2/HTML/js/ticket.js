// Retrieving the saved registration details from the local storage
const savedInfo = localStorage.getItem("userDetails");

if (savedInfo === null) {
  // Redirecting user to homepage if there are no data saved

  window.location.href = "index.html";
} else {
  // Convert string back into an object
  const userDetails = JSON.parse(savedInfo);

  // User's Full Name
  const ticketMessage = document.getElementById("ticket-message");
  ticketMessage.textContent =
    "Congrats, " + userDetails.fullName + "! Your Ticket is ready!";

  const ticketName = document.getElementById("ticket-name");
  ticketName.textContent = userDetails.fullName;

  // User's GitHub Tag
  const ticketGithub = document.getElementById("ticket-github");
  ticketGithub.textContent = userDetails.github;

  // Removing the '@' symbol from the beginning of the username
  ticketGithub.href = "https://github.com/" + userDetails.github.substring(1);

  // Ticket's Serial Number
  const ticketserialnum = document.getElementById("ticket-serial");
  ticketserialnum.textContent = userDetails.ticketSerial;

  // User's Email
  const ticketEmail = document.getElementById("ticket-email");
  ticketEmail.textContent = userDetails.email;

  // User's ID
  const ticketAvatar = document.getElementById("ticket-avatar");
  ticketAvatar.src = userDetails.avatar;
}
