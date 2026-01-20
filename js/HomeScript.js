const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const nav = document.querySelector("nav");
const overlay = document.getElementById("overlay");

// Null check for safety
if (!menuToggle || !navLinks || !nav || !overlay) {
  console.error("Required DOM elements not found");
  throw new Error("Navigation elements missing");
}

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
  nav.classList.toggle("show");
  overlay.classList.toggle("show");
});

// Close menu when clicking the overlay
overlay.addEventListener("click", () => {
  navLinks.classList.remove("show");
  nav.classList.remove("show");
  overlay.classList.remove("show");
});


navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('show');
    nav.classList.remove('show');
    overlay.classList.remove('show');
  });
});
