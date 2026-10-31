/**
 * CHANDU BOBBALA - PORTFOLIO INTERACTIVE SCRIPT
 * High performance, zero dependency vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initScrollSpy();
  initSkillFilters();
  initFooterYear();
});

/* --------------------------------------------------------------------------
 * 1. THEME SWITCHER (Dark / Light Mode)
 * -------------------------------------------------------------------------- */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  // Retrieve saved theme or default to dark
  const savedTheme = localStorage.getItem('cb_portfolio_theme');
  if (savedTheme) {
    htmlRoot.setAttribute('data-theme', savedTheme);
  } else {
    // Check if system prefers light
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    htmlRoot.setAttribute('data-theme', prefersLight ? 'light' : 'dark');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      htmlRoot.setAttribute('data-theme', newTheme);
      localStorage.setItem('cb_portfolio_theme', newTheme);
    });
  }
}

/* --------------------------------------------------------------------------
 * 2. NAVIGATION & MOBILE DRAWER
 * -------------------------------------------------------------------------- */
function initNavigation() {
  const header = document.getElementById('header');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  // Header background blur on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile menu toggle
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      mobileToggle.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      mobileMenu.setAttribute('aria-hidden', !isOpen);
    });

    // Close mobile menu when clicking any link
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        mobileToggle.classList.remove('active');
      }
    });
  }
}

/* --------------------------------------------------------------------------
 * 3. SCROLLSPY (Highlight active link on scroll)
 * -------------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links .nav-link');

  function updateActiveLink() {
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();
}

/* --------------------------------------------------------------------------
 * 4. SKILL CATEGORY FILTERS
 * -------------------------------------------------------------------------- */
function initSkillFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-category-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });

      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');

      const filterValue = button.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
 * 5. PROJECT DETAILS MODAL
 * -------------------------------------------------------------------------- */
const projectDetails = {
  'codereview-ai': {
    title: 'CodeReview AI – Architectural & Technical Breakdown',
    content: `
      <div style="display:flex; flex-direction:column; gap:1.25rem;">
        <p><strong>Overview:</strong> CodeReview AI is an automated code review and security analysis platform engineered to identify syntax errors, security flaws, and code-quality issues in Python and modern codebases without needing manual auditor intervention.</p>
        
        <div>
          <h4 style="color:var(--text-primary); margin-bottom:0.5rem; font-size:1rem;">Core Architectural Highlights</h4>
          <ul style="padding-left:1.25rem; display:flex; flex-direction:column; gap:0.5rem;">
            <li><strong>Deterministic AST Engine:</strong> Uses Python's native <code>ast</code> module to construct syntax trees, enabling deterministic AST visitors to spot unsafe calls (e.g. <code>eval()</code>, injection patterns, unvalidated inputs) safely.</li>
            <li><strong>OWASP Top 10 Mapping:</strong> Each detected vulnerability is matched against OWASP Top 10 standards to supply standardized vulnerability categorization.</li>
            <li><strong>OpenRouter AI Grounded Remediation:</strong> Connects to OpenRouter AI to parse the finding line, excerpt, and context, providing plain-language technical explanations and recommended fixes.</li>
            <li><strong>FastAPI REST Service:</strong> Asynchronous high-performance endpoints managing scan submission, finding queries, working-copy fix verification, and automated ReportLab PDF report generation.</li>
            <li><strong>React Interactive Client:</strong> Clean UI allowing developers to review line-by-line findings, preview code diffs, verify updated working copies, and export auditable reports.</li>
          </ul>
        </div>

        <div style="background:var(--bg-elevated); padding:0.85rem 1rem; border-radius:8px; border:1px solid var(--border-subtle); font-size:0.85rem;">
          <strong style="color:var(--text-primary);">Tech Stack:</strong> Python, FastAPI, React, OpenRouter AI, Python AST, REST API, OWASP Top 10.
        </div>
      </div>
    `
  },
  'smart-waste': {
    title: 'Smart Waste Reporting & Management – System Details',
    content: `
      <div style="display:flex; flex-direction:column; gap:1.25rem;">
        <p><strong>Overview:</strong> A full-stack civic reporting and governance platform designed to bridge the communication gap between citizens and municipal administrators regarding street waste and sanitation grievances.</p>
        
        <div>
          <h4 style="color:var(--text-primary); margin-bottom:0.5rem; font-size:1rem;">Key Functional Features</h4>
          <ul style="padding-left:1.25rem; display:flex; flex-direction:column; gap:0.5rem;">
            <li><strong>Citizen Grievance Submission:</strong> Citizens can report waste accumulations with photographic evidence, location information, and incident descriptions.</li>
            <li><strong>Role-Based Access Control (RBAC):</strong> Secure authentication separating public Citizen accounts from Administrator dashboards with differentiated privileges.</li>
            <li><strong>Real-Time Lifecycle Tracking:</strong> Dynamic ticket tracking through Submitted &rarr; In Progress &rarr; Resolved stages with timestamped verification.</li>
            <li><strong>PostgreSQL Persistent Store:</strong> Structured relational schema handling user credentials, geo-coordinates, complaint logs, and resolution audits.</li>
            <li><strong>Brevo API Notifications:</strong> Automated transactional email alerts dispatched on user registration, ticket submission, status updates, and complaint resolution.</li>
          </ul>
        </div>

        <div style="background:var(--bg-elevated); padding:0.85rem 1rem; border-radius:8px; border:1px solid var(--border-subtle); font-size:0.85rem;">
          <strong style="color:var(--text-primary);">Tech Stack:</strong> HTML, CSS, JavaScript, Python (Flask), PostgreSQL, Brevo API.
        </div>
      </div>
    `
  }
};

function openProjectModal(projectId) {
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');

  const data = projectDetails[projectId];
  if (!data) return;

  modalTitle.textContent = data.title;
  modalBody.innerHTML = data.content;

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// Close modal on click outside dialog
document.getElementById('project-modal')?.addEventListener('click', (e) => {
  if (e.target.id === 'project-modal') {
    closeProjectModal();
  }
});

// Close modal on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const modal = document.getElementById('project-modal');
    if (modal && modal.classList.contains('open')) {
      closeProjectModal();
    }
  }
});

/* --------------------------------------------------------------------------
 * 6. CLIPBOARD COPY UTILITY
 * -------------------------------------------------------------------------- */
function copyToClipboard(text, buttonElement) {
  navigator.clipboard.writeText(text).then(() => {
    const originalHTML = buttonElement.innerHTML;
    buttonElement.innerHTML = `
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#10b981" stroke-width="2">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    `;
    buttonElement.title = "Copied to clipboard!";
    setTimeout(() => {
      buttonElement.innerHTML = originalHTML;
      buttonElement.title = "Copy to clipboard";
    }, 2000);
  }).catch(() => {
    // Fallback prompt
    prompt('Copy to clipboard:', text);
  });
}

/* --------------------------------------------------------------------------
 * 7. CONTACT FORM HANDLER
 * -------------------------------------------------------------------------- */
function handleContactSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const statusDiv = document.getElementById('form-status');
  const submitBtn = document.getElementById('form-submit-btn');

  const name = form.elements['name'].value.trim();
  const email = form.elements['email'].value.trim();
  const subject = form.elements['subject'].value.trim();
  const message = form.elements['message'].value.trim();

  if (!name || !email || !subject || !message) {
    statusDiv.textContent = 'Please fill out all required fields.';
    statusDiv.className = 'form-status-msg error';
    return;
  }

  // Visual feedback
  submitBtn.disabled = true;
  submitBtn.innerHTML = `<span>Preparing message...</span>`;

  setTimeout(() => {
    // Construct standard mailto fallback URL
    const mailtoUrl = `mailto:bobbalachandu25@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("Sender Name: " + name + "\nSender Email: " + email + "\n\nMessage:\n" + message)}`;
    
    // Open email client
    window.location.href = mailtoUrl;

    statusDiv.textContent = `Thank you, ${name}! Your email client has been prepared. If it did not open automatically, please email bobbalachandu25@gmail.com directly.`;
    statusDiv.className = 'form-status-msg success';

    form.reset();
    submitBtn.disabled = false;
    submitBtn.innerHTML = `
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
      </svg>
      <span>Send Message</span>
    `;
  }, 600);
}

/* --------------------------------------------------------------------------
 * 8. FOOTER UTILITIES
 * -------------------------------------------------------------------------- */
function initFooterYear() {
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
