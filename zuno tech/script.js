// GOOGLE APPS SCRIPT URL
const scriptURL = "https://script.google.com/macros/s/AKfycbyiROJ1CjBSffbSff2sPJ1g6MuE-eVWJSr75qBaEcGrc6bzK5QPkBX7UeVPuf29qorqZA/exec";

// MOBILE NAVIGATION

const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuButton && navLinks) {
menuButton.addEventListener("click", function () {
navLinks.classList.toggle("open");

    const isOpen = navLinks.classList.contains("open");

    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.textContent = isOpen ? "✕" : "☰";
});

// CLOSE MENU AFTER CLICKING A LINK

document.querySelectorAll(".nav-links a").forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        menuButton.textContent = "☰";
        menuButton.setAttribute("aria-expanded", "false");
    });
});

}

// AUTOMATIC COPYRIGHT YEAR

const yearElement = document.getElementById("year");

if (yearElement) {
yearElement.textContent = new Date().getFullYear();
}

// CONTACT FORM - GOOGLE SHEETS CONNECTION

const contactForm = document.getElementById("contactForm");

if (contactForm) {

contactForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const submitButton = contactForm.querySelector(
        'button[type="submit"]'
    );

    const status = document.getElementById("formStatus");

    const formData = new FormData(contactForm);

    const enquiry = {
        name: formData.get("name") || "",
        business: formData.get("business") || "",
        email: formData.get("email") || "",
        phone: formData.get("phone") || "",
        websiteType: formData.get("website") || "",
        budget: formData.get("budget") || "",
        domainPreference: formData.get("domain") || "",
        message: formData.get("message") || ""
    };

    try {

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Submitting...";
        }

        status.textContent = "Sending your enquiry...";

        await fetch(scriptURL, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },
            body: JSON.stringify(enquiry)
        });

        status.textContent =
            "Thank you! Your enquiry has been submitted.";

        contactForm.reset();

    } catch (error) {

        console.error("Enquiry submission error:", error);

        status.textContent =
            "Something went wrong. Please try again or contact us on WhatsApp.";

    } finally {

        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = "Send Enquiry";
        }

    }

});

}