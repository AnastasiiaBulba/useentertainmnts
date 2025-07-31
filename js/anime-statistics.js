// Statistics JavaScript functionality

function initStatistics() {
  const statNumbers = document.querySelectorAll(".stat-number");

  if (!statNumbers.length) return;

  // Function to animate number counting
  function animateNumber(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
        element.classList.remove("counting");
      }

      // Format number based on target value
      if (target >= 1000000) {
        element.textContent = (current / 1000000).toFixed(1) + "M";
      } else if (target >= 1000) {
        element.textContent = (current / 1000).toFixed(1) + "K";
      } else if (target % 1 !== 0) {
        element.textContent = current.toFixed(1);
      } else {
        element.textContent = Math.floor(current).toLocaleString();
      }
    }, 16);
  }

  // Intersection Observer for triggering animations
  const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px -50px 0px",
  };

  const statisticsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statItem = entry.target;
        const numberElement = statItem.querySelector(".stat-number");
        const target = parseFloat(numberElement.dataset.target);

        // Add counting animation class
        numberElement.classList.add("counting");

        // Start counting animation
        animateNumber(numberElement, target);

        // Add success state after animation
        setTimeout(() => {
          statItem.classList.add("success");
        }, 2000);

        // Stop observing this element
        statisticsObserver.unobserve(statItem);
      }
    });
  }, observerOptions);

  // Observe all stat items
  const statItems = document.querySelectorAll(".stat-item");
  statItems.forEach((item) => {
    statisticsObserver.observe(item);
  });

  // Add hover effects
  statItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.05)";
    });

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });

    // Add click effect
    item.addEventListener("click", function () {
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 150);
    });
  });

  // Add keyboard navigation
  statItems.forEach((item, index) => {
    item.setAttribute("tabindex", "0");

    item.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.click();
      }
    });
  });

  // Add pulse animation to icons
  const statIcons = document.querySelectorAll(".stat-icon");
  statIcons.forEach((icon, index) => {
    setTimeout(() => {
      icon.style.animation = "pulse 2s infinite";
    }, index * 200);
  });

  // Add staggered animation to stat items
  statItems.forEach((item, index) => {
    setTimeout(() => {
      item.style.opacity = "1";
      item.style.transform = "translateY(0)";
    }, index * 100);
  });

  // Add click to reveal functionality
  statItems.forEach((item) => {
    item.addEventListener("click", function () {
      const numberElement = this.querySelector(".stat-number");
      const target = parseFloat(numberElement.dataset.target);

      // Reset and replay animation
      numberElement.textContent = "0";
      numberElement.classList.remove("counting");
      this.classList.remove("success");

      setTimeout(() => {
        numberElement.classList.add("counting");
        animateNumber(numberElement, target);

        setTimeout(() => {
          this.classList.add("success");
        }, 2000);
      }, 100);
    });
  });

  // Add responsive behavior
  function handleResize() {
    if (window.innerWidth < 768) {
      statItems.forEach((item) => {
        item.style.margin = "0.5rem";
      });
    } else {
      statItems.forEach((item) => {
        item.style.margin = "";
      });
    }
  }

  window.addEventListener("resize", utils.debounce(handleResize, 250));

  // Add accessibility features
  statItems.forEach((item) => {
    const numberElement = item.querySelector(".stat-number");
    const labelElement = item.querySelector(".stat-label");
    const target = parseFloat(numberElement.dataset.target);

    // Add ARIA labels
    item.setAttribute("role", "button");
    item.setAttribute(
      "aria-label",
      `Click to see ${labelElement.textContent} statistics`
    );

    // Add screen reader support
    const srText = document.createElement("span");
    srText.className = "sr-only";
    srText.textContent = `Current value: ${numberElement.textContent}`;
    item.appendChild(srText);
  });

  // Add loading state
  function showLoadingState() {
    statItems.forEach((item) => {
      item.classList.add("loading");
    });
  }

  function hideLoadingState() {
    statItems.forEach((item) => {
      item.classList.remove("loading");
    });
  }

  // Simulate loading on page load
  showLoadingState();
  setTimeout(hideLoadingState, 1000);

  console.log("Statistics initialized");
}

// Export function for use in main.js
window.initStatistics = initStatistics;
