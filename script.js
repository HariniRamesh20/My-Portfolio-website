// DARK AND LIGHT THEME
const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("light-theme");

    const isLight = document.body.classList.contains("light-theme");

    themeToggle.textContent = isLight ? "🌙" : "☀️";

    try {
        localStorage.setItem(
            "portfolio-theme",
            isLight ? "light" : "dark"
        );
    } catch (error) {
        // The theme still works if storage is unavailable.
    }
});

// RESTORE SAVED THEME
try {
    if (localStorage.getItem("portfolio-theme") === "light") {
        document.body.classList.add("light-theme");
        themeToggle.textContent = "🌙";
    }
} catch (error) {
    // Use the default dark theme.
}


// MOBILE NAVIGATION
const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");

menuToggle.addEventListener("click", function () {
    navbar.classList.toggle("open");

    menuToggle.setAttribute(
        "aria-expanded",
        navbar.classList.contains("open")
    );
});

document.querySelectorAll("#navbar a").forEach(function (link) {
    link.addEventListener("click", function () {
        navbar.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});


// ANIMATED TYPING TEXT
const typingText = document.getElementById("typing-text");

const roles = [
    "Front-End Developer",
    "Creative Thinker",
    "UI Enthusiast",
    "Web Designer"
];

let roleIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeEffect() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        typingText.textContent = roles[0];
        return;
    }

    const currentRole = roles[roleIndex];

    if (deleting) {
        characterIndex--;
    } else {
        characterIndex++;
    }

    typingText.textContent = currentRole.substring(
        0,
        characterIndex
    );

    let speed = deleting ? 45 : 90;

    if (!deleting && characterIndex === currentRole.length) {
        deleting = true;
        speed = 1400;
    } else if (deleting && characterIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 350;
    }

    setTimeout(typeEffect, speed);
}

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    typingText.textContent = roles[0];
} else {
    setTimeout(typeEffect, 1200);
}


// CONTACT FORM
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        formStatus.textContent = "Please fill in all the fields.";
        return;
    }

    // Replace this with your actual email address.
    const recipient = "your-email@example.com";

    const subject = encodeURIComponent(
        "Portfolio message from " + name
    );

    const body = encodeURIComponent(
        "Name: " + name +
        "\nEmail: " + email +
        "\n\nMessage:\n" + message
    );

    formStatus.textContent =
        "Opening your email application...";

    window.location.href =
        "mailto:" + recipient +
        "?subject=" + subject +
        "&body=" + body;
});