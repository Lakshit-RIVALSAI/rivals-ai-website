// RIVALS AI website settings
// 1) Paste your public demo video URL between the quotes below.
// 2) Add your Formspree form endpoint below to enable public feedback submissions.
const DEMO_VIDEO_URL = "";
const FORMSPREE_ENDPOINT = ""; // Example format: https://formspree.io/f/xxxxxxxx

document.getElementById("year").textContent = new Date().getFullYear();

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

const videoLink = document.getElementById("videoLink");
const videoHint = document.getElementById("videoHint");
if (DEMO_VIDEO_URL.trim()) {
  videoLink.href = DEMO_VIDEO_URL;
  videoHint.textContent = "Opens the RIVALS AI demonstration video in a new tab.";
} else {
  videoLink.addEventListener("click", event => {
    event.preventDefault();
    videoHint.textContent = "Demo link not added yet. Add it to DEMO_VIDEO_URL in script.js.";
  });
}

const form = document.getElementById("reviewForm");
const message = document.getElementById("formMessage");
form.addEventListener("submit", async event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  if (!FORMSPREE_ENDPOINT.trim()) {
    message.textContent = "The review form is not connected yet. Follow SETUP.md to connect Formspree before publishing.";
    message.classList.add("error");
    return;
  }
  const submitButton = form.querySelector("button[type=submit]");
  submitButton.disabled = true;
  submitButton.textContent = "Sending...";
  message.textContent = "";
  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      body: new FormData(form),
      headers: { "Accept": "application/json" }
    });
    if (!response.ok) throw new Error("Submission failed");
    form.reset();
    message.textContent = "Thank you! Your feedback has been submitted.";
    message.classList.remove("error");
  } catch (error) {
    message.textContent = "Sorry, feedback could not be sent. Please try again later.";
    message.classList.add("error");
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Send feedback ↗";
  }
});
