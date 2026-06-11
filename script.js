document.addEventListener("DOMContentLoaded", () => {
  // Apply js-enabled class to trigger scroll reveal styles dynamically
  document.documentElement.classList.add("js-enabled");

  /* 1. PRELOADER SCREEN */
  const preloader = document.getElementById("preloader");
  const preloaderBar = document.getElementById("preloader-bar");
  const preloaderText = document.getElementById("preloader-text");

  let progress = 0;
  const loadInterval = setInterval(() => {
    progress += Math.floor(Math.random() * 15) + 5;
    if (progress >= 100) {
      progress = 100;
      clearInterval(loadInterval);
      setTimeout(() => {
        preloader.classList.add("fade-out");
        // Trigger skills animation if already in view
        triggerSkillsAnimation();
      }, 300);
    }
    preloaderBar.style.width = `${progress}%`;
    preloaderText.textContent = `${progress}%`;
  }, 60);

  /* 2. CUSTOM CURSOR & HOVER INTERACTION */
  const cursor = document.getElementById("custom-cursor");
  const follower = document.getElementById("custom-follower");
  const mouseGlow = document.getElementById("mouse-glow");

  let mouseX = 0;
  let mouseY = 0;
  let followerX = 0;
  let followerY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Update cursor position directly
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;

    // Dynamic background mouse spotlight variables
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;
    
    // Set variables on body or mouse glow to track coordinates relative to document
    document.documentElement.style.setProperty("--glow-x", `${e.clientX}px`);
    document.documentElement.style.setProperty("--glow-y", `${e.clientY}px`);
  });

  // Smooth cursor follower physics
  function animateFollower() {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    
    follower.style.left = `${followerX}px`;
    follower.style.top = `${followerY}px`;
    
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Hover states detection
  const interactiveElements = document.querySelectorAll(
    "a, button, input, textarea, .photography-card, .filter-tab, .theme-toggle-btn"
  );
  
  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.classList.add("hovering");
      follower.classList.add("hovering");
    });
    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("hovering");
      follower.classList.remove("hovering");
    });
  });

  /* 3. STICKY HEADER & SCROLL PROGRESS */
  const header = document.getElementById("main-header");
  const scrollBar = document.getElementById("scroll-bar");

  window.addEventListener("scroll", () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = (window.scrollY / totalHeight) * 100;
    scrollBar.style.width = `${scrollProgress}%`;

    if (window.scrollY > 40) {
      header.style.padding = "0.75rem 2rem";
      header.style.boxShadow = "var(--shadow-sm)";
    } else {
      header.style.padding = "1.25rem 2rem";
      header.style.boxShadow = "none";
    }
  });

  /* 4. THEME TOGGLE (LIGHT / DARK) & PERSISTENCE */
  const themeToggle = document.getElementById("theme-toggle");
  const storedTheme = localStorage.getItem("portfolio-theme");

  // Apply default preference
  if (storedTheme === "light") {
    document.body.classList.add("light-theme");
  } else {
    document.body.classList.remove("light-theme");
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    const currentTheme = document.body.classList.contains("light-theme") ? "light" : "dark";
    localStorage.setItem("portfolio-theme", currentTheme);
    
    // Quick custom toast notification
    showGlobalToast(`Swapped to ${currentTheme} theme`);
  });

  /* 5. MOBILE NAV MENU TOGGLE */
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-nav-links a");

  hamburgerBtn.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.contains("open");
    hamburgerBtn.classList.toggle("open");
    mobileMenu.classList.toggle("open");
    hamburgerBtn.setAttribute("aria-expanded", !isOpen);
  });

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburgerBtn.classList.remove("open");
      mobileMenu.classList.remove("open");
      hamburgerBtn.setAttribute("aria-expanded", "false");
    });
  });

  /* 6. TYPEWRITER HEADING EFFECT */
  const typewriter = document.getElementById("typewriter");
  const roles = [
    "Software Engineer",
    "Full-Stack Developer",
    "AI/ML Enthusiast",
    "Flutter Specialist",
    "Creative Photographer"
  ];
  
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 100;

  function typeRoles() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      typewriter.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingDelay = 50;
    } else {
      typewriter.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingDelay = 120;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingDelay = 2000; // Pause at end of text
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingDelay = 500; // Pause before typing next role
    }

    setTimeout(typeRoles, typingDelay);
  }
  
  // Start typewriter loops
  setTimeout(typeRoles, 1500);

  /* 7. PROJECT SPOTLIGHT HOVER EFFECTS */
  const projectCards = document.querySelectorAll(".project-card");
  
  projectCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });

  /* 8. PROJECT CATEGORY FILTERING */
  const filterTabs = document.querySelectorAll("#project-tabs .filter-tab");
  
  filterTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      filterTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const category = tab.dataset.filter;
      
      projectCards.forEach((card) => {
        if (category === "all" || card.dataset.category === category) {
          card.style.display = "flex";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
          }, 50);
        } else {
          card.style.opacity = "0";
          card.style.transform = "scale(0.95)";
          setTimeout(() => {
            card.style.display = "none";
          }, 300);
        }
      });
    });
  });

  /* 9. CASE STUDY DETAILED DRAWERS (MODAL) */
  const caseStudies = {
    memory: {
      tag: "Research Project & IoT",
      title: "Enhancing Short-Term Memory with HRV-Based Stress Prediction for Dyslexic Children",
      role: "Lead Research & Software Engineer",
      timeline: "8 Months (Final Year Research)",
      category: "Mobile App & IoT Research",
      platform: "Flutter, Flask, MongoDB, TensorFlow, ESP32, BLE, Arduino IDE",
      overview: "The overarching aim of this research is to develop an Adaptive Memory Trainer Module specifically designed to address the challenges faced by children with dyslexia. By integrating advanced technologies such as machine learning and data analytics, the proposed module creates an adaptive learning environment that dynamically responds to the individual needs of each learner. By monitoring heart rate in real-time with an ESP32 + MAX30102 sensor over Bluetooth Low Energy (BLE), the system continuously checks the learner’s physical stress or cognitive overload. The machine learning engine then changes the difficulty of memory tasks as needed. When a high heart rate suggests stress, fatigue, or frustration, the system makes tasks easier or gives more time for responses. On the other hand, when the heart rate is stable and indicates a good engagement level, the system increases the challenge to encourage cognitive growth.",
      challenges: [
        "Monitoring heart rate in real-time using an ESP32 and MAX30102 sensor, establishing stable data transmission over Bluetooth Low Energy (BLE) to detect physical stress or cognitive overload.",
        "Developing a machine learning engine to process heart rate variability (HRV) parameters and predict stress, fatigue, or frustration levels in real-time.",
        "Designing an Adaptive Memory Trainer Module that dynamically adjusts task difficulty, parameters, and response times to create an optimal, engaging learning environment."
      ],
      metrics: [
        "Directly addresses and supports the unique memory-related difficulties experienced by dyslexic learners, bridging a critical gap in educational technology.",
        "Contributes to broader developmental outcomes including enhanced cognitive growth, improved academic performance, and increased learner confidence.",
        "Serves as a foundation for future innovations in technology-assisted learning and customizable, responsive systems for students with diverse educational needs."
      ]
    },
    hotel: {
      tag: "Hospitality & Reservations",
      title: "Hotel Wedding Reservation System",
      role: "Full-Stack Web Architect",
      timeline: "6 Weeks",
      category: "Web Application",
      platform: "Desktop & Mobile Browsers",
      overview: "A comprehensive reservations dashboard designed for wedding planners and hoteliers. It handles seat layouts, food plans, billing sheets, and room allocations under high client volumes.",
      challenges: [
        "Preventing calendar double-bookings and event conflicts in real-time.",
        "Structuring responsive seating layouts that allow users to drag-and-drop wedding tables dynamically.",
        "Implementing high-security Stripe invoice dispatch systems with immediate email receipting."
      ],
      metrics: [
        "Supported concurrent requests of 250+ users without performance bottlenecks.",
        "Accelerated page load speed to 0.8 seconds through aggressive asset caching.",
        "Reduced venue registration errors by 40% during initial pilot phases."
      ]
    },
    appointment: {
      tag: "Corporate scheduling",
      title: "Appointment Management Portal",
      role: "Backend System Engineer",
      timeline: "5 Weeks",
      category: "Enterprise System",
      platform: "Internal Office Web Hub",
      overview: "A high-security scheduling framework built for enterprise consulting groups. It bridges external clients with internal technical specialists based on credentials and calendar availability.",
      challenges: [
        "Structuring relational databases containing complex join procedures (MySQL) to extract empty timeslots.",
        "Ensuring complete data transaction safety (ACID compliance) during simultaneous slot bookings.",
        "Integrating JWT access protocols across multiple client sub-domains."
      ],
      metrics: [
        "Safely executed 15,000+ consult reservations with zero transaction errors.",
        "Increased employee dispatch efficiency metrics by 35%.",
        "Decreased system query latency by 50% using optimized Hibernate mappings."
      ]
    },
    food: {
      tag: "EdTech & Collaborative Sharing",
      title: "TasteMaster Plan Sharing Portal",
      role: "Full-Stack Developer",
      timeline: "8 Weeks",
      category: "Web Application",
      platform: "MERN Stack Engine",
      overview: "A social culinary platform where creators share custom dietary plans, meal sequences, and monitor learning schedules. It integrates recipe feeds, community discussions, and metrics tracking.",
      challenges: [
        "Structuring complex MongoDB document schemas containing nested objects and references.",
        "Handling massive image uploads and video media rendering smoothly across mobile viewports.",
        "Integrating real-time messaging updates using lightweight sockets."
      ],
      metrics: [
        "Successfully registered 500+ active culinary scholars within SLIIT trial groups.",
        "Secured a 98% user satisfaction survey score during frontend interaction evaluations.",
        "Optimized image asset sizes by 65% through auto-compression algorithms."
      ]
    },
    voice: {
      tag: "Artificial Intelligence & Helpers",
      title: "Intelli-Task Assistant",
      role: "AI & Android Native Developer",
      timeline: "6 Weeks",
      category: "Mobile Application",
      platform: "Native Android (Kotlin)",
      overview: "An automated voice-first reminder assistant. It utilizes speech-to-text parsers to log tasks, categorize priority tags, and announce system schedules audibly.",
      challenges: [
        "Building offline natural language parsing (NLP) to structure sentences into date/title parameters.",
        "Integrating Android native TTS (Text-to-Speech) engines with high-quality phonetic accuracy.",
        "Managing background workers to trigger alarms accurately even in OS Doze mode."
      ],
      metrics: [
        "Reached a 95% accuracy score during task parsing tests with diverse vocal accents.",
        "Announced schedules within 100ms of system trigger timestamps.",
        "Achieved positive client adoption reviews during academic showcase programs."
      ]
    }
  };

  const caseStudyModal = document.getElementById("case-study-modal");
  const caseStudyDrawer = document.getElementById("case-study-drawer");
  const modalClose = document.getElementById("modal-close");
  const detailBtns = document.querySelectorAll(".project-details-btn");

  const modalTag = document.getElementById("modal-tag");
  const modalTitle = document.getElementById("modal-title");
  const modalRole = document.getElementById("modal-role");
  const modalTimeline = document.getElementById("modal-timeline");
  const modalCategory = document.getElementById("modal-category");
  const modalPlatform = document.getElementById("modal-platform");
  const modalOverview = document.getElementById("modal-overview");
  const modalChallenges = document.getElementById("modal-challenges");
  const modalMetrics = document.getElementById("modal-metrics");

  function openProjectModal(projectId) {
    const data = caseStudies[projectId];
    if (!data) return;

    // Populating modal fields
    modalTag.textContent = data.tag;
    modalTitle.textContent = data.title;
    modalRole.textContent = data.role;
    modalTimeline.textContent = data.timeline;
    modalCategory.textContent = data.category;
    modalPlatform.textContent = data.platform;
    modalOverview.textContent = data.overview;

    // Challenges list rendering
    modalChallenges.innerHTML = "";
    data.challenges.forEach((challenge) => {
      const li = document.createElement("li");
      li.textContent = challenge;
      modalChallenges.appendChild(li);
    });

    // Metrics list rendering
    modalMetrics.innerHTML = "";
    data.metrics.forEach((metric) => {
      const li = document.createElement("li");
      li.textContent = metric;
      modalMetrics.appendChild(li);
    });

    // Toggle modal state
    caseStudyModal.classList.add("open");
    document.body.style.overflow = "hidden"; // Prevent background scroll
  }

  function closeProjectModal() {
    caseStudyModal.classList.remove("open");
    document.body.style.overflow = ""; // Restore scroll
  }

  detailBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const projectId = btn.dataset.project;
      openProjectModal(projectId);
    });
  });

  modalClose.addEventListener("click", closeProjectModal);
  caseStudyModal.addEventListener("click", (e) => {
    if (e.target === caseStudyModal) closeProjectModal();
  });

  /* 10. TIMELINE SCROLL PATH PROGRESS EFFECT */
  const timelineProgress = document.getElementById("timeline-progress");
  const experienceSection = document.getElementById("experience");

  function updateTimelineProgress() {
    if (!timelineProgress || !experienceSection) return;

    const sectionRect = experienceSection.getBoundingClientRect();
    const sectionTop = sectionRect.top + window.scrollY;
    const sectionHeight = sectionRect.height;
    const windowHeight = window.innerHeight;
    
    // Calculate progress through the section
    const startOffset = sectionTop - windowHeight / 2;
    const endOffset = sectionTop + sectionHeight - windowHeight;
    const currentScroll = window.scrollY;

    let pct = 0;
    if (currentScroll > startOffset) {
      pct = ((currentScroll - startOffset) / (sectionHeight - windowHeight / 2)) * 100;
    }
    
    pct = Math.min(Math.max(pct, 0), 100);
    timelineProgress.style.height = `${pct}%`;
  }

  window.addEventListener("scroll", updateTimelineProgress);
  window.addEventListener("resize", updateTimelineProgress);

  /* 11. PHOTOGRAPHY LIGHTBOX GALLERY FUNCTION */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxClose = document.getElementById("lightbox-close");
  const lightboxPrev = document.getElementById("lightbox-prev");
  const lightboxNext = document.getElementById("lightbox-next");
  const photoCards = document.querySelectorAll(".photography-card");

  let currentPhotoIndex = 0;
  const photoData = [];

  // Parse card info
  photoCards.forEach((card) => {
    const img = card.querySelector("img");
    const title = card.querySelector(".photography-card-title").textContent;
    photoData.push({
      src: img.src,
      title: title
    });

    card.addEventListener("click", () => {
      currentPhotoIndex = parseInt(card.dataset.index);
      openLightbox(currentPhotoIndex);
    });
  });

  function openLightbox(index) {
    const photo = photoData[index];
    if (!photo) return;
    
    lightboxImg.src = photo.src;
    lightboxCaption.textContent = photo.title;
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  }

  function showNextPhoto() {
    currentPhotoIndex = (currentPhotoIndex + 1) % photoData.length;
    openLightbox(currentPhotoIndex);
  }

  function showPrevPhoto() {
    currentPhotoIndex = (currentPhotoIndex - 1 + photoData.length) % photoData.length;
    openLightbox(currentPhotoIndex);
  }

  lightboxClose.addEventListener("click", closeLightbox);
  lightboxNext.addEventListener("click", showNextPhoto);
  lightboxPrev.addEventListener("click", showPrevPhoto);
  
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard controls
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showNextPhoto();
    if (e.key === "ArrowLeft") showPrevPhoto();
  });

  /* 12. TECHNICAL SKILLS PROGRESS TRIGGERS */
  const skillBars = document.querySelectorAll(".skill-progress-bar");
  const skillsSection = document.getElementById("skills");

  function triggerSkillsAnimation() {
    if (!skillsSection) return;
    
    const rect = skillsSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

    if (isVisible) {
      skillBars.forEach((bar) => {
        const targetWidth = bar.dataset.progress;
        bar.style.width = targetWidth;
      });
    }
  }

  // Bind skills visibility triggers
  window.addEventListener("scroll", triggerSkillsAnimation);
  window.addEventListener("resize", triggerSkillsAnimation);

  /* 14. COPY TO CLIPBOARD ELEMENTS */
  const copyEmailBtn = document.getElementById("copy-email-trigger");
  const copyPhoneBtn = document.getElementById("copy-phone-trigger");

  copyEmailBtn.addEventListener("click", () => {
    navigator.clipboard.writeText("thavaratnamashendra@gmail.com").then(() => {
      showGlobalToast("Email copied to clipboard");
    });
  });

  copyPhoneBtn.addEventListener("click", () => {
    navigator.clipboard.writeText("0770475106").then(() => {
      showGlobalToast("Phone number copied to clipboard");
    });
  });

  /* 15. CONTACT FORM SUBMISSION (WEB3FORMS) */
  const contactForm = document.getElementById("contact-form");
  const formToast = document.getElementById("form-toast");
  const btnSubmit = document.getElementById("btn-submit");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Changing status representation
    const originalText = btnSubmit.innerHTML;
    btnSubmit.disabled = true;
    btnSubmit.innerHTML = `
      Sending Message...
      <svg class="spinner" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none" style="animation: spin 1s linear infinite;"><circle cx="12" cy="12" r="10"></circle><path d="M4 12a8 8 0 0 1 8-8"></path></svg>
    `;

    const formData = new FormData(contactForm);

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    })
      .then(async (response) => {
        const json = await response.json();
        if (json.success) {
          formToast.classList.add("show");
          contactForm.reset();
        } else {
          showGlobalToast(json.message || "Failed to send message.");
        }
      })
      .catch((error) => {
        console.error(error);
        showGlobalToast("A network error occurred. Please try again.");
      })
      .finally(() => {
        btnSubmit.disabled = false;
        btnSubmit.innerHTML = originalText;
        
        // Close toast confirmation after 4 seconds
        setTimeout(() => {
          formToast.classList.remove("show");
        }, 4000);
      });
  });

  /* UTILITY TOAST MANAGER */
  const globalToast = document.getElementById("global-toast");
  const globalToastMsg = document.getElementById("global-toast-msg");
  let toastTimer;

  function showGlobalToast(message) {
    clearTimeout(toastTimer);
    globalToastMsg.textContent = message;
    globalToast.classList.add("show");
    
    toastTimer = setTimeout(() => {
      globalToast.classList.remove("show");
    }, 2500);
  }

  /* 16. GENERAL SECTIONS REVEAL TRIGGERS */
  const revealSections = document.querySelectorAll(".reveal");

  function revealOnScroll() {
    revealSections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const triggerPoint = window.innerHeight - 100;
      
      if (rect.top < triggerPoint) {
        section.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // Trigger initial check
});
