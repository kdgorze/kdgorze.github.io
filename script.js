// ─── PHOTO SLIDESHOW ───-------------------------------------------------------------------------------------------------------------------------
(function () {
  const slides = Array.from(document.querySelectorAll('.slide'));
  const dotsContainer = document.getElementById('slideDots');
  let current = 0;
  let timer = null;
  const INTERVAL = 3500;

  if (!slides.length || !dotsContainer) return;

  // Build dots 
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'slide-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  function goTo(index) {
    slides[current].classList.remove('active');
    dotsContainer.children[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dotsContainer.children[current].classList.add('active');
  }

  function next() { goTo(current + 1); }

  function startTimer() { timer = setInterval(next, INTERVAL); }
  function stopTimer() { clearInterval(timer); }

  // Pause on hover
  const container = document.querySelector('.hero-slideshow');
  if (container) {
    container.addEventListener('mouseenter', stopTimer);
    container.addEventListener('mouseleave', startTimer);
  }

  startTimer();

  // Expose for inline button handlers
  window.slideStep = function (dir) {
    stopTimer();
    goTo(current + dir);
    startTimer();
  };
})();


function openMobile() {
  document.getElementById('mobileMenu').classList.add('open');
  document.getElementById('hamburgerBtn').setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMobile() {
  document.getElementById('mobileMenu').classList.remove('open');
  document.getElementById('hamburgerBtn').setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

// ─── SCROLL FADE-IN ───
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// CONTACT FORM ----------------------------------------------------------------------------------------------------------------

async function handleFormSubmit(event) {
  event.preventDefault();

  const n = document.getElementById("name").value.trim();
  const e = document.getElementById("email").value.trim();
  const m = document.getElementById("message").value.trim();

  if (!n || !e || !m) {
    alert("Please fill out all fields.");
    return;
  }

  try {
    const response = await fetch("https://formspree.io/f/mbdbgeea", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: n,
        email: e,
        message: m
      })
    });

    if (response.ok) {
      document.getElementById("submitBtn").textContent = "sent ✓";

      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("message").value = "";
    } else {
      alert("Something went wrong.");
    }

  } catch (err) {
    alert("Connection error.");
  }
}
// ─── NAV ACTIVE STATE ON SCROLL -----------------------------------------------------------------------------------------------------------───
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--accent)' : '';
  });
});
