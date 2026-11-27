
// RIVALS AI website settings
const DEMO_VIDEO_URL = "https://drive.google.com/file/d/1lH7JdqYe3bMHe1IECnia3NbgyeT7LIJo/view?usp=drive_link";

// Footer year
const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mainNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Demo video
const videoLink = document.getElementById("videoLink");
const videoHint = document.getElementById("videoHint");

if (videoLink && videoHint) {
  if (DEMO_VIDEO_URL.trim()) {
    videoLink.href = DEMO_VIDEO_URL;
    videoHint.textContent =
      "Opens the RIVALS AI demonstration video in a new tab.";
  }
}

// DARK MODE
const themeToggle = document.getElementById("themeToggle");

function applyTheme(theme) {
  document.body.classList.toggle("dark-mode", theme === "dark");

  if (themeToggle) {
    themeToggle.textContent =
      theme === "dark" ? "☀️ Light" : "🌙 Dark";

    themeToggle.setAttribute(
      "aria-label",
      theme === "dark"
        ? "Switch to light mode"
        : "Switch to dark mode"
    );
  }
}

// Restore saved theme
let savedTheme = "light";

try {
  savedTheme = localStorage.getItem("rivalsTheme") || "light";
} catch (error) {
  savedTheme = "light";
}

applyTheme(savedTheme);

// Switch themes
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const newTheme = document.body.classList.contains("dark-mode")
      ? "light"
      : "dark";

    applyTheme(newTheme);

    try {
      localStorage.setItem("rivalsTheme", newTheme);
    } catch (error) {
      // Theme still works for this visit.
    }
  });
}
