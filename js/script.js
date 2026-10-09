"use strict";

// ICT251 Activity 3 - Contact Form Validation and Preview

const contactForm = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const formFeedback = document.getElementById("form-feedback");
const formPreview = document.getElementById("form-preview");

const previewName = document.getElementById("preview-name");
const previewEmail = document.getElementById("preview-email");
const previewMessage = document.getElementById("preview-message");

// Validate the form and display a preview without reloading the page.
contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Remove leading and trailing spaces.
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    // Hide the old preview before checking new input.
    formPreview.hidden = true;
    formFeedback.textContent = "";
    formFeedback.style.color = "red";

    // Check that the name is not empty.
    if (name === "") {
        formFeedback.textContent = "Please enter your name.";
        nameInput.focus();
        return;
    }

    // Check that the email has a valid format.
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        formFeedback.textContent = "Please enter a valid email address.";
        emailInput.focus();
        return;
    }

    // Check that the message is not empty.
    if (message === "") {
        formFeedback.textContent = "Please enter your message.";
        messageInput.focus();
        return;
    }

    // Display the validated information safely.
    previewName.textContent = name;
    previewEmail.textContent = email;
    previewMessage.textContent = message;

    formFeedback.style.color = "green";
    formFeedback.textContent = "Validation successful! Review your preview below.";

    formPreview.hidden = false;
});

const gallery = document.querySelector(".photo-gallery");
const galleryFigures = gallery
    ? Array.from(gallery.querySelectorAll("figure"))
    : [];

const previousButton = document.getElementById("previous-photo");
const nextButton = document.getElementById("next-photo");
const photoCounter = document.getElementById("photo-counter");
const galleryCaption = document.getElementById("gallery-caption");

let currentPhoto = 0;

function showPhoto(index) {
    if (galleryFigures.length === 0) {
        console.error("No gallery figures found.");
        return;
    }

    currentPhoto =
        (index + galleryFigures.length) % galleryFigures.length;

    galleryFigures.forEach((figure, i) => {
        figure.style.display = i === currentPhoto ? "" : "none";
    });

    const caption = galleryFigures[currentPhoto]
        .querySelector("figcaption");

    if (photoCounter) {
        photoCounter.textContent =
            `Photo ${currentPhoto + 1} of ${galleryFigures.length}`;
    }

    if (galleryCaption && caption) {
        galleryCaption.textContent = caption.textContent.trim();
    }
}

if (previousButton && nextButton && galleryFigures.length > 0) {
    nextButton.addEventListener("click", () => {
        showPhoto(currentPhoto + 1);
    });

    previousButton.addEventListener("click", () => {
        showPhoto(currentPhoto - 1);
    });

    showPhoto(0);
} else {
    console.error(
        "Check the gallery, Previous button, and Next button IDs in index.html."
    );
}

const themeToggle = document.getElementById("themeToggle");

// Load the saved theme when the page opens
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    themeToggle.textContent = "🌙 Dark Mode";
} else {
    document.body.classList.remove("light-mode");
    themeToggle.textContent = "☀️ Light Mode";
}

// Switch themes when the button is clicked
themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        localStorage.setItem("theme", "light");
        themeToggle.textContent = "🌙 Dark Mode";
    } else {
        localStorage.setItem("theme", "dark");
        themeToggle.textContent = "☀️ Light Mode";
    }
});
