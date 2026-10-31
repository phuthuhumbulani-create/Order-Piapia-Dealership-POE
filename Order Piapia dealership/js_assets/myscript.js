document.addEventListener("DOMContentLoaded", function () {

    var triggers = document.querySelectorAll(".car-lightbox-trigger");
    var lightboxModal = document.getElementById("galleryLightbox");
    var lightboxImage = document.getElementById("lightboxImage");
    var lightboxCaption = document.getElementById("lightboxCaption");

    if (lightboxModal && lightboxImage && lightboxCaption) {

        triggers.forEach(function (trigger) {

            trigger.addEventListener("click", function (event) {

                event.preventDefault();

                var targetImgSrc = this.getAttribute("data-img-src");
                var targetCaption = this.getAttribute("data-caption");

                lightboxImage.setAttribute("src", targetImgSrc);
                lightboxImage.setAttribute("alt", targetCaption || "Enlarged image");
                lightboxCaption.textContent = targetCaption || "";

                if (window.jQuery && typeof jQuery.fn.modal === "function") {
                    jQuery(lightboxModal).modal("show");
                } else {
                    lightboxModal.style.display = "block";
                    lightboxModal.classList.add("show");
                }

            });

        });

        function closeLightbox() {

            if (window.jQuery && typeof jQuery.fn.modal === "function") {
                jQuery(lightboxModal).modal("hide");
            } else {
                lightboxModal.style.display = "none";
                lightboxModal.classList.remove("show");
            }

        }

        var closeButton = lightboxModal.querySelector(".close");

        if (closeButton) {
            closeButton.addEventListener("click", closeLightbox);
        }

        lightboxModal.addEventListener("click", function (event) {

            if (event.target === lightboxModal) {
                closeLightbox();
            }

        });

        document.addEventListener("keydown", function (event) {

            if (event.key === "Escape") {
                closeLightbox();
            }

        });

    }

    var currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    var tabButtons = document.querySelectorAll(".tab-button");
    var tabContents = document.querySelectorAll(".tab-content");

    tabButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            tabButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            tabContents.forEach(function (content) {
                content.hidden = true;
            });

            button.classList.add("active");

            var selectedTab = button.getAttribute("data-tab");
            var selectedContent = document.getElementById(selectedTab);

            if (selectedContent) {
                selectedContent.hidden = false;
            }

        });

    });

    var accordionButtons = document.querySelectorAll(".accordion-button");

    accordionButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            var content = button.nextElementSibling;

            if (content) {

                content.classList.toggle("active");

                var expanded = content.classList.contains("active");

                button.setAttribute("aria-expanded", expanded);

            }

        });

    });

    var services = [
        {
            name: "Vehicle Sales",
            description: "Explore quality vehicles available for purchase."
        },
        {
            name: "Maintenance and Repairs",
            description: "Get professional help with vehicle problems."
        },
        {
            name: "Vehicle Servicing",
            description: "Keep your vehicle in good condition."
        },
        {
            name: "Financing Options",
            description: "Enquire about available vehicle financing."
        },
        {
            name: "Trade-In Services",
            description: "Trade in your current vehicle."
        }
    ];

    var serviceList = document.getElementById("serviceList");
    var searchInput = document.getElementById("searchInput");
    var sortSelect = document.getElementById("sortSelect");
    var noResults = document.getElementById("noResults");

    function displayServices() {

        if (!serviceList || !searchInput || !sortSelect) {
            return;
        }

        var searchValue = searchInput.value.toLowerCase();
        var sortValue = sortSelect.value;

        var filteredServices = services.filter(function (service) {

            return (
                service.name.toLowerCase().includes(searchValue) ||
                service.description.toLowerCase().includes(searchValue)
            );

        });

        filteredServices.sort(function (a, b) {

            if (sortValue === "az") {
                return a.name.localeCompare(b.name);
            }

            return b.name.localeCompare(a.name);

        });

        serviceList.innerHTML = "";

        filteredServices.forEach(function (service) {

            var card = document.createElement("article");
            card.className = "service-card";

            var heading = document.createElement("h3");
            heading.textContent = service.name;

            var paragraph = document.createElement("p");
            paragraph.textContent = service.description;

            card.appendChild(heading);
            card.appendChild(paragraph);

            serviceList.appendChild(card);

        });

        if (noResults) {
            noResults.hidden = filteredServices.length > 0;
        }

    }

    if (searchInput) {
        searchInput.addEventListener("input", displayServices);
    }

    if (sortSelect) {
        sortSelect.addEventListener("change", displayServices);
    }

    displayServices();

    var revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        var observer = new IntersectionObserver(function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        }, {
            threshold: 0.15
        });

        revealElements.forEach(function (element) {
            observer.observe(element);
        });

    } else {

        revealElements.forEach(function (element) {
            element.classList.add("visible");
        });

    }

    var enquiryForm = document.getElementById("enquiryForm");

    if (enquiryForm) {

        var nameInput = document.getElementById("name");
        var emailInput = document.getElementById("email");
        var messageInput = document.getElementById("message");

        var submitButton = document.getElementById("submitButton");
        var formStatus = document.getElementById("formStatus");

        function showError(input, errorId, message) {

            var errorElement = document.getElementById(errorId);

            if (errorElement) {
                errorElement.textContent = message;
            }

            input.classList.add("input-error");
            input.setAttribute("aria-invalid", "true");

        }

        function clearError(input, errorId) {

            var errorElement = document.getElementById(errorId);

            if (errorElement) {
                errorElement.textContent = "";
            }

            input.classList.remove("input-error");
            input.setAttribute("aria-invalid", "false");

        }

        function validateName() {

            var name = nameInput.value.trim();

            if (name === "") {

                showError(
                    nameInput,
                    "nameError",
                    "Please enter your name."
                );

                return false;

            }

            if (name.length < 2) {

                showError(
                    nameInput,
                    "nameError",
                    "Name must contain at least 2 characters."
                );

                return false;

            }

            clearError(nameInput, "nameError");

            return true;

        }

        function validateEmail() {

            var email = emailInput.value.trim();

            var emailPattern =
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            if (email === "") {

                showError(
                    emailInput,
                    "emailError",
                    "Please enter your email address."
                );

                return false;

            }

            if (!emailPattern.test(email)) {

                showError(
                    emailInput,
                    "emailError",
                    "Please enter a valid email address."
                );

                return false;

            }

            clearError(emailInput, "emailError");

            return true;

        }

        function validateMessage() {

            var message = messageInput.value.trim();

            if (message === "") {

                showError(
                    messageInput,
                    "messageError",
                    "Please enter your enquiry message."
                );

                return false;

            }

            if (message.length < 10) {

                showError(
                    messageInput,
                    "messageError",
                    "Your message must contain at least 10 characters."
                );

                return false;

            }

            clearError(messageInput, "messageError");

            return true;

        }

        nameInput.addEventListener("input", validateName);
        emailInput.addEventListener("input", validateEmail);
        messageInput.addEventListener("input", validateMessage);

        enquiryForm.addEventListener("submit", async function (event) {

            event.preventDefault();

            var isNameValid = validateName();
            var isEmailValid = validateEmail();
            var isMessageValid = validateMessage();

            if (!isNameValid || !isEmailValid || !isMessageValid) {

                if (formStatus) {

                    formStatus.textContent =
                        "Please correct the errors before submitting.";

                    formStatus.className = "error";
                    formStatus.style.display = "block";

                }

                return;

            }

            submitButton.disabled = true;
            submitButton.textContent = "Submitting...";

            try {

                var response = await fetch(enquiryForm.action, {

                    method: "POST",

                    body: new FormData(enquiryForm),

                    headers: {
                        "Accept": "application/json"
                    }

                });

                if (!response.ok) {
                    throw new Error("Submission failed.");
                }

                if (formStatus) {

                    formStatus.textContent =
                        "Your enquiry has been submitted successfully! We will contact you soon.";

                    formStatus.className = "success";
                    formStatus.style.display = "block";

                }

                enquiryForm.reset();

                clearError(nameInput, "nameError");
                clearError(emailInput, "emailError");
                clearError(messageInput, "messageError");

            } catch (error) {

                if (formStatus) {

                    formStatus.textContent =
                        "Something went wrong. Please try again or contact us directly.";

                    formStatus.className = "error";
                    formStatus.style.display = "block";

                }

            } finally {

                submitButton.disabled = false;
                submitButton.textContent = "Submit Enquiry";

            }

        });

    }

});