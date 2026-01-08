// ================================
// Force scroll to top on page load
// ================================
// This prevents the browser from restoring scroll position
if (history.scrollRestoration) {
  history.scrollRestoration = "manual";
}

// Scroll to top immediately when page loads
window.addEventListener("beforeunload", function () {
  window.scrollTo(0, 0);
});

// Also scroll to top when DOM is ready
window.scrollTo(0, 0);

// ================================
// DOM Content Loaded - Initialize all features
// ================================
document.addEventListener("DOMContentLoaded", function () {
  // Ensure we're at the top
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 0);

  initMobileMenu();
  initSmoothScroll();
  initScrollToTop();
  initScrollAnimations();
  initNavbarScroll();
});

// ================================
// Mobile Menu Toggle
// ================================
function initMobileMenu() {
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-menu a");

  // Toggle mobile menu
  mobileMenuToggle.addEventListener("click", function () {
    this.classList.toggle("active");
    navMenu.classList.toggle("active");

    // Update ARIA attribute
    const isExpanded = this.classList.contains("active");
    this.setAttribute("aria-expanded", isExpanded);

    // Prevent body scroll when menu is open
    document.body.style.overflow = isExpanded ? "hidden" : "";
  });

  // Close menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      mobileMenuToggle.classList.remove("active");
      navMenu.classList.remove("active");
      mobileMenuToggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (event) {
    const isClickInsideMenu = navMenu.contains(event.target);
    const isClickOnToggle = mobileMenuToggle.contains(event.target);

    if (
      !isClickInsideMenu &&
      !isClickOnToggle &&
      navMenu.classList.contains("active")
    ) {
      mobileMenuToggle.classList.remove("active");
      navMenu.classList.remove("active");
      mobileMenuToggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
  });
}

// ================================
// Smooth Scrolling for Navigation Links
// ================================
function initSmoothScroll() {
  // Get all navigation links that point to sections on the page
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // Skip if href is just "#" or empty
      if (href === "#" || href === "") {
        e.preventDefault();
        return;
      }

      const targetSection = document.querySelector(href);

      if (targetSection) {
        e.preventDefault();

        // Calculate offset for fixed navbar
        const navbarHeight = document.getElementById("navbar").offsetHeight;
        const targetPosition = targetSection.offsetTop - navbarHeight;

        // Smooth scroll to target
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Update URL hash without jumping
        history.pushState(null, null, href);
      }
    });
  });
}

// ================================
// Scroll to Top Button
// ================================
function initScrollToTop() {
  const scrollToTopBtn = document.getElementById("scrollToTop");

  // Show/hide button based on scroll position
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 500) {
      scrollToTopBtn.classList.add("visible");
    } else {
      scrollToTopBtn.classList.remove("visible");
    }
  });

  // Scroll to top when clicked
  scrollToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// ================================
// Scroll Animations - Fade in elements
// ================================
function initScrollAnimations() {
  // Elements to animate on scroll
  const animatedElements = document.querySelectorAll(
    ".quality-card, .review-card, .contact-card"
  );

  // Add fade-in class to elements
  animatedElements.forEach((element) => {
    element.classList.add("fade-in");
  });

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Optional: stop observing after animation
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all animated elements
  animatedElements.forEach((element) => {
    observer.observe(element);
  });
}

// ================================
// Navbar Scroll Effect
// ================================
function initNavbarScroll() {
  const navbar = document.getElementById("navbar");
  let lastScroll = 0;

  window.addEventListener("scroll", function () {
    const currentScroll = window.pageYOffset;

    // Add shadow when scrolled
    if (currentScroll > 50) {
      navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
    } else {
      navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.05)";
    }

    lastScroll = currentScroll;
  });
}

// ================================
// Active Navigation Link Highlighting
// ================================
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    const navbarHeight = document.getElementById("navbar").offsetHeight;

    if (window.pageYOffset >= sectionTop - navbarHeight - 100) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    const href = link.getAttribute("href");
    if (href === `#${current}`) {
      link.classList.add("active");
    }
  });
}

// Update active nav link on scroll
window.addEventListener("scroll", updateActiveNavLink);

// ================================
// Hero Animation on Load
// ================================
window.addEventListener("load", function () {
  const heroContent = document.querySelector(".hero-content");
  if (heroContent) {
    heroContent.style.opacity = "1";
  }

  // Force scroll to top one more time after everything loads
  window.scrollTo(0, 0);
});

// ================================
// Testimonial Cards Staggered Animation
// ================================
function staggerAnimateReviews() {
  const reviewCards = document.querySelectorAll(".review-card");

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add staggered delay
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }, index * 100);

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  reviewCards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    observer.observe(card);
  });
}

// Initialize review animations
document.addEventListener("DOMContentLoaded", staggerAnimateReviews);

// ================================
// Form Validation (if you add a contact form later)
// ================================
function validateContactForm(form) {
  const inputs = form.querySelectorAll("input[required], textarea[required]");
  let isValid = true;

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      isValid = false;
      input.classList.add("error");

      // Remove error class on input
      input.addEventListener("input", function () {
        this.classList.remove("error");
      });
    }
  });

  return isValid;
}

// ================================
// Accessibility: Keyboard Navigation
// ================================
document.addEventListener("keydown", function (e) {
  // Close mobile menu with Escape key
  if (e.key === "Escape") {
    const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (navMenu.classList.contains("active")) {
      mobileMenuToggle.classList.remove("active");
      navMenu.classList.remove("active");
      mobileMenuToggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
  }
});

// ================================
// Performance: Debounce Scroll Events
// ================================
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounce to scroll-heavy functions
const debouncedNavUpdate = debounce(updateActiveNavLink, 100);
window.addEventListener("scroll", debouncedNavUpdate);

// ================================
// Lazy Loading Images (Optional Enhancement)
// ================================
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
        }
        imageObserver.unobserve(img);
      }
    });
  });

  // Observe all images with data-src attribute
  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}

// ================================
// Console Message (Optional - can be removed)
// ================================
console.log(
  "%cAim Driving School",
  "color: #FF8C00; font-size: 24px; font-weight: bold;"
);
console.log(
  "%cPatient • Calm • Friendly • Encouraging",
  "color: #666; font-size: 14px;"
);
console.log(
  "%cWebsite developed with care 🚗",
  "color: #999; font-size: 12px;"
);
