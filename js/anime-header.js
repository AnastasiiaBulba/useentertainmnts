// Header JavaScript functionality

function initHeader() {
  const headerContainer = document.getElementById("header-container");
  if (!headerContainer) return;

  // Create header HTML
  const headerHTML = `
        <header class="header fade-in">
            <div class="header-container">
                <a href="./" class="logo">
                    <div class="logo-icon">🌸</div>
                    <span>Useentertainmnts.com</span>
                </a>
                
                <nav class="nav">
                    <ul class="nav-list">
                        <li><a href="./" class="nav-link">Home</a></li>
                        <li><a href="./novelty-log.html" class="nav-link">Updates</a></li>
                        <li><a href="./trip-contacts.html" class="nav-link">Support</a></li>
                    </ul>
                </nav>
                
                <button class="mobile-menu-btn" aria-label="Toggle mobile menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
            
            <div class="mobile-menu">
                <div class="mobile-menu-content">
                    <button class="mobile-close-btn" aria-label="Close mobile menu">×</button>
                    <ul class="mobile-menu-list">
                        <li><a href="./" class="mobile-menu-link">Home</a></li>
                        <li><a href="./novelty-log.html" class="mobile-menu-link">Updates</a></li>
                        <li><a href="./trip-contacts.html" class="mobile-menu-link">Support</a></li>
                    </ul>
                </div>
            </div>
        </header>
    `;

  headerContainer.innerHTML = headerHTML;

  // Get elements
  const header = document.querySelector(".header");
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileMenuLinks = document.querySelectorAll(".mobile-menu-link");
  const mobileCloseBtn = document.querySelector(".mobile-close-btn");
  const mobileMenuBackdrop = document.querySelector(".mobile-menu-backdrop");

  // Header scroll effect
  function handleHeaderScroll() {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  // Mobile menu toggle
  function toggleMobileMenu() {
    const isOpen = mobileMenu.classList.contains("active");

    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  // Open mobile menu
  function openMobileMenu() {
    mobileMenu.classList.add("active");
    mobileMenuBtn.classList.add("active");
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";

    // Add backdrop to body
    const backdrop = document.createElement("div");
    backdrop.className = "mobile-menu-backdrop";
    document.body.appendChild(backdrop);
  }

  // Close mobile menu
  function closeMobileMenu() {
    mobileMenu.classList.remove("active");
    mobileMenuBtn.classList.remove("active");
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.width = "";

    // Remove backdrop from body
    const backdrop = document.querySelector(".mobile-menu-backdrop");
    if (backdrop) {
      backdrop.remove();
    }
  }

  // Event listeners
  window.addEventListener("scroll", utils.throttle(handleHeaderScroll, 100));
  mobileMenuBtn.addEventListener("click", toggleMobileMenu);
  mobileCloseBtn.addEventListener("click", closeMobileMenu);

  // Close menu when clicking on backdrop
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("mobile-menu-backdrop")) {
      closeMobileMenu();
    }
  });

  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  // Close mobile menu on window resize
  window.addEventListener(
    "resize",
    utils.debounce(() => {
      if (window.innerWidth >= 768) {
        closeMobileMenu();
      }
    }, 250)
  );

  // Simple hover effects for nav links (removed complex animations)
  const navLinks = document.querySelectorAll(".nav-link");
  // Hover effects are now handled by CSS only

  // Keyboard navigation
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeMobileMenu();
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Add loading animation
  setTimeout(() => {
    header.style.opacity = "1";
    header.style.transform = "translateY(0)";
  }, 100);
}

// Export function for use in main.js
window.initHeader = initHeader;
