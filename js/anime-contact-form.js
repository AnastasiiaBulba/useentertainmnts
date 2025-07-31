// Contact Form Handler
document.addEventListener("DOMContentLoaded", function () {
  console.log("Contact page initialized");

  // Initialize header and footer
  if (typeof initHeader === "function") {
    console.log("Initializing header");
    initHeader();
  } else {
    console.log("initHeader function not found");
  }

  if (typeof initFooter === "function") {
    console.log("Initializing footer");
    initFooter();
  } else {
    console.log("initFooter function not found");
  }

  const form = document.getElementById("contact-form");
  console.log("Form element:", form);

  if (!form) {
    console.log("Contact form not found");
    return;
  }

  console.log("Contact form found, setting up handlers");

  // Phone input restriction
  const phoneInput = document.getElementById("phone");
  if (phoneInput) {
    phoneInput.addEventListener("input", function () {
      this.value = this.value.replace(/[^0-9]/g, "");
    });
  }

  // Function to clear all form fields
  function clearFormFields() {
    console.log("clearFormFields function called");

    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const phoneField = document.getElementById("phone");
    const messageField = document.getElementById("message");

    console.log("Fields found:", {
      name: nameField,
      email: emailField,
      phone: phoneField,
      message: messageField,
    });

    if (nameField) {
      console.log("Clearing name field, current value:", nameField.value);
      nameField.value = "";
      console.log("Name field cleared, new value:", nameField.value);
    }

    if (emailField) {
      console.log("Clearing email field, current value:", emailField.value);
      emailField.value = "";
      console.log("Email field cleared, new value:", emailField.value);
    }

    if (phoneField) {
      console.log("Clearing phone field, current value:", phoneField.value);
      phoneField.value = "";
      console.log("Phone field cleared, new value:", phoneField.value);
    }

    if (messageField) {
      console.log("Clearing message field, current value:", messageField.value);
      messageField.value = "";
      console.log("Message field cleared, new value:", messageField.value);
    }

    // Also reset the form
    if (form) {
      console.log("Resetting form");
      form.reset();
    }

    console.log("All form fields cleared");
  }

  // Function to show success popup
  function showSuccessPopup(message) {
    console.log("showSuccessPopup function called with message:", message);

    // Remove any existing popups
    const existingPopup = document.querySelector(".success-popup");
    if (existingPopup) {
      console.log("Removing existing popup");
      existingPopup.remove();
    }

    // Create popup element
    const popup = document.createElement("div");
    popup.className = "success-popup";
    popup.innerHTML = `
      <div class="popup-content">
        <div class="popup-icon">✅</div>
        <div class="popup-message">${message}</div>
        <button class="popup-close" onclick="this.parentElement.parentElement.remove()">✕</button>
      </div>
    `;

    // Add styles
    popup.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 40px;
      border-radius: 20px;
      box-shadow: 0 25px 80px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1);
      z-index: 10000;
      animation: popupSlideIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      min-width: 350px;
      text-align: center;
      border: 2px solid rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(10px);
    `;

    // Add popup content styles
    const popupContent = popup.querySelector(".popup-content");
    popupContent.style.cssText = `
      position: relative;
    `;

    // Add icon styles
    const popupIcon = popup.querySelector(".popup-icon");
    popupIcon.style.cssText = `
      font-size: 56px;
      margin-bottom: 20px;
      display: block;
      animation: iconBounce 0.8s ease-out 0.3s both;
    `;

    // Add message styles
    const popupMessage = popup.querySelector(".popup-message");
    popupMessage.style.cssText = `
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 25px;
      line-height: 1.5;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      animation: messageFadeIn 0.8s ease-out 0.5s both;
    `;

    // Add close button styles
    const popupClose = popup.querySelector(".popup-close");
    popupClose.style.cssText = `
      position: absolute;
      top: 15px;
      right: 20px;
      background: rgba(255, 255, 255, 0.15);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: white;
      font-size: 20px;
      cursor: pointer;
      padding: 8px 12px;
      border-radius: 50%;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      backdrop-filter: blur(5px);
      animation: closeButtonFadeIn 0.8s ease-out 0.7s both;
    `;

    popupClose.addEventListener("mouseenter", function () {
      this.style.background = "rgba(255, 255, 255, 0.25)";
      this.style.transform = "scale(1.15) rotate(90deg)";
      this.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.3)";
    });

    popupClose.addEventListener("mouseleave", function () {
      this.style.background = "rgba(255, 255, 255, 0.15)";
      this.style.transform = "scale(1) rotate(0deg)";
      this.style.boxShadow = "none";
    });

    // Add animation keyframes
    const style = document.createElement("style");
    style.textContent = `
      @keyframes popupSlideIn {
        from {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.7) rotate(-5deg);
        }
        to {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1) rotate(0deg);
        }
      }
      
      @keyframes iconBounce {
        from {
          opacity: 0;
          transform: scale(0.5) rotate(-180deg);
        }
        to {
          opacity: 1;
          transform: scale(1) rotate(0deg);
        }
      }
      
      @keyframes messageFadeIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes closeButtonFadeIn {
        from {
          opacity: 0;
          transform: scale(0.8) rotate(-90deg);
        }
        to {
          opacity: 1;
          transform: scale(1) rotate(0deg);
        }
      }
    `;
    document.head.appendChild(style);

    // Add popup to page
    console.log("Adding popup to page");
    document.body.appendChild(popup);
    console.log("Popup added to page");

    // Auto-remove after 4 seconds
    setTimeout(() => {
      if (popup.parentNode) {
        console.log("Auto-removing popup");
        popup.style.animation = "popupSlideOut 0.3s ease-out";
        setTimeout(() => {
          if (popup.parentNode) {
            popup.remove();
            console.log("Popup removed");
          }
        }, 300);
      }
    }, 4000);

    // Add slide out animation
    const slideOutStyle = document.createElement("style");
    slideOutStyle.textContent = `
      @keyframes popupSlideOut {
        from {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1) rotate(0deg);
        }
        to {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.7) rotate(5deg);
        }
      }
    `;
    document.head.appendChild(slideOutStyle);
  }

  // Form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("Form submitted");

    // Get form data
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    console.log("Form data:", { name, email, phone, message });

    // Clear previous errors
    document.querySelectorAll(".error-message").forEach((error) => {
      error.textContent = "";
    });

    // Validation
    let isValid = true;

    // Name validation
    if (!name || name.length < 2) {
      document.getElementById("name-error").textContent =
        "Please enter a valid name";
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      document.getElementById("email-error").textContent =
        "Please enter a valid email address";
      isValid = false;
    }

    // Phone validation (optional)
    if (phone && !/^[0-9]+$/.test(phone)) {
      document.getElementById("phone-error").textContent =
        "Please enter numbers only";
      isValid = false;
    }

    // Message validation
    if (!message || message.length < 10) {
      document.getElementById("message-error").textContent =
        "Message must be at least 10 characters";
      isValid = false;
    }

    console.log("Form validation result:", isValid);

    if (isValid) {
      console.log("Form is valid, clearing fields and showing success message");

      // Clear all form fields immediately
      clearFormFields();

      // Show success message popup
      showSuccessPopup("Data successfully sent!");

      // Clear error messages
      document.querySelectorAll(".error-message").forEach((error) => {
        error.textContent = "";
      });
    } else {
      console.log("Form validation failed");
      showMessage(
        "Please fix the errors in the form before submitting.",
        "error"
      );
    }

    return false;
  });

  // Show message function
  function showMessage(text, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll(".message");
    existingMessages.forEach((msg) => msg.remove());

    // Create new message
    const message = document.createElement("div");
    message.className = `message ${type}`;
    message.textContent = text;
    message.style.cssText = `
      display: block;
      margin: 20px 0;
      padding: 15px;
      border-radius: 8px;
      font-weight: 600;
      text-align: center;
      font-size: 16px;
    `;

    // Insert before form
    form.parentNode.insertBefore(message, form);

    // Scroll to message
    message.scrollIntoView({ behavior: "smooth", block: "center" });

    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (message.parentNode) {
        message.remove();
      }
    }, 5000);
  }
});
