function toggleDropdown() {
    let dropdown = document.getElementById("dropdownMenu");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

// Close dropdown when clicking outside
document.addEventListener("click", function(event) {
    if (!event.target.closest(".dropdown")) {
        document.getElementById("dropdownMenu").style.display = "none";
    }
});

const form = document.getElementById("form");
const messageBox = document.getElementById("form-message");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    messageBox.innerHTML = "<p class='error'>All fields are required.</p>";
    return;
  }

  // Simulated submission logic (replace with actual backend call)
  setTimeout(() => {
    messageBox.innerHTML = "<p class='success'>Thank you! Your message has been sent.</p>";
    form.reset();
  }, 500);
});


let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  const slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  slides[slideIndex-1].style.display = "block";  
  setTimeout(showSlides, 4000); // Change every 4 seconds
}